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
  
  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'anatomy': return 'from-[#881337] via-[#9F1239] to-[#BE123C]';
      case 'nursing': return 'from-[#9F1239] via-[#BE123C] to-[#E11D48]';
      case 'physiology': return 'from-[#7F1D1D] via-[#991B1B] to-[#DC2626]';
      case 'pharmacology': return 'from-[#881337] via-[#B91C1C] to-[#F43F5E]';
      default: return 'from-[#9F1239] via-[#BE123C] to-[#FDA4AF]';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-900/10 dark:border-rose-900/30 bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/20 hover:border-rose-600/40"
    >
      {/* Thumbnail Banner */}
      <div className={`h-28 w-full bg-gradient-to-r ${getCategoryGradient(course.category)} opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:12px_12px] opacity-15"></div>
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="h-5 w-5 text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-rose-500/10 dark:bg-rose-950/50 border border-rose-900/15 dark:border-rose-900/30 px-3 py-1 text-xs font-bold text-[#9F1239] dark:text-[#FDA4AF]">
            {course.category}
          </span>
        </div>

        <h3 className="font-poppins mb-2 text-lg font-bold text-slate-900 dark:text-rose-100 line-clamp-1 group-hover:text-[#9F1239] dark:group-hover:text-[#FB7185] transition-colors">
          {course.title}
        </h3>
        
        <div className="mb-3 flex items-center text-xs font-semibold text-slate-500 dark:text-rose-200/60">
          <User className="mr-1.5 h-3.5 w-3.5 text-[#9F1239] dark:text-[#FB7185]" />
          {course.instructor}
        </div>

        <p className="mb-5 text-xs text-slate-600 dark:text-rose-200/70 line-clamp-2 flex-grow leading-relaxed">
          {course.description}
        </p>

        <div className="mb-5 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-rose-200/60 pt-3 border-t border-rose-900/10 dark:border-rose-900/20">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#BE123C]" />
            <span>{course.lessonsCount} {t.courses.lessons}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#E11D48]" />
            <span>{course.duration}</span>
          </div>
        </div>

        <Link href={`/courses/${course.slug}`} className="w-full">
          <button className="w-full rounded-xl bg-gradient-to-r from-[#9F1239] to-[#BE123C] hover:from-[#BE123C] hover:to-[#E11D48] py-2.5 text-xs font-bold text-white shadow-md shadow-rose-900/20 transition-all hover:shadow-rose-900/40 active:scale-[0.98]">
            {t.courses.watchCourse}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
