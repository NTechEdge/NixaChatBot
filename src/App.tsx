import { Provider } from 'react-redux'
import { store } from './store'
import { AppLayout } from './components/layout/AppLayout'
import { HeroGreeting } from './components/chat/HeroGreeting'
import { ChatInputBox } from './components/chat/ChatInputBox'

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout>
        <div className="w-full flex flex-col items-center justify-center my-auto px-4 max-w-3xl">
          <HeroGreeting userName="Eistiak" />
          <ChatInputBox />
        </div>
      </AppLayout>
    </Provider>
  )
}
