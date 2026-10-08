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
        <span className="font-serif text-lg font-bold tracking-tight text-zinc-100 flex items-center gap-1.5">
          <span className="text-amber-500 text-xl select-none">✷</span> Nixa
        </span>
      </div>

      {/* "+ New" Action Button */}
      <button
        onClick={() => dispatch(setActiveNavTab('new'))}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-left cursor-pointer bg-white/5 text-zinc-200 hover:bg-white/10 active:bg-white/15 border border-white/5"
      >
        <Plus className="w-4 h-4 text-zinc-300 shrink-0" />
        <span>New</span>
      </button>
    </div>
  )
}
