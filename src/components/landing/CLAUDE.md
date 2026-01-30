# Landing - 落地页组件层

> L2 | 父级: /AI-Course/src/components/CLAUDE.md

> Landing Page Section 组件，遵循微拟物设计系统

## 目录结构

```
landing/
├── index.ts          # Barrel export
├── Hero.tsx          # 首屏英雄区
├── social-proof/     # 社会证明组件
│   ├── LogoBar.tsx
│   └── Testimonials.tsx
├── content/          # 内容区组件
│   ├── ProblemSection.tsx
│   ├── FeaturesSection.tsx
│   └── HowItWorks.tsx
└── conversion/       # 转化区组件
    ├── Pricing.tsx
    ├── FAQ.tsx
    └── FinalCTA.tsx
```

## 成员清单

- `index.ts`: Barrel export，统一导出所有组件
- `Hero.tsx`: 首屏英雄区，价值主张 + CTA
- `social-proof/`: 社会证明组件（LogoBar, Testimonials）
- `content/`: 内容区组件（ProblemSection, FeaturesSection, HowItWorks）
- `conversion/`: 转化区组件（Pricing, FAQ, FinalCTA）

## 设计约束

- 颜色：只使用 CSS 变量 (--primary, --secondary, --accent 等)
- 组件：只使用 shadcn/ui 组件
- 动画：使用 @/lib/motion 预设变体

**⚠️ 自指声明**：组件增删或职责变动时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
