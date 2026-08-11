'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle2, Circle, ArrowLeft, ArrowRight, BookOpen, Clock, User, Lock, Unlock, MessageCircle, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useAuth } from '@/components/providers/AuthProvider';

const WHATSAPP_NUMBER = '962798107289';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { t, isRTL } = useLanguage();
  const { currentUser, isCourseUnlocked } = useAuth();
  const course = coursesData.find(c => c.slug === params.slug);
  
  if (!course) {
    notFound();
  }

  const [activeLessonId, setActiveLessonId] = useState(course.lessons[0]?.id || 1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const activeLesson = course.lessons.find(l => l.id === activeLessonId);
  const currentIndex = course.lessons.findIndex(l => l.id === activeLessonId);

  const isUnlocked = isCourseUnlocked(course.slug);

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

  const handleWhatsAppPayment = () => {
    const studentIdInfo = currentUser ? `رقمي الجامعي: (${currentUser.studentId}) واسمي: (${currentUser.name})` : 'سأقوم بتزويدكم برقمي الجامعي عند التسجيل';
    const text = `مرحباً فريق نيورو، أود الاشتراك وتفعيل دورة: (${course.title} - بسعر ${course.price}). ${studentIdInfo}. مرفق إشعار التحويل البنكي للتفعيل الفوري.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-20 pb-16 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="py-6 border-b border-rose-900/10 dark:border-rose-900/20 mb-8">
          <Link href="/courses" className="inline-flex items-center text-xs font-bold text-slate-500 dark:text-rose-200/60 hover:text-[#9F1239] dark:hover:text-white transition-colors mb-4 gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> العودة إلى الدورات
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-rose-500/10 dark:bg-rose-950/50 border border-rose-900/15 dark:border-rose-900/30 px-3 py-1 text-xs font-bold text-[#9F1239] dark:text-[#FDA4AF]">
                  {course.category}
                </span>
                <span className="flex items-center text-xs font-semibold text-slate-500 dark:text-rose-200/60">
                  <User className="w-3.5 h-3.5 mr-1 text-[#9F1239] dark:text-[#FB7185]" /> {t.courses.instructor}: {course.instructor}
                </span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                  isUnlocked
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20'
                }`}>
                  {isUnlocked ? '✓ مفعلة بحسابك' : `🔒 دورة مدفوعة (${course.price})`}
                </span>
              </div>
              <h1 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-rose-100 mb-2 tracking-tight">
                {course.title}
              </h1>
              <p className="text-slate-600 dark:text-rose-200/70 max-w-2xl text-xs sm:text-sm leading-relaxed">
                {course.description}
              </p>
            </div>
            
            {/* Progress Card (Shown if unlocked) */}
            {mounted && isUnlocked && (
              <div className="bg-white dark:bg-[#12070D] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl p-4 w-full md:w-64 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-rose-200/80">{t.courses.progress}</span>
                  <span className="text-xs font-black text-[#9F1239] dark:text-[#FB7185]">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#180A11] rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="mt-2 text-xs font-medium text-slate-500 dark:text-rose-200/50 text-right">
                  {completedLessons.length} من {course.lessons.length} مكتمل
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LOCKED PAYWALL STATE */}
        {!isUnlocked ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Paywall Banner & WhatsApp Activation */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 dark:bg-[#12070D]/85 border border-rose-900/20 dark:border-rose-900/40 rounded-3xl p-8 sm:p-10 shadow-xl shadow-rose-950/15 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#9F1239]/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#BE123C] flex items-center justify-center text-white shadow-lg shadow-rose-900/30">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-rose-100">
                      هذه الدورة تتطلب اشتراكاً وتفعيلاً
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-rose-200/70">
                      سعر الدورة: <strong className="text-[#9F1239] dark:text-[#FB7185] text-base">{course.price}</strong> فقط (وصول كامل لجميع المحاضرات)
                    </p>
                  </div>
                </div>

                {/* Steps to activate */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xs font-bold text-slate-700 dark:text-rose-200/90 uppercase tracking-wider">
                    خطوات التفعيل السريع:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 dark:border-rose-900/20">
                      <div className="w-6 h-6 rounded-full bg-[#9F1239] text-white flex items-center justify-center font-bold mb-2 text-xs">1</div>
                      <p className="font-bold text-slate-900 dark:text-rose-100 mb-1">إنشاء حساب</p>
                      <p className="text-slate-500 dark:text-rose-200/60 text-[11px]">سجّل برقمك الجامعي في المنصة لتتمكن من تفعيل الدورة عليه.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 dark:border-rose-900/20">
                      <div className="w-6 h-6 rounded-full bg-[#9F1239] text-white flex items-center justify-center font-bold mb-2 text-xs">2</div>
                      <p className="font-bold text-slate-900 dark:text-rose-100 mb-1">التحويل المالي</p>
                      <p className="text-slate-500 dark:text-rose-200/60 text-[11px]">قم بالتحويل عبر الحساب البنكي / المحفظة واحتفظ بالإشعار.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 dark:border-rose-900/20">
                      <div className="w-6 h-6 rounded-full bg-[#9F1239] text-white flex items-center justify-center font-bold mb-2 text-xs">3</div>
                      <p className="font-bold text-slate-900 dark:text-rose-100 mb-1">تأكيد عبر واتساب</p>
                      <p className="text-slate-500 dark:text-rose-200/60 text-[11px]">أرسل الإشعار مع رقمك الجامعي وسيتم التفعيل فوراً.</p>
                    </div>
                  </div>
                </div>

                {/* Account check banner */}
                {!currentUser ? (
                  <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-200 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                      <span>لست مسجلاً للدخول بعد. قم بإنشاء حسابك أولاً لتفعيل الدورة على رقمك الجامعي:</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href="/register"
                        className="px-4 py-2 rounded-xl bg-[#9F1239] text-white text-xs font-bold hover:bg-[#BE123C] transition-all"
                      >
                        إنشاء حساب طالب
                      </Link>
                      <Link
                        href="/login"
                        className="px-4 py-2 rounded-xl bg-white dark:bg-[#180A11] border border-rose-900/20 text-xs font-bold"
                      >
                        تسجيل الدخول
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>أنت مسجل الدخول باسم: <strong>{currentUser.name}</strong> (الرقم الجامعي: <strong className="font-mono">{currentUser.studentId}</strong>).</span>
                  </div>
                )}

                {/* Direct WhatsApp Action Button */}
                <button
                  onClick={handleWhatsAppPayment}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-xl shadow-emerald-950/20 transition-all flex items-center justify-center gap-2.5 transform hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5" />
                  إرسال إشعار الدفع ورقمي الجامعي عبر واتساب ({WHATSAPP_NUMBER})
                </button>
              </motion.div>
            </div>

            {/* Course Content Outline (Locked view) */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
                <div className="p-3 border-b border-rose-900/10 dark:border-rose-900/20 mb-3 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-rose-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" /> فهرس دروس الدورة
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    {course.lessons.length} دروس
                  </span>
                </div>

                <div className="space-y-2">
                  {course.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-bold text-slate-700 dark:text-rose-200/80 truncate">
                          {idx + 1}. {lesson.title}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* UNLOCKED FULL COURSE PLAYER */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Area */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black rounded-3xl overflow-hidden aspect-video border border-rose-900/15 dark:border-rose-900/30 shadow-2xl relative group">
                {activeLesson ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeLesson.videoId}`}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    اختر درساً للبدء بالمشاهدة
                  </div>
                )}
              </div>

              {activeLesson && (
                <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/30 rounded-3xl p-6 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-rose-100 mb-1">
                      {currentIndex + 1}. {activeLesson.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-rose-200/60">
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-[#9F1239] dark:text-[#FB7185]" /> {activeLesson.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => toggleComplete(activeLesson.id)}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        completedLessons.includes(activeLesson.id)
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-[#9F1239] dark:text-rose-200 hover:bg-[#9F1239] hover:text-white border border-rose-900/15'
                      }`}
                    >
                      {completedLessons.includes(activeLesson.id) ? (
                        <><CheckCircle2 className="w-4 h-4" /> {t.courses.completed}</>
                      ) : (
                        <><Circle className="w-4 h-4" /> {t.courses.markComplete}</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 dark:text-rose-200/70 hover:text-[#9F1239] dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> {t.courses.previousLesson}
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentIndex === course.lessons.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 dark:text-rose-200/70 hover:text-[#9F1239] dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  {t.courses.nextLesson} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Lessons Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/30 rounded-3xl backdrop-blur-md overflow-hidden flex flex-col h-[calc(100vh-200px)] lg:sticky lg:top-24 max-h-[800px] shadow-sm">
                <div className="p-5 border-b border-rose-900/10 dark:border-rose-900/20 bg-rose-50/50 dark:bg-rose-950/20">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-rose-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" /> محتوى الدورة
                  </h3>
                </div>
                <div className="overflow-y-auto flex-grow p-3 space-y-1.5 custom-scrollbar">
                  {course.lessons.map((lesson, index) => {
                    const isActive = activeLessonId === lesson.id;
                    const isCompleted = completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`w-full text-left p-3.5 rounded-2xl flex gap-3 transition-all ${
                          isActive 
                            ? 'bg-rose-500/10 dark:bg-rose-950/50 border border-rose-500/30 shadow-sm' 
                            : 'hover:bg-rose-50/50 dark:hover:bg-rose-950/20 border border-transparent'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : isActive ? (
                            <PlayCircle className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" />
                          ) : (
                            <span className="flex w-4 h-4 items-center justify-center text-xs font-bold text-slate-400 dark:text-rose-200/40">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className={`font-bold text-xs line-clamp-2 ${isActive ? 'text-[#9F1239] dark:text-white' : 'text-slate-700 dark:text-rose-200/70'}`}>
                            {lesson.title}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-rose-200/50 mt-1 flex items-center">
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
        )}
      </div>
    </div>
  );
}
