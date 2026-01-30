/**
 * [INPUT]: react-router-dom - 导航链接
 * [INPUT]: lucide-react - 图标
 * [OUTPUT]: AdminSidebar - 管理后台侧边栏
 * [POS]: 管理后台导航组件，提供课程/章节管理入口
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// 导航配置
// ============================================================================

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: '仪表盘', end: true },
  { to: '/admin/courses', icon: BookOpen, label: '课程管理' },
  { to: '/admin/settings', icon: Settings, label: '设置' },
];

// ============================================================================
// SidebarLink 组件 - 提取以减少嵌套
// ============================================================================

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  end?: boolean;
}

function SidebarLink({ item }: { item: NavItem }) {
  const baseClass = 'flex items-center gap-3 px-3 py-2 text-sm transition-colors';
  const activeClass = 'bg-foreground text-background';
  const inactiveClass = 'text-muted-foreground hover:text-foreground hover:bg-muted';

  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) => cn(baseClass, isActive ? activeClass : inactiveClass)}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </NavLink>
  );
}

// ============================================================================
// AdminSidebar 组件
// ============================================================================

export function AdminSidebar() {
  return (
    <aside className="w-60 border-r border-border bg-background flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center px-4">
        <NavLink to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">返回前台</span>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <SidebarLink key={item.to} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground">AI Nexus 管理后台</p>
      </div>
    </aside>
  );
}
