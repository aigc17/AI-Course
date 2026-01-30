/**
 * [INPUT]: @/components/ui/* - 设计系统组件
 * [OUTPUT]: Footer - 全局页脚组件
 * [POS]: 应用底部页脚，ChatGPT 风格极简设计
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Bot, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

// ============================================================================
// Footer Components
// ============================================================================

const FooterBrand = () => (
  <div className="flex items-center gap-2">
    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
      <Bot className="h-4 w-4 text-primary-foreground" />
    </div>
    <span className="font-semibold">AI Nexus</span>
  </div>
);

const FooterLinks = () => (
  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
    <Link to="/courses" className="hover:text-foreground">课程</Link>
    <Link to="/design-system" className="hover:text-foreground">Design System</Link>
    <a href="#" className="hover:text-foreground">关于</a>
    <a href="#" className="hover:text-foreground">隐私政策</a>
  </div>
);

const FooterSocial = () => (
  <div className="flex items-center gap-1">
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <Github className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <Twitter className="h-4 w-4" />
    </Button>
  </div>
);

// ============================================================================
// Footer
// ============================================================================

const Footer = () => (
  <footer className="border-t border-border/40">
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <FooterBrand />
        <FooterLinks />
        <FooterSocial />
      </div>
      <Separator className="my-4" />
      <p className="text-center text-xs text-muted-foreground">
        © 2026 AI Nexus. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
