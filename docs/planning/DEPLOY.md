# 部署指南

> 版本: v0.1 | 更新: 2026-01-30

## 架构概览

```
┌─────────────────┐     ┌─────────────────┐
│  Cloudflare     │     │    Supabase     │
│  Pages          │────▶│    Auth + DB    │
│  (前端)         │     │                 │
└─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  Cloudflare R2  │     │  Supabase Edge  │
│  (图片存储)     │     │  Functions      │
└─────────────────┘     └─────────────────┘
        │
        ▼
┌─────────────────┐
│  Cloudflare     │
│  Stream (视频)  │
└─────────────────┘
```

---

## 1. Supabase 配置

### 1.1 创建项目

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目，选择区域（推荐 Singapore）
3. 记录以下信息：
   - Project URL: `https://xxx.supabase.co`
   - Anon Key: `eyJxxx...`
   - Service Role Key: `eyJxxx...` (仅服务端使用)

### 1.2 执行数据库 Schema

1. 进入 SQL Editor
2. 执行 `docs/planning/TECH-SPEC.md` 中的 Schema SQL
3. 执行 RLS 策略 SQL
4. 执行触发器 SQL

### 1.3 配置认证

1. Authentication → Providers
2. 启用 Email (默认已启用)
3. 配置 GitHub OAuth:
   - 创建 GitHub OAuth App
   - 填入 Client ID 和 Secret
   - Callback URL: `https://xxx.supabase.co/auth/v1/callback`
4. 配置 Google OAuth (可选)

### 1.4 配置邮件模板

1. Authentication → Email Templates
2. 自定义确认邮件、重置密码邮件

---

## 2. Cloudflare 配置

### 2.1 创建 R2 Bucket

1. 登录 Cloudflare Dashboard
2. R2 → Create bucket
3. Bucket name: `ai-nexus-assets`
4. 配置公开访问:
   - Settings → Public access → Allow
   - 或绑定自定义域名

### 2.2 创建 R2 API Token

1. R2 → Manage R2 API Tokens
2. Create API token
3. 权限: Object Read & Write
4. 指定 Bucket: `ai-nexus-assets`
5. 记录:
   - Access Key ID
   - Secret Access Key
   - Endpoint URL

### 2.3 配置 Cloudflare Stream

1. Stream → API Tokens
2. 创建 Token，记录:
   - API Token
   - Account ID

### 2.4 配置 Cloudflare Pages

1. Pages → Create a project
2. 连接 Git 仓库
3. 构建设置:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 环境变量 (见下方)

---

## 3. Supabase Edge Functions

### 3.1 安装 Supabase CLI

```bash
npm install -g supabase
supabase login
```

### 3.2 初始化

```bash
supabase init
supabase link --project-ref <project-id>
```

### 3.3 创建 Edge Function

```bash
supabase functions new get-upload-url
```

### 3.4 配置 Secrets

```bash
supabase secrets set CF_R2_ACCESS_KEY_ID=xxx
supabase secrets set CF_R2_SECRET_ACCESS_KEY=xxx
supabase secrets set CF_R2_BUCKET_NAME=ai-nexus-assets
supabase secrets set CF_R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com
supabase secrets set CF_STREAM_API_TOKEN=xxx
supabase secrets set CF_STREAM_ACCOUNT_ID=xxx
```

### 3.5 部署

```bash
supabase functions deploy get-upload-url
supabase functions deploy get-video-upload-url
supabase functions deploy create-payment
supabase functions deploy payment-webhook
```

---

## 4. 前端部署

### 4.1 本地构建测试

```bash
npm run build
npm run preview
```

### 4.2 Cloudflare Pages 部署

推送到 Git 仓库后自动部署，或手动触发：

```bash
# 使用 Wrangler CLI
npm install -g wrangler
wrangler pages deploy dist
```

### 4.3 环境变量

在 Cloudflare Pages 设置中配置：

| 变量名 | 值 |
|--------|-----|
| VITE_SUPABASE_URL | https://xxx.supabase.co |
| VITE_SUPABASE_ANON_KEY | eyJxxx... |
| VITE_CF_STREAM_CUSTOMER_CODE | customer-xxx |

---

## 5. 域名配置

### 5.1 主域名

1. Cloudflare Pages → Custom domains
2. 添加域名: `ainexus.com`
3. 配置 DNS 记录

### 5.2 资源域名 (可选)

1. R2 → Custom domains
2. 添加域名: `assets.ainexus.com`

---

## 6. 检查清单

### 部署前

- [ ] 所有环境变量已配置
- [ ] 数据库 Schema 已执行
- [ ] RLS 策略已启用
- [ ] OAuth 已配置
- [ ] R2 Bucket 已创建
- [ ] Stream API Token 已创建

### 部署后

- [ ] 首页可访问
- [ ] 注册/登录正常
- [ ] OAuth 登录正常
- [ ] 图片上传正常
- [ ] 视频上传正常 (如已实现)

---

[PROTOCOL]: 部署流程变更时更新此文档
