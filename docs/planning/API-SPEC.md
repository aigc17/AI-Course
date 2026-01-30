# API 接口规范

> 版本: v0.1 | 更新: 2026-01-30

## 基础信息

| 项目 | 值 |
|------|-----|
| Base URL | Supabase 自动生成 |
| 认证方式 | Supabase Auth (JWT in Cookie) |
| 数据格式 | JSON |

## 认证相关

### 注册

```typescript
// Supabase SDK
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: { name: '用户名' }
  }
});

// 响应
data: {
  user: { id, email, ... },
  session: { access_token, refresh_token, ... }
}
```

### 登录

```typescript
// 邮箱密码登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// OAuth 登录
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: { redirectTo: '/auth/callback' }
});
```

### 登出

```typescript
await supabase.auth.signOut();
```

### 获取当前用户

```typescript
const { data: { user } } = await supabase.auth.getUser();
```

---

## 课程相关

### 获取课程列表

```typescript
// 公开课程（已发布）
const { data, error } = await supabase
  .from('courses')
  .select(`
    id, title, description, cover_url, price, category,
    instructor:profiles(id, name, avatar_url)
  `)
  .eq('status', 'published')
  .order('created_at', { ascending: false });

// 响应
[{
  id: 'uuid',
  title: 'LLM 应用开发实战',
  description: '...',
  cover_url: 'https://r2.example.com/covers/xxx.jpg',
  price: 9900, // 分为单位
  category: 'LLM',
  instructor: { id: 'uuid', name: '讲师名', avatar_url: '...' }
}]
```

### 获取课程详情

```typescript
const { data, error } = await supabase
  .from('courses')
  .select(`
    *,
    instructor:profiles(id, name, avatar_url),
    chapters(id, title, sort_order, type, duration, is_free_preview)
  `)
  .eq('id', courseId)
  .single();
```

### 获取章节内容（需购买）

```typescript
// 先检查是否已购买
const { data: order } = await supabase
  .from('orders')
  .select('id')
  .eq('user_id', userId)
  .eq('course_id', courseId)
  .eq('status', 'paid')
  .single();

if (!order) throw new Error('未购买');

// 获取章节内容
const { data: chapter } = await supabase
  .from('chapters')
  .select('*')
  .eq('id', chapterId)
  .single();
```

---

## 订单相关

### 创建订单

```typescript
const { data, error } = await supabase
  .from('orders')
  .insert({
    user_id: userId,
    course_id: courseId,
    amount: course.price,
    status: 'pending'
  })
  .select()
  .single();
```

### 获取我的订单

```typescript
const { data, error } = await supabase
  .from('orders')
  .select(`
    *,
    course:courses(id, title, cover_url)
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

### 检查是否已购买

```typescript
const { data, error } = await supabase
  .from('orders')
  .select('id')
  .eq('user_id', userId)
  .eq('course_id', courseId)
  .eq('status', 'paid')
  .maybeSingle();

const hasPurchased = !!data;
```

---

## 学习进度

### 更新进度

```typescript
const { error } = await supabase
  .from('progress')
  .upsert({
    user_id: userId,
    chapter_id: chapterId,
    progress_percent: 50,
    last_position: 120, // 秒
    completed: false
  });
```

### 获取课程进度

```typescript
const { data, error } = await supabase
  .from('progress')
  .select('chapter_id, completed, progress_percent')
  .eq('user_id', userId)
  .in('chapter_id', chapterIds);
```

---

## 管理后台 (Admin)

### 创建课程

```typescript
const { data, error } = await supabase
  .from('courses')
  .insert({
    title: '课程标题',
    description: '课程描述',
    price: 9900,
    category: 'LLM',
    instructor_id: adminUserId,
    status: 'draft'
  })
  .select()
  .single();
```

### 更新课程

```typescript
const { error } = await supabase
  .from('courses')
  .update({
    title: '新标题',
    status: 'published'
  })
  .eq('id', courseId);
```

### 创建章节

```typescript
const { data, error } = await supabase
  .from('chapters')
  .insert({
    course_id: courseId,
    title: '第一章',
    sort_order: 1,
    type: 'video', // or 'article'
    content: { /* Novel JSON */ },
    video_id: 'cf-stream-id',
    duration: 600,
    is_free_preview: true
  })
  .select()
  .single();
```

---

## Edge Functions

### 获取图片上传 URL

```typescript
// 调用
const { data, error } = await supabase.functions.invoke('get-upload-url', {
  body: {
    filename: 'cover.jpg',
    contentType: 'image/jpeg',
    folder: 'covers' // covers | content | avatars
  }
});

// 响应
{
  uploadUrl: 'https://xxx.r2.cloudflarestorage.com/...?X-Amz-Signature=...',
  publicUrl: 'https://assets.example.com/covers/xxx.jpg'
}
```

### 获取视频上传 URL

```typescript
// 调用
const { data, error } = await supabase.functions.invoke('get-video-upload-url', {
  body: {
    filename: 'lesson1.mp4'
  }
});

// 响应
{
  uploadUrl: 'https://upload.videodelivery.net/tus/...',
  videoId: 'cf-stream-video-id'
}
```

### 创建支付

```typescript
// 调用
const { data, error } = await supabase.functions.invoke('create-payment', {
  body: {
    orderId: 'order-uuid',
    paymentMethod: 'alipay' // alipay | wechat | stripe
  }
});

// 响应
{
  paymentUrl: 'https://...',
  paymentId: 'payment-xxx'
}
```

---

## 错误处理

```typescript
// Supabase 错误格式
{
  error: {
    message: '错误信息',
    code: 'PGRST116', // PostgreSQL 错误码
    details: '...',
    hint: '...'
  }
}

// 常见错误码
// PGRST116 - 记录不存在
// 23505 - 唯一约束冲突
// 42501 - RLS 权限不足
```

---

[PROTOCOL]: 接口变更时更新此文档
