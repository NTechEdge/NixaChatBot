import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import uiReducer from './slices/uiSlice'
import chatUiReducer from './slices/chatUiSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chatUi: chatUiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
