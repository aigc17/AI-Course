/**
 * [INPUT]: CourseForm - 课程表单组件
 * [INPUT]: @supabase/supabase-js - 数据插入
 * [OUTPUT]: CourseCreate - 创建课程页面
 * [POS]: 管理后台创建新课程的页面
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CourseForm, type CourseFormData } from '@/components/admin/CourseForm';
import { Button } from '@/components/ui/form/button';

// ============================================================================
// CourseCreate 组件
// ============================================================================

export default function CourseCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(data: CourseFormData) {
    setIsLoading(true);
    const { error } = await supabase.from('courses').insert(data);

    if (error) {
      alert('创建失败: ' + error.message);
      setIsLoading(false);
      return;
    }

    navigate('/admin/courses');
  }

  return (
    <div className="p-8 max-w-2xl">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回
      </Button>

      <h1 className="text-2xl font-bold mb-8">创建课程</h1>

      <CourseForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
