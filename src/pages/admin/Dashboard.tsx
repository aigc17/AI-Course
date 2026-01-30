/**
 * [INPUT]: @supabase/supabase-js - 数据查询
 * [OUTPUT]: Dashboard - 管理后台首页
 * [POS]: 管理后台入口页面，展示数据概览
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/form/button';

// ============================================================================
// 类型定义
// ============================================================================

interface Stats {
  totalCourses: number;
  publishedCourses: number;
  totalChapters: number;
}

// ============================================================================
// Dashboard 组件
// ============================================================================

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ totalCourses: 0, publishedCourses: 0, totalChapters: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const [coursesRes, publishedRes, chaptersRes] = await Promise.all([
      supabase.from('courses').select('id', { count: 'exact', head: true }),
      supabase.from('courses').select('id', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('chapters').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      totalCourses: coursesRes.count ?? 0,
      publishedCourses: publishedRes.count ?? 0,
      totalChapters: chaptersRes.count ?? 0,
    });
    setLoading(false);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">仪表盘</h1>
        <Button asChild>
          <Link to="/admin/courses/new">
            <Plus className="h-4 w-4 mr-2" />
            创建课程
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={BookOpen} label="全部课程" value={stats.totalCourses} loading={loading} />
        <StatCard icon={BookOpen} label="已发布" value={stats.publishedCourses} loading={loading} />
        <StatCard icon={FileText} label="全部章节" value={stats.totalChapters} loading={loading} />
      </div>

      {/* Quick Actions */}
      <div className="border border-border p-6">
        <h2 className="text-lg font-medium mb-4">快捷操作</h2>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link to="/admin/courses">管理课程</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/courses/new">创建新课程</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// StatCard 组件
// ============================================================================

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  loading: boolean;
}

function StatCard({ icon: Icon, label, value, loading }: StatCardProps) {
  return (
    <div className="border border-border p-6">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-3xl font-bold">{loading ? '-' : value}</p>
    </div>
  );
}
