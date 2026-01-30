# AI Nexus - AI 课程平台

> L1 | React 19 + TypeScript + Vite 6 + Tailwind CSS v4

## 目录结构

```
components/     - UI 组件层 (4文件: CourseCard, Footer, Navbar, ui/)
  ui/           - 基础 UI 原子组件 (5文件: badge, button, card, input, separator)
pages/          - 页面组件 (4文件: Home, Courses, CourseDetail, DesignSystem)
lib/            - 工具函数 (1文件: utils)
```

## 配置文件

- `vite.config.ts` - Vite 构建配置，集成 React + Tailwind
- `tsconfig.json` - TypeScript 配置
- `tailwind.config.js` - Tailwind 主题扩展
- `index.css` - 全局样式，Tailwind v4 主题变量

## 核心文件

- `App.tsx` - 应用根组件，路由配置
- `index.tsx` - 应用入口
- `constants.ts` - 课程数据常量
- `types.ts` - TypeScript 类型定义

## 技术栈

- **框架**: React 19 + react-router-dom 6.22
- **构建**: Vite 6.4 + @vitejs/plugin-react
- **样式**: Tailwind CSS v4 (@tailwindcss/vite)
- **动画**: framer-motion 12
- **图标**: lucide-react
- **UI**: Radix UI primitives + CVA

## 启动命令

```bash
npm install --legacy-peer-deps  # 安装依赖（React 19 兼容）
npm run dev                      # 开发服务器 http://localhost:3000
npm run build                    # 生产构建
```

**⚠️ 自指声明**：架构变更时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
