# 环境变量模板

> 复制此文件为 `.env` 并填入实际值

## 前端环境变量 (.env)

```bash
# ============================================================================
# Supabase
# ============================================================================

# Supabase 项目 URL
# 获取位置: Supabase Dashboard → Settings → API → Project URL
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase 匿名密钥 (公开，可暴露给前端)
# 获取位置: Supabase Dashboard → Settings → API → anon public
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================================================
# Cloudflare Stream
# ============================================================================

# Stream 客户代码 (用于播放器)
# 获取位置: Cloudflare Dashboard → Stream → 任意视频 → 播放器代码中的 customer-xxx
VITE_CF_STREAM_CUSTOMER_CODE=customer-xxxxxxxxxx
```

---

## Supabase Edge Functions Secrets

```bash
# ============================================================================
# Cloudflare R2 (图片存储)
# ============================================================================

# R2 Access Key ID
# 获取位置: Cloudflare Dashboard → R2 → Manage R2 API Tokens
CF_R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# R2 Secret Access Key
CF_R2_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# R2 Bucket 名称
CF_R2_BUCKET_NAME=ai-nexus-assets

# R2 Endpoint URL
# 格式: https://<account-id>.r2.cloudflarestorage.com
CF_R2_ENDPOINT=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.cloudflarestorage.com

# R2 公开访问 URL (用于返回图片地址)
# 如果使用 R2.dev: https://pub-xxx.r2.dev
# 如果使用自定义域名: https://assets.yourdomain.com
CF_R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev

# ============================================================================
# Cloudflare Stream (视频托管)
# ============================================================================

# Stream API Token
# 获取位置: Cloudflare Dashboard → Stream → API Tokens
CF_STREAM_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Cloudflare Account ID
# 获取位置: Cloudflare Dashboard → 右侧栏 Account ID
CF_STREAM_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ============================================================================
# 支付 (Phase 3)
# ============================================================================

# Stripe Secret Key (如果使用 Stripe)
# STRIPE_SECRET_KEY=sk_live_xxx

# 支付宝应用私钥 (如果使用支付宝)
# ALIPAY_PRIVATE_KEY=xxx

# 微信支付 API 密钥 (如果使用微信支付)
# WECHAT_PAY_API_KEY=xxx
```

---

## 配置步骤

### 1. 前端环境变量

```bash
# 复制模板
cp .env.example .env

# 编辑填入实际值
vim .env
```

### 2. Supabase Secrets

```bash
# 使用 Supabase CLI 设置
supabase secrets set CF_R2_ACCESS_KEY_ID=xxx
supabase secrets set CF_R2_SECRET_ACCESS_KEY=xxx
# ... 其他变量
```

### 3. Cloudflare Pages 环境变量

1. Cloudflare Dashboard → Pages → 你的项目
2. Settings → Environment variables
3. 添加 `VITE_` 开头的变量

---

## 安全提醒

| 变量类型 | 可公开 | 说明 |
|----------|--------|------|
| `VITE_SUPABASE_URL` | ✅ | 公开 URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | 设计为公开，受 RLS 保护 |
| `VITE_CF_STREAM_CUSTOMER_CODE` | ✅ | 仅用于播放器 |
| `CF_R2_*` | ❌ | 仅服务端使用 |
| `CF_STREAM_API_TOKEN` | ❌ | 仅服务端使用 |
| `*_SECRET_KEY` | ❌ | 绝对不能暴露 |

---

[PROTOCOL]: 环境变量变更时更新此文档
