'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface AppContextType {
  largeText: boolean
  toggleLargeText: () => void
  points: number
  addPoints: (n: number) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [largeText, setLargeText] = useState(false)
  const [points, setPoints] = useState(1250)
  const [activeTab, setActiveTab] = useState('beranda')

  const toggleLargeText = useCallback(() => setLargeText((v) => !v), [])
  const addPoints = useCallback((n: number) => setPoints((p) => p + n), [])

  return (
    <AppContext.Provider
      value={{ largeText, toggleLargeText, points, addPoints, activeTab, setActiveTab }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
