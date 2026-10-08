import React from 'react'
import { ChevronDown, LayoutGrid, Search } from 'lucide-react'
import { Avatar } from '../../ui/Avatar'

export const UserFooter: React.FC = () => {
  return (
    <div className="p-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2 mt-auto">
      {/* User Info Button */}
      <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left flex-1 min-w-0 cursor-pointer group">
        <Avatar
          name="Eistiak"
          fallback="E"
          size="sm"
          className="bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/50"
        />
        <div className="flex items-center gap-1 min-w-0 truncate text-xs">
          <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white truncate">
            Eistiak
          </span>
          <span className="text-zinc-400 dark:text-zinc-500">•</span>
          <span className="text-zinc-500 dark:text-zinc-400">Free</span>
          <ChevronDown className="w-3 h-3 text-zinc-400 dark:text-zinc-500 ml-0.5 shrink-0" />
        </div>
      </button>

      {/* Quick Action Icons */}
      <div className="flex items-center gap-0.5 text-zinc-500 dark:text-zinc-400">
        <button
          className="p-1.5 rounded-lg hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Shortcuts"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
        </button>
        <button
          className="p-1.5 rounded-lg hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Search chats"
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
