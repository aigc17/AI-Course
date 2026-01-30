# AI Nexus 课程平台 - 技术架构文档

> 版本: v0.1 | 状态: 草稿 | 更新: 2026-01-30

## 1. 技术栈总览

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend                                  │
│  React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui         │
│  Novel Editor (课程内容编辑)                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Cloudflare Edge                              │
├─────────────────────────────────────────────────────────────────┤
│  Pages      │ 前端静态托管，全球 CDN 分发                        │
│  Workers    │ 后端 API，边缘计算                                 │
│  D1         │ SQLite 数据库，边缘分布式                          │
│  R2         │ 对象存储 (图片、文件)                              │
│  Stream     │ 视频托管、转码、分发                               │
│  KV         │ 键值存储 (Session、缓存)                           │
└─────────────────────────────────────────────────────────────────┘
```

## 2. 前端架构

### 2.1 目录结构

```
src/
├── components/          # UI 组件
│   ├── ui/             # shadcn/ui 原子组件
│   ├── landing/        # 落地页组件
│   └── admin/          # 管理后台组件 (新增)
├── pages/              # 路由页面
│   ├── Home.tsx
│   ├── Courses.tsx
│   ├── CourseDetail.tsx
│   ├── Learn.tsx       # 学习页面 (新增)
│   ├── auth/           # 认证页面 (新增)
│   └── admin/          # 管理后台页面 (新增)
├── hooks/              # 自定义 Hooks (新增)
├── services/           # API 调用层 (新增)
├── stores/             # 状态管理 (新增)
├── types/              # TypeScript 类型 (新增)
└── lib/                # 工具函数
```

### 2.2 状态管理

```typescript
// 使用 Zustand 轻量状态管理
// stores/auth.ts
interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

### 2.3 路由守卫

```typescript
// 需要登录的路由
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/auth/login" />;
  return children;
};

// 需要购买的路由
const PurchasedRoute = ({ courseId, children }) => {
  const { hasPurchased } = usePurchase(courseId);
  if (!hasPurchased) return <Navigate to={`/courses/${courseId}`} />;
  return children;
};
```

## 3. 后端架构 (Cloudflare Workers)

### 3.1 API 设计

```
API Base: /api/v1

# 认证
POST   /auth/register        注册
POST   /auth/login           登录
POST   /auth/logout          登出
GET    /auth/me              当前用户
POST   /auth/oauth/:provider OAuth 回调

# 课程 (公开)
GET    /courses              课程列表
GET    /courses/:id          课程详情
GET    /courses/:id/chapters 章节列表 (预览)

# 课程 (需购买)
GET    /courses/:id/learn    完整学习内容
GET    /chapters/:id/content 章节完整内容

# 订单
POST   /orders               创建订单
GET    /orders               我的订单
GET    /orders/:id           订单详情
POST   /orders/:id/pay       发起支付

# 学习进度
GET    /progress/:courseId   课程进度
POST   /progress/:chapterId  更新进度

# 管理后台 (需 Admin 权限)
POST   /admin/courses        创建课程
PUT    /admin/courses/:id    更新课程
DELETE /admin/courses/:id    删除课程
POST   /admin/chapters       创建章节
PUT    /admin/chapters/:id   更新章节
POST   /admin/upload/image   上传图片 (R2)
POST   /admin/upload/video   上传视频 (Stream)
```

### 3.2 Workers 项目结构

```
workers/
├── src/
│   ├── index.ts            # 入口，路由分发
│   ├── routes/
│   │   ├── auth.ts         # 认证路由
│   │   ├── courses.ts      # 课程路由
│   │   ├── orders.ts       # 订单路由
│   │   ├── progress.ts     # 进度路由
│   │   └── admin.ts        # 管理路由
│   ├── middleware/
│   │   ├── auth.ts         # JWT 验证
│   │   ├── admin.ts        # Admin 权限
│   │   └── cors.ts         # CORS 处理
│   ├── services/
│   │   ├── db.ts           # D1 数据库操作
│   │   ├── storage.ts      # R2 存储操作
│   │   └── stream.ts       # Stream 视频操作
│   └── types/
│       └── index.ts        # 类型定义
├── schema.sql              # D1 数据库 Schema
├── wrangler.toml           # Workers 配置
└── package.json
```

### 3.3 技术选型

| 组件 | 选择 | 理由 |
|------|------|------|
| 框架 | Hono | 轻量、类型安全、专为 Workers 设计 |
| ORM | Drizzle | 类型安全、支持 D1、轻量 |
| 验证 | Zod | 运行时类型验证 |
| JWT | jose | 边缘环境兼容 |

## 4. 数据库设计 (D1)

### 4.1 Schema

