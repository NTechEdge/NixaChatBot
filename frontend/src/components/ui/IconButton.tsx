import React, { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type IconButtonVariant = 'ghost' | 'solid' | 'subtle'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  variant?: IconButtonVariant
  size?: IconButtonSize
  active?: boolean
  tooltip?: string
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  active = false,
  tooltip,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg transition-all duration-150 select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 disabled:opacity-40 disabled:pointer-events-none'

  const sizeStyles: Record<IconButtonSize, string> = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-9 h-9 text-base',
  }

  const variantStyles: Record<IconButtonVariant, string> = {
    ghost: active
      ? 'bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white'
      : 'bg-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10',
    subtle: active
      ? 'bg-black/10 dark:bg-white/15 text-zinc-900 dark:text-white border border-black/10 dark:border-white/10'
      : 'bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 hover:text-zinc-900 dark:hover:text-white',
    solid:
      'bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900 hover:bg-black dark:hover:bg-white shadow-sm font-medium',
  }

  return (
    <button
      title={tooltip}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  )
}
