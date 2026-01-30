# UI - shadcn/ui 原子组件

> L2 | 父级: /AI-Course/src/components/CLAUDE.md

> shadcn/ui 基础组件，微拟物光影质感设计系统

## 成员清单

- `button.tsx`: 按钮组件，渐变+立体效果，支持 loading/icon
- `card.tsx`: 卡片组件，凸起/内凹变体
- `input.tsx`: 输入框组件，内凹效果
- `badge.tsx`: 徽章组件，渐变背景
- `label.tsx`: 标签组件
- `dialog.tsx`: 对话框组件
- `sheet.tsx`: 侧边栏组件
- `separator.tsx`: 分隔线组件
- `skeleton.tsx`: 骨架屏组件
- `navigation-menu.tsx`: 导航菜单组件

## 设计语言

**微拟物 = 渐变背景 + 立体阴影 + 微交互**

| 元素类型 | 效果 |
|---------|------|
| 凸起元素 | 外投影 + 顶部高光 |
| 内凹元素 | inset 阴影 |
| 颜色 | CSS 变量 + color-mix |
| 圆角 | 20px+ |

**⚠️ 自指声明**：组件增删或 variant 变动时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
