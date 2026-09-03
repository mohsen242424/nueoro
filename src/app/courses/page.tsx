'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, GraduationCap, Sparkles } from 'lucide-react';
import CourseCard from '@/components/courses/CourseCard';
import coursesData from '@/data/courses.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function CoursesPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'جميع الدورات' },
    ...Array.from(new Set(coursesData.map((c) => c.category))).map((cat) => ({
      id: cat,
      label: cat,
    })),
  ];

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || course.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#BE123C]/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <div className="p-3 bg-rose-500/10 dark:bg-rose-950/40 rounded-2xl border border-rose-900/15 dark:border-rose-900/30">
              <GraduationCap className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
            </div>
            <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-rose-100 tracking-tight">
              الدورات والمحاضرات المجانية
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-rose-200/70 text-base md:text-lg max-w-2xl mx-auto font-inter"
          >
            جميع الدورات مجانية بالكامل لطلبة كلية العلوم الطبية التطبيقية بالجامعة الهاشمية - مشاهدة فيديو مباشرة داخل الموقع والتفعيل بالرقم الجامعي
          </motion.p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-rose-300/40" />
            <input
              type="text"
              placeholder="ابحث عن دورة أو مادة أو موضوع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-[#12070D] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-11 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all text-sm font-medium shadow-sm"
            />
          </div>

          <div className="flex overflow-x-auto no-scrollbar pb-2 sm:flex-wrap sm:justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30'
                    : 'bg-white dark:bg-[#12070D] text-slate-600 dark:text-rose-200/70 hover:text-slate-900 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-900/10 dark:border-rose-900/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 text-slate-400 dark:text-rose-200/50">
            <p className="text-base font-bold">لم يتم العثور على دورات تطابق بحثك</p>
          </div>
        )}
      </div>
    </div>
  );
}
