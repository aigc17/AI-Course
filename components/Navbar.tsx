import React from 'react';
import { Bot, LogIn, Search, ShoppingCart } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-900/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div 
          className="flex cursor-pointer items-center gap-2" 
          onClick={() => onNavigate('HOME')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AI Nexus</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <button 
            onClick={() => onNavigate('HOME')}
            className={`text-sm font-medium transition-colors hover:text-primary-500 ${currentView === 'HOME' ? 'text-primary-500' : 'text-slate-400'}`}
          >
            首页
          </button>
          <button 
            onClick={() => onNavigate('CATALOG')}
            className={`text-sm font-medium transition-colors hover:text-primary-500 ${currentView === 'CATALOG' ? 'text-primary-500' : 'text-slate-400'}`}
          >
            课程大厅
          </button>
          <button className="text-sm font-medium text-slate-400 transition-colors hover:text-primary-500">
            讲师专区
          </button>
          <button className="text-sm font-medium text-slate-400 transition-colors hover:text-primary-500">
            社区
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white sm:block">
            <Search className="h-5 w-5" />
          </button>
          <button className="hidden rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white sm:block">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-dark-900 transition-transform hover:scale-105 active:scale-95">
            <LogIn className="h-4 w-4" />
            <span>登录</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;