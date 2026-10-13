export type ChatMode = 'chat' | 'cowork'

export interface ChatAttachment {
  id: string
  name: string
  size: number
  type: string
  url?: string
  base64?: string
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  content: string
  timestamp: string
  attachments?: ChatAttachment[]
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
