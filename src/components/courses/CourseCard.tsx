'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, User, ArrowRight, Lock, Unlock, CheckCircle2, Instagram, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useAuth } from '@/components/providers/AuthProvider';

const INSTAGRAM_URL = 'https://www.instagram.com/neuro_medical?igsi=MXU4Yng2dmdpdzdnMA==';

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

  const handleInstagramActivation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      alert('⚠️ يرجى تسجيل الدخول برقمك الجامعي أولاً لتتمكن من إرسال طلب التفعيل باسمك ورقمك الجامعي!');
      window.location.href = `/login?redirect=/courses/${course.slug}`;
      return;
    }

    const textToCopy = `مرحباً فريق نيورو الأكاديمي (NEURO) 👋\n\nأود طلب تفعيل دورة: (${course.title}) مجاناً بحسابي على المنصة.\n\n📋 بيانات الطالب للتفعيل:\n• الاسم: ${currentUser.name}\n• الرقم الجامعي: ${currentUser.studentId}\n• التخصص: ${currentUser.major}\n• الهاتف: ${currentUser.phone}\n\nشاكراً ومقدراً جهودكم الكريمة في خدمة ودعم طلبة الجامعات! 🌟`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).catch(() => {});
    }

    alert('✅ تم نسخ رسالة التفعيل المجهزة ببياناتك ورقمك الجامعي بنجاح! سيتم فتح محادثة إنستغرام الآن، الصق الرسالة (Paste) واضغط إرسال.');
    window.open('https://ig.me/m/neuro_medical', '_blank');
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
                  <Unlock className="w-3.5 h-3.5" /> مفعلة بحسابك
                </span>
              ) : (
                <span className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 backdrop-blur-md px-3 py-1 text-xs font-bold text-white flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> مجانية 100%
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-semibold text-rose-100/90 z-10">
            <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1 text-rose-300" /> {course.lessonsCount} محاضرات</span>
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

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>فيديوهات مباشرة داخل الموقع وتفعيل برقمك الجامعي</span>
          </div>
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
            <>مشاهدة المحاضرات بالفيديو <ArrowRight className="h-4 w-4" /></>
          ) : (
            <>عرض تفاصيل الدورة والدروس <ArrowRight className="h-4 w-4" /></>
          )}
        </Link>

        {!isUnlocked && (
          <button
            onClick={handleInstagramActivation}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 hover:from-[#833ab4]/25 hover:to-[#fcb045]/25 text-[#9F1239] dark:text-rose-300 border border-rose-900/20 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Instagram className="w-4 h-4 text-[#E1306C]" />
            <span>طلب التفعيل المجاني عبر Instagram</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
