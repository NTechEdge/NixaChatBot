import React, { type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface ActionPillProps {
  label: string
  active?: boolean
  icon?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const ActionPill: React.FC<ActionPillProps> = ({
  label,
  active = false,
  icon,
  rightIcon,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 select-none cursor-pointer',
        active
          ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60'
          : 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{label}</span>
      {rightIcon && <span className="inline-flex shrink-0 text-zinc-400">{rightIcon}</span>}
    </button>
  )
}
