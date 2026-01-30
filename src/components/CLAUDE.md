# Components - UI 组件层

> L2 | 父级: /AI-Course/CLAUDE.md

> 应用级 UI 组件，基于 shadcn/ui 设计系统构建，ChatGPT 风格

## 成员清单

- `Navbar.tsx`: 全局导航栏，极简设计，含 DesignSystem 入口
- `Footer.tsx`: 全局页脚，极简设计
- `CourseCard.tsx`: 课程卡片展示组件
- `ui/`: shadcn/ui 原子组件目录
- `landing/`: 落地页 Section 组件（Hero, LogoBar, Pricing 等）

## 设计系统约束

**一切设计必须来自设计系统的颜色和组件**：

| 允许 | 禁止 |
|------|------|
| `bg-primary` | `bg-[#7c3aed]` |
| `text-muted-foreground` | `text-gray-500` |
| `border-border/40` | `border-[rgba(0,0,0,0.1)]` |
| `<Button>` | `<button className="...">` |

**⚠️ 自指声明**：组件增删或职责变动时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
