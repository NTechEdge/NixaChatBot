import React, { type ReactNode } from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Header } from './Header/Header'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0c0d0e] text-zinc-100 font-sans">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-4 pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
