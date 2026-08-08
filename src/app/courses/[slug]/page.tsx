'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle2, Circle, ArrowLeft, ArrowRight, BookOpen, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { t, isRTL } = useLanguage();
  const course = coursesData.find(c => c.slug === params.slug);
  
  if (!course) {
    notFound();
  }

  const [activeLessonId, setActiveLessonId] = useState(course.lessons[0]?.id || 1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const activeLesson = course.lessons.find(l => l.id === activeLessonId);
  const currentIndex = course.lessons.findIndex(l => l.id === activeLessonId);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(`neuro-course-${course.slug}-progress`);
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {}
    }
  }, [course.slug]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(`neuro-course-${course.slug}-progress`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, mounted, course.slug]);

  const toggleComplete = (id: number) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(lessonId => lessonId !== id) : [...prev, id]
    );
  };

  const progressPercentage = Math.round((completedLessons.length / course.lessons.length) * 100) || 0;

  const goToNext = () => {
    if (currentIndex < course.lessons.length - 1) {
      setActiveLessonId(course.lessons[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setActiveLessonId(course.lessons[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="py-6 border-b border-white/10 mb-8">
          <Link href="/courses" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-blue">
                  {course.category}
                </span>
                <span className="flex items-center text-sm text-gray-400">
                  <User className="w-4 h-4 mr-1" /> {t.courses.instructor}: {course.instructor}
                </span>
              </div>
              <h1 className="font-poppins text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
                {course.title}
              </h1>
              <p className="text-gray-400 max-w-2xl text-sm md:text-base">
                {course.description}
              </p>
            </div>
            
            {/* Progress Card */}
            {mounted && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full md:w-64 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-300">{t.courses.progress}</span>
                  <span className="text-sm font-bold text-brand-blue">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-brand-blue to-brand-cyan h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 text-right">
                  {completedLessons.length} of {course.lessons.length} completed
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl relative group">
              {activeLesson ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeLesson.videoId}`}
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Select a lesson to start watching
                </div>
              )}
            </div>

            {activeLesson && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {currentIndex + 1}. {activeLesson.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {activeLesson.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => toggleComplete(activeLesson.id)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      completedLessons.includes(activeLesson.id)
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {completedLessons.includes(activeLesson.id) ? (
                      <><CheckCircle2 className="w-5 h-5" /> {t.courses.completed}</>
                    ) : (
                      <><Circle className="w-5 h-5" /> {t.courses.markComplete}</>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t.courses.previousLesson}
              </button>
              <button
                onClick={goToNext}
                disabled={currentIndex === course.lessons.length - 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {t.courses.nextLesson} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col h-[calc(100vh-200px)] lg:sticky lg:top-24 max-h-[800px]">
              <div className="p-5 border-b border-white/10 bg-white/5">
                <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-blue" /> Course Content
                </h3>
              </div>
              <div className="overflow-y-auto flex-grow p-3 space-y-2 custom-scrollbar">
                {course.lessons.map((lesson, index) => {
                  const isActive = activeLessonId === lesson.id;
                  const isCompleted = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left p-4 rounded-xl flex gap-3 transition-all ${
                        isActive 
                          ? 'bg-brand-blue/20 border border-brand-blue/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : isActive ? (
                          <PlayCircle className="w-5 h-5 text-brand-blue" />
                        ) : (
                          <span className="flex w-5 h-5 items-center justify-center text-xs font-medium text-gray-500">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className={`font-medium text-sm line-clamp-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> {lesson.duration}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
