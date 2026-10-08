import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ChatMode, Conversation, ChatMessage } from '../../types/chat'

interface ChatUIState {
  activeMode: ChatMode
  selectedModel: string
  activeConversationId: string | null
  promptText: string
  conversations: Conversation[]
  isTyping: boolean
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-greeting',
    title: 'Greeting',
    timestamp: 'Today',
    messages: [
      {
        id: 'msg-g1',
        sender: 'user',
        content: 'Hi',
        timestamp: '11:00 AM',
      },
      {
        id: 'msg-g2',
        sender: 'assistant',
        content: 'Hi there! How can I help you today?',
        timestamp: '11:00 AM',
      },
    ],
  },
  {
    id: 'conv-1',
    title: 'Amn astesi kno',
    timestamp: 'Today',
    messages: [
      {
        id: 'm1-1',
        sender: 'user',
        content: 'Amn astesi kno? Ekta summary dao.',
        timestamp: '10:32 AM',
      },
      {
        id: 'm1-2',
        sender: 'assistant',
        content:
          'এটি আপনার পূর্ববর্তী টাস্ক এবং প্রজেক্টের আলোচনার রেফারেন্স। আপনি চাইলে আমরা এখান থেকে আবার শুরু করতে পারি।',
        timestamp: '10:33 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'Creating commands in Nixa VSC...',
    timestamp: 'Yesterday',
    messages: [
      {
        id: 'm2-1',
        sender: 'user',
        content: 'How do I create custom slash commands in the Nixa extension?',
        timestamp: '2:15 PM',
      },
      {
        id: 'm2-2',
        sender: 'assistant',
        content:
          'To create custom slash commands in Nixa, configure them inside your extension manifest or register them via the CLI SDK.',
        timestamp: '2:16 PM',
      },
    ],
  },
  {
    id: 'conv-3',
    title: 'Max plan 1 year affordability',
    timestamp: 'Oct 6',
    messages: [
      {
        id: 'm3-1',
        sender: 'user',
        content: 'What is the breakdown and feature set for the 1-year plan?',
        timestamp: '4:45 PM',
      },
      {
        id: 'm3-2',
        sender: 'assistant',
        content:
          'The 1-year plan offers high-priority inference speed, 200,000 token context window capacity, and custom agent persona presets.',
        timestamp: '4:46 PM',
      },
    ],
  },
  {
    id: 'conv-4',
    title: 'Modal',
    timestamp: 'Oct 5',
    messages: [
      {
        id: 'm4-1',
        sender: 'user',
        content: 'Make an accessible modal component in React.',
        timestamp: '1:10 PM',
      },
      {
        id: 'm4-2',
        sender: 'assistant',
        content:
          'Here is a lightweight accessible modal with focus-trap and escape key binding.',
        timestamp: '1:11 PM',
      },
    ],
  },
  {
    id: 'conv-5',
    title: 'Nixa native binary installation er...',
    timestamp: 'Oct 5',
    messages: [
      {
        id: 'm5-1',
        sender: 'user',
        content: 'Windows এ native binary install করার সময় কী কী ডিপেন্ডেন্সি প্রয়োজন?',
        timestamp: '11:20 AM',
      },
      {
        id: 'm5-2',
        sender: 'assistant',
        content:
          'Windows-এ Microsoft Visual C++ Redistributable (x64) এবং Node.js/PowerShell 7+ রানটাইম দরকার হয়।',
        timestamp: '11:21 AM',
      },
    ],
  },
]

const initialState: ChatUIState = {
  activeMode: 'chat',
  selectedModel: 'Sonnet 5.5 Medium',
  activeConversationId: null, // Starts on fresh home, or user clicks any chat
  promptText: '',
  conversations: INITIAL_CONVERSATIONS,
  isTyping: false,
}

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
    sendMessage: (state, action: PayloadAction<string>) => {
      const content = action.payload.trim()
      if (!content) return

      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        content,
        timestamp: timeNow,
      }

      // If already in a conversation
      if (state.activeConversationId) {
        const conv = state.conversations.find((c) => c.id === state.activeConversationId)
        if (conv) {
          conv.messages.push(userMessage)
        }
      } else {
        // Start new conversation
        const newId = `conv-${Date.now()}`
        const newTitle = content.length > 25 ? `${content.slice(0, 25)}...` : content
        const newConv: Conversation = {
          id: newId,
          title: newTitle,
          timestamp: 'Just now',
          messages: [userMessage],
        }
        state.conversations.unshift(newConv)
        state.activeConversationId = newId
      }

      state.promptText = ''
      state.isTyping = true
    },
    addAssistantReply: (state, action: PayloadAction<{ convId: string; content: string }>) => {
      const conv = state.conversations.find((c) => c.id === action.payload.convId)
      if (conv) {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        conv.messages.push({
          id: `msg-reply-${Date.now()}`,
          sender: 'assistant',
          content: action.payload.content,
          timestamp: timeNow,
        })
      }
      state.isTyping = false
    },
  },
})

export const {
  setActiveMode,
  setSelectedModel,
  setPromptText,
  startNewChat,
  selectConversation,
  sendMessage,
  addAssistantReply,
} = chatUiSlice.actions

export default chatUiSlice.reducer
