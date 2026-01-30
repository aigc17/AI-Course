# AI Nexus 课程平台 - 产品需求文档

> 版本: v0.1 | 状态: 草稿 | 更新: 2026-01-30

## 1. 产品定位

**一句话定位**: 面向开发者的 AI 技术付费课程平台

**目标用户**: 希望系统学习 AI 技术的开发者、技术从业者

**核心价值**: 从 Transformer 到 LLM 应用开发，提供系统化、实战导向的 AI 课程

## 2. 核心功能模块

### 2.1 用户端 (C端)

| 模块 | 功能 | 优先级 |
|------|------|--------|
| 首页 | Hero 展示、课程推荐、特性介绍 | P0 |
| 课程列表 | 分类筛选、搜索、课程卡片展示 | P0 |
| 课程详情 | 视频播放、章节大纲、课程介绍 | P0 |
| 用户认证 | 注册、登录、OAuth (GitHub/Google) | P0 |
| 支付购买 | 课程购买、订单管理 | P0 |
| 学习中心 | 已购课程、学习进度、收藏 | P1 |
| 用户中心 | 个人信息、订单历史、设置 | P1 |

### 2.2 管理端 (B端)

| 模块 | 功能 | 优先级 |
|------|------|--------|
| 课程管理 | 创建/编辑/上下架课程 | P0 |
| 章节管理 | 添加/编辑/排序章节 | P0 |
| 内容编辑 | Novel 富文本编辑器 | P0 |
| 视频管理 | 上传/管理视频 (Cloudflare Stream) | P0 |
| 订单管理 | 查看订单、退款处理 | P1 |
| 用户管理 | 用户列表、权限管理 | P1 |
| 数据统计 | 销售数据、用户数据 | P2 |

## 3. 用户故事

### 3.1 学员视角

```
作为学员，我希望能够：
- 浏览课程列表，按分类筛选感兴趣的课程
- 查看课程详情，了解课程内容和章节大纲
- 购买课程后，观看视频和阅读图文内容
- 追踪学习进度，知道自己学到哪里了
- 收藏感兴趣的课程，方便后续购买
```

### 3.2 管理员视角

```
作为管理员，我希望能够：
- 创建新课程，设置标题、描述、价格、封面
- 为课程添加章节，每个章节可以是视频或图文
- 使用富文本编辑器编写图文内容
- 上传视频到云端，自动转码和分发
- 管理课程上下架状态
- 查看订单和销售数据
```

## 4. 页面结构

```
/                     首页
/courses              课程列表
/courses/:id          课程详情
/courses/:id/learn    学习页面 (需登录+购买)
/auth/login           登录
/auth/register        注册
/user                 用户中心
/user/orders          订单历史
/user/learning        学习中心

/admin                管理后台
/admin/courses        课程管理
/admin/courses/new    创建课程
/admin/courses/:id    编辑课程
/admin/orders         订单管理
/admin/users          用户管理
```

## 5. 数据模型 (概念层)

### 5.1 核心实体

```
User (用户)
├── id, email, name, avatar
├── role: student | admin
└── created_at, updated_at

Course (课程)
├── id, title, description, cover_image
├── price, status: draft | published
├── category, instructor
└── created_at, updated_at

Chapter (章节)
├── id, course_id, title, order
├── type: video | article
├── content (富文本) | video_id
├── duration, is_free_preview
└── created_at, updated_at

Order (订单)
├── id, user_id, course_id
├── amount, status: pending | paid | refunded
├── payment_method, payment_id
└── created_at, updated_at

Progress (学习进度)
├── id, user_id, course_id, chapter_id
├── completed, progress_percent
└── last_position, updated_at
```

## 6. 非功能需求

| 维度 | 要求 |
|------|------|
| 性能 | 首屏加载 < 2s，视频播放流畅 |
| 安全 | HTTPS，JWT 认证，视频防盗链 |
| 可用性 | 99.9% 可用性 (Cloudflare 保障) |
| 扩展性 | 支持未来添加直播、社区等功能 |

## 7. 里程碑规划

### Phase 1: MVP (最小可行产品)

- [ ] 用户认证 (邮箱 + OAuth)
- [ ] 课程展示 (列表 + 详情)
- [ ] 管理后台 (课程 CRUD)
- [ ] 内容编辑 (Novel 编辑器)
- [ ] 视频播放 (Cloudflare Stream)

### Phase 2: 支付闭环

- [ ] 支付集成 (支付宝/微信)
- [ ] 订单管理
- [ ] 已购课程访问控制

### Phase 3: 学习体验

- [ ] 学习进度追踪
- [ ] 学习中心
- [ ] 收藏功能

### Phase 4: 运营增强

- [ ] 数据统计
- [ ] 优惠券系统
- [ ] 用户评价

---

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
