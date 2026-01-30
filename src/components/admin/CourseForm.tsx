/**
 * [INPUT]: react-hook-form - 表单状态管理
 * [OUTPUT]: CourseForm - 课程表单组件
 * [POS]: 课程创建/编辑的表单组件，复用于 Create 和 Edit 页面
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

export interface CourseFormData {
  title: string;
  description: string;
  cover_url: string;
  price: number;
  category: string;
  status: 'draft' | 'published';
}

interface CourseFormProps {
  defaultValues?: Partial<CourseFormData>;
  onSubmit: (data: CourseFormData) => Promise<void>;
  isLoading?: boolean;
}

// ============================================================================
// CourseForm 组件
// ============================================================================

export function CourseForm({ defaultValues, onSubmit, isLoading }: CourseFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CourseFormData>({
    defaultValues: {
      title: '',
      description: '',
      cover_url: '',
      price: 0,
      category: '',
      status: 'draft',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField label="课程标题" error={errors.title?.message} required>
        <Input {...register('title', { required: '请输入课程标题' })} placeholder="输入课程标题" />
      </FormField>

      <FormField label="课程描述" error={errors.description?.message}>
        <textarea
          {...register('description')}
          placeholder="输入课程描述"
          rows={4}
          className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
        />
      </FormField>

      <FormField label="封面图 URL" error={errors.cover_url?.message}>
        <Input {...register('cover_url')} placeholder="https://example.com/cover.jpg" />
      </FormField>

      <div className="grid grid-cols-2 gap-6">
        <FormField label="价格（分）" error={errors.price?.message}>
          <Input type="number" {...register('price', { valueAsNumber: true })} placeholder="9900" />
        </FormField>

        <FormField label="分类" error={errors.category?.message}>
          <Input {...register('category')} placeholder="AI / 编程 / 设计" />
        </FormField>
      </div>

      <FormField label="状态">
        <select
          {...register('status')}
          className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
        >
          <option value="draft">草稿</option>
          <option value="published">已发布</option>
        </select>
      </FormField>

      <div className="flex gap-4 pt-4">
        <Button type="submit" isLoading={isLoading}>保存课程</Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>取消</Button>
      </div>
    </form>
  );
}

// ============================================================================
// FormField 组件
// ============================================================================

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
