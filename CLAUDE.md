# AI Nexus - AI 课程平台

> L1 | React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + shadcn/ui

## 目录结构

```
src/
├── components/   - UI 组件层
│   ├── ui/       - shadcn/ui 原子组件
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── CourseCard.tsx
├── pages/        - 页面组件
│   ├── Home.tsx
│   ├── Courses.tsx
│   ├── CourseDetail.tsx
│   └── DesignSystem.tsx
├── lib/          - 工具函数
├── App.tsx       - 应用根组件
├── index.tsx     - 应用入口
├── index.css     - 全局样式
├── constants.ts  - 数据常量
└── types.ts      - 类型定义
```

## 设计系统约束

**一切设计必须来自设计系统的颜色和组件**：

| 允许 | 禁止 |
|------|------|
| `bg-primary` | `bg-[#7c3aed]` |
| `text-muted-foreground` | `text-gray-500` |
| `<Button>` | `<button className="...">` |

## 配置文件

- `vite.config.ts` - Vite 构建配置
- `components.json` - shadcn/ui 配置
- `tsconfig.json` - TypeScript 配置

## 技术栈

- **框架**: React 19 + react-router-dom 6.22
- **构建**: Vite 6.4 + @tailwindcss/vite
- **样式**: Tailwind CSS v4 + shadcn/ui (amethyst-haze)
- **动画**: framer-motion 12

## 启动命令

```bash
npm install --legacy-peer-deps
npm run dev  # http://localhost:3000
```

**⚠️ 自指声明**：架构变更时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
