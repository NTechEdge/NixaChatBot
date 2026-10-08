import React from 'react'
import { PanelLeft, Bot, Sun, Moon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { toggleSidebar, toggleTheme } from '../../../store/slices/uiSlice'

export const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)

  return (
    <header className="h-14 px-4 flex items-center justify-between shrink-0 select-none">
      {/* Mobile Sidebar Trigger */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Toggle menu"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Right Action Items */}
      <div className="flex items-center gap-2 md:gap-3 ml-auto">
        {/* Free Plan / Upgrade Link */}
        <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-normal">
          <span>Free plan</span>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <button className="text-zinc-800 dark:text-zinc-200 hover:underline font-medium underline-offset-2 transition-colors cursor-pointer">
            Upgrade
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-700" />
          )}
        </button>

        {/* Nixa Profile / Avatar Icon */}
        <button
          className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          title="Profile & Settings"
        >
          <Bot className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </div>
    </header>
  )
}
