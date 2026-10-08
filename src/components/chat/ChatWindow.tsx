import React, { useRef, useEffect } from 'react'
import { useAppSelector } from '../../store'
import { MessageBubble } from './MessageBubble'
import { ChatInputBox } from './ChatInputBox'

export const ChatWindow: React.FC = () => {
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
      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-6 space-y-6">
        {activeConv.messages.map((msg, index) => {
          const isLast = index === activeConv.messages.length - 1 && msg.sender === 'assistant'
          return <MessageBubble key={msg.id} message={msg} isLast={isLast} />
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3 animate-in fade-in duration-150 mt-4">
            <span className="text-2xl text-[#e07a5f] animate-pulse select-none">✷</span>
            <div className="flex items-center gap-1.5 py-1.5 px-3 bg-black/5 dark:bg-white/5 rounded-2xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e07a5f] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#e07a5f] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#e07a5f] animate-bounce" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Pinned Bottom Input Bar */}
      <div className="pt-2 pb-4 px-3 md:px-4 shrink-0">
        <ChatInputBox variant="bar" />
      </div>
    </div>
  )
}
