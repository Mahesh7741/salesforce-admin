"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Zap,
  GripVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: Building2,
  },
  {
    name: "Contacts",
    href: "/dashboard/contacts",
    icon: Users,
  },
  {
    name: "Opportunities",
    href: "/dashboard/opportunities",
    icon: Zap,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

const MIN_WIDTH = 60
const MAX_WIDTH = 400
const DEFAULT_WIDTH = 240

export function ResizableSidebar() {
  const pathname = usePathname()
  const [sidebarWidth, setSidebarWidth] = React.useState(DEFAULT_WIDTH)
  const [isResizing, setIsResizing] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const sidebarRef = React.useRef<HTMLDivElement>(null)

  const isCompact = sidebarWidth <= 80

  React.useEffect(() => {
    setIsCollapsed(isCompact)
  }, [isCompact])

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = e.clientX
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth)
      }
    },
    [isResizing],
  )

  const handleMouseUp = React.useCallback(() => {
    setIsResizing(false)
  }, [])

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  const toggleSidebar = () => {
    if (isCollapsed) {
      setSidebarWidth(DEFAULT_WIDTH)
    } else {
      setSidebarWidth(MIN_WIDTH)
    }
  }

  const NavigationItem = ({ item }: { item: (typeof navigation)[0] }) => {
    const isActive = pathname === item.href
    const Icon = item.icon

    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="icon"
                className={cn("w-10 h-10 mx-auto", isActive && "bg-secondary font-medium")}
              >
                <Icon className="w-4 h-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    return (
      <Link href={item.href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn("w-full justify-start gap-3 h-10", isActive && "bg-secondary font-medium")}
        >
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{item.name}</span>
        </Button>
      </Link>
    )
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div
        ref={sidebarRef}
        className="relative bg-card border-r border-border flex flex-col shadow-sm transition-all duration-200 ease-in-out"
        style={{ width: sidebarWidth }}
      >
        {/* Header */}
        <div
          className={cn("border-b border-border bg-card/50 transition-all duration-200", isCollapsed ? "p-3" : "p-6")}
        >
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm mx-auto">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <div>
                  <p className="font-semibold">SF Manager</p>
                  <p className="text-xs">Salesforce Dashboard</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-lg truncate">SF Manager</h2>
                <p className="text-xs text-muted-foreground truncate">Salesforce Dashboard</p>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <div className={cn("flex", isCollapsed ? "justify-center p-2" : "justify-end p-3")}>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-6 w-6 hover:bg-accent">
            {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-2">
          <nav className={cn("space-y-1", isCollapsed && "flex flex-col items-center")}>
            {navigation.map((item) => (
              <NavigationItem key={item.name} item={item} />
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 mx-auto text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <p>Sign Out</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span className="truncate">Sign Out</span>
            </Button>
          )}
        </div>

        {/* Resize Handle */}
        <div
          className={cn(
            "absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-primary/20 transition-colors group",
            isResizing && "bg-primary/30",
          )}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Resize Indicator */}
        {isResizing && <div className="absolute top-0 right-0 w-0.5 h-full bg-primary shadow-lg" />}
      </div>
    </TooltipProvider>
  )
}
