'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, User, ArrowRight, Lock, Unlock, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useAuth } from '@/components/providers/AuthProvider';

const WHATSAPP_NUMBER = '962798107289';

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  category: string;
  description: string;
  lessonsCount: number;
  duration: string;
  price?: string;
}

export default function CourseCard({ course }: { course: Course }) {
  const { t, isRTL } = useLanguage();
  const { currentUser, isCourseUnlocked } = useAuth();

  const isUnlocked = isCourseUnlocked(course.slug);

  const handleWhatsAppPayment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const studentInfo = currentUser ? `رقمي الجامعي: (${currentUser.studentId}) واسمي: (${currentUser.name})` : 'سأقوم بالتسجيل بالرقم الجامعي';
    const text = `مرحباً فريق نيورو، أود الاشتراك وتفعيل دورة: (${course.title} - بسعر ${course.price || '10 د.أ'}). ${studentInfo}. مرفق إشعار التحويل البنكي للتفعيل.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-900/10 dark:border-rose-900/30 bg-white/85 dark:bg-[#12070D]/85 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-rose-600/40 hover:shadow-2xl hover:shadow-rose-950/20"
    >
      <div>
        {/* Thumbnail Gradient Header */}
        <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-gradient-to-br from-[#500724] via-[#881337] to-[#BE123C] p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start z-10">
            <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
              {course.category}
            </span>
            <div className="flex items-center gap-1.5">
              {isUnlocked ? (
                <span className="rounded-full bg-emerald-600/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white flex items-center gap-1 shadow-sm">
                  <Unlock className="w-3.5 h-3.5" /> مفعلة
                </span>
              ) : (
                <span className="rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white flex items-center gap-1 shadow-sm">
                  <Lock className="w-3.5 h-3.5" /> {course.price || '10 د.أ'}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-semibold text-rose-100/90 z-10">
            <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1 text-rose-300" /> {course.lessonsCount} دروس</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-rose-300" /> {course.duration}</span>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#9F1239] dark:text-[#FDA4AF]">
            <User className="w-3.5 h-3.5" /> {course.instructor}
          </div>
          
          <h3 className="font-poppins mb-2 text-lg font-bold text-slate-900 dark:text-rose-100 group-hover:text-[#9F1239] dark:group-hover:text-[#FB7185] transition-colors line-clamp-1">
            {course.title}
          </h3>
          
          <p className="text-xs text-slate-600 dark:text-rose-200/70 line-clamp-2 leading-relaxed font-inter mb-4">
            {course.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 pb-6 pt-2 space-y-2">
        <Link
          href={`/courses/${course.slug}`}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all ${
            isUnlocked
              ? 'bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white shadow-md shadow-rose-900/30'
              : 'bg-slate-100 dark:bg-rose-950/40 text-slate-800 dark:text-rose-200 hover:bg-[#9F1239] hover:text-white border border-rose-900/15'
          }`}
        >
          {isUnlocked ? (
            <>مشاهدة المحاضرات <ArrowRight className="h-4 w-4" /></>
          ) : (
            <>استعراض تفاصيل الدورة والدروس <ArrowRight className="h-4 w-4" /></>
          )}
        </Link>

        {!isUnlocked && (
          <button
            onClick={handleWhatsAppPayment}
            className="w-full py-2.5 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> تفعيل عبر واتساب ({course.price || '10 د.أ'})
          </button>
        )}
      </div>
    </motion.div>
  );
}
