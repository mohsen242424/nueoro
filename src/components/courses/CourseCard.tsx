'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, User } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  category: string;
  description: string;
  lessonsCount: number;
  duration: string;
}

export default function CourseCard({ course }: { course: Course }) {
  const { t } = useLanguage();
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'anatomy': return 'from-red-500 to-rose-600';
      case 'nursing': return 'from-blue-500 to-cyan-600';
      case 'physiology': return 'from-purple-500 to-indigo-600';
      case 'pharmacology': return 'from-emerald-500 to-teal-600';
      default: return 'from-brand-blue to-brand-purple';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
    >
      <div className={`h-24 w-full bg-gradient-to-r ${getCategoryColor(course.category)} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
        <Play className="h-10 w-10 text-white/80 group-hover:text-white transition-colors" />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-300">
            {course.category}
          </span>
        </div>

        <h3 className="font-poppins mb-2 text-xl font-semibold text-white line-clamp-1">
          {course.title}
        </h3>
        
        <div className="mb-4 flex items-center text-sm text-gray-400">
          <User className="mr-2 h-4 w-4" />
          {course.instructor}
        </div>

        <p className="mb-6 text-sm text-gray-400 line-clamp-2 flex-grow">
          {course.description}
        </p>

        <div className="mb-6 flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4 text-brand-cyan" />
            {course.lessonsCount} {t.courses.lessons}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-brand-purple" />
            {course.duration}
          </div>
        </div>

        <Link href={`/courses/${course.slug}`} className="w-full">
          <button className="w-full rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple py-3 font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]">
            {t.courses.watchCourse}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
