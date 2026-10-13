import React from 'react'
import { PanelLeft, ChevronDown } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { toggleSidebar } from '../../../store/slices/uiSlice'
import { ThemeToggle } from '../../ui'

export const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const activeConversationId = useAppSelector((state) => state.chatUi.activeConversationId)
  const conversations = useAppSelector((state) => state.chatUi.conversations)

  const activeConv = conversations.find((c) => c.id === activeConversationId)

  return (
    <header className="h-14 px-4 flex items-center justify-between shrink-0 select-none">
      {/* Mobile Sidebar Trigger & Active Chat Title */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Toggle menu"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        {activeConv && (
          <button className="flex items-center gap-1.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer truncate">
            <span className="truncate max-w-[200px] md:max-w-xs">{activeConv.title}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          </button>
        )}
      </div>

      {/* Theme Toggle Button */}
      <div className="flex items-center ml-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
