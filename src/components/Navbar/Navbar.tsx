"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, ChevronRight, Palette, Monitor, User, Settings, CreditCard, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isThemeSubmenuOpen, setIsThemeSubmenuOpen] = React.useState(false);
  const [isHoveringTheme, setIsHoveringTheme] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleThemeTriggerEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHoveringTheme(true);
  };

  const handleThemeTriggerLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isThemeSubmenuOpen) setIsHoveringTheme(false);
    }, 200);
  };

  const handleThemeSubmenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsThemeSubmenuOpen(true);
  };

  const handleThemeSubmenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsThemeSubmenuOpen(false);
      setIsHoveringTheme(false);
    }, 200);
  };

  const toggleThemeSubmenu = () => {
    setIsThemeSubmenuOpen(!isThemeSubmenuOpen);
    setIsHoveringTheme(!isThemeSubmenuOpen);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const showThemeOptions = isThemeSubmenuOpen || isHoveringTheme;

  return (
    <nav className="bg-white dark:bg-gray-900 px-3 py-2.5 shadow-sm">
      <div className="w-full flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6.5"
            alt="Logo"
          />
          <span className="font-semibold text-[17px] text-gray-900 dark:text-white pl-1">
            Salesforce Manager
          </span>
        </div>

        {/* Avatar + Dropdown */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer border-2 border-blue-500 h-8 w-8">
                <AvatarImage src="/avatar.jpg" alt="User" />
                <AvatarFallback className="text-xs">UG</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56"
              onMouseLeave={handleThemeSubmenuLeave}
            >
              {/* Profile Section */}
              <div className="px-4 py-3 space-y-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Mahesh Savant
                </p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Theme Submenu */}
              <div onMouseEnter={handleThemeSubmenuEnter}>
                <DropdownMenuItem
                  onClick={toggleThemeSubmenu}
                  onMouseEnter={handleThemeTriggerEnter}
                  onMouseLeave={handleThemeTriggerLeave}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>Theme</span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      showThemeOptions && "rotate-90"
                    )}
                  />
                </DropdownMenuItem>

                {showThemeOptions && (
                  <div className="ml-2 pl-2 border-l">
                    <DropdownMenuItem
                      onClick={() => setTheme("light")}
                      className={cn(
                        "pl-6 flex items-center gap-2",
                        theme === "light" && "bg-gray-100 dark:bg-gray-800"
                      )}
                    >
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("dark")}
                      className={cn(
                        "pl-6 flex items-center gap-2",
                        theme === "dark" && "bg-gray-100 dark:bg-gray-800"
                      )}
                    >
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("system")}
                      className={cn(
                        "pl-6 flex items-center gap-2",
                        theme === "system" && "bg-gray-100 dark:bg-gray-800"
                      )}
                    >
                      <Monitor className="h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </div>
                )}
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}