import React, { type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type BadgeTone = 'default' | 'accent' | 'outline' | 'ghost'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  size?: 'sm' | 'md'
  className?: string
  icon?: ReactNode
  onClick?: () => void
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  tone = 'default',
  size = 'sm',
  className,
  icon,
  onClick,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
  }

  const toneStyles: Record<BadgeTone, string> = {
    default:
      'bg-black/5 text-zinc-700 border border-black/10 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10',
    accent:
      'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-500/30',
    outline:
      'bg-transparent text-zinc-600 border border-black/15 dark:text-zinc-400 dark:border-zinc-700/60',
    ghost:
      'bg-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200',
  }

  const Component = onClick ? 'button' : 'span'

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 select-none',
        sizeStyles[size],
        toneStyles[tone],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </Component>
  )
}
