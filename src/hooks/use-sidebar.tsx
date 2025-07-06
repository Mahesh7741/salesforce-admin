"use client"

import * as React from "react"

interface SidebarContextType {
  isCollapsed: boolean
  sidebarWidth: number
  toggleSidebar: () => void
  setSidebarWidth: (width: number) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = React.useState(240)
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    if (isCollapsed) {
      setSidebarWidth(240)
      setIsCollapsed(false)
    } else {
      setSidebarWidth(60)
      setIsCollapsed(true)
    }
  }, [isCollapsed])

  React.useEffect(() => {
    setIsCollapsed(sidebarWidth <= 80)
  }, [sidebarWidth])

  const value = React.useMemo(
    () => ({
      isCollapsed,
      sidebarWidth,
      toggleSidebar,
      setSidebarWidth,
    }),
    [isCollapsed, sidebarWidth, toggleSidebar],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