```sql
-- 用户表
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  name TEXT,
  avatar TEXT,
  role TEXT DEFAULT 'student',
  oauth_provider TEXT,
  oauth_id TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- 课程表
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  price INTEGER NOT NULL,
  status TEXT DEFAULT 'draft',
  category TEXT,
  instructor TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- 章节表
CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES courses(id),
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  type TEXT NOT NULL,
  content TEXT,
  video_id TEXT,
  duration INTEGER,
  is_free_preview INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- 订单表
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  course_id TEXT NOT NULL REFERENCES courses(id),
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_id TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- 学习进度表
CREATE TABLE progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  course_id TEXT NOT NULL REFERENCES courses(id),
  chapter_id TEXT NOT NULL REFERENCES chapters(id),
  completed INTEGER DEFAULT 0,
  progress_percent INTEGER DEFAULT 0,
  last_position INTEGER DEFAULT 0,
  updated_at INTEGER DEFAULT (unixepoch()),
  UNIQUE(user_id, chapter_id)
);

-- 索引
CREATE INDEX idx_chapters_course ON chapters(course_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_progress_user_course ON progress(user_id, course_id);
```

## 5. 存储设计

### 5.1 R2 对象存储

```
Bucket: ai-nexus-assets

目录结构:
/covers/          课程封面图
/content/         文章内容图片
/avatars/         用户头像
```

### 5.2 Cloudflare Stream

```
视频上传流程:
1. 前端请求上传 URL
2. Workers 调用 Stream API 获取 TUS 上传 URL
3. 前端直传视频到 Stream
4. Stream 自动转码 (HLS/DASH)
5. 保存 video_id 到数据库
6. 播放时使用 Stream Player 或 HLS.js
```

## 6. 认证设计

### 6.1 JWT 结构

```typescript
interface JWTPayload {
  sub: string;      // user_id
  email: string;
  role: 'student' | 'admin';
  exp: number;      // 过期时间
  iat: number;      // 签发时间
}
```

### 6.2 认证流程

```
邮箱登录:
1. 用户提交 email + password
2. Workers 验证密码 (bcrypt)
3. 生成 JWT，存入 HttpOnly Cookie
4. 返回用户信息

OAuth 登录:
1. 前端跳转 OAuth Provider
2. 回调到 /auth/oauth/:provider
3. Workers 获取用户信息
4. 创建/更新用户记录
5. 生成 JWT，重定向到前端
```

## 7. 内容编辑器 (Novel)

### 7.1 集成方案

```typescript
// 安装
npm install novel

// 使用
import { Editor } from 'novel';

const CourseEditor = ({ content, onChange }) => {
  return (
    <Editor
      defaultValue={content}
      onUpdate={(editor) => {
        onChange(editor.getJSON());
      }}
      extensions={[
        // 代码高亮
        // 图片上传 (对接 R2)
        // 视频嵌入 (对接 Stream)
      ]}
    />
  );
};
```

### 7.2 图片上传

```typescript
// 自定义图片上传处理
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/v1/admin/upload/image', {
    method: 'POST',
    body: formData,
  });

  const { url } = await res.json();
  return url; // R2 公开 URL
};
```

## 8. 部署配置

### 8.1 wrangler.toml

```toml
name = "ai-nexus-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "ai-nexus-db"
database_id = "<your-database-id>"

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "ai-nexus-assets"

[[kv_namespaces]]
binding = "SESSIONS"
id = "<your-kv-id>"

[vars]
ENVIRONMENT = "production"
```

### 8.2 环境变量

```
JWT_SECRET=<your-jwt-secret>
STREAM_API_TOKEN=<cloudflare-stream-token>
STREAM_ACCOUNT_ID=<cloudflare-account-id>
```

## 9. 开发计划

### Phase 1: 基础设施

```
Week 1:
- [ ] 创建 Cloudflare 资源 (D1, R2, KV)
- [ ] 初始化 Workers 项目
- [ ] 实现数据库 Schema
- [ ] 实现基础 CRUD API

Week 2:
- [ ] 实现用户认证 (邮箱 + JWT)
- [ ] 实现 OAuth (GitHub)
- [ ] 前端认证页面
- [ ] 路由守卫
```

### Phase 2: 核心功能

```
Week 3:
- [ ] 管理后台框架
- [ ] 课程 CRUD 页面
- [ ] Novel 编辑器集成
- [ ] R2 图片上传

Week 4:
- [ ] Cloudflare Stream 集成
- [ ] 视频上传/播放
- [ ] 章节管理
- [ ] 学习页面
```

### Phase 3: 支付闭环

```
Week 5-6:
- [ ] 支付接口对接
- [ ] 订单系统
- [ ] 购买权限控制
- [ ] 学习进度追踪
```

---

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
