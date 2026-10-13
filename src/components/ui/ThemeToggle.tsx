import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleTheme } from '../../store/slices/uiSlice'
import { IconButton } from './IconButton'
import { cn } from '../../utils/cn'

export interface ThemeToggleProps {
  className?: string
}

/** Light/dark mode switch wired to the global ui slice */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)

  return (
    <IconButton
      variant="subtle"
      icon={
        theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        )
      }
      tooltip={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => dispatch(toggleTheme())}
      className={cn('rounded-full', className)}
    />
  )
}
