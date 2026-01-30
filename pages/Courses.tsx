import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { MOCK_COURSES } from '../constants';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

const CATEGORIES = ['All', 'LLM', 'Generative AI', 'Computer Vision', 'Data Science'];

const Courses = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">探索课程</h1>
            <p className="text-muted-foreground">发现适合你的 AI 进阶之路</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Input 
              type="text" 
              placeholder="搜索课程、讲师..." 
              className="pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 pr-4 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>分类:</span>
          </div>
          {CATEGORIES.map(cat => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="cursor-pointer px-4 py-1.5 text-sm hover:bg-primary/90 hover:text-primary-foreground"
            >
              {cat}
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            更多筛选
          </Button>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onClick={(id) => navigate(`/courses/${id}`)} 
                />
            ))}
            </div>
        ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-secondary/10">
                <p className="text-lg text-muted-foreground">未找到相关课程</p>
                <Button 
                  variant="link"
                  onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                >
                  清除筛选
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Courses;