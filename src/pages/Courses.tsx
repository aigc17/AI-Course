/**
 * [INPUT]: react-router-dom, @/components/CourseCard, @/constants, @/components/ui/*
 * [OUTPUT]: Courses - 课程列表页
 * [POS]: 课程浏览页面，支持分类筛选和搜索
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { MOCK_COURSES } from '../constants';
import { Button } from '../components/ui/form';
import { Input } from '../components/ui/form';
import { Badge } from '../components/ui/display';

// ============================================================================
// 常量
// ============================================================================

const CATEGORIES = ['All', 'LLM', 'Generative AI', 'Computer Vision', 'Data Science'];

// ============================================================================
// 子组件
// ============================================================================

const PageHeader = () => (
  <div>
    <h1 className="mb-2 text-3xl font-bold tracking-tight">探索课程</h1>
    <p className="text-muted-foreground">发现适合你的 AI 进阶之路</p>
  </div>
);

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="relative w-full md:w-96">
    <Input
      type="text"
      placeholder="搜索课程、讲师..."
      className="pl-12"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Search className="absolute left-4 top-2.5 h-5 w-5 text-muted-foreground" />
  </div>
);

interface CategoryFilterProps {
  selected: string;
  onSelect: (cat: string) => void;
}

const CategoryBadges = ({ selected, onSelect }: CategoryFilterProps) => (
  <>
    {CATEGORIES.map(cat => (
      <Badge
        key={cat}
        variant={selected === cat ? 'default' : 'outline'}
        onClick={() => onSelect(cat)}
        className="cursor-pointer px-4 py-1.5 text-sm"
      >
        {cat}
      </Badge>
    ))}
  </>
);

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => (
  <div className="mb-8 flex flex-wrap items-center gap-3">
    <div className="flex items-center gap-2 pr-4 text-sm font-medium text-muted-foreground">
      <Filter className="h-4 w-4" />
      <span>分类:</span>
    </div>
    <CategoryBadges selected={selected} onSelect={onSelect} />
    <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground">
      <SlidersHorizontal className="mr-2 h-4 w-4" />
      更多筛选
    </Button>
  </div>
);

interface EmptyStateProps {
  onClear: () => void;
}

const EmptyState = ({ onClear }: EmptyStateProps) => (
  <div className="flex h-64 flex-col items-center justify-center border border-dashed bg-muted/10">
    <p className="text-lg text-muted-foreground">未找到相关课程</p>
    <Button variant="link" onClick={onClear}>清除筛选</Button>
  </div>
);

interface CourseGridProps {
  courses: typeof MOCK_COURSES;
  onCourseClick: (id: string) => void;
}

const CourseGrid = ({ courses, onCourseClick }: CourseGridProps) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {courses.map((course) => (
      <CourseCard key={course.id} course={course} onClick={onCourseClick} />
    ))}
  </div>
);

// ============================================================================
// 主组件
// ============================================================================

const Courses = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClear = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <PageHeader />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

        {filteredCourses.length > 0 ? (
          <CourseGrid courses={filteredCourses} onCourseClick={(id) => navigate(`/courses/${id}`)} />
        ) : (
          <EmptyState onClear={handleClear} />
        )}
      </div>
    </div>
  );
};

export default Courses;
