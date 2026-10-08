import React, { useRef, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store'
import { startNewChat } from '../../store/slices/chatUiSlice'
import { MessageBubble } from './MessageBubble'
import { ChatInputBox } from './ChatInputBox'

export const ChatWindow: React.FC = () => {
  const dispatch = useAppDispatch()
  const activeConversationId = useAppSelector((state) => state.chatUi.activeConversationId)
  const conversations = useAppSelector((state) => state.chatUi.conversations)
  const isTyping = useAppSelector((state) => state.chatUi.isTyping)

  const activeConv = conversations.find((c) => c.id === activeConversationId)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConv?.messages.length, isTyping])

  if (!activeConv) return null

  return (
    <div className="flex-1 flex flex-col w-full h-full max-w-3xl mx-auto overflow-hidden animate-in fade-in duration-200">
      {/* Conversation Top Header Bar */}
      <div className="h-10 px-2 flex items-center justify-between border-b border-black/5 dark:border-white/5 shrink-0 text-xs text-zinc-500 select-none">
        <div className="flex items-center gap-2 truncate">
          <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate">
            {activeConv.title}
          </span>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span className="text-zinc-400">{activeConv.timestamp}</span>
        </div>

        <button
          onClick={() => dispatch(startNewChat())}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-2 md:px-4 py-6 space-y-6">
        {activeConv.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3 animate-in fade-in duration-150">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <span className="text-amber-500 text-sm leading-none font-bold animate-pulse">✷</span>
            </div>
            <div className="flex items-center gap-1.5 py-2 px-3 bg-black/5 dark:bg-white/5 rounded-2xl">
              <span className="w-2 h-2 rounded-full bg-amber-500/80 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80 animate-bounce" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Pinned Bottom Input */}
      <div className="pt-2 pb-4 px-2 shrink-0">
        <ChatInputBox />
      </div>
    </div>
  )
}
