-- ============================================================================
-- AI Nexus 课程平台 - 数据库 Schema (Phase 1 简化版)
-- 执行位置: Supabase Dashboard → SQL Editor
-- ============================================================================

-- 课程表
CREATE TABLE IF NOT EXISTS courses (
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
CREATE TABLE IF NOT EXISTS chapters (
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

-- 索引
CREATE INDEX IF NOT EXISTS idx_chapters_course ON chapters(course_id);
CREATE INDEX IF NOT EXISTS idx_chapters_sort ON chapters(course_id, sort_order);

-- RLS（开发阶段允许所有操作）
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for courses" ON courses;
DROP POLICY IF EXISTS "Allow all for chapters" ON chapters;

CREATE POLICY "Allow all for courses" ON courses FOR ALL USING (true);
CREATE POLICY "Allow all for chapters" ON chapters FOR ALL USING (true);

-- 自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
DROP TRIGGER IF EXISTS update_chapters_updated_at ON chapters;

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_chapters_updated_at
  BEFORE UPDATE ON chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 验证
SELECT 'Schema created successfully!' as status;
