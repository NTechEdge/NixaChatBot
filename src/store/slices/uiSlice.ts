import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'dark' | 'light'

interface UIState {
  isSidebarOpen: boolean
  activeNavTab: string
  theme: ThemeMode
}

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem('nixa_theme')
  if (saved === 'light' || saved === 'dark') return saved
  return 'dark' // Default is dark theme
}

const initialState: UIState = {
  isSidebarOpen: true,
  activeNavTab: 'new',
  theme: getInitialTheme(),
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload
    },
    setActiveNavTab: (state, action: PayloadAction<string>) => {
      state.activeNavTab = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('nixa_theme', state.theme)
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload
      localStorage.setItem('nixa_theme', state.theme)
    },
  },
})

export const { toggleSidebar, setSidebarOpen, setActiveNavTab, toggleTheme, setTheme } =
  uiSlice.actions
export default uiSlice.reducer
