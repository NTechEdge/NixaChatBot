import React, { type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface ErrorAlertProps {
  children: ReactNode
  className?: string
}

/** Inline error banner for forms and destructive-action confirmations */
export const ErrorAlert: React.FC<ErrorAlertProps> = ({ children, className }) => {
  if (!children) return null

  return (
    <div
      role="alert"
      className={cn(
        'rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60',
        'px-3.5 py-2.5 text-xs text-red-700 dark:text-red-300',
        className
      )}
    >
      {children}
    </div>
  )
}
