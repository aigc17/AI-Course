import React from 'react';
import { Clock, Star, Users, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-dark-800 shadow-xl transition-all hover:shadow-2xl hover:shadow-primary-500/10"
      onClick={() => onClick(course.id)}
    >
      {/* Thumbnail Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80"></div>
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px]">
            <div className="rounded-full bg-primary-500/90 p-4 text-white shadow-lg backdrop-blur-md">
                <PlayCircle className="h-8 w-8 fill-current" />
            </div>
        </div>

        <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {course.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium 
            ${course.level === 'Beginner' ? 'bg-green-500/10 text-green-400' : 
              course.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' : 
              'bg-red-500/10 text-red-400'}`}>
            {course.level}
          </span>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-sm font-semibold">{course.rating}</span>
          </div>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white group-hover:text-primary-400">
          {course.title}
        </h3>
        
        <p className="mb-4 text-sm text-slate-400 line-clamp-2">
            {course.description}
        </p>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-600"></div> {/* Placeholder avatar */}
            <span className="text-xs font-medium text-slate-300">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Users className="h-3.5 w-3.5" />
            <span className="text-xs">{course.students}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;