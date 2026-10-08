import { useEffect } from 'react'
import { useAppSelector } from '../store'

export function useThemeSync() {
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
  }, [theme])

  return theme
}
