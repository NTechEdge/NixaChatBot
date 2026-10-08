import React from 'react'
import { Plus } from 'lucide-react'
import { useAppDispatch } from '../../../store'
import { setActiveNavTab } from '../../../store/slices/uiSlice'

export const SidebarNav: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col gap-1 px-3 pt-3">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="font-serif text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 select-none">
          <span className="text-amber-500 text-xl select-none">✷</span> Nixa
        </span>
      </div>

      {/* "+ New" Action Button */}
      <button
        onClick={() => dispatch(setActiveNavTab('new'))}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-left cursor-pointer bg-black/5 hover:bg-black/10 active:bg-black/15 text-zinc-800 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10 dark:active:bg-white/15 border border-black/5 dark:border-white/5"
      >
        <Plus className="w-4 h-4 text-zinc-600 dark:text-zinc-300 shrink-0" />
        <span>New</span>
      </button>
    </div>
  )
}
