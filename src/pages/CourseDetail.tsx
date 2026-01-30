import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Lock, Share2 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeChapter, setActiveChapter] = useState('');
  const course = MOCK_COURSES.find(c => c.id === id);

  useEffect(() => {
    if (course && course.chapters.length > 0) {
      setActiveChapter(course.chapters[0].id);
    }
  }, [course]);

  if (!course) return <div className="flex h-screen items-center justify-center text-muted-foreground">Course not found</div>;

  const currentChapter = course.chapters.find(c => c.id === activeChapter);

  return (
    <div className="min-h-screen pb-10">
      {/* Top Navigation */}
      <div className="sticky top-16 z-40 border-b bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/courses">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-lg font-bold sm:text-xl line-clamp-1">{course.title}</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">{currentChapter?.title || 'Loading...'}</p>
          </div>
          <div className="ml-auto">
             <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">分享</span>
             </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-6 grid gap-6 px-4 lg:grid-cols-3">
        {/* Left Column: Video Player & Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Video Player Placeholder */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-border">
            <img 
                src={`https://picsum.photos/seed/${course.id}/1280/720`} 
                alt="Video Placeholder" 
                className="h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-primary shadow-xl transition-transform hover:scale-110 active:scale-95">
                    <Play className="ml-1 h-8 w-8 fill-primary-foreground text-primary-foreground" />
                    <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-30"></div>
                </div>
                <p className="mt-4 font-medium text-foreground drop-shadow-md">预览模式 - 点击播放</p>
            </div>
            
            {/* Fake Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                <div className="h-full w-1/3 bg-primary"></div>
            </div>
          </div>

          {/* Description Card */}
          <Card>
            <CardContent className="p-6">
                <div className="mb-6 flex gap-6 overflow-x-auto border-b pb-4">
                    <button className="whitespace-nowrap border-b-2 border-primary pb-4 text-sm font-semibold text-primary">课程概览</button>
                    <button className="whitespace-nowrap pb-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">资料下载</button>
                    <button className="whitespace-nowrap pb-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">学员评价 (24)</button>
                </div>
                
                <h3 className="mb-4 text-xl font-bold">关于本课程</h3>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                    {course.description} 
                    <br /><br />
                    本课程适合希望深入了解 {course.category} 领域的开发者。我们将从基础概念讲起，逐步深入到复杂的工程实践。通过本课程，你将掌握构建企业级 AI 应用所需的全部技能。
                </p>

                <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/20 p-4">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-tr from-primary to-accent"></div>
                    <div>
                        <div className="font-bold">{course.instructor}</div>
                        <div className="text-sm text-muted-foreground">AI 资深技术专家</div>
                    </div>
                    <Button variant="secondary" className="ml-auto">
                        关注讲师
                    </Button>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Syllabus */}
        <div className="lg:col-span-1">
          <Card className="sticky top-40 flex h-[calc(100vh-12rem)] flex-col">
            <div className="border-b bg-secondary/10 p-4">
                <h3 className="font-bold">课程大纲</h3>
                <p className="text-xs text-muted-foreground">共 {course.chapters.length} 节 • {course.duration}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {course.chapters.map((chapter, index) => (
                    <div
                        key={chapter.id}
                        onClick={() => !chapter.isLocked && setActiveChapter(chapter.id)}
                        className={`mb-1 flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition-colors
                            ${activeChapter === chapter.id 
                                ? 'bg-primary/10 text-primary' 
                                : 'hover:bg-accent hover:text-accent-foreground'
                            }
                            ${chapter.isLocked ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}
                        `}
                    >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                            {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="truncate text-sm font-medium">
                                {chapter.title}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                <Play className="h-3 w-3" />
                                {chapter.duration}
                            </div>
                        </div>
                        {chapter.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;