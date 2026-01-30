import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import { MOCK_COURSES } from '../constants';
import { Course } from '../types';

interface CoursesProps {
  onCourseSelect: (courseId: string) => void;
}

const CATEGORIES = ['All', 'LLM', 'Generative AI', 'Computer Vision', 'Data Science'];

const Courses: React.FC<CoursesProps> = ({ onCourseSelect }) => {
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
            <h1 className="mb-2 text-3xl font-bold text-white">探索课程</h1>
            <p className="text-slate-400">发现适合你的 AI 进阶之路</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="搜索课程、讲师..." 
              className="w-full rounded-xl border border-white/10 bg-dark-800 py-3 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 pr-4 text-sm font-medium text-slate-400">
            <Filter className="h-4 w-4" />
            <span>分类:</span>
          </div>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all
                ${selectedCategory === cat 
                  ? 'border-primary-500 bg-primary-500/10 text-primary-400' 
                  : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white">
            <SlidersHorizontal className="h-4 w-4" />
            <span>更多筛选</span>
          </button>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
                <CourseCard 
                key={course.id} 
                course={course} 
                onClick={onCourseSelect} 
                />
            ))}
            </div>
        ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5">
                <p className="text-lg text-slate-400">未找到相关课程</p>
                <button 
                  onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                  className="mt-2 text-primary-400 hover:underline"
                >
                  清除筛选
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Courses;