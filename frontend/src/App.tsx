import React from 'react'
import { Provider } from 'react-redux'
import { store, useAppSelector } from './store'
import { AppLayout } from './components/layout/AppLayout'
import { HeroGreeting } from './components/chat/HeroGreeting'
import { ChatInputBox } from './components/chat/ChatInputBox'
import { ChatWindow } from './components/chat/ChatWindow'

const MainWorkspace: React.FC = () => {
  const activeConversationId = useAppSelector((state) => state.chatUi.activeConversationId)

  if (activeConversationId) {
    return <ChatWindow />
  }

  return (
    <div className="w-full flex flex-col items-center justify-center my-auto px-4 max-w-3xl animate-in fade-in duration-200">
      <HeroGreeting userName="Eistiak" />
      <ChatInputBox />
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout>
        <MainWorkspace />
      </AppLayout>
    </Provider>
  )
}
