import { Provider } from 'react-redux'
import { store } from './store'

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-[#0c0d0e] text-zinc-100 flex flex-col items-center justify-center p-6 selection:bg-amber-500/20 selection:text-amber-200">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Folder Structure Initialized
          </div>
          <h1 className="text-2xl font-serif text-zinc-100">Claude Interface Workspace</h1>
          <p className="text-sm text-zinc-400 max-w-md">
            Clean architectural structure, Redux store, and black/80 theme foundations are ready.
          </p>
        </div>
      </div>
    </Provider>
  )
}
