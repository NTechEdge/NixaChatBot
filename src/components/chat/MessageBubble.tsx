import React, { useState } from 'react'
import { Copy, Check, Volume2, ThumbsUp, ThumbsDown, RotateCcw, FileText } from 'lucide-react'
import type { ChatMessage } from '../../types/chat'
import { cn } from '../../utils/cn'

interface MessageBubbleProps {
  message: ChatMessage
  isLast?: boolean
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLast = false }) => {
  const isUser = message.sender === 'user'
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isUser) {
    return (
      <div className="flex justify-end w-full animate-in fade-in duration-150">
        <div className="bg-[#242427] dark:bg-[#252528] text-white px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-lg shadow-sm border border-white/5 space-y-2">
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-1">
              {message.attachments.map((att) => {
                const isImage =
                  Boolean(att.type?.startsWith('image/')) ||
                  /\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i.test(att.name || '') ||
                  Boolean(att.url?.startsWith('data:image/')) ||
                  Boolean(att.base64?.startsWith('data:image/'))
                return isImage ? (
                  <img
                    key={att.id}
                    src={att.url || att.base64}
                    alt={att.name}
                    className="max-h-52 max-w-full rounded-xl object-cover border border-white/10"
                  />
                ) : (
                  <div
                    key={att.id}
                    className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs text-zinc-200"
                  >
                    <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate max-w-[150px] font-medium">{att.name}</span>
                    <span className="text-[10px] text-zinc-400 shrink-0">
                      {(att.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                )
              })}
            </div>
          )}
          {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start w-full animate-in fade-in duration-200 mt-4 space-y-3">
      {/* Assistant AI Message Text */}
      <div className="text-zinc-900 dark:text-[#ececf1] text-base leading-relaxed whitespace-pre-wrap font-sans max-w-full">
        {message.content}
      </div>

      {/* Action Row Under Assistant Message */}
      <div className="flex items-center gap-2 pt-1 text-zinc-400 dark:text-zinc-500">
        <button
          onClick={handleCopy}
          className="p-1 rounded-md hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Copy response"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        <button
          className="p-1 rounded-md hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Read aloud"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setFeedback(feedback === 'liked' ? null : 'liked')}
          className={cn(
            'p-1 rounded-md hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer',
            feedback === 'liked' && 'text-amber-500 dark:text-amber-400'
          )}
          title="Good response"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setFeedback(feedback === 'disliked' ? null : 'disliked')}
          className={cn(
            'p-1 rounded-md hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer',
            feedback === 'disliked' && 'text-red-500 dark:text-red-400'
          )}
          title="Bad response"
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>

        <button
          className="p-1 rounded-md hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Regenerate response"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Signature Starburst Mark Below The Last Message */}
      {isLast && (
        <div className="pt-2 select-none animate-in fade-in duration-300">
          <span className="text-3xl text-[#e07a5f] select-none block" aria-hidden="true">
            ✷
          </span>
        </div>
      )}
    </div>
  )
}
