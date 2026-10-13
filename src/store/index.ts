import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import uiReducer from './slices/uiSlice'
import chatUiReducer from './slices/chatUiSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chatUi: chatUiReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
