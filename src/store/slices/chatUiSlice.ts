import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { ChatMode, Conversation, ChatMessage, ChatAttachment } from '../../types/chat'
import { chatApi } from '../../services/chatApi'

interface ChatUIState {
  activeMode: ChatMode
  selectedModel: string
  activeConversationId: string | null
  promptText: string
  conversations: Conversation[]
  isTyping: boolean
  isLoadingHistory: boolean
  error: string | null
}

const initialState: ChatUIState = {
  activeMode: 'chat',
  selectedModel: 'Sonnet 5.5 Medium',
  activeConversationId: null,
  promptText: '',
  conversations: [],
  isTyping: false,
  isLoadingHistory: false,
  error: null,
}

// 1. Thunk to fetch chat history from backend
export const fetchChatHistory = createAsyncThunk(
  'chatUi/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const history = await chatApi.getHistory()
      return history
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  }
)

// 2. Thunk to send a message to backend
export const submitChatMessage = createAsyncThunk(
  'chatUi/submitMessage',
  async (
    {
      message,
      attachments = [],
      conversationId,
    }: {
      message: string
      attachments?: ChatAttachment[]
      conversationId?: string | null
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await chatApi.sendMessage(message, attachments, conversationId)
      return response
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  }
)

export const chatUiSlice = createSlice({
  name: 'chatUi',
  initialState,
  reducers: {
    setActiveMode: (state, action: PayloadAction<ChatMode>) => {
      state.activeMode = action.payload
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload
    },
    setPromptText: (state, action: PayloadAction<string>) => {
      state.promptText = action.payload
    },
    startNewChat: (state) => {
      state.activeConversationId = null
      state.promptText = ''
      state.isTyping = false
    },
    selectConversation: (state, action: PayloadAction<string>) => {
      state.activeConversationId = action.payload
      state.isTyping = false
    },
    // Optimistic user message addition before network request completes
    appendUserMessage: (
      state,
      action: PayloadAction<{
        message: string
        attachments?: ChatAttachment[]
        tempConvId?: string
      }>
    ) => {
      const content = action.payload.message.trim()
      const attachments = action.payload.attachments || []
      if (!content && attachments.length === 0) return

      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        content,
        timestamp: timeNow,
        attachments: attachments.length > 0 ? attachments : undefined,
      }

      if (state.activeConversationId) {
        const conv = state.conversations.find((c) => c.id === state.activeConversationId)
        if (conv) {
          conv.messages.push(userMessage)
        }
      } else {
        const tempId = action.payload.tempConvId || `conv-${Date.now()}`
        const newTitle = content
          ? content.length > 28
            ? `${content.slice(0, 28)}...`
            : content
          : attachments[0]?.name || 'New Attachment'

        const newConv: Conversation = {
          id: tempId,
          title: newTitle,
          timestamp: 'Just now',
          messages: [userMessage],
        }
        state.conversations.unshift(newConv)
        state.activeConversationId = tempId
      }

      state.promptText = ''
      state.isTyping = true
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // History fetching
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.isLoadingHistory = true
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.isLoadingHistory = false
        state.conversations = action.payload
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.isLoadingHistory = false
        state.error = action.payload as string
      })

    // Submitting message
    builder
      .addCase(submitChatMessage.fulfilled, (state, action) => {
        state.isTyping = false
        const { conversationId, title, reply, messages } = action.payload

        // Locate conversation (could be matching temp ID or matching actual ID)
        let conv = state.conversations.find(
          (c) => c.id === conversationId || c.id === state.activeConversationId
        )

        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        if (conv) {
          conv.id = conversationId
          if (title) conv.title = title
          // If backend returned complete messages array, sync it
          if (messages && messages.length > 0) {
            conv.messages = messages.map((m, idx) => {
              const existingMsg = conv?.messages?.[idx]
              const attachments: ChatAttachment[] | undefined =
                m.attachments && m.attachments.length > 0
                  ? m.attachments.map((att, aIdx) => ({
                      id: `att-${conversationId}-${idx}-${aIdx}`,
                      name: att.name,
                      size: att.size,
                      type: att.type,
                      url: att.url,
                      base64: att.url,
                    }))
                  : existingMsg?.sender === m.sender && existingMsg?.attachments
                    ? existingMsg.attachments
                    : undefined

              return {
                id: `msg-${conversationId}-${idx}`,
                sender: m.sender,
                content: m.content,
                timestamp: m.timestamp
                  ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : timeNow,
                attachments,
              }
            })
          } else {
            // Append assistant reply
            conv.messages.push({
              id: `msg-reply-${Date.now()}`,
              sender: 'assistant',
              content: reply,
              timestamp: timeNow,
            })
          }
        } else {
          // New conversation added directly
          conv = {
            id: conversationId,
            title: title || 'New Chat',
            timestamp: 'Just now',
            messages: (messages || []).map((m, idx) => ({
              id: `msg-${conversationId}-${idx}`,
              sender: m.sender,
              content: m.content,
              timestamp: timeNow,
              attachments:
                m.attachments && m.attachments.length > 0
                  ? m.attachments.map((att, aIdx) => ({
                      id: `att-${conversationId}-${idx}-${aIdx}`,
                      name: att.name,
                      size: att.size,
                      type: att.type,
                      url: att.url,
                      base64: att.url,
                    }))
                  : undefined,
            })),
          }
          state.conversations.unshift(conv)
        }

        state.activeConversationId = conversationId
      })
      .addCase(submitChatMessage.rejected, (state, action) => {
        state.isTyping = false
        const errorMessage = (action.payload as string) || 'Failed to get response from server.'

        // Append error notice in the active conversation
        if (state.activeConversationId) {
          const conv = state.conversations.find((c) => c.id === state.activeConversationId)
          if (conv) {
            conv.messages.push({
              id: `msg-err-${Date.now()}`,
              sender: 'assistant',
              content: `⚠️ [Error]: ${errorMessage}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            })
          }
        }
      })
  },
})

export const {
  setActiveMode,
  setSelectedModel,
  setPromptText,
  startNewChat,
  selectConversation,
  appendUserMessage,
} = chatUiSlice.actions

export default chatUiSlice.reducer
