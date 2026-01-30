# Pages - 页面组件层

> L2 | 父级: /AI-Course/CLAUDE.md

> 路由页面组件，每个文件对应一个路由，ChatGPT 风格

## 成员清单

- `Home.tsx`: 首页，Hero + 特性展示
- `Courses.tsx`: 课程列表页
- `CourseDetail.tsx`: 课程详情页
- `DesignSystem.tsx`: 设计系统展示页，微拟物组件变体展示

## 设计系统约束

**一切设计必须来自设计系统的颜色和组件**：

| 允许 | 禁止 |
|------|------|
| `bg-primary/10` | `bg-purple-100` |
| `text-foreground` | `text-white` |
| `border-border/40` | `border-gray-200` |
| `<Card>` | `<div className="rounded shadow">` |

**⚠️ 自指声明**：页面增删或职责变动时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
