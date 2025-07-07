"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, ChevronRight, Palette, Monitor } from "lucide-react";
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
    <nav className="bg-white dark:bg-gray-900 border-b px-8 py-2 shadow-sm">
      <div className="w-full flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6"
            alt="Logo"
          />
          <span className="font-semibold text-sm text-gray-900 dark:text-white">
            Salesforce Manager
          </span>
        </div>

        {/* Avatar + Dropdown */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/avatar.jpg" alt="User" />
                <AvatarFallback>UG</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48"
              onMouseLeave={handleThemeSubmenuLeave}
            >
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Bonnie Green
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  name@flowbite.com
                </p>
              </div>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Earnings</DropdownMenuItem>

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
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
