/**
 * [INPUT]: react-router-dom - 路由导航
 * [INPUT]: @/components/ui/button - 设计系统按钮组件
 * [OUTPUT]: Navbar - 全局导航栏组件
 * [POS]: 应用顶部导航，ChatGPT 风格极简设计
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Link, useLocation } from 'react-router-dom';
import { Bot, Sparkles } from 'lucide-react';
import { Button } from './ui/form';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-foreground">
            <Bot className="h-5 w-5 text-background" />
          </div>
          <span className="text-lg font-semibold">AI Nexus</span>
        </Link>

        {/* Center Nav */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/">
            <Button
              variant={isActive('/') ? 'secondary' : 'ghost'}
              size="sm"
              className="text-sm"
            >
              首页
            </Button>
          </Link>
          <Link to="/courses">
            <Button
              variant={isActive('/courses') ? 'secondary' : 'ghost'}
              size="sm"
              className="text-sm"
            >
              课程
            </Button>
          </Link>
          <Link to="/design-system">
            <Button
              variant={isActive('/design-system') ? 'secondary' : 'ghost'}
              size="sm"
              className="text-sm"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Design System
            </Button>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">登录</Button>
          <Button size="sm">开始学习</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
