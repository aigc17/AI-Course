import React from 'react';
import { Bot, Search, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-semibold" : "text-muted-foreground";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">AI Nexus</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className={`text-sm transition-colors hover:text-primary ${isActive('/')}`}>
            首页
          </Link>
          <Link to="/courses" className={`text-sm transition-colors hover:text-primary ${isActive('/courses')}`}>
            课程大厅
          </Link>
          <Link to="/design-system" className={`flex items-center gap-1 text-sm transition-colors hover:text-primary ${isActive('/design-system')}`}>
            Design System
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden w-64 md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜索课程..." 
              className="h-9 w-full bg-secondary/50 pl-9 focus-visible:ring-primary"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center p-0 text-[10px]">
              2
            </Badge>
          </Button>
          
          <Button>登录</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;