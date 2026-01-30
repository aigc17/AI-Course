/**
 * [INPUT]: @supabase/supabase-js - 数据查询
 * [OUTPUT]: CourseList - 课程列表页
 * [POS]: 管理后台课程列表，支持筛选和 CRUD 操作入口
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/form/button';
import { Badge } from '@/components/ui/display/badge';

// ============================================================================
// 类型定义
// ============================================================================

interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number;
  status: 'draft' | 'published';
  category: string | null;
  created_at: string;
}

type StatusFilter = 'all' | 'draft' | 'published';

// ============================================================================
// CourseList 组件
// ============================================================================

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    loadCourses();
  }, [filter]);

  async function loadCourses() {
    setLoading(true);
    let query = supabase.from('courses').select('*').order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    setCourses(data ?? []);
    setLoading(false);
  }

  async function deleteCourse(id: string) {
    if (!confirm('确定删除此课程？')) return;
    await supabase.from('courses').delete().eq('id', id);
    loadCourses();
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">课程管理</h1>
        <Button asChild>
          <Link to="/admin/courses/new">
            <Plus className="h-4 w-4 mr-2" />
            创建课程
          </Link>
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>全部</FilterButton>
        <FilterButton active={filter === 'draft'} onClick={() => setFilter('draft')}>草稿</FilterButton>
        <FilterButton active={filter === 'published'} onClick={() => setFilter('published')}>已发布</FilterButton>
      </div>

      {/* Table */}
      <div className="border border-border">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">课程名称</th>
              <th className="text-left p-4 font-medium">状态</th>
              <th className="text-left p-4 font-medium">价格</th>
              <th className="text-left p-4 font-medium">创建时间</th>
              <th className="text-right p-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <CourseTableBody courses={courses} loading={loading} onDelete={deleteCourse} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 子组件
// ============================================================================

interface TableBodyProps {
  courses: Course[];
  loading: boolean;
  onDelete: (id: string) => void;
}

function CourseTableBody({ courses, loading, onDelete }: TableBodyProps) {
  if (loading) {
    return <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">加载中...</td></tr>;
  }
  if (courses.length === 0) {
    return <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">暂无课程</td></tr>;
  }
  return <>{courses.map((course) => <CourseRow key={course.id} course={course} onDelete={onDelete} />)}</>;
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm transition-colors ${active ? 'bg-foreground text-background' : 'bg-muted text-foreground hover:bg-muted/80'}`}
    >
      {children}
    </button>
  );
}

function CourseRow({ course, onDelete }: { course: Course; onDelete: (id: string) => void }) {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30">
      <td className="p-4">
        <Link to={`/admin/courses/${course.id}`} className="font-medium hover:underline">
          {course.title}
        </Link>
      </td>
      <td className="p-4">
        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
          {course.status === 'published' ? '已发布' : '草稿'}
        </Badge>
      </td>
      <td className="p-4">¥{(course.price / 100).toFixed(2)}</td>
      <td className="p-4 text-muted-foreground">{new Date(course.created_at).toLocaleDateString()}</td>
      <td className="p-4 text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/admin/courses/${course.id}`}><Pencil className="h-4 w-4" /></Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(course.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
