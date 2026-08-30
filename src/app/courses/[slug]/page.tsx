'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle2, Circle, ArrowLeft, ArrowRight, BookOpen, Clock, User, Lock, Unlock, MessageCircle, AlertCircle, ShieldCheck, Sparkles, FolderOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useAuth } from '@/components/providers/AuthProvider';

const WHATSAPP_NUMBER = '962798107289';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { t, isRTL } = useLanguage();
  const { currentUser, isCourseUnlocked, isAdmin } = useAuth();
  const course = coursesData.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const [activeLessonId, setActiveLessonId] = useState(course.lessons[0]?.id || 1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const activeLesson = course.lessons.find((l) => l.id === activeLessonId) || course.lessons[0];
  const currentIndex = course.lessons.findIndex((l) => l.id === activeLessonId);

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
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((lessonId) => lessonId !== id) : [...prev, id]
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
    const studentInfo = currentUser
      ? `رقمي الجامعي: (${currentUser.studentId}) واسمي: (${currentUser.name})`
      : 'سأقوم بالتسجيل بالرقم الجامعي';
    const text = `مرحباً فريق نيورو، أود الاشتراك وتفعيل دورة: (${course.title} - بسعر ${course.price || '10 د.أ'}). ${studentInfo}. مرفق إشعار التحويل البنكي للتفعيل.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const driveUrl = (course as any).driveUrl || 'https://drive.google.com/drive/folders/1Smgl1zXzD7ofi9JV5fZbhPBRIg-xDgd4';

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-rose-200/70 hover:text-[#9F1239] dark:hover:text-[#FB7185] transition-colors"
          >
            <ArrowRight className="w-4 h-4" /> العودة لكافة الدورات
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-900/15 text-[#9F1239] dark:text-[#FDA4AF] text-xs font-bold">
              {course.category}
            </span>
            {isUnlocked && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5" /> الدورة مفعلة
              </span>
            )}
          </div>
        </div>

        {/* Course Header */}
        <div className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-8 shadow-xl shadow-rose-950/5 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#9F1239] dark:text-[#FB7185] mb-2">
                <User className="w-4 h-4" /> {course.instructor}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-2">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-rose-200/70 max-w-3xl leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Quick Stats & Drive Access */}
            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 text-xs font-bold text-slate-700 dark:text-rose-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#9F1239]" /> {course.lessons.length} دروس ومحاضرات
              </div>
              <div className="px-4 py-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 text-xs font-bold text-slate-700 dark:text-rose-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9F1239]" /> {course.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Video Player + Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Video & Lesson Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {isUnlocked ? (
              <>
                {/* Embedded Video / Drive Player */}
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-rose-900/30">
                  {(activeLesson as any)?.driveUrl || (course as any).driveUrl ? (
                    <iframe
                      src={`https://drive.google.com/embeddedfolderview?id=1Smgl1zXzD7ofi9JV5fZbhPBRIg-xDgd4#grid`}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; fullscreen"
                      title={activeLesson.title}
                    />
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${(activeLesson as any).videoId || 'dQw4w9WgXcQ'}?rel=0&modestbranding=1`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={activeLesson.title}
                    />
                  )}
                </div>

                {/* Active Lesson Header & Actions */}
                <div className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#9F1239] dark:text-[#FB7185] uppercase">
                        الدرس الحالي ({currentIndex + 1} من {course.lessons.length})
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-rose-100 mt-1">
                        {activeLesson.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleComplete(activeLesson.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          completedLessons.includes(activeLesson.id)
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-rose-950/40 text-slate-700 dark:text-rose-200 hover:bg-emerald-50'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{completedLessons.includes(activeLesson.id) ? 'مكتمل' : 'تحديد كمكتمل'}</span>
                      </button>

                      <a
                        href={driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#881337] to-[#9F1239] text-white text-xs font-bold hover:shadow-md transition-all flex items-center gap-1.5"
                      >
                        <FolderOpen className="w-4 h-4" />
                        <span>فتح مجلد Drive</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-rose-900/10 dark:border-rose-900/20">
                    <button
                      onClick={goToPrev}
                      disabled={currentIndex === 0}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#180A11] text-xs font-bold text-slate-700 dark:text-rose-200 disabled:opacity-40 hover:bg-rose-50 transition-all flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-4 h-4" /> الدرس السابق
                    </button>

                    <button
                      onClick={goToNext}
                      disabled={currentIndex === course.lessons.length - 1}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-xs font-bold text-white disabled:opacity-40 shadow-sm transition-all flex items-center gap-1.5"
                    >
                      الدرس التالي <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Paywall Protected Area */
              <div className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-6 sm:p-10 text-center shadow-xl shadow-rose-950/5">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-400">
                  <Lock className="w-8 h-8" />
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3">
                  محتوى مدفوع - يلزم التفعيل
                </span>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-rose-100 mb-3">
                  اشترك الآن للوصول الكامل إلى جميع محاضرات ومواد الدورة
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-rose-200/70 max-w-lg mx-auto mb-8 leading-relaxed">
                  احصل على حق المشاهدة الدائمة لجميع الدروس، ملفات الشرح، بنك الأسئلة، ونماذج الامتحانات بسعر رمزي ({course.price || '10 د.أ'}).
                </p>

                {/* WhatsApp Payment CTA */}
                <div className="max-w-md mx-auto space-y-3">
                  <button
                    onClick={handleWhatsAppPayment}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all flex items-center justify-center gap-2.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>تفعيل الدورة الآن عبر واتساب ({course.price || '10 د.أ'})</span>
                  </button>

                  <p className="text-[11px] text-slate-500 dark:text-rose-200/60 font-medium">
                    سيتم تفعيل حسابك فور إرسال إشعار التحويل البنكي ورقمك الجامعي
                  </p>
                </div>

                {!currentUser && (
                  <div className="mt-8 pt-6 border-t border-rose-900/10 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-xs text-slate-500">لديك حساب بالفعل؟</span>
                    <Link
                      href="/login"
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#180A11] border border-rose-900/15 text-xs font-bold text-slate-800 dark:text-rose-200 hover:bg-rose-50"
                    >
                      تسجيل الدخول بالرقم الجامعي
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Playlist Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-6 sticky top-24 shadow-sm">
              
              {/* Progress Summary */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-rose-200 mb-2">
                  <span>نسبة الإنجاز في الدورة</span>
                  <span className="font-mono text-[#9F1239] dark:text-[#FB7185]">{progressPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-rose-950/40 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Playlist items */}
              <h3 className="text-sm font-bold text-slate-900 dark:text-rose-100 mb-3 flex items-center justify-between">
                <span>قائمة المحاضرات والدروس</span>
                <span className="text-xs text-slate-400 font-normal">{course.lessons.length} عناصر</span>
              </h3>

              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {course.lessons.map((lesson, idx) => {
                  const isActive = activeLesson.id === lesson.id;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => isUnlocked && setActiveLessonId(lesson.id)}
                      disabled={!isUnlocked}
                      className={`w-full text-right p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                        isActive
                          ? 'bg-rose-500/10 dark:bg-rose-950/50 border-[#9F1239] text-[#9F1239] dark:text-rose-100 shadow-sm'
                          : isDone
                          ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-800 dark:text-rose-200/90'
                          : 'bg-slate-50/70 dark:bg-[#180A11]/70 border-rose-900/10 dark:border-rose-900/20 text-slate-700 dark:text-rose-200/70 hover:bg-rose-50/50'
                      } ${!isUnlocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : isUnlocked ? (
                          <PlayCircle className={`w-4 h-4 ${isActive ? 'text-[#9F1239] dark:text-[#FB7185]' : 'text-slate-400'}`} />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      <div className="min-w-0 flex-grow">
                        <p className="text-xs font-bold leading-snug line-clamp-2">
                          {lesson.title}
                        </p>
                        <span className="text-[11px] font-semibold text-slate-400 dark:text-rose-200/50 mt-1 block font-mono">
                          {lesson.duration}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Direct Drive Folder Button in sidebar */}
              <div className="mt-5 pt-4 border-t border-rose-900/10">
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
                >
                  <FolderOpen className="w-4 h-4 text-[#9F1239]" />
                  <span>المجلد السحابي للدورة على Google Drive</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
