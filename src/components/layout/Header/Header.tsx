import React from 'react'
import { PanelLeft, Bot } from 'lucide-react'
import { useAppDispatch } from '../../../store'
import { toggleSidebar } from '../../../store/slices/uiSlice'

export const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <header className="h-14 px-4 flex items-center justify-between shrink-0 select-none">
      {/* Mobile Sidebar Trigger */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-colors cursor-pointer"
          title="Toggle menu"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Right Action Items */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Free Plan / Upgrade Link */}
        <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-normal">
          <span>Free plan</span>
          <span className="text-zinc-600">•</span>
          <button className="text-zinc-200 hover:text-white font-medium underline underline-offset-2 transition-colors cursor-pointer">
            Upgrade
          </button>
        </div>

        {/* Claude Robot / Avatar Icon */}
        <button
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Profile & Settings"
        >
          <Bot className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
    </header>
  )
}
