import type { Conversation, ChatMessage, ChatAttachment } from '../types/chat'
import { authFetch } from './authApi'

export interface BackendAttachment {
  name: string
  size: number
  type: string
  url?: string
}

export interface BackendMessage {
  sender: 'user' | 'assistant'
  content: string
  timestamp?: string | Date
  attachments?: BackendAttachment[]
}

export interface BackendConversation {
  _id?: string
  conversationId: string
  title: string
  messages: BackendMessage[]
  createdAt?: string
  updatedAt?: string
}

export interface HistoryApiResponse {
  success: boolean
  count?: number
  conversations?: BackendConversation[]
  error?: string
}

export interface MessageApiResponse {
  success: boolean
  conversationId: string
  title: string
  reply: string
  messages?: BackendMessage[]
  notice?: string
  error?: string
}

function formatTime(isoString?: string | Date): string {
  if (!isoString) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  try {
    const d = new Date(isoString)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return 'Just now'
  }
}

function formatRelativeDate(isoString?: string | Date): string {
  if (!isoString) return 'Today'
  try {
    const date = new Date(isoString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  } catch {
    return 'Recent'
  }
}

export function normalizeConversation(backendConv: BackendConversation): Conversation {
  return {
    id: backendConv.conversationId,
    title: backendConv.title || 'New Chat',
    timestamp: formatRelativeDate(backendConv.updatedAt || backendConv.createdAt),
    messages: (backendConv.messages || []).map((msg, index): ChatMessage => ({
      id: `msg-${backendConv.conversationId}-${index}`,
      sender: msg.sender,
      content: msg.content,
      timestamp: formatTime(msg.timestamp),
      attachments:
        msg.attachments && msg.attachments.length > 0
          ? msg.attachments.map((att, aIdx) => ({
              id: `att-${backendConv.conversationId}-${index}-${aIdx}`,
              name: att.name,
              size: att.size,
              type: att.type,
              url: att.url,
              base64: att.url,
            }))
          : undefined,
    })),
  }
}

const rawBase = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').trim().replace(/\/+$/, '')
const API_BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`

export const chatApi = {
  /**
   * Fetch all conversation history from backend
   */
  async getHistory(): Promise<Conversation[]> {
    const res = await authFetch(`${API_BASE_URL}/chat/history`)
    if (!res.ok) {
      throw new Error(`Failed to load chat history (${res.status})`)
    }
    const data = (await res.json()) as HistoryApiResponse
    if (!data.success || !data.conversations) {
      return []
    }
    return data.conversations.map(normalizeConversation)
  },

  /**
   * Send a chat message to backend and get AI response
   */
  async sendMessage(
    message: string,
    attachments: ChatAttachment[] = [],
    conversationId?: string | null
  ): Promise<MessageApiResponse> {
    const res = await authFetch(`${API_BASE_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        attachments,
        ...(conversationId ? { conversationId } : {}),
      }),
    })

    const data = (await res.json()) as MessageApiResponse
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Error sending message (${res.status})`)
    }
    return data
  },
}
