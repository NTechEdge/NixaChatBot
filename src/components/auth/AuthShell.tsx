import React, { type ReactNode } from 'react'
import { ThemeToggle } from '../ui'

export interface AuthShellProps {
  /** One-line subtitle under the brand (changes with sign in / sign up mode) */
  subtitle: string
  children: ReactNode
}

/**
 * Full-screen centered layout for the auth flow: page background,
 * brand mark, theme toggle and a card-sized content slot
 */
export const AuthShell: React.FC<AuthShellProps> = ({ subtitle, children }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#faf9f5] dark:bg-[#0c0d0e] text-zinc-900 dark:text-zinc-100 font-sans px-4 relative overflow-hidden">
      {/* Theme Toggle */}
      <ThemeToggle className="absolute right-4 top-4" />

      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8 select-none">
          <span className="font-serif text-3xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-amber-500 text-2xl">✷</span> Nixa
          </span>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  )
}
