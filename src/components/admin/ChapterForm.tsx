/**
 * [INPUT]: react-hook-form - 表单状态管理
 * [OUTPUT]: ChapterForm - 章节表单组件
 * [POS]: 章节创建/编辑的表单组件
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/form/button';
import { Input } from '@/components/ui/form/input';
import { Label } from '@/components/ui/form/label';

// ============================================================================
// 类型定义
// ============================================================================

export interface ChapterFormData {
  title: string;
  type: 'video' | 'article';
  video_id: string;
  is_free_preview: boolean;
}

interface ChapterFormProps {
  defaultValues?: Partial<ChapterFormData>;
  onSubmit: (data: ChapterFormData) => void;
  onCancel: () => void;
}

// ============================================================================
// ChapterForm 组件
// ============================================================================

export function ChapterForm({ defaultValues, onSubmit, onCancel }: ChapterFormProps) {
  const { register, handleSubmit, watch } = useForm<ChapterFormData>({
    defaultValues: {
      title: '',
      type: 'article',
      video_id: '',
      is_free_preview: false,
      ...defaultValues,
    },
  });

  const chapterType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>章节标题</Label>
        <Input {...register('title', { required: true })} placeholder="输入章节标题" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>类型</Label>
          <select
            {...register('type')}
            className="w-full border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="article">图文</option>
            <option value="video">视频</option>
          </select>
        </div>

        {chapterType === 'video' && (
          <div className="space-y-2">
            <Label>视频 ID</Label>
            <Input {...register('video_id')} placeholder="Cloudflare Stream ID" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_free_preview" {...register('is_free_preview')} />
        <Label htmlFor="is_free_preview" className="cursor-pointer">允许免费预览</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" size="sm">保存</Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>取消</Button>
      </div>
    </form>
  );
}
