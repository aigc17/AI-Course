# Supabase 连接信息

> ⚠️ 此文件包含敏感信息，已加入 .gitignore，请勿提交到 Git

## 项目信息

| 项目 | 值 |
|------|-----|
| 项目名 | AI-kecheng |
| Project Ref | jpydxopdnrqyqhjkzenc |
| Region | ap-southeast-1 |

## API Keys

```
# Project URL
SUPABASE_URL=https://jpydxopdnrqyqhjkzenc.supabase.co

# Publishable Key (公开，前端使用)
SUPABASE_ANON_KEY=sb_publishable_-UWHkHytdX86Dx0GdpapEw_Qoc69Sd_

# Secret Key (私密，仅服务端使用)
SUPABASE_SERVICE_ROLE_KEY=sb_secret_w7_WOGoLllrc-VvcxWkitA_F_Mqu4L4
```

## 数据库连接

```
# Session Pooler (IPv4 兼容，推荐)
postgresql://postgres.jpydxopdnrqyqhjkzenc:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres

# Transaction Pooler (无状态应用)
postgresql://postgres.jpydxopdnrqyqhjkzenc:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres

# 直接连接（需要 IPv6）
postgresql://postgres:[PASSWORD]@db.jpydxopdnrqyqhjkzenc.supabase.co:5432/postgres
```

## AI 使用指南

### 前端连接

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jpydxopdnrqyqhjkzenc.supabase.co',
  'sb_publishable_-UWHkHytdX86Dx0GdpapEw_Qoc69Sd_'
);
```

### 服务端连接（有完全权限）

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jpydxopdnrqyqhjkzenc.supabase.co',
  'sb_secret_w7_WOGoLllrc-VvcxWkitA_F_Mqu4L4',
  { auth: { persistSession: false } }
);
```

### 执行数据库 SQL

方法 1: Supabase Dashboard
1. 打开 https://supabase.com/dashboard/project/jpydxopdnrqyqhjkzenc
2. 点击 SQL Editor
3. 粘贴 SQL 执行

方法 2: Supabase CLI
```bash
npx supabase login
npx supabase link --project-ref jpydxopdnrqyqhjkzenc
npx supabase db execute --file schema.sql
```

方法 3: psql 直接连接
```bash
psql "postgresql://postgres:[password]@db.jpydxopdnrqyqhjkzenc.supabase.co:5432/postgres" -f schema.sql
```

## 安全提醒

| Key 类型 | 可公开 | 用途 |
|----------|--------|------|
| SUPABASE_URL | ✅ | 项目地址 |
| SUPABASE_ANON_KEY | ✅ | 前端使用，受 RLS 保护 |
| SUPABASE_SERVICE_ROLE_KEY | ❌ | 仅服务端，绕过 RLS |
| Database Password | ❌ | 直接数据库访问 |

---

正式上线前请更换所有密钥！
