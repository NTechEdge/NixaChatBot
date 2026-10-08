import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { ChatMessage } from '../../types/chat'
import { cn } from '../../utils/cn'

interface MessageBubbleProps {
  message: ChatMessage
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user'
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isUser) {
    return (
      <div className="flex justify-end w-full animate-in fade-in duration-200">
        <div className="max-w-xl bg-zinc-200/80 dark:bg-[#25262b] text-zinc-900 dark:text-zinc-100 px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm text-sm leading-relaxed border border-black/5 dark:border-white/5">
          <p className="whitespace-pre-wrap">{message.content}</p>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1.5 text-right font-mono">
            {message.timestamp}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 w-full animate-in fade-in duration-200 group">
      {/* Nixa Signature Star Icon */}
      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 select-none">
        <span className="text-amber-500 text-sm leading-none font-bold">✷</span>
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">Nixa</span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
            {message.timestamp}
          </span>
        </div>

        <div className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-sans">
          {message.content}
        </div>

        {/* Action Bar (Copy) */}
        <div className="flex items-center gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className={cn(
              'inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md transition-colors cursor-pointer',
              copied
                ? 'text-emerald-500 bg-emerald-500/10'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5'
            )}
            title="Copy message"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
