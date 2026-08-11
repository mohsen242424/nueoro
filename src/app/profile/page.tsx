'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, BookOpen, Lock, Unlock, LogOut, CheckCircle2, MessageCircle, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import coursesData from '@/data/courses.json';

const WHATSAPP_NUMBER = '962798107289';

export default function ProfilePage() {
  const { currentUser, logout, isCourseUnlocked } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  const enrolledCount = currentUser.enrolledCourses?.length || 0;

  const handleWhatsAppPayment = (courseTitle: string, price: string) => {
    const text = `مرحباً فريق نيورو، لقد قمت بالتحويل المالي لتفعيل دورة: (${courseTitle} - بسعر ${price})، رقمي الجامعي هو: (${currentUser.studentId}) واسمي: (${currentUser.name}). مرفق إشعار التحويل البنكي للتفعيل.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Card Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-950/10 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#BE123C] flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-rose-900/30 shrink-0">
              {currentUser.name.substring(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-900/15 text-[#9F1239] dark:text-rose-300 text-xs font-bold">
                  طالب
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-rose-200/70 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>الرقم الجامعي: <strong className="text-slate-900 dark:text-white font-mono">{currentUser.studentId}</strong></span>
                <span>•</span>
                <span>التخصص: <strong className="text-slate-900 dark:text-white">{currentUser.major}</strong></span>
                <span>•</span>
                <span>الهاتف: <strong className="text-slate-900 dark:text-white font-mono">{currentUser.phone}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> تسجيل الخروج
            </button>
          </div>
        </motion.div>

        {/* Enrolled Courses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <Unlock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-rose-100">
                  دوراتي المفعلة ({enrolledCount})
                </h2>
                <p className="text-xs text-slate-500 dark:text-rose-200/60">
                  الدورات المفتوحة والمتاحة للمشاهدة والدراسة فوراً
                </p>
              </div>
            </div>
          </div>

          {enrolledCount > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData
                .filter(course => isCourseUnlocked(course.slug))
                .map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-[#12070D] border border-emerald-500/30 rounded-3xl p-6 shadow-lg shadow-emerald-950/5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> مفعلة ومتاحة
                        </span>
                        <span className="text-xs font-semibold text-slate-400 dark:text-rose-200/50">
                          {course.lessons.length} دروس
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-rose-100 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-rose-200/70 line-clamp-2 mb-4">
                        {course.description}
                      </p>
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white text-xs font-bold text-center shadow-md shadow-rose-900/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-4 h-4" /> متابعة الدراسة والمشاهدة
                    </Link>
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="bg-white/60 dark:bg-[#12070D]/40 border border-rose-900/10 rounded-3xl p-8 text-center">
              <Lock className="w-10 h-10 text-rose-900/30 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-800 dark:text-rose-200 mb-1">
                لا توجد دورات مفعلة حالياً
              </h3>
              <p className="text-xs text-slate-500 dark:text-rose-200/60 max-w-md mx-auto">
                قم باختيار الدورة التي ترغب بالاشتراك بها أدناه وأرسل الحوالة البنكية لتفعيلها فوراً.
              </p>
            </div>
          )}
        </div>

        {/* All Available Courses to Purchase / Activate */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-500/10 rounded-xl border border-rose-900/15">
                <Sparkles className="w-5 h-5 text-[#9F1239] dark:text-[#FB7185]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-rose-100">
                  جميع دورات نيورو المتاحة للتفعيل
                </h2>
                <p className="text-xs text-slate-500 dark:text-rose-200/60">
                  اختر الدورة وأرسل رقمك الجامعي مع إشعار التحويل البنكي عبر الواتساب للتفعيل
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.map((course) => {
              const unlocked = isCourseUnlocked(course.slug);
              return (
                <motion.div
                  key={course.id}
                  whileHover={{ y: -4 }}
                  className={`bg-white/80 dark:bg-[#12070D]/85 border rounded-3xl p-6 shadow-sm flex flex-col justify-between ${
                    unlocked
                      ? 'border-emerald-500/30'
                      : 'border-rose-900/15 dark:border-rose-900/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        unlocked
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/10 text-[#9F1239] dark:text-[#FDA4AF] border-rose-900/15'
                      }`}>
                        {course.price}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 dark:text-rose-200/50">
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-rose-100 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-rose-200/70 line-clamp-2 mb-4">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    {unlocked ? (
                      <Link
                        href={`/courses/${course.slug}`}
                        className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" /> الدورة مفعلة - ادخل الآن
                      </Link>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={() => handleWhatsAppPayment(course.title, course.price)}
                          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold text-center shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" /> طلب التفعيل عبر واتساب ({course.price})
                        </button>
                        <Link
                          href={`/courses/${course.slug}`}
                          className="block text-center text-[11px] font-bold text-slate-500 dark:text-rose-200/60 hover:text-[#9F1239] dark:hover:text-white"
                        >
                          استعراض تفاصيل الدورة والدروس
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
