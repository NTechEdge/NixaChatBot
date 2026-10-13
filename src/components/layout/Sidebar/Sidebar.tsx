import React from 'react'
import { PanelLeftClose, PanelLeft } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { toggleSidebar } from '../../../store/slices/uiSlice'
import { SidebarNav } from './SidebarNav'
import { ChatHistoryList } from './ChatHistoryList'
import { UserFooter } from './UserFooter'
import { cn } from '../../../utils/cn'

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen)

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-[#f3f2ee] dark:bg-[#141517] border-r border-black/5 dark:border-white/5 transition-transform duration-200 ease-in-out shrink-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-ml-[260px]'
        )}
      >
        {/* Toggle Collapse Button Top Right of Sidebar */}
        <div className="absolute right-3 top-3.5 z-10 hidden md:block">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-1 rounded-lg text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        <SidebarNav />
        <ChatHistoryList />
        <UserFooter />
      </aside>

      {/* Floating Expand Button when Sidebar is collapsed */}
      {!isSidebarOpen && (
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="fixed left-3 top-3.5 z-30 p-2 rounded-xl bg-[#f3f2ee]/95 dark:bg-[#141517]/90 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 shadow-md transition-colors cursor-pointer hidden md:flex items-center justify-center"
          title="Open sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      )}
    </>
  )
}
