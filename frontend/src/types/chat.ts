export type ChatMode = 'chat' | 'cowork'

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface Conversation {
  id: string
  title: string
  timestamp: string
  messages: ChatMessage[]
}

export interface ModelOption {
  id: string
  name: string
  tag?: string
}
