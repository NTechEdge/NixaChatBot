import React, { type ReactNode } from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Header } from './Header/Header'
import { useThemeSync } from '../../hooks/useThemeSync'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // Synchronizes Redux theme state to document root class
  useThemeSync()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#faf9f5] dark:bg-[#0c0d0e] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center overflow-hidden px-4 pb-2">
          {children}
        </main>
      </div>
    </div>
  )
}
