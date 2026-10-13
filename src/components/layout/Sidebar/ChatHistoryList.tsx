import React from 'react'
import { ArrowUpDown } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { selectConversation } from '../../../store/slices/chatUiSlice'
import { cn } from '../../../utils/cn'

export const ChatHistoryList: React.FC = () => {
  const dispatch = useAppDispatch()
  const conversations = useAppSelector((state) => state.chatUi.conversations)
  const activeConversationId = useAppSelector((state) => state.chatUi.activeConversationId)

  return (
    <div className="flex-1 flex flex-col min-h-0 px-3 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 select-none">
        <span>Chats and tasks</span>
        <button
          className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Filter and sort"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* History Items Scrollable List */}
      <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
        {conversations.length === 0 ? (
          <div className="px-2.5 py-6 text-center text-xs text-zinc-400 dark:text-zinc-500 select-none">
            No recent chats
          </div>
        ) : (
          conversations.map((item) => {
            const isSelected = activeConversationId === item.id

            return (
              <button
                key={item.id}
                onClick={() => dispatch(selectConversation(item.id))}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer group',
                  isSelected
                    ? 'bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-zinc-100 font-medium'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5'
                )}
              >
                {/* Bullet Dot */}
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full shrink-0 transition-colors',
                    isSelected
                      ? 'bg-amber-500 border border-amber-600'
                      : 'border border-zinc-400 dark:border-zinc-600 group-hover:border-zinc-600 dark:group-hover:border-zinc-400'
                  )}
                />
                <span className="truncate">{item.title}</span>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
