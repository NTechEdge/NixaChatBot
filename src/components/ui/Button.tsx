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
    'inline-flex items-center justify-center font-medium transition-colors duration-150 select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:opacity-50 disabled:pointer-events-none'

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-2.5 py-1 rounded-lg gap-1.5',
    md: 'text-sm px-3.5 py-1.5 rounded-xl gap-2',
    lg: 'text-base px-4 py-2 rounded-xl gap-2.5',
  }

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-zinc-100 text-zinc-900 hover:bg-white active:bg-zinc-200 shadow-sm font-semibold',
    secondary:
      'bg-white/5 text-zinc-200 hover:bg-white/10 active:bg-white/15 border border-white/5',
    ghost:
      'bg-transparent text-zinc-300 hover:bg-white/5 active:bg-white/10 hover:text-white',
    outline:
      'bg-transparent text-zinc-200 border border-white/15 hover:bg-white/5 active:bg-white/10',
    pill:
      'bg-white/5 text-zinc-300 hover:bg-white/10 rounded-full border border-white/10 text-xs px-3 py-1',
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
