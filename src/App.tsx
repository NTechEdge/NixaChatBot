import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store, useAppDispatch, useAppSelector } from './store'
import { initAuth } from './store/slices/authSlice'
import { fetchChatHistory } from './store/slices/chatUiSlice'
import { AppLayout } from './components/layout/AppLayout'
import { HeroGreeting } from './components/chat/HeroGreeting'
import { ChatInputBox } from './components/chat/ChatInputBox'
import { ChatWindow } from './components/chat/ChatWindow'
import { AuthPage } from './components/auth'

const MainWorkspace: React.FC = () => {
  const dispatch = useAppDispatch()
  const activeConversationId = useAppSelector((state) => state.chatUi.activeConversationId)
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(fetchChatHistory())
  }, [dispatch])

  if (activeConversationId) {
    return <ChatWindow />
  }

  return (
    <div className="w-full flex flex-col items-center justify-center my-auto px-4 max-w-3xl animate-in fade-in duration-200">
      <HeroGreeting userName={user?.name} />
      <ChatInputBox />
    </div>
  )
}

const AuthenticatedApp: React.FC = () => {
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((state) => state.auth.status)

  // Restore persisted session (if any) once on mount
  useEffect(() => {
    if (authStatus === 'idle') {
      dispatch(initAuth())
    }
  }, [authStatus, dispatch])

  // While verifying the stored token, keep the last known screen (splash-free flash guard)
  if (authStatus !== 'authenticated') {
    return <AuthPage />
  }

  return (
    <AppLayout>
      <MainWorkspace />
    </AppLayout>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthenticatedApp />
    </Provider>
  )
}
