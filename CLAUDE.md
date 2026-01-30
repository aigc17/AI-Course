# AI Nexus - AI 付费课程平台

> L1 | React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + shadcn/ui + Cloudflare

## 目录结构

```
/
├── docs/             - 产品与技术文档
│   ├── PRD.md        - 产品需求文档
│   └── TECH-SPEC.md  - 技术架构文档
├── src/
│   ├── components/   - UI 组件层
│   │   ├── ui/       - shadcn/ui 原子组件
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── CourseCard.tsx
│   ├── pages/        - 页面组件
│   │   ├── Home.tsx
│   │   ├── Courses.tsx
│   │   ├── CourseDetail.tsx
│   │   └── DesignSystem.tsx
│   ├── lib/          - 工具函数
│   ├── App.tsx       - 应用根组件
│   ├── index.tsx     - 应用入口
│   ├── index.css     - 全局样式
│   ├── constants.ts  - 数据常量
│   └── types.ts      - 类型定义
└── workers/          - Cloudflare Workers 后端 (待创建)
```

## 后端技术栈 (Cloudflare)

| 服务 | 用途 |
|------|------|
| Pages | 前端静态托管 |
| Workers | 后端 API |
| D1 | SQLite 数据库 |
| R2 | 对象存储 (图片) |
| Stream | 视频托管 |
| KV | Session 缓存 |

## 设计系统约束

**极简直角黑白设计语言**：

| 元素类型 | 效果 |
|---------|------|
| 容器 | border border-border |
| 按钮 | bg-foreground text-background |
| 输入 | border border-border |
| 圆角 | 无 (直角) |

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
