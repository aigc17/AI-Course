/**
 * [INPUT]: AdminSidebar - 侧边栏导航
 * [INPUT]: react-router-dom - Outlet 子路由渲染
 * [OUTPUT]: AdminLayout - 管理后台布局容器
 * [POS]: 管理后台页面的统一布局，包含侧边栏和内容区
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

// ============================================================================
// AdminLayout 组件
// ============================================================================

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
