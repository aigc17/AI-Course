/**
 * [INPUT]: @supabase/supabase-js - 章节 CRUD
 * [OUTPUT]: ChapterList - 章节列表管理组件
 * [POS]: 课程编辑页面的章节管理区域
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useEffect, useState } from 'react';
import { Plus, GripVertical, Pencil, Trash2, Video, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/form/button';
import { ChapterForm, type ChapterFormData } from './ChapterForm';

// ============================================================================
// 类型定义
// ============================================================================

interface Chapter {
  id: string;
  title: string;
  type: 'video' | 'article';
  sort_order: number;
  is_free_preview: boolean;
}

interface ChapterListProps {
  courseId: string;
}

// ============================================================================
// ChapterList 组件
// ============================================================================

export function ChapterList({ courseId }: ChapterListProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadChapters();
  }, [courseId]);

  async function loadChapters() {
    const { data } = await supabase
      .from('chapters')
      .select('id, title, type, sort_order, is_free_preview')
      .eq('course_id', courseId)
      .order('sort_order');

    setChapters(data ?? []);
    setLoading(false);
  }

  async function handleCreate(data: ChapterFormData) {
    const maxOrder = chapters.length > 0 ? Math.max(...chapters.map(c => c.sort_order)) : -1;

    await supabase.from('chapters').insert({
      ...data,
      course_id: courseId,
      sort_order: maxOrder + 1,
    });

    setIsCreating(false);
    loadChapters();
  }

  async function handleUpdate(id: string, data: ChapterFormData) {
    await supabase.from('chapters').update(data).eq('id', id);
    setEditingId(null);
    loadChapters();
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除此章节？')) return;
    await supabase.from('chapters').delete().eq('id', id);
    loadChapters();
  }

  if (loading) {
    return <div className="text-muted-foreground">加载中...</div>;
  }

  return (
    <div className="space-y-4">
      {/* 章节列表 */}
      <div className="border border-border divide-y divide-border">
        {chapters.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">暂无章节</div>
        ) : (
          chapters.map((chapter) => (
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              isEditing={editingId === chapter.id}
              onEdit={() => setEditingId(chapter.id)}
              onCancel={() => setEditingId(null)}
              onSave={(data) => handleUpdate(chapter.id, data)}
              onDelete={() => handleDelete(chapter.id)}
            />
          ))
        )}
      </div>

      {/* 添加章节 */}
      {isCreating ? (
        <div className="border border-border p-4">
          <ChapterForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
        </div>
      ) : (
        <Button variant="outline" className="w-full" onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          添加章节
        </Button>
      )}
    </div>
  );
}

// ============================================================================
// ChapterItem 组件
// ============================================================================

interface ChapterItemProps {
  chapter: Chapter;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (data: ChapterFormData) => void;
  onDelete: () => void;
}

function ChapterItem({ chapter, isEditing, onEdit, onCancel, onSave, onDelete }: ChapterItemProps) {
  if (isEditing) {
    return (
      <div className="p-4">
        <ChapterForm defaultValues={chapter} onSubmit={onSave} onCancel={onCancel} />
      </div>
    );
  }

  const Icon = chapter.type === 'video' ? Video : FileText;

  return (
    <div className="flex items-center gap-3 p-4 hover:bg-muted/30">
      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1">{chapter.title}</span>
      {chapter.is_free_preview && (
        <span className="text-xs bg-muted px-2 py-1">免费预览</span>
      )}
      <Button variant="ghost" size="icon" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
