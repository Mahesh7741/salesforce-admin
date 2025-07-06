"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarAnimationWrapperProps {
  children: React.ReactNode
  isCollapsed: boolean
  className?: string
}

export function SidebarAnimationWrapper({ children, isCollapsed, className }: SidebarAnimationWrapperProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "opacity-0 scale-95" : "opacity-100 scale-100",
        className,
      )}
    >
      {children}
    </div>
  )
}

interface CollapsibleTextProps {
  children: React.ReactNode
  isCollapsed: boolean
  className?: string
}

export function CollapsibleText({ children, isCollapsed, className }: CollapsibleTextProps) {
  return (
    <span
      className={cn(
        "transition-all duration-200 ease-in-out overflow-hidden",
        isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
        className,
      )}
    >
      {children}
    </span>
  )
}
