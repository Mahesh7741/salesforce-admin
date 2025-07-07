"use client";
import React, { useState, useEffect } from 'react';
import { Home, Settings, Users, FileText, BarChart3, Mail, Calendar, Folder, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

const SidebarItem = ({ icon: Icon, label, isActive = false, onClick, isCollapsed = false, isDark = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-2 py-1.5 text-sm rounded-md transition-colors duration-200 ${
      isActive 
        ? isDark 
          ? 'bg-blue-600 text-white' 
          : 'bg-blue-100 text-blue-700'
        : isDark
          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
    title={isCollapsed ? label : ''}
  >
    <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
    {!isCollapsed && <span className="text-xs">{label}</span>}
  </button>
);

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';
  const themeClasses = isDark 
    ? 'bg-gray-900 border-gray-700 text-white' 
    : 'bg-white border-gray-200 text-gray-800';

  return (
    <div className={`${isCollapsed ? 'w-14' : 'w-48'} ${themeClasses} h-full overflow-y-auto transition-all duration-300 ease-in-out flex flex-col min-h-0 `}>
      {/* Header */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Navigation
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className={`px-2 py-1.5 rounded-md transition-colors duration-200 ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Navigation - Non-collapsible content */}
      <div className="flex-1 p-3 pt-1">
        <div className="space-y-3">
          {/* Dashboard */}
          <SidebarItem
            icon={Home}
            label="Dashboard"
            isActive={activeItem === 'dashboard'}
            onClick={() => handleItemClick('dashboard')}
            isCollapsed={isCollapsed}
            isDark={isDark}
          />

          {/* Analytics */}
          <SidebarItem
            icon={BarChart3}
            label="Analytics"
            isActive={activeItem === 'analytics'}
            onClick={() => handleItemClick('analytics')}
            isCollapsed={isCollapsed}
            isDark={isDark}
          />

          {/* User Management */}
          <SidebarItem
            icon={Users}
            label="Users"
            isActive={activeItem === 'users'}
            onClick={() => handleItemClick('users')}
            isCollapsed={isCollapsed}
            isDark={isDark}
          />

          {/* Content */}
          <SidebarItem
            icon={FileText}
            label="Content"
            isActive={activeItem === 'content'}
            onClick={() => handleItemClick('content')}
            isCollapsed={isCollapsed}
            isDark={isDark}
          />

          {/* Documents */}
          <SidebarItem
            icon={Folder}
            label="Documents"
            isActive={activeItem === 'documents'}
            onClick={() => handleItemClick('documents')}
            isCollapsed={isCollapsed}
            isDark={isDark}
          />

          {/* Messages */}
          <SidebarItem
            icon={Mail}
            label="Messages"
            isActive={activeItem === 'messages'}
            onClick={() => handleItemClick('messages')}
            isCollapsed={isCollapsed}
            isDark={isDark}
          />

          {/* Calendar */}
          <SidebarItem
            icon={Calendar}
            label="Calendar"
            isActive={activeItem === 'calendar'}
            onClick={() => handleItemClick('calendar')}
            isCollapsed={isCollapsed}
            isDark={isDark}
          />
        </div>
      </div>

      {/* Bottom Section - Settings */}
      <div className="p-3">
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={activeItem === 'settings'}
          onClick={() => handleItemClick('settings')}
          isCollapsed={isCollapsed}
          isDark={isDark}
        />
      </div>
    </div>
  );
}