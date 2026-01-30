/**
 * [INPUT]: @/types - Course 类型定义
 * [INPUT]: framer-motion - 动画库
 * [INPUT]: lucide-react - 图标
 * [OUTPUT]: CourseCard - 课程卡片组件
 * [POS]: 课程列表中的卡片展示组件
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Star, Users, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

// ============================================================================
// Sub Components
// ============================================================================

const PlayOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
    <div className="rounded-full bg-primary p-3">
      <PlayCircle className="h-6 w-6 text-primary-foreground" />
    </div>
  </div>
);

const Thumbnail = ({ src, alt, duration }: { src: string; alt: string; duration: string }) => (
  <div className="relative aspect-video w-full overflow-hidden">
    <img src={src} alt={alt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <PlayOverlay />
    <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
      {duration}
    </div>
  </div>
);

const CardMeta = ({ level, rating }: { level: string; rating: number }) => (
  <div className="mb-2 flex items-center justify-between">
    <Badge variant="outline" className="text-xs">{level}</Badge>
    <div className="flex items-center gap-1 text-primary">
      <Star className="h-3.5 w-3.5 fill-current" />
      <span className="text-sm font-medium">{rating}</span>
    </div>
  </div>
);

const CardFooter = ({ instructor, students }: { instructor: string; students: string }) => (
  <div className="flex items-center justify-between border-t border-border pt-3">
    <div className="flex items-center gap-2">
      <div className="h-5 w-5 rounded-full bg-muted" />
      <span className="text-xs text-muted-foreground">{instructor}</span>
    </div>
    <div className="flex items-center gap-1 text-muted-foreground">
      <Users className="h-3.5 w-3.5" />
      <span className="text-xs">{students}</span>
    </div>
  </div>
);

// ============================================================================
// Main Component
// ============================================================================

interface CourseCardProps {
  course: Course;
  onClick: (courseId: string) => void;
}

const CourseCard = ({ course, onClick }: CourseCardProps) => (
  <motion.div whileHover={{ y: -4 }} className="cursor-pointer" onClick={() => onClick(course.id)}>
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Thumbnail src={course.thumbnail} alt={course.title} duration={course.duration} />
      <CardContent className="p-4">
        <CardMeta level={course.level} rating={course.rating} />
        <h3 className="mb-2 line-clamp-2 font-semibold group-hover:text-primary">{course.title}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
        <CardFooter instructor={course.instructor} students={course.students} />
      </CardContent>
    </Card>
  </motion.div>
);

export default CourseCard;
