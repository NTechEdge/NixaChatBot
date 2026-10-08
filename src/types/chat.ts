export type ChatMode = 'chat' | 'cowork'

export interface ChatHistoryItem {
  id: string
  title: string
  timestamp: string
}

export interface ModelOption {
  id: string
  name: string
  tag?: string
}
