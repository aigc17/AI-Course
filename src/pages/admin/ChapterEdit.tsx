/**
 * [INPUT]: @supabase/supabase-js - 章节数据
 * [INPUT]: CourseEditor - Novel 富文本编辑器
 * [OUTPUT]: ChapterEdit - 章节内容编辑页面
 * [POS]: 管理后台章节内容编辑，支持图文编辑
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CourseEditor } from '@/components/admin/CourseEditor';
import { Button } from '@/components/ui/form/button';
import { Input } from '@/components/ui/form/input';
import { Label } from '@/components/ui/form/label';
import type { JSONContent } from 'novel';

// ============================================================================
// 类型定义
// ============================================================================

interface Chapter {
  id: string;
  title: string;
  type: 'video' | 'article';
  content: JSONContent | null;
  video_id: string | null;
  course_id: string;
}

// ============================================================================
// ChapterEdit 组件
// ============================================================================

export default function ChapterEdit() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [title, setTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (chapterId) loadChapter(chapterId);
  }, [chapterId]);

  async function loadChapter(id: string) {
    const { data } = await supabase.from('chapters').select('*').eq('id', id).single();
    if (data) {
      setChapter(data);
      setTitle(data.title);
      setVideoId(data.video_id ?? '');
    }
  }

  async function handleSaveContent(content: JSONContent) {
    if (!chapterId) return;
    setIsSaving(true);

    await supabase.from('chapters').update({ content }).eq('id', chapterId);

    setIsSaving(false);
    alert('内容已保存');
  }

  async function handleSaveInfo() {
    if (!chapterId) return;
    setIsSaving(true);

    await supabase.from('chapters').update({ title, video_id: videoId || null }).eq('id', chapterId);

    setIsSaving(false);
    alert('信息已保存');
  }

  if (!chapter) {
    return <div className="p-8 text-muted-foreground">加载中...</div>;
  }

  return (
    <div className="p-8">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(`/admin/courses/${courseId}`)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回课程
      </Button>

      <h1 className="text-2xl font-bold mb-8">编辑章节</h1>

      {/* 基本信息 */}
      <div className="border border-border p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">基本信息</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label>章节标题</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          {chapter.type === 'video' && (
            <div className="space-y-2">
              <Label>视频 ID (Cloudflare Stream)</Label>
              <Input value={videoId} onChange={(e) => setVideoId(e.target.value)} placeholder="输入视频 ID" />
            </div>
          )}
        </div>
        <Button onClick={handleSaveInfo} isLoading={isSaving}>保存信息</Button>
      </div>

      {/* 内容编辑器 */}
      {chapter.type === 'article' && (
        <div className="border border-border p-6">
          <h2 className="text-lg font-medium mb-4">图文内容</h2>
          <CourseEditor
            initialContent={chapter.content ?? undefined}
            onSave={handleSaveContent}
          />
        </div>
      )}

      {chapter.type === 'video' && (
        <div className="border border-border p-6">
          <h2 className="text-lg font-medium mb-4">视频说明（可选）</h2>
          <p className="text-sm text-muted-foreground mb-4">
            可以在视频下方添加补充说明文字
          </p>
          <CourseEditor
            initialContent={chapter.content ?? undefined}
            onSave={handleSaveContent}
          />
        </div>
      )}
    </div>
  );
}
