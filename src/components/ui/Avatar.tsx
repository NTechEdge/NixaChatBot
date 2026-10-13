import React from 'react'
import { cn } from '../../utils/cn'

export interface AvatarProps {
  name?: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fallback?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  name = '',
  src,
  size = 'md',
  className,
  fallback,
}) => {
  const sizeStyles = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  }

  const initial = fallback || (name ? name.charAt(0).toUpperCase() : '')

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'rounded-full object-cover border border-white/10 shrink-0',
          sizeStyles[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-tr from-stone-800 to-stone-700 text-stone-200 font-semibold flex items-center justify-center shrink-0 border border-white/10 select-none',
        sizeStyles[size],
        className
      )}
    >
      {initial}
    </div>
  )
}
