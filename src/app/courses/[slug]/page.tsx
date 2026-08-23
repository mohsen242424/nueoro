"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Clock, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function CourseDetailPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-[85vh] bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#9F1239]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#BE123C]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-rose-950/15"
        >
          {/* Animated Icon Badge */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#BE123C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rose-900/30 text-white">
            <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12" />
            <div className="absolute -top-1 -right-1 p-2 bg-[#E11D48] rounded-full text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Main Title Badge */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/10 dark:bg-rose-950/50 border border-rose-900/15 dark:border-rose-900/30 text-xs font-bold text-[#9F1239] dark:text-[#FDA4AF] mb-4">
            <Clock className="w-3.5 h-3.5" />
            تحديث قادم
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-4 tracking-tight">
            سيتوفر قريباً
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-rose-200/70 max-w-lg mx-auto font-inter leading-relaxed mb-8">
            هذه الدورة قيد التسجيل والإنتاج الأكاديمي حالياً لطلبة الجامعة الهاشمية وستكون متاحة للشراء والدراسة قريباً جداً.
          </p>

          {/* Details Pill & Back Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white text-xs font-bold shadow-md shadow-rose-900/30 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" /> العودة للرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
