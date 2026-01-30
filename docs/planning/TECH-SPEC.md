# AI Nexus 课程平台 - 技术架构文档

> 版本: v0.2 | 状态: 草稿 | 更新: 2026-01-30

## 1. 技术栈总览

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend                                  │
│  React 19 + TypeScript + Vite + TailwindCSS + shadcn/ui         │
│  Novel Editor (课程内容编辑)                                     │
└─────────────────────────────────────────────────────────────────┘
          │                                    │
          ▼                                    ▼
┌─────────────────────────┐    ┌─────────────────────────────────┐
│      Supabase           │    │        Cloudflare               │
├─────────────────────────┤    ├─────────────────────────────────┤
│  Auth    │ 用户认证     │    │  Pages  │ 前端静态托管          │
│  PostgreSQL │ 数据库    │    │  R2     │ 图片存储              │
│  Realtime │ 实时订阅    │    │  Stream │ 视频托管              │
└─────────────────────────┘    └─────────────────────────────────┘
```

## 2. 架构分工

| 职责 | 服务 | 说明 |
|------|------|------|
| 前端托管 | Cloudflare Pages | 全球 CDN，自动部署 |
| 用户认证 | Supabase Auth | 邮箱/OAuth，开箱即用 |
| 数据库 | Supabase PostgreSQL | 关系型数据库，Row Level Security |
| 图片存储 | Cloudflare R2 | S3 兼容，无出口费用 |
| 视频托管 | Cloudflare Stream | 自动转码，HLS 分发 |
| 实时功能 | Supabase Realtime | 学习进度实时同步 (可选) |

## 3. 前端架构

### 3.1 目录结构

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
├── lib/
│   ├── supabase.ts     # Supabase 客户端 (新增)
│   ├── cloudflare.ts   # Cloudflare API (新增)
│   └── utils.ts
├── stores/             # Zustand 状态管理 (新增)
└── types/              # TypeScript 类型 (新增)
```

### 3.2 Supabase 客户端

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### 3.3 认证 Hook

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取当前会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};
```

### 3.4 路由守卫

```typescript
// components/ProtectedRoute.tsx
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/auth/login" />;

  return children;
};
```

## 4. 数据库设计 (Supabase PostgreSQL)

### 4.1 Schema

```sql
-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 用户资料表 (扩展 auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 课程表
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category TEXT,
  instructor_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 章节表
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('video', 'article')),
  content JSONB,
  video_id TEXT,
  duration INTEGER,
  is_free_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 订单表
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'refunded')),
  payment_method TEXT,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 学习进度表
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  chapter_id UUID NOT NULL REFERENCES chapters(id),
  completed BOOLEAN DEFAULT FALSE,
  progress_percent INTEGER DEFAULT 0,
  last_position INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, chapter_id)
);

-- 索引
CREATE INDEX idx_chapters_course ON chapters(course_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_progress_user ON progress(user_id);
```

### 4.2 Row Level Security (RLS)

```sql
-- 启用 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Profiles: 用户只能读写自己的资料
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Courses: 所有人可读已发布课程，Admin 可写
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage courses"
  ON courses FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Chapters: 所有人可读，Admin 可写
CREATE POLICY "Anyone can view chapters"
  ON chapters FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage chapters"
  ON chapters FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Orders: 用户只能看自己的订单
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Progress: 用户只能读写自己的进度
CREATE POLICY "Users can manage own progress"
  ON progress FOR ALL USING (auth.uid() = user_id);
```

### 4.3 触发器

```sql
-- 自动创建用户资料
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_chapters_updated_at
  BEFORE UPDATE ON chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

## 5. 认证设计 (Supabase Auth)

### 5.1 支持的认证方式

| 方式 | 说明 |
|------|------|
| Email + Password | 邮箱密码注册登录 |
| Magic Link | 邮箱魔法链接 |
| GitHub OAuth | GitHub 第三方登录 |
| Google OAuth | Google 第三方登录 |

### 5.2 前端认证实现

```typescript
// 邮箱注册
const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

// 邮箱登录
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

// OAuth 登录
const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

// 登出
const signOut = async () => {
  await supabase.auth.signOut();
};
```

## 6. 存储设计 (Cloudflare)

### 6.1 R2 对象存储

```
Bucket: ai-nexus-assets

目录结构:
/covers/{course_id}/     课程封面图
/content/{chapter_id}/   文章内容图片
/avatars/{user_id}/      用户头像
```

### 6.2 图片上传流程

```typescript
// 1. 前端获取预签名 URL (通过 Supabase Edge Function)
const getUploadUrl = async (filename: string, contentType: string) => {
  const { data } = await supabase.functions.invoke('get-upload-url', {
    body: { filename, contentType },
  });
  return data.uploadUrl;
};

// 2. 前端直传到 R2
const uploadImage = async (file: File) => {
  const uploadUrl = await getUploadUrl(file.name, file.type);
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type },
  });
  return uploadUrl.split('?')[0]; // 返回公开 URL
};
```

### 6.3 Cloudflare Stream 视频

```
视频上传流程:
1. 前端请求 TUS 上传 URL (通过 Supabase Edge Function)
2. 前端使用 tus-js-client 直传视频
3. Stream 自动转码 (HLS/DASH)
4. 保存 video_id 到数据库
5. 播放时使用 Stream Player 或 HLS.js
```

```typescript
// 视频播放组件
import Stream from '@cloudflare/stream-react';

const VideoPlayer = ({ videoId }: { videoId: string }) => (
  <Stream
    controls
    src={videoId}
    poster={`https://customer-xxx.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg`}
  />
);
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

## 8. 环境变量

### 8.1 前端 (.env)

```bash
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx
VITE_CF_STREAM_CUSTOMER_CODE=customer-xxx
```

### 8.2 Supabase Edge Functions

```bash
CF_R2_ACCESS_KEY_ID=xxx
CF_R2_SECRET_ACCESS_KEY=xxx
CF_R2_BUCKET_NAME=ai-nexus-assets
CF_R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com
CF_STREAM_API_TOKEN=xxx
CF_STREAM_ACCOUNT_ID=xxx
```

## 9. 开发计划

### Phase 1: 基础设施 + 认证

```
Week 1:
- [ ] 创建 Supabase 项目
- [ ] 实现数据库 Schema + RLS
- [ ] 配置 OAuth (GitHub/Google)
- [ ] 前端认证页面 (登录/注册)
- [ ] 路由守卫

Week 2:
- [ ] 创建 Cloudflare R2 Bucket
- [ ] 实现图片上传 (Supabase Edge Function)
- [ ] 用户资料页面
```

### Phase 2: 课程管理

```
Week 3:
- [ ] 管理后台框架
- [ ] 课程 CRUD 页面
- [ ] Novel 编辑器集成
- [ ] 章节管理

Week 4:
- [ ] Cloudflare Stream 集成
- [ ] 视频上传/播放
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
