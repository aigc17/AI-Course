/**
 * [INPUT]: CourseForm - 课程表单组件
 * [INPUT]: ChapterList - 章节列表组件
 * [INPUT]: @supabase/supabase-js - 数据查询/更新
 * [OUTPUT]: CourseEdit - 编辑课程页面
 * [POS]: 管理后台编辑课程的页面，包含章节管理
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CourseForm, type CourseFormData } from '@/components/admin/CourseForm';
import { ChapterList } from '@/components/admin/ChapterList';
import { Button } from '@/components/ui/form/button';

// ============================================================================
// CourseEdit 组件
// ============================================================================

export default function CourseEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) loadCourse(id);
  }, [id]);

  async function loadCourse(courseId: string) {
    const { data } = await supabase.from('courses').select('*').eq('id', courseId).single();
    if (data) setCourse(data);
  }

  async function handleSubmit(data: CourseFormData) {
    if (!id) return;
    setIsLoading(true);

    const { error } = await supabase.from('courses').update(data).eq('id', id);

    if (error) {
      alert('保存失败: ' + error.message);
      setIsLoading(false);
      return;
    }

    navigate('/admin/courses');
  }

  if (!course) {
    return <div className="p-8 text-muted-foreground">加载中...</div>;
  }

  return (
    <div className="p-8">
      <Button variant="ghost" className="mb-6" onClick={() => navigate('/admin/courses')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回课程列表
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 课程信息 */}
        <div>
          <h1 className="text-2xl font-bold mb-8">编辑课程</h1>
          <CourseForm defaultValues={course} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* 章节管理 */}
        <div>
          <h2 className="text-2xl font-bold mb-8">章节管理</h2>
          <ChapterList courseId={id!} />
        </div>
      </div>
    </div>
  );
}
