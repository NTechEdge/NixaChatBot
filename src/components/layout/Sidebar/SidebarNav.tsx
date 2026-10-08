import React from 'react'
import { Plus, FolderKanban, Sparkles, Code2, SlidersHorizontal } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setActiveNavTab } from '../../../store/slices/uiSlice'
import { Badge } from '../../ui/Badge'
import { cn } from '../../../utils/cn'

export const SidebarNav: React.FC = () => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.ui.activeNavTab)

  const navItems = [
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'artifacts', label: 'Artifacts', icon: Sparkles },
    { id: 'code', label: 'Code', icon: Code2, badge: 'Upgrade' },
    { id: 'customize', label: 'Customize', icon: SlidersHorizontal },
  ]

  return (
    <div className="flex flex-col gap-1 px-3 pt-3">
      {/* Brand & "+ New" Button */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="font-serif text-lg font-bold tracking-tight text-zinc-100 flex items-center gap-1.5">
          <span className="text-amber-500 text-xl select-none">✷</span> Claude
        </span>
      </div>

      <button
        onClick={() => dispatch(setActiveNavTab('new'))}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-left cursor-pointer',
          activeTab === 'new'
            ? 'bg-zinc-800 text-zinc-100 shadow-sm'
            : 'bg-white/5 text-zinc-200 hover:bg-white/10'
        )}
      >
        <Plus className="w-4 h-4 text-zinc-300 shrink-0" />
        <span>New</span>
      </button>

      {/* Nav List */}
      <div className="flex flex-col gap-0.5 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => dispatch(setActiveNavTab(item.id))}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-xl text-sm font-normal transition-colors text-left cursor-pointer group',
                isActive
                  ? 'bg-white/10 text-zinc-100 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              )}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <Badge tone="accent" size="sm" className="text-[10px] py-0 px-1.5">
                  {item.badge}
                </Badge>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
