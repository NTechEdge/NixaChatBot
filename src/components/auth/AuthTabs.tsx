import React from 'react'
import { cn } from '../../utils/cn'

export type AuthMode = 'login' | 'register'

export interface AuthTabsProps {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
  disabled?: boolean
}

const TABS: Array<{ id: AuthMode; label: string }> = [
  { id: 'login', label: 'Sign in' },
  { id: 'register', label: 'Sign up' },
]

/** Segmented control switching the auth form between sign in and sign up */
export const AuthTabs: React.FC<AuthTabsProps> = ({ mode, onChange, disabled }) => {
  return (
    <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 text-sm font-medium">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(tab.id)}
          className={cn(
            'py-2 rounded-lg transition-all',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            mode === tab.id
              ? 'bg-white dark:bg-[#1c1d20] text-zinc-900 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
