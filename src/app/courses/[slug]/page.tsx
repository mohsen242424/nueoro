'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  User,
  Lock,
  Unlock,
  Sparkles,
  Instagram,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  LogIn,
  AlertCircle,
  MessageSquareQuote,
  FileText,
  Send,
  FolderDown,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useAuth } from '@/components/providers/AuthProvider';

const INSTAGRAM_DM_URL = 'https://ig.me/m/neuro_medical';
const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/neuro_medical?igsi=MXU4Yng2dmdpdzdnMA==';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { t, isRTL } = useLanguage();
  const { currentUser, isCourseUnlocked, isAdmin, refreshCurrentUser } = useAuth();
  const course = coursesData.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const [activeLessonId, setActiveLessonId] = useState(course.lessons[0]?.id || 1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [showCopyNotice, setShowCopyNotice] = useState(false);

  const activeLesson = course.lessons.find((l) => l.id === activeLessonId) || course.lessons[0];
  const currentIndex = course.lessons.findIndex((l) => l.id === activeLessonId);

  const isUnlocked = isCourseUnlocked(course.slug);

  // Live synchronisation: refresh student's actual enrolled courses directly from database
  useEffect(() => {
    if (currentUser) {
      refreshCurrentUser();
    }
  }, [course.slug, currentUser?.studentId]);

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

  const getActivationMessage = () => {
    if (!currentUser) {
      return `مرحباً فريق نيورو الأكاديمي (NEURO) 👋\n\nأود طلب تفعيل دورة: (${course.title}) مجاناً بحسابي على المنصة.\n\n[يرجى تسجيل الدخول بالرقم الجامعي أو الرقم الوطني أولاً ليتم تجهيز بياناتك تلقائياً]`;
    }
    return `مرحباً فريق نيورو الأكاديمي (NEURO) 👋\n\nأود طلب تفعيل دورة: (${course.title}) مجاناً بحسابي على المنصة.\n\n📋 بيانات الطالب للتفعيل:\n• الاسم الكامل: ${currentUser.name}\n• الرقم الجامعي / الوطني: ${currentUser.studentId}\n• الجامعة والتخصص: ${currentUser.major}\n• رقم الهاتف: ${currentUser.phone}\n\nشاكراً ومقدراً جهودكم الكريمة في خدمة ودعم طلبة الجامعات! 🌟`;
  };

  const copyActivationMessage = () => {
    const text = getActivationMessage();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(true);
      setShowCopyNotice(true);
      setTimeout(() => setCopiedText(false), 3000);
      setTimeout(() => setShowCopyNotice(false), 5000);
    }
  };

  const handleInstagramRedirect = () => {
    if (!currentUser) {
      alert('⚠️ تنبيه: يجب تسجيل الدخول بحسابك (بالرقم الجامعي أو الرقم الوطني) أولاً لتتمكن من إرسال طلب التفعيل!');
      return;
    }

    copyActivationMessage();
    // Open Instagram DM directly (or profile as fallback)
    window.open(INSTAGRAM_DM_URL, '_blank');
  };

  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoPlayerRef = React.useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!videoPlayerRef.current) return;
    if (!document.fullscreenElement) {
      videoPlayerRef.current.requestFullscreen?.().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.log('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen?.().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Video embed URL (plays directly inside the site)
  const videoSrc = (activeLesson as any).embedUrl || 
    `https://drive.google.com/file/d/${(activeLesson as any).fileId || '1DOI95dJaOYeTVyHL3EMB5FPV2E5HJ2I-'}/preview`;

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Floating Notice when message is copied */}
      <AnimatePresence>
        {showCopyNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-rose-500/30 max-w-md text-center"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>تم نسخ رسالة التفعيل بنجاح! الصق الرسالة (Paste) في محادثة إنستغرام واضغط إرسال 🚀</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`mx-auto transition-all duration-300 ${isTheaterMode ? 'max-w-[1600px]' : 'max-w-7xl'}`}>
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-rose-200/70 hover:text-[#9F1239] dark:hover:text-[#FB7185] transition-colors"
          >
            <ArrowRight className="w-4 h-4" /> العودة لكافة الدورات
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> دورة مجانية بالكامل
            </span>
            {isUnlocked ? (
              <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-900/15 text-[#9F1239] dark:text-[#FDA4AF] text-xs font-bold flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5" /> مفعلة بحسابك
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> تتطلب التفعيل
              </span>
            )}
          </div>
        </div>

        {/* Course Header Banner */}
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

            {/* Quick Badges */}
            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 text-xs font-bold text-slate-700 dark:text-rose-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#9F1239]" /> {course.lessons.length} أقسام ومحاضرات
              </div>
              <div className="px-4 py-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 text-xs font-bold text-slate-700 dark:text-rose-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9F1239]" /> {course.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Embedded Video Player + Playlist Sidebar */}
        <div className={`grid gap-8 ${isTheaterMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          
          {/* Main Video Screen Area */}
          <div className={`${isTheaterMode ? 'w-full' : 'lg:col-span-2'} space-y-4`}>
            
            {isUnlocked ? (
              <>
                {(activeLesson as any).type === 'telegram' || (activeLesson as any).telegramUrl ? (
                  /* Dedicated Telegram Files & Questions Resource Hub */
                  <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-br from-[#0c1a29] via-[#0d233a] to-[#071320] text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                    {/* Background decorative glow */}
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#BE123C]/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
                      
                      {/* Telegram Badge Icon */}
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#0088cc] to-[#29b6f6] text-white flex items-center justify-center mx-auto shadow-xl shadow-sky-500/25">
                        <Send className="w-10 h-10 -rotate-12 translate-x-0.5" />
                      </div>

                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/15 text-sky-300 text-xs font-bold mb-3 border border-sky-500/30">
                          <FolderDown className="w-3.5 h-3.5" /> قناة التيليجرام الرسمية للملفات والأسئلة
                        </span>
                        
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                          الملفات، الشروحات وبنك الأسئلة 📚
                        </h2>

                        <p className="text-sm text-sky-100/80 leading-relaxed max-w-lg mx-auto">
                          ستجدون في هذه القناة كافة الدوسيات، التلخيصات الشاملة، ونماذج الأسئلة والامتحانات السابقة المحلولة لكافة امتحانات المستوى (عربي، إنجليزي، حاسوب).
                        </p>
                      </div>

                      {/* Content Feature Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-right">
                        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">دوسيات وتفاريغ</p>
                            <p className="text-[10px] text-sky-200/60">شاملة ومحدثة 2026</p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">بنوك الأسئلة</p>
                            <p className="text-[10px] text-rose-200/60">سنوات سابقة مع الحل</p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">تحديثات مستمرة</p>
                            <p className="text-[10px] text-emerald-200/60">من فريق نيورو</p>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-2">
                        <a
                          href="https://t.me/Exam_Neuro"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0088cc] via-[#229ED9] to-[#0077b5] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-500/30 transition-all hover:scale-[1.02]"
                        >
                          <Send className="w-5 h-5 -rotate-12" />
                          <span>الانتقال لقناة التيليجرام (@Exam_Neuro)</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                    </div>
                  </div>
                ) : (
                  <>
                    {/* Clean Branded Player Header with Quick Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 rounded-2xl bg-slate-900 text-white border border-rose-900/30 shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-pulse"></span>
                        <span className="text-xs font-bold tracking-wide text-rose-100">مشغل نيورو المباشر</span>
                        <span className="hidden sm:inline-block text-[11px] font-mono text-rose-300/80 bg-rose-950/60 px-2 py-0.5 rounded-lg border border-rose-800/30">
                          {currentUser?.name ? `الطالب: ${currentUser.name}` : 'طالب نيورو'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mr-auto">
                        <button
                          onClick={() => setIsTheaterMode(!isTheaterMode)}
                          title={isTheaterMode ? "الوضع الافتراضي" : "الوضع الموسع"}
                          className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-rose-100 transition-colors"
                        >
                          <span>{isTheaterMode ? "الوضع العادي" : "الوضع الموسع"}</span>
                        </button>

                        <button
                          onClick={toggleFullscreen}
                          title="ملء الشاشة"
                          className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[#9F1239] hover:bg-[#BE123C] text-xs font-bold text-white transition-all shadow-sm"
                        >
                          <span>{isFullscreen ? "تصغير" : "ملء الشاشة ⛶"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Video Player Container (Zero blockers for 100% responsive touch controls on phones) */}
                    <div 
                      ref={videoPlayerRef}
                      className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-rose-900/30"
                    >
                      <iframe
                        src={videoSrc}
                        className="w-full h-full border-0 block"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                        title={activeLesson.title}
                      />
                    </div>

                    {/* Mobile Tips Notice */}
                    <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-900/10 text-[11px] font-medium text-slate-600 dark:text-rose-200/80">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#9F1239] dark:text-[#FB7185] shrink-0" />
                        <span>💡 <strong>نصيحة للجوال:</strong> يمكنك النقر على أيقونة الإعدادات ⚙️ داخل مشغل الفيديو لتغيير الجودة أو السرعة.</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Active Lesson Info & Navigation */}
                <div className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#9F1239] dark:text-[#FB7185] uppercase">
                        المحاضرة الحالية ({currentIndex + 1} من {course.lessons.length})
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
                    </div>
                  </div>

                  {/* Navigation controls (Previous / Next) */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-rose-900/10 dark:border-rose-900/20">
                    <button
                      onClick={goToPrev}
                      disabled={currentIndex === 0}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#180A11] text-xs font-bold text-slate-700 dark:text-rose-200 disabled:opacity-40 hover:bg-rose-50 transition-all flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-4 h-4" /> المحاضرة السابقة
                    </button>

                    <button
                      onClick={goToNext}
                      disabled={currentIndex === course.lessons.length - 1}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-xs font-bold text-white disabled:opacity-40 shadow-sm transition-all flex items-center gap-1.5"
                    >
                      المحاضرة التالية <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Activation Required Banner (Free via Instagram & Student ID) */
              <div className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-6 sm:p-10 text-center shadow-xl shadow-rose-950/5 space-y-6">
                
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 border border-rose-500/20 flex items-center justify-center mx-auto text-[#E1306C]">
                  <Instagram className="w-8 h-8" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/20">
                    <Sparkles className="w-3.5 h-3.5" /> الدورة مجانية 100% لكافة طلبة الجامعات
                  </span>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-rose-100 mt-2 mb-3">
                    تفعيل الدورة مجاناً عبر إنستغرام
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-rose-200/70 max-w-xl mx-auto leading-relaxed">
                    لمشاهدة فيديوهات هذه الدورة مباشرة داخل الموقع، أرسل رسالة إلى حساب فريق نيورو على Instagram برقمك الجامعي واسم الدورة، وسيقوم المشرف بتفعيلها لك فوراً ومجاناً!
                  </p>
                </div>

                {/* If user is NOT logged in: Show prominent warning */}
                {!currentUser ? (
                  <div className="max-w-md mx-auto p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-right space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-xs sm:text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>تنبيه مهم: يجب تسجيل الدخول برقمك الجامعي أو الوطني أولاً</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-rose-200/80 leading-relaxed">
                      لتتمكن من إرسال طلب التفعيل باسمك ورقمك وليقوم المشرف بتفعيل الدورة على حسابك في المنصة، يرجى تسجيل الدخول أو إنشاء حساب جديد مجاناً أولاً.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <Link
                        href={`/login?redirect=/courses/${course.slug}`}
                        className="flex-1 py-2.5 rounded-xl bg-[#9F1239] hover:bg-[#881337] text-white text-xs font-bold text-center transition-all shadow-sm"
                      >
                        تسجيل الدخول (جامعي / وطني)
                      </Link>
                      <Link
                        href={`/register?redirect=/courses/${course.slug}`}
                        className="flex-1 py-2.5 rounded-xl bg-white dark:bg-[#180A11] border border-rose-900/20 text-slate-800 dark:text-rose-200 text-xs font-bold text-center hover:bg-rose-50 transition-all"
                      >
                        إنشاء حساب جديد مجاناً
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* If logged in: Show the formatted ready message box */
                  <div className="max-w-md mx-auto text-right space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-rose-200">
                      <span className="flex items-center gap-1.5">
                        <MessageSquareQuote className="w-4 h-4 text-[#9F1239]" />
                        <span>رسالة التفعيل الجاهزة للإرسال:</span>
                      </span>
                      <span className="text-[11px] text-emerald-600 font-normal">
                        جاهزة ومجهزة ببيانات حسابك
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-900/15 text-xs font-mono text-slate-700 dark:text-rose-100 whitespace-pre-line leading-relaxed shadow-inner">
                      {getActivationMessage()}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="max-w-md mx-auto space-y-3">
                  <button
                    onClick={handleInstagramRedirect}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-950/20 hover:shadow-xl transition-all flex items-center justify-center gap-2.5"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>إرسال طلب التفعيل عبر Instagram Direct (@neuro_medical)</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  {currentUser && (
                    <button
                      onClick={copyActivationMessage}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-rose-950/40 hover:bg-slate-200 text-slate-700 dark:text-rose-200 text-xs font-bold border border-rose-900/15 flex items-center justify-center gap-2 transition-colors"
                    >
                      {copiedText ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-600">تم نسخ نص الرسالة بنجاح!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400" />
                          <span>نسخ نص الرسالة الجاهزة فقط</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Right Column: Video Playlist Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-6 sticky top-24 shadow-sm">
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-rose-200 mb-2">
                  <span>نسبة إنجاز المحاضرات</span>
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

              {/* Playlist Items */}
              <h3 className="text-sm font-bold text-slate-900 dark:text-rose-100 mb-3 flex items-center justify-between">
                <span>محتويات ومحاضرات الدورة</span>
                <span className="text-xs text-slate-400 font-normal">{course.lessons.length} أقسام ومحاضرات</span>
              </h3>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {course.lessons.map((lesson, idx) => {
                  const isActive = activeLesson.id === lesson.id;
                  const isDone = completedLessons.includes(lesson.id);
                  const isTelegram = (lesson as any).type === 'telegram' || !!(lesson as any).telegramUrl;

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
                          : isTelegram
                          ? 'bg-sky-500/5 border-sky-500/20 text-slate-800 dark:text-sky-200/90 hover:bg-sky-500/10'
                          : 'bg-slate-50/70 dark:bg-[#180A11]/70 border-rose-900/10 dark:border-rose-900/20 text-slate-700 dark:text-rose-200/70 hover:bg-rose-50/50'
                      } ${!isUnlocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : isUnlocked ? (
                          isTelegram ? (
                            <Send className={`w-4 h-4 -rotate-12 ${isActive ? 'text-[#0088cc]' : 'text-sky-400'}`} />
                          ) : (
                            <PlayCircle className={`w-4 h-4 ${isActive ? 'text-[#9F1239] dark:text-[#FB7185]' : 'text-slate-400'}`} />
                          )
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

              {/* Instagram Activation shortcut inside sidebar */}
              {!isUnlocked && (
                <div className="mt-5 pt-4 border-t border-rose-900/10">
                  <button
                    onClick={handleInstagramRedirect}
                    className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 border border-rose-900/15 text-[#9F1239] dark:text-rose-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span>تفعيل مجاني عبر Instagram</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
