import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isSidebarOpen: boolean
  activeNavTab: string
}

const initialState: UIState = {
  isSidebarOpen: true,
  activeNavTab: 'new',
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
  },
})

export const { toggleSidebar, setSidebarOpen, setActiveNavTab } = uiSlice.actions
export default uiSlice.reducer
