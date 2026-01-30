import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Lock, FileText, Download, MessageSquare, Share2 } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { ViewState } from '../types';

interface CourseDetailProps {
  courseId: string;
  onBack: (view: ViewState) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId, onBack }) => {
  const [activeChapter, setActiveChapter] = useState('');
  const course = MOCK_COURSES.find(c => c.id === courseId);

  useEffect(() => {
    if (course && course.chapters.length > 0) {
      setActiveChapter(course.chapters[0].id);
    }
  }, [course]);

  if (!course) return <div>Course not found</div>;

  const currentChapter = course.chapters.find(c => c.id === activeChapter);

  return (
    <div className="min-h-screen bg-dark-900 pb-10">
      {/* Top Navigation */}
      <div className="border-b border-white/10 bg-dark-800 px-4 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <button 
            onClick={() => onBack('CATALOG')}
            className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">{course.title}</h2>
            <p className="text-xs text-slate-400 sm:text-sm">{currentChapter?.title || 'Loading...'}</p>
          </div>
          <div className="ml-auto">
             <button className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 sm:text-sm">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">分享</span>
             </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-6 grid gap-6 px-4 lg:grid-cols-3">
        {/* Left Column: Video Player & Info */}
        <div className="lg:col-span-2">
          {/* Video Player Placeholder */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
            {/* Using a placeholder image for the "video" to simulate paused state or mock player */}
            <img 
                src={`https://picsum.photos/seed/${course.id}/1280/720`} 
                alt="Video Placeholder" 
                className="h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 shadow-xl transition-transform hover:scale-110 active:scale-95">
                    <Play className="h-8 w-8 fill-white text-white ml-1" />
                    <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary-600 opacity-30"></div>
                </button>
                <p className="mt-4 font-medium text-white drop-shadow-md">预览模式 - 点击播放</p>
            </div>
            
            {/* Fake Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full w-1/3 bg-primary-500"></div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-2xl border border-white/5 bg-dark-800 p-6">
            <div className="mb-6 flex gap-6 border-b border-white/5 pb-4">
                <button className="border-b-2 border-primary-500 pb-4 text-sm font-semibold text-primary-400">课程概览</button>
                <button className="pb-4 text-sm font-semibold text-slate-400 hover:text-white">资料下载</button>
                <button className="pb-4 text-sm font-semibold text-slate-400 hover:text-white">学员评价 (24)</button>
            </div>
            
            <h3 className="mb-4 text-xl font-bold text-white">关于本课程</h3>
            <p className="mb-6 leading-relaxed text-slate-300">
                {course.description} 
                <br /><br />
                本课程适合希望深入了解 {course.category} 领域的开发者。我们将从基础概念讲起，逐步深入到复杂的工程实践。通过本课程，你将掌握构建企业级 AI 应用所需的全部技能。
            </p>

            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                <div>
                    <div className="font-bold text-white">{course.instructor}</div>
                    <div className="text-sm text-slate-400">AI 资深技术专家</div>
                </div>
                <button className="ml-auto rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/5">
                    关注讲师
                </button>
            </div>
          </div>
        </div>

        {/* Right Column: Syllabus */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-white/5 bg-dark-800">
            <div className="border-b border-white/5 bg-white/5 p-4">
                <h3 className="font-bold text-white">课程大纲</h3>
                <p className="text-xs text-slate-400">共 {course.chapters.length} 节 • {course.duration}</p>
            </div>
            <div className="max-h-[600px] overflow-y-auto p-2">
                {course.chapters.map((chapter, index) => (
                    <button
                        key={chapter.id}
                        onClick={() => !chapter.isLocked && setActiveChapter(chapter.id)}
                        className={`mb-1 flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors
                            ${activeChapter === chapter.id 
                                ? 'bg-primary-500/10 ring-1 ring-primary-500/50' 
                                : 'hover:bg-white/5'
                            }
                            ${chapter.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                    >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-slate-400">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <div className={`text-sm font-medium ${activeChapter === chapter.id ? 'text-primary-400' : 'text-slate-200'}`}>
                                {chapter.title}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                                <Play className="h-3 w-3" />
                                {chapter.duration}
                            </div>
                        </div>
                        {chapter.isLocked && <Lock className="h-4 w-4 text-slate-500" />}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;