# Phase 4: 存储功能

> 状态: ⬜ 待开始 | 依赖: Phase 3 完成

## 目标

实现图片和视频的上传、存储、播放功能。

---

## 4.1 Cloudflare R2 配置

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 R2 Bucket | ⬜ 待做 | Cloudflare Dashboard |
| 配置公开访问 | ⬜ 待做 | R2.dev 或自定义域名 |
| 创建 API Token | ⬜ 待做 | Access Key + Secret |

---

## 4.2 图片上传

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建上传 Edge Function | ⬜ 待做 | `supabase/functions/get-upload-url/` |
| 创建 ImageUpload 组件 | ⬜ 待做 | `src/components/admin/ImageUpload.tsx` |
| 集成到课程表单 | ⬜ 待做 | 封面上传 |
| 集成到 Novel 编辑器 | ⬜ 待做 | 图片插入 |

### 验收标准

- [ ] 选择图片 → 上传成功 → 显示预览
- [ ] 编辑器插入图片 → 上传到 R2

---

## 4.3 Cloudflare Stream 配置

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 Stream API Token | ⬜ 待做 | Cloudflare Dashboard |
| 配置 Supabase Secrets | ⬜ 待做 | CF_STREAM_* |

---

## 4.4 视频上传

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建视频上传 Edge Function | ⬜ 待做 | `supabase/functions/get-video-upload-url/` |
| 创建 VideoUpload 组件 | ⬜ 待做 | `src/components/admin/VideoUpload.tsx` |
| 上传进度显示 | ⬜ 待做 | tus-js-client |

### 验收标准

- [ ] 选择视频 → 显示上传进度 → 上传完成
- [ ] 视频 ID 保存到数据库

---

## 4.5 视频播放

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 VideoPlayer 组件 | ⬜ 待做 | `src/components/VideoPlayer.tsx` |
| 集成 Stream Player | ⬜ 待做 | @cloudflare/stream-react |

### 验收标准

- [ ] 视频播放流畅
- [ ] 自适应码率

---

## 相关文档

- [DEPLOY.md](../planning/DEPLOY.md) - Cloudflare 配置
- [ENV-TEMPLATE.md](../planning/ENV-TEMPLATE.md) - 环境变量

---

[PROTOCOL]: 任务状态变更时更新此文档
