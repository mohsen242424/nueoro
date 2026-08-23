"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, CheckCircle2, User, Hash, GraduationCap, Calendar, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const WHATSAPP_NUMBER = '962772855708';

const MAJORS = [
  'العلوم الطبية المخبرية',
  'التغذية السريرية والحميات',
  'العلاج الطبيعي',
  'العلاج الوظيفي',
  'التصوير الطبي والإشعاعي',
  'تمريض',
  'تخصص طبي آخر',
];

const YEARS = [
  'السنة الأولى',
  'السنة الثانية',
  'السنة الثالثة',
  'السنة الرابعة',
  'السنة الخامسة',
  'خريج / متوقع تخرجه',
];

export default function JoinPage() {
  const { t, isRTL } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !studentId.trim() || !major || !year) {
      return;
    }

    const message = `مرحباً فريق نيورو (NEURO)، أود الانضمام إلى الفريق والمجتمع الطلابي. تفاصيل طلبي:\n\n` +
      `👤 الاسم الكامل: ${fullName.trim()}\n` +
      `🔢 الرقم الجامعي: ${studentId.trim()}\n` +
      `🩺 التخصص: ${major}\n` +
      `🎓 السنة الدراسية: ${year}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#BE123C]/10 blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3.5 bg-rose-500/10 dark:bg-rose-950/40 border border-rose-900/15 dark:border-rose-900/30 rounded-2xl mb-4">
            <Sparkles className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-3 tracking-tight">
            {t.join.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-rose-200/70 max-w-lg mx-auto font-inter">
            انضم إلى فريق ومجتمع نيورو في كلية العلوم الطبية التطبيقية بالجامعة الهاشمية
          </p>
        </motion.div>

        <div className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl rounded-3xl border border-rose-900/10 dark:border-rose-900/30 shadow-2xl shadow-rose-950/5 overflow-hidden p-5 sm:p-8 md:p-10">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                  الاسم الكامل <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمد علي"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                  الرقم الجامعي <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: 2134567"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Major Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                  التخصص الأكاديمي <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    required
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white text-sm font-medium shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">-- اختر تخصصك --</option>
                    {MAJORS.map((m) => (
                      <option key={m} value={m} className="bg-white dark:bg-[#12070D] text-slate-900 dark:text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Academic Year Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                  السنة الدراسية <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white text-sm font-medium shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="">-- اختر السنة الدراسية --</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y} className="bg-white dark:bg-[#12070D] text-slate-900 dark:text-white">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>إرسال طلب الانضمام عبر واتساب (0772855708)</span>
                </button>
                <p className="text-[11px] text-center text-slate-500 dark:text-rose-200/60 mt-2 font-medium">
                  سيتم فتح محادثة واتساب تلقائياً مع مسؤول الفريق متضمنة بياناتك الكاملة
                </p>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-2">
                تم تجهيز طلب الانضمام!
              </h2>
              <p className="text-sm text-slate-600 dark:text-rose-200/70 mb-6 max-w-md mx-auto">
                تم تحويلك إلى واتساب على الرقم <strong className="text-slate-900 dark:text-white font-mono">0772855708</strong> لإرسال بياناتك واعتماد انضمامك.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const message = `مرحباً فريق نيورو (NEURO)، أود الانضمام إلى الفريق والمجتمع الطلابي. تفاصيل طلبي:\n\n` +
                      `👤 الاسم الكامل: ${fullName.trim()}\n` +
                      `🔢 الرقم الجامعي: ${studentId.trim()}\n` +
                      `🩺 التخصص: ${major}\n` +
                      `🎓 السنة الدراسية: ${year}`;
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> فتح واتساب مجدداً
                </button>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFullName('');
                    setStudentId('');
                    setMajor('');
                    setYear('');
                  }}
                  className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-[#180A11] border border-rose-900/15 text-slate-700 dark:text-rose-200 text-xs font-bold hover:bg-rose-50 transition-all"
                >
                  تعبئة طلب جديد
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
