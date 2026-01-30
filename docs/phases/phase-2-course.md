# Phase 2: 课程管理核心

> 状态: ⬜ 待开始 | 依赖: Phase 1 完成

## 目标

实现课程管理的核心功能，能够创建、编辑、发布课程。

---

## 2.1 管理后台框架

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 AdminLayout 组件 | ⬜ 待做 | `src/components/admin/AdminLayout.tsx` |
| 创建 AdminSidebar 组件 | ⬜ 待做 | `src/components/admin/AdminSidebar.tsx` |
| 创建管理后台首页 | ⬜ 待做 | `src/pages/admin/Dashboard.tsx` |
| 配置 /admin 路由 | ⬜ 待做 | `src/App.tsx` |

### 验收标准

- [ ] 访问 /admin 显示管理后台
- [ ] 侧边栏导航正常

---

## 2.2 课程列表

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建课程列表页 | ⬜ 待做 | `src/pages/admin/CourseList.tsx` |
| 实现课程查询 | ⬜ 待做 | Supabase select |
| 课程状态筛选 | ⬜ 待做 | draft/published |

### 验收标准

- [ ] 列表显示所有课程
- [ ] 可按状态筛选

---

## 2.3 课程创建/编辑

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建课程表单组件 | ⬜ 待做 | `src/components/admin/CourseForm.tsx` |
| 创建新建课程页 | ⬜ 待做 | `src/pages/admin/CourseCreate.tsx` |
| 创建编辑课程页 | ⬜ 待做 | `src/pages/admin/CourseEdit.tsx` |
| 封面图 URL 输入 | ⬜ 待做 | 暂用 URL，后续改上传 |
| 课程上下架 | ⬜ 待做 | status 切换 |

### 验收标准

- [ ] 创建课程 → 列表显示
- [ ] 编辑课程 → 保存成功
- [ ] 发布/下架 → 状态更新

---

## 2.4 章节管理

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建章节列表组件 | ⬜ 待做 | `src/components/admin/ChapterList.tsx` |
| 创建章节表单组件 | ⬜ 待做 | `src/components/admin/ChapterForm.tsx` |
| 章节 CRUD | ⬜ 待做 | 增删改查 |
| 章节排序 | ⬜ 待做 | sort_order 调整 |

### 验收标准

- [ ] 添加章节 → 列表显示
- [ ] 编辑章节 → 保存成功
- [ ] 调整顺序 → 顺序保存

---

## 2.5 Novel 编辑器

| 任务 | 状态 | 产出 |
|------|------|------|
| 安装 novel 依赖 | ⬜ 待做 | package.json |
| 创建 CourseEditor 组件 | ⬜ 待做 | `src/components/admin/CourseEditor.tsx` |
| 内容保存/加载 | ⬜ 待做 | JSONB 格式 |

### 验收标准

- [ ] 编辑器正常加载
- [ ] 内容保存到数据库
- [ ] 重新打开显示已有内容

---

## 暂不实现（移至后续阶段）

以下功能移至 Phase 4（存储功能）：
- 图片上传（R2）
- 视频上传（Stream）
- 视频播放器

以下功能移至 Phase 5（支付闭环）：
- 学习页面
- 购买权限检查

---

## 相关文档

- [Phase 1: 基础设施](./phase-1-infra.md) - 前置依赖
- [Phase 3: 认证](./phase-3-auth.md) - 后续阶段
- [PAGES.md](../planning/PAGES.md) - 页面结构

---

[PROTOCOL]: 任务状态变更时更新此文档
