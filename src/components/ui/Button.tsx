import React, { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'pill'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  children?: ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-150 select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 disabled:opacity-50 disabled:pointer-events-none'

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-2.5 py-1 rounded-lg gap-1.5',
    md: 'text-sm px-3.5 py-1.5 rounded-xl gap-2',
    lg: 'text-base px-4 py-2 rounded-xl gap-2.5',
  }

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-zinc-900 text-white hover:bg-black active:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:active:bg-zinc-200 shadow-sm font-semibold',
    secondary:
      'bg-black/5 text-zinc-800 hover:bg-black/10 active:bg-black/15 border border-black/5 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10 dark:active:bg-white/15 dark:border-white/5',
    ghost:
      'bg-transparent text-zinc-700 hover:bg-black/5 hover:text-black dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white',
    outline:
      'bg-transparent text-zinc-800 border border-black/15 hover:bg-black/5 dark:text-zinc-200 dark:border-white/15 dark:hover:bg-white/5',
    pill:
      'bg-black/5 text-zinc-800 hover:bg-black/10 rounded-full border border-black/10 text-xs px-3 py-1 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10 dark:border-white/10',
  }

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children && <span>{children}</span>}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  )
}
