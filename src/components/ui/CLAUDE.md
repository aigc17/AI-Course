# UI - shadcn/ui 原子组件

> L2 | 父级: /AI-Course/src/components/CLAUDE.md

> shadcn/ui 基础组件，极简直角黑白风格设计系统

## 目录结构

- `form/`: 表单组件 (Button, Input, Label)
- `layout/`: 布局组件 (Card, Separator)
- `overlay/`: 覆盖层组件 (Dialog, Sheet)
- `display/`: 展示组件 (Badge, Avatar, Skeleton)
- `navigation/`: 导航组件 (Accordion, NavigationMenu)
- `index.ts`: 统一导出入口

## 设计语言

**极简 = 直角 + 黑白 + 边框**

| 元素类型 | 效果 |
|---------|------|
| 容器 | border border-border |
| 按钮 | bg-foreground text-background |
| 输入 | border border-border |
| 圆角 | 无 (直角) |

**⚠️ 自指声明**：子目录增删或设计语言变动时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
