# AI Nexus - AI 课程平台

> L1 | React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + shadcn/ui

## 目录结构

```
components/     - UI 组件层 (4文件: Navbar, Footer, CourseCard, ui/)
  ui/           - shadcn/ui 原子组件 (badge, button, card, dialog, input, label, navigation-menu, separator, sheet, skeleton)
pages/          - 页面组件 (4文件: Home, Courses, CourseDetail, DesignSystem)
lib/            - 工具函数 (1文件: utils)
```

## 设计系统约束

**一切设计必须来自设计系统的颜色和组件**：

1. **颜色**：仅使用 CSS 变量
   - `primary`, `primary-foreground`
   - `secondary`, `secondary-foreground`
   - `muted`, `muted-foreground`
   - `accent`, `accent-foreground`
   - `destructive`, `destructive-foreground`
   - `background`, `foreground`
   - `card`, `card-foreground`
   - `border`, `input`, `ring`

2. **组件**：优先使用 `@/components/ui/*` 中的 shadcn 组件

3. **禁止**：硬编码颜色值（如 `#fff`, `rgb()`, 具体 hsl/oklch 值）

## 配置文件

- `vite.config.ts` - Vite 构建配置，集成 React + Tailwind
- `components.json` - shadcn/ui 配置
- `tsconfig.json` - TypeScript 配置
- `index.css` - 全局样式，amethyst-haze 主题

## 核心文件

- `App.tsx` - 应用根组件，路由配置，dark 模式
- `index.tsx` - 应用入口
- `constants.ts` - 课程数据常量
- `types.ts` - TypeScript 类型定义

## 技术栈

- **框架**: React 19 + react-router-dom 6.22
- **构建**: Vite 6.4 + @vitejs/plugin-react + @tailwindcss/vite
- **样式**: Tailwind CSS v4 + shadcn/ui (amethyst-haze 主题)
- **动画**: framer-motion 12
- **图标**: lucide-react

## 启动命令

```bash
npm install --legacy-peer-deps  # 安装依赖（React 19 兼容）
npm run dev                      # 开发服务器 http://localhost:3000
npm run build                    # 生产构建
```

**⚠️ 自指声明**：架构变更时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
