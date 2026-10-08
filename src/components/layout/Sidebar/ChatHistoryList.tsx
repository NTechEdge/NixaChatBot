import React from 'react'
import { ArrowUpDown } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setSelectedChatId } from '../../../store/slices/chatUiSlice'
import { cn } from '../../../utils/cn'

interface HistoryItem {
  id: string
  title: string
}

const mockHistory: HistoryItem[] = [
  { id: '1', title: 'Amn astesi kno' },
  { id: '2', title: 'Creating commands in Nixa VSC...' },
  { id: '3', title: 'Max plan 1 year affordability' },
  { id: '4', title: 'Modal' },
  { id: '5', title: 'Nixa native binary installation er...' },
  { id: '6', title: 'Greeting' },
  { id: '7', title: 'Implementing industry standards' },
  { id: '8', title: 'Nixa API documentation references' },
  { id: '9', title: 'Full stack developer intern job post' },
  { id: '10', title: 'Ekta SDK banano jonno ki korte hoi' },
  { id: '11', title: 'Website security steps for full-stack...' },
  { id: '12', title: 'Typescript coding challenges' },
  { id: '13', title: 'Google data search issues' },
  { id: '14', title: 'Best animated scroll package for w...' },
  { id: '15', title: "Humanizing NTechEdge's digital so..." },
  { id: '16', title: 'Icons not working properly' },
]

export const ChatHistoryList: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedChatId = useAppSelector((state) => state.chatUi.selectedChatId)

  return (
    <div className="flex-1 flex flex-col min-h-0 px-3 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pb-2 text-xs font-medium text-zinc-400 select-none">
        <span>Chats and tasks</span>
        <button
          className="text-zinc-500 hover:text-zinc-300 p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
          title="Filter and sort"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* History Items Scrollable List */}
      <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
        {mockHistory.map((item) => {
          const isSelected = selectedChatId === item.id

          return (
            <button
              key={item.id}
              onClick={() => dispatch(setSelectedChatId(item.id))}
              className={cn(
                'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer group',
                isSelected
                  ? 'bg-white/10 text-zinc-100 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              )}
            >
              {/* Bullet Dot */}
              <span className="w-1.5 h-1.5 rounded-full border border-zinc-600 group-hover:border-zinc-400 shrink-0" />
              <span className="truncate">{item.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
