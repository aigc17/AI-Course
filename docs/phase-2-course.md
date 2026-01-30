# Phase 2: 课程管理

> 状态: ⬜ 待开始 | 依赖: Phase 1 完成

## 2.1 管理后台框架

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 AdminLayout 组件 | ⬜ 待做 | `src/components/admin/AdminLayout.tsx` |
| 创建 AdminSidebar 组件 | ⬜ 待做 | `src/components/admin/AdminSidebar.tsx` |
| 创建 AdminRoute 守卫 | ⬜ 待做 | `src/components/AdminRoute.tsx` |
| 创建管理后台首页 | ⬜ 待做 | `src/pages/admin/Dashboard.tsx` |
| 配置管理后台路由 | ⬜ 待做 | `src/App.tsx` |

### 验收标准
- [ ] Admin 用户访问 /admin → 显示管理后台
- [ ] 非 Admin 用户访问 /admin → 显示无权限提示
- [ ] 侧边栏导航正常工作

---

## 2.2 课程 CRUD

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建课程列表页 | ⬜ 待做 | `src/pages/admin/CourseList.tsx` |
| 创建课程表单组件 | ⬜ 待做 | `src/components/admin/CourseForm.tsx` |
| 创建新建课程页 | ⬜ 待做 | `src/pages/admin/CourseCreate.tsx` |
| 创建编辑课程页 | ⬜ 待做 | `src/pages/admin/CourseEdit.tsx` |
| 课程封面上传 | ⬜ 待做 | 集成 ImageUpload 组件 |
| 课程上下架功能 | ⬜ 待做 | status 字段切换 |

### 验收标准
- [ ] 创建课程 → 列表显示新课程
- [ ] 编辑课程 → 保存成功 → 数据更新
- [ ] 上传封面 → 显示预览 → 保存后可访问
- [ ] 发布课程 → 前台可见

---

## 2.3 章节管理

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建章节列表组件 | ⬜ 待做 | `src/components/admin/ChapterList.tsx` |
| 创建章节表单组件 | ⬜ 待做 | `src/components/admin/ChapterForm.tsx` |
| 章节拖拽排序 | ⬜ 待做 | @dnd-kit/core |
| 章节类型切换 | ⬜ 待做 | video / article |

### 验收标准
- [ ] 添加章节 → 列表显示
- [ ] 拖拽排序 → 顺序保存
- [ ] 切换类型 → 显示对应编辑器

---

## 2.4 Novel 编辑器集成

| 任务 | 状态 | 产出 |
|------|------|------|
| 安装 novel 依赖 | ⬜ 待做 | package.json |
| 创建 CourseEditor 组件 | ⬜ 待做 | `src/components/admin/CourseEditor.tsx` |
| 配置图片上传扩展 | ⬜ 待做 | 对接 R2 |
| 配置代码高亮扩展 | ⬜ 待做 | @tiptap/extension-code-block-lowlight |
| 内容保存/加载 | ⬜ 待做 | JSONB 格式 |

### 验收标准
- [ ] 编辑器加载 → 显示已有内容
- [ ] 插入图片 → 上传到 R2 → 显示图片
- [ ] 代码块 → 语法高亮
- [ ] 保存 → 内容持久化

---

## 2.5 Cloudflare Stream 视频

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 Stream API Token | ⬜ 待做 | Cloudflare Dashboard |
| 创建视频上传 Edge Function | ⬜ 待做 | `supabase/functions/get-video-upload-url/` |
| 创建 VideoUpload 组件 | ⬜ 待做 | `src/components/admin/VideoUpload.tsx` |
| 创建 VideoPlayer 组件 | ⬜ 待做 | `src/components/VideoPlayer.tsx` |
| 上传进度显示 | ⬜ 待做 | tus-js-client |

### 验收标准
- [ ] 选择视频 → 显示上传进度 → 上传完成
- [ ] 视频播放 → HLS 自适应码率
- [ ] 视频缩略图 → 自动生成

---

## 2.6 学习页面

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建学习页面 | ⬜ 待做 | `src/pages/Learn.tsx` |
| 章节内容渲染 | ⬜ 待做 | 视频 / 图文 |
| 章节导航 | ⬜ 待做 | 上一节 / 下一节 |
| 购买权限检查 | ⬜ 待做 | PurchasedRoute 组件 |

### 验收标准
- [ ] 已购用户 → 可访问完整内容
- [ ] 未购用户 → 只能看免费预览章节
- [ ] 切换章节 → 内容更新

---

## 相关文档

- [Phase 1: 认证](./phase-1-auth.md) - 前置依赖
- [Phase 3: 支付](./phase-3-payment.md) - 后续阶段

---

[PROTOCOL]: 任务状态变更时更新此文档
