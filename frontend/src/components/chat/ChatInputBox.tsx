import React, { useState, useRef, useEffect } from 'react'
import { Plus, ChevronDown, Mic, Volume2, ArrowUp, Check } from 'lucide-react'
import { useAppDispatch, useAppSelector, store } from '../../store'
import {
  setPromptText,
  setActiveMode,
  setSelectedModel,
  sendMessage,
  addAssistantReply,
} from '../../store/slices/chatUiSlice'
import { ChatTextarea } from '../ui/ChatTextarea'
import { ActionPill } from '../ui/ActionPill'
import { IconButton } from '../ui/IconButton'
import { cn } from '../../utils/cn'

const AVAILABLE_MODELS = [
  { id: 'sonnet-5-5-medium', label: 'Sonnet 5.5 Medium', tier: 'Fast & Smart' },
  { id: 'sonnet-3-5', label: 'Sonnet 3.5', tier: 'Most Capable' },
  { id: 'haiku-3-5', label: 'Haiku 3.5', tier: 'Lightning Fast' },
]

interface ChatInputBoxProps {
  variant?: 'hero' | 'bar'
}

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({ variant = 'hero' }) => {
  const dispatch = useAppDispatch()
  const promptText = useAppSelector((state) => state.chatUi.promptText)
  const activeMode = useAppSelector((state) => state.chatUi.activeMode)
  const selectedModel = useAppSelector((state) => state.chatUi.selectedModel)

  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsModelDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = () => {
    const text = promptText.trim()
    if (!text) return

    dispatch(sendMessage(text))

    // Simulate smart AI response
    setTimeout(() => {
      const currentState = store.getState()
      const convId = currentState.chatUi.activeConversationId
      if (convId) {
        const reply = `Hi there! How can I help you today?`
        dispatch(addAssistantReply({ convId, content: reply }))
      }
    }, 600)
  }

  // Active chat bottom bar variant (matches screenshot)
  if (variant === 'bar') {
    return (
      <div className="w-full max-w-3xl flex flex-col items-center">
        <div className="w-full bg-white dark:bg-[#1c1d20] border border-black/10 dark:border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-lg dark:shadow-2xl focus-within:border-black/25 dark:focus-within:border-white/20 transition-all">
          {/* Attachment button */}
          <button
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Attach file"
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

          {/* Right audio actions & send */}
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 shrink-0">
            <button
              className="p-1 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Voice input"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              className="p-1 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            {promptText.trim() && (
              <button
                onClick={handleSubmit}
                className="p-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-zinc-200 rounded-full transition-colors cursor-pointer ml-1"
                title="Send message"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sub-footer disclaimer and model pill */}
        <div className="w-full flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 pt-2 px-1 select-none">
          <span className="flex-1 text-center truncate">
            Nixa is AI and can make mistakes. Please double-check responses.
          </span>
          <span className="font-medium text-zinc-500 dark:text-zinc-400 shrink-0 pl-2">
            {selectedModel}
          </span>
        </div>
      </div>
    )
  }

  // Large Hero prompt box variant
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-[#1c1d21]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-3.5 shadow-xl dark:shadow-2xl focus-within:border-black/25 dark:focus-within:border-white/20 transition-all duration-200">
      {/* Input Area */}
      <div className="px-1 pt-1 pb-3">
        <ChatTextarea
          value={promptText}
          onChange={(val) => dispatch(setPromptText(val))}
          onSubmit={handleSubmit}
          placeholder="How can I help you today?"
        />
      </div>

      {/* Action Footer Bar */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/5 dark:border-white/5">
        {/* Left Actions: Attachment & Mode Toggles */}
        <div className="flex items-center gap-1.5">
          <IconButton
            icon={<Plus className="w-4 h-4" />}
            size="sm"
            tooltip="Add attachment or context"
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          />

          <div className="flex items-center bg-black/5 dark:bg-black/40 rounded-full p-0.5 border border-black/5 dark:border-white/5">
            <ActionPill
              label="Chat"
              active={activeMode === 'chat'}
              onClick={() => dispatch(setActiveMode('chat'))}
            />
            <ActionPill
              label="Cowork"
              active={activeMode === 'cowork'}
              onClick={() => dispatch(setActiveMode('cowork'))}
            />
          </div>
        </div>

        {/* Right Actions: Model Pill & Voice/Send */}
        <div className="flex items-center gap-1.5 relative">
          {/* Model Selector Pill */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-zinc-700 hover:text-zinc-950 hover:bg-black/5 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-colors cursor-pointer"
            >
              <span>{selectedModel}</span>
              <ChevronDown className="w-3 h-3 text-zinc-500 dark:text-zinc-400 shrink-0" />
            </button>

            {/* Model Dropdown Menu */}
            {isModelDropdownOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-56 bg-[#fbfbfa] dark:bg-[#16171a] border border-black/10 dark:border-white/10 rounded-xl shadow-2xl p-1 z-50">
                <div className="px-2.5 py-1.5 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Select Model
                </div>
                {AVAILABLE_MODELS.map((model) => {
                  const isSelected = selectedModel.includes(model.label)
                  return (
                    <button
                      key={model.id}
                      onClick={() => {
                        dispatch(setSelectedModel(model.label))
                        setIsModelDropdownOpen(false)
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors text-left cursor-pointer',
                        isSelected
                          ? 'bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white font-medium'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'
                      )}
                    >
                      <div>
                        <div>{model.label}</div>
                        <div className="text-[10px] text-zinc-500">{model.tier}</div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Microphone */}
          <IconButton
            icon={<Mic className="w-4 h-4" />}
            size="sm"
            tooltip="Voice input"
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          />

          {/* Audio Speaker */}
          <IconButton
            icon={<Volume2 className="w-4 h-4" />}
            size="sm"
            tooltip="Read aloud"
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          />

          {/* Send Button */}
          {promptText.trim() && (
            <IconButton
              onClick={handleSubmit}
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
