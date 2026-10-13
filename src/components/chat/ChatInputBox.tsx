import React, { useState, useRef } from 'react'
import { Plus, ArrowUp, X, FileText } from 'lucide-react'
import { useAppDispatch, useAppSelector, store } from '../../store'
import {
  setPromptText,
  appendUserMessage,
  submitChatMessage,
} from '../../store/slices/chatUiSlice'
import type { ChatAttachment } from '../../types/chat'
import { ChatTextarea } from '../ui/ChatTextarea'
import { IconButton } from '../ui/IconButton'

interface ChatInputBoxProps {
  variant?: 'hero' | 'bar'
}

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({ variant = 'hero' }) => {
  const dispatch = useAppDispatch()
  const promptText = useAppSelector((state) => state.chatUi.promptText)
  const isTyping = useAppSelector((state) => state.chatUi.isTyping)

  const [attachments, setAttachments] = useState<ChatAttachment[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const fileList = Array.from(files)
    const newAttachments: ChatAttachment[] = []
    let processedCount = 0

    fileList.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        newAttachments.push({
          id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          url: base64,
          base64: base64,
        })
        processedCount++
        if (processedCount === fileList.length) {
          setAttachments((prev) => [...prev, ...newAttachments])
        }
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id))
  }

  const handleSubmit = () => {
    const text = promptText.trim()
    if ((!text && attachments.length === 0) || isTyping) return

    const currentConvId = store.getState().chatUi.activeConversationId
    const currentAttachments = [...attachments]

    dispatch(appendUserMessage({ message: text, attachments: currentAttachments }))
    dispatch(
      submitChatMessage({
        message: text,
        attachments: currentAttachments,
        conversationId: currentConvId,
      })
    )

    setAttachments([])
  }

  // Active chat bottom bar variant
  if (variant === 'bar') {
    return (
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Hidden file picker */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          className="hidden"
        />

        <div className="w-full bg-white dark:bg-[#1c1d20] border border-black/10 dark:border-white/10 rounded-2xl p-2.5 flex flex-col gap-2 shadow-lg dark:shadow-2xl focus-within:border-black/25 dark:focus-within:border-white/20 transition-all">
          {/* Attachment preview chips */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 px-1 pt-1 pb-1">
              {attachments.map((file) => {
                const isImage = file.type.startsWith('image/')
                return (
                  <div
                    key={file.id}
                    className="relative flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-1.5 text-xs text-zinc-800 dark:text-zinc-200"
                  >
                    {isImage && file.url ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                    )}
                    <div className="max-w-[110px] truncate">
                      <div className="font-medium truncate">{file.name}</div>
                      <div className="text-[10px] text-zinc-500">
                        {(file.size / 1024).toFixed(0)} KB
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(file.id)}
                      className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer ml-1"
                      title="Remove"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          <div className="flex items-center gap-3">
            {/* Attachment button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              title="Attach image, PDF, or document"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Input field */}
            <input
              type="text"
              value={promptText}
              onChange={(e) => dispatch(setPromptText(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              placeholder="Write a message..."
              className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
            />

            {/* Right send button */}
            <div className="flex items-center shrink-0">
              {(promptText.trim() || attachments.length > 0) && (
                <button
                  onClick={handleSubmit}
                  disabled={isTyping}
                  className="p-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-zinc-200 disabled:opacity-50 rounded-full transition-colors cursor-pointer ml-1"
                  title="Send message"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sub-footer disclaimer */}
        <div className="w-full flex items-center justify-center text-[11px] text-zinc-400 dark:text-zinc-500 pt-2 px-1 select-none">
          <span className="text-center truncate">
            Nixa is AI and can make mistakes. Please double-check responses.
          </span>
        </div>
      </div>
    )
  }

  // Large Hero prompt box variant
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-[#1c1d21]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-3.5 shadow-xl dark:shadow-2xl focus-within:border-black/25 dark:focus-within:border-white/20 transition-all duration-200">
      {/* Hidden file picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
        className="hidden"
      />

      {/* Attachment preview chips */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 px-1 pb-3">
          {attachments.map((file) => {
            const isImage = file.type.startsWith('image/')
            return (
              <div
                key={file.id}
                className="relative flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-1.5 text-xs text-zinc-800 dark:text-zinc-200 shadow-sm"
              >
                {isImage && file.url ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                )}
                <div className="max-w-[130px] truncate">
                  <div className="font-medium truncate">{file.name}</div>
                  <div className="text-[10px] text-zinc-500">
                    {(file.size / 1024).toFixed(0)} KB
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(file.id)}
                  className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer ml-1"
                  title="Remove attachment"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Multiline textarea */}
      <div className="px-1 pt-1 pb-2">
        <ChatTextarea
          value={promptText}
          onChange={(val) => dispatch(setPromptText(val))}
          onSubmit={handleSubmit}
          placeholder="How can I help you today?"
        />
      </div>

      {/* Action Footer Bar */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/5 dark:border-white/5">
        {/* Left Actions: Attachment */}
        <div className="flex items-center gap-1.5">
          <IconButton
            icon={<Plus className="w-4 h-4" />}
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            tooltip="Attach image, PDF, or document"
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          />
        </div>

        {/* Right Actions: Send */}
        <div className="flex items-center gap-1.5">
          {(promptText.trim() || attachments.length > 0) && (
            <IconButton
              onClick={handleSubmit}
              disabled={isTyping}
              icon={<ArrowUp className="w-4 h-4" />}
              size="sm"
              variant="solid"
              tooltip="Send message"
              className="ml-1 bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}
