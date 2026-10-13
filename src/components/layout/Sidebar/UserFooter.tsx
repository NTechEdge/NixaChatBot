import React from 'react'
import { LogOut } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { logoutUser } from '../../../store/slices/authSlice'
import { Avatar } from '../../ui/Avatar'

export const UserFooter: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  if (!user) return null

  const displayName = user.name || (user.email ? user.email.split('@')[0] : '')
  const fallbackLetter = displayName ? displayName.charAt(0).toUpperCase() : ''

  return (
    <div className="p-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2 mt-auto">
      {/* User Info */}
      <div
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-left flex-1 min-w-0"
        title={`${displayName} (${user?.email || 'not signed in'})`}
      >
        <Avatar
          name={displayName}
          fallback={fallbackLetter}
          size="sm"
          className="bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/50"
        />
        <div className="min-w-0 truncate text-xs">
          <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate block">
            {displayName}
          </span>
        </div>
      </div>

      {/* Logout Action */}
      <button
        onClick={() => dispatch(logoutUser())}
        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
        title="Sign out"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  )
}
