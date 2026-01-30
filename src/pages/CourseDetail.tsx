/**
 * [INPUT]: react-router-dom, @/constants, @/components/ui/form, @/components/ui/layout
 * [OUTPUT]: CourseDetail - 课程详情页
 * [POS]: 课程详情展示页面，包含视频播放器和课程大纲
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Lock, Share2 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { Button } from '../components/ui/form';
import { Card, CardContent } from '../components/ui/layout';

// ============================================================================
// 子组件
// ============================================================================

const TopNav = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="sticky top-16 z-40 border-b bg-background/95 px-4 py-4 backdrop-blur">
    <div className="container mx-auto flex items-center gap-4">
      <Button variant="ghost" size="icon" asChild>
        <Link to="/courses">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </Button>
      <div>
        <h2 className="line-clamp-1 text-lg font-bold sm:text-xl">{title}</h2>
        <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
      </div>
      <div className="ml-auto">
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">分享</span>
        </Button>
      </div>
    </div>
  </div>
);

const VideoPlayer = ({ courseId }: { courseId: string }) => (
  <div className="relative aspect-video w-full overflow-hidden border border-border bg-black">
    <img
      src={`https://picsum.photos/seed/${courseId}/1280/720`}
      alt="Video Placeholder"
      className="h-full w-full object-cover opacity-50"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="flex h-20 w-20 cursor-pointer items-center justify-center bg-foreground">
        <Play className="ml-1 h-8 w-8 fill-background text-background" />
      </div>
      <p className="mt-4 font-medium text-foreground">预览模式 - 点击播放</p>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
      <div className="h-full w-1/3 bg-foreground" />
    </div>
  </div>
);

interface TabButtonProps {
  active?: boolean;
  children: React.ReactNode;
}

const TabButton = ({ active, children }: TabButtonProps) => (
  <button
    className={`whitespace-nowrap pb-4 text-sm font-semibold transition-colors ${
      active ? 'border-b-2 border-foreground text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`}
  >
    {children}
  </button>
);

const TabNav = () => (
  <div className="mb-6 flex gap-6 overflow-x-auto border-b pb-4">
    <TabButton active>课程概览</TabButton>
    <TabButton>资料下载</TabButton>
    <TabButton>学员评价 (24)</TabButton>
  </div>
);

const InstructorCard = ({ name }: { name: string }) => (
  <div className="flex items-center gap-4 border border-border bg-muted/20 p-4">
    <div className="h-12 w-12 shrink-0 bg-foreground" />
    <div>
      <div className="font-bold">{name}</div>
      <div className="text-sm text-muted-foreground">AI 资深技术专家</div>
    </div>
    <Button variant="secondary" className="ml-auto">关注讲师</Button>
  </div>
);

interface CourseInfoProps {
  description: string;
  category: string;
  instructor: string;
}

const CourseInfo = ({ description, category, instructor }: CourseInfoProps) => (
  <Card>
    <CardContent className="p-6">
      <TabNav />
      <h3 className="mb-4 text-xl font-bold">关于本课程</h3>
      <p className="mb-6 leading-relaxed text-muted-foreground">
        {description}
        <br /><br />
        本课程适合希望深入了解 {category} 领域的开发者。
      </p>
      <InstructorCard name={instructor} />
    </CardContent>
  </Card>
);

interface ChapterItemProps {
  index: number;
  title: string;
  duration: string;
  isLocked: boolean;
  isActive: boolean;
  onClick: () => void;
}

const ChapterItem = ({ index, title, duration, isLocked, isActive, onClick }: ChapterItemProps) => {
  const baseClass = 'mb-1 flex w-full cursor-pointer items-center gap-3 p-3 text-left transition-colors';
  const activeClass = isActive ? 'bg-muted text-foreground' : 'hover:bg-muted/50';
  const lockedClass = isLocked ? 'pointer-events-none opacity-50' : '';

  return (
    <div onClick={onClick} className={`${baseClass} ${activeClass} ${lockedClass}`}>
      <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-muted text-xs font-medium">
        {index}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{title}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <Play className="h-3 w-3" />
          {duration}
        </div>
      </div>
      {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
    </div>
  );
};

interface SyllabusProps {
  chapters: Array<{ id: string; title: string; duration: string; isLocked: boolean }>;
  totalDuration: string;
  activeChapter: string;
  onChapterClick: (id: string) => void;
}

const Syllabus = ({ chapters, totalDuration, activeChapter, onChapterClick }: SyllabusProps) => (
  <Card className="sticky top-40 flex h-[calc(100vh-12rem)] flex-col">
    <div className="border-b bg-muted/10 p-4">
      <h3 className="font-bold">课程大纲</h3>
      <p className="text-xs text-muted-foreground">共 {chapters.length} 节 • {totalDuration}</p>
    </div>
    <div className="flex-1 overflow-y-auto p-2">
      {chapters.map((chapter, index) => (
        <ChapterItem
          key={chapter.id}
          index={index + 1}
          title={chapter.title}
          duration={chapter.duration}
          isLocked={chapter.isLocked}
          isActive={activeChapter === chapter.id}
          onClick={() => !chapter.isLocked && onChapterClick(chapter.id)}
        />
      ))}
    </div>
  </Card>
);

// ============================================================================
// 主组件
// ============================================================================

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeChapter, setActiveChapter] = useState('');
  const course = MOCK_COURSES.find(c => c.id === id);

  useEffect(() => {
    if (course && course.chapters.length > 0) {
      setActiveChapter(course.chapters[0].id);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Course not found
      </div>
    );
  }

  const currentChapter = course.chapters.find(c => c.id === activeChapter);

  return (
    <div className="min-h-screen pb-10">
      <TopNav title={course.title} subtitle={currentChapter?.title || 'Loading...'} />

      <div className="container mx-auto mt-6 grid gap-6 px-4 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <VideoPlayer courseId={course.id} />
          <CourseInfo
            description={course.description}
            category={course.category}
            instructor={course.instructor}
          />
        </div>

        <div className="lg:col-span-1">
          <Syllabus
            chapters={course.chapters}
            totalDuration={course.duration}
            activeChapter={activeChapter}
            onChapterClick={setActiveChapter}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
