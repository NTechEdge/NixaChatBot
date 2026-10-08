import React, { useRef, type TextareaHTMLAttributes } from 'react'
import { useAutoResize } from '../../hooks/useAutoResize'
import { cn } from '../../utils/cn'

export interface ChatTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string
  onChange: (val: string) => void
  onSubmit?: () => void
  minHeight?: number
  maxHeight?: number
}

export const ChatTextarea: React.FC<ChatTextareaProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'How can I help you today?',
  minHeight = 52,
  maxHeight = 220,
  className,
  onKeyDown,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  useAutoResize(textareaRef, value, minHeight, maxHeight)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (onSubmit && value.trim()) {
        onSubmit()
      }
    }
    onKeyDown?.(e)
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      rows={1}
      className={cn(
        'w-full resize-none bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none text-sm md:text-base leading-relaxed selection:bg-amber-500/20 selection:text-amber-200 border-0 p-0',
        className
      )}
      {...props}
    />
  )
}
