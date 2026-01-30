# Phase 1: 最小基础设施

> 状态: 🚧 进行中 | 开始: 2026-01-30

## 目标

只做课程管理必须的基础设施，快速进入核心功能开发。

---

## 1.1 Supabase 项目

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 Supabase 项目 | ⬜ 待做 | Project URL + Anon Key |
| 配置 .env 文件 | ⬜ 待做 | `.env` |

### 操作步骤

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目（区域选 Singapore）
3. 记录 Project URL 和 Anon Key

---

## 1.2 数据库 Schema

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 courses 表 | ⬜ 待做 | SQL 已执行 |
| 创建 chapters 表 | ⬜ 待做 | SQL 已执行 |

### SQL（简化版，暂不含用户关联）

```sql
-- 课程表
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 章节表
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 暂时关闭 RLS（开发阶段）
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

-- 允许所有操作（开发阶段）
CREATE POLICY "Allow all for courses" ON courses FOR ALL USING (true);
CREATE POLICY "Allow all for chapters" ON chapters FOR ALL USING (true);

-- 索引
CREATE INDEX idx_chapters_course ON chapters(course_id);
```

---

## 1.3 前端连接

| 任务 | 状态 | 产出 |
|------|------|------|
| 安装 @supabase/supabase-js | ⬜ 待做 | package.json |
| 创建 Supabase 客户端 | ⬜ 待做 | `src/lib/supabase.ts` |

### 验收标准

- [ ] `npm run dev` 无报错
- [ ] 控制台能打印 Supabase 连接成功

---

## 相关文档

- [TECH-SPEC.md](../planning/TECH-SPEC.md) - 完整技术架构
- [ENV-TEMPLATE.md](../planning/ENV-TEMPLATE.md) - 环境变量说明

---

[PROTOCOL]: 任务状态变更时更新此文档
