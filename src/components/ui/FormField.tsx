import React, { type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Accessible label rendered above the input */
  label: string
  /** Optional element rendered inside the input's right edge (e.g. a visibility toggle) */
  trailing?: ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  trailing,
  className,
  id,
  ...props
}) => {
  const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            'w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1c1d20]',
            'border border-black/10 dark:border-white/10',
            'text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
            'focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-shadow',
            trailing ? 'pr-10' : '',
            className
          )}
          {...props}
        />
        {trailing && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">{trailing}</div>
        )}
      </div>
    </div>
  )
}
