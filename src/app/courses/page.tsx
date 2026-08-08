'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, GraduationCap } from 'lucide-react';
import CourseCard from '@/components/courses/CourseCard';
import coursesData from '@/data/courses.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function CoursesPage() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', label: t.courses.all },
    { id: 'Anatomy', label: t.courses.categories.anatomy },
    { id: 'Nursing', label: t.courses.categories.nursing },
    { id: 'Physiology', label: t.courses.categories.physiology },
    { id: 'Pharmacology', label: t.courses.categories.pharmacology },
    { id: 'Study Skills', label: t.courses.categories.studySkills }
  ];

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || course.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-brand-cyan/15 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <GraduationCap className="w-8 h-8 text-brand-blue" />
            </div>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white tracking-tight">
              {t.courses.title}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t.courses.subtitle}
          </motion.p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.courses.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400">
              <p className="text-xl">No courses found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
                className="mt-4 text-brand-blue hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
