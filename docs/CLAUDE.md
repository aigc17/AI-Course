# Docs - 项目文档

> L2 | 父级: /AI-Course/CLAUDE.md

> 产品规划、技术架构、开发进度追踪文档

## 目录结构

```
docs/
├── TODO.md              ← 入口文档，进度总览
├── planning/            ← 规划文档
│   ├── PRD.md           - 产品需求
│   ├── TECH-SPEC.md     - 技术架构
│   ├── API-SPEC.md      - 接口规范
│   └── PAGES.md         - 页面结构
└── phases/              ← 阶段任务
    ├── phase-1-auth.md  - 基础设施 + 认证
    ├── phase-2-course.md- 课程管理
    └── phase-3-payment.md- 支付闭环
```

## AI 工作流程

```
1. 读取 TODO.md → 了解当前进度
2. 读取当前阶段文档 → 找到下一个待做任务
3. 执行任务 → 完成后更新任务状态
4. 更新 TODO.md → 同步进度
```

**⚠️ 自指声明**：文档增删或内容重大变动时更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
