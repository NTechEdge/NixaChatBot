import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ChatMode } from '../../types/chat'

interface ChatUIState {
  activeMode: ChatMode
  selectedModel: string
  selectedChatId: string | null
  promptText: string
}

const initialState: ChatUIState = {
  activeMode: 'chat',
  selectedModel: 'Sonnet 5.5 Medium',
  selectedChatId: null,
  promptText: '',
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
    setSelectedChatId: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload
    },
    setPromptText: (state, action: PayloadAction<string>) => {
      state.promptText = action.payload
    },
  },
})

export const { setActiveMode, setSelectedModel, setSelectedChatId, setPromptText } =
  chatUiSlice.actions
export default chatUiSlice.reducer
