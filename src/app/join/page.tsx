"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, CheckCircle2, User, Hash, GraduationCap, Calendar, Instagram, Phone, Copy } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

import { saveJoinRequestToDb } from '@/lib/supabase';

const INSTAGRAM_URL = 'https://www.instagram.com/neuro_medical?igsi=MXU4Yng2dmdpdzdnMA==';

const MAJORS = [
  'طالب مستجد',
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
  const [phone, setPhone] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = fullName.trim();
    const cleanId = studentId.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || cleanName.length < 3) {
      setErrorMsg('يرجى كتابة الاسم الكامل بشكل صحيح');
      return;
    }

    if (!cleanId || !/^\d{5,12}$/.test(cleanId)) {
      setErrorMsg('الرقم الجامعي أو الوطني إجباري ويجب أن يتكون من أرقام فقط (مثال: 2437109 أو 2004123456)');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMsg('رقم الهاتف إجباري ومطلوب للتواصل (مثال: 0791234567)');
      return;
    }

    if (!major) {
      setErrorMsg('يرجى اختيار التخصص الأكاديمي');
      return;
    }

    if (!year) {
      setErrorMsg('يرجى اختيار السنة الدراسية');
      return;
    }

    setErrorMsg('');

    // Save to database in background
    saveJoinRequestToDb({
      fullName: cleanName,
      studentId: cleanId,
      phone: cleanPhone,
      major,
      year,
    });

    const message = `مرحباً فريق نيورو (NEURO) 👋\n\n` +
      `أود الانضمام إلى الفريق والمجتمع الطلابي. تفاصيل طلبي:\n\n` +
      `👤 الاسم الكامل: ${cleanName}\n` +
      `🔢 الرقم الجامعي / الوطني: ${cleanId}\n` +
      `📱 رقم الهاتف: ${cleanPhone}\n` +
      `🩺 التخصص: ${major}\n` +
      `🎓 السنة الدراسية: ${year}\n\n` +
      `شاكراً ومقدراً لكم! 🌟`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(message).catch(() => {});
    }

    setIsSuccess(true);
    setTimeout(() => {
      window.open(INSTAGRAM_URL, '_blank');
    }, 500);
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
                  الرقم الجامعي أو الرقم الوطني <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: 2437109 أو 2004123456 (للمستجدين)"
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full px-4 py-3 pl-10 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm font-mono"
                    dir="ltr"
                  />
                </div>
                <span className="text-[11px] text-slate-400 dark:text-rose-200/40 mt-1 block">
                  إذا كنت طالباً مستجداً ولم يصدر رقمك الجامعي، يمكنك كتابة رقمك الوطني
                </span>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                  رقم الهاتف للتواصل <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 0791234567"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full px-4 py-3 pl-10 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm font-mono"
                    dir="ltr"
                  />
                </div>
                <span className="text-[11px] text-slate-400 dark:text-rose-200/40 mt-1 block">
                  رقم هاتف مباشر للتواصل معك وتأكيد انضمامك للأنشطة واللجان
                </span>
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
                      <option key={m} value={m} className="bg-white dark:bg-[#12070D] text-slate-900 dark:text-white font-medium">
                        {m === 'طالب مستجد' ? '⭐ طالب مستجد (سنة أولى / لم يحدد التخصص بعد)' : m}
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

              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-600 dark:text-rose-400 text-center">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-rose-950/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5"
                >
                  <Instagram className="w-5 h-5" />
                  <span>إرسال طلب الانضمام والتواصل عبر إنستغرام</span>
                </button>
                <p className="text-[11px] text-center text-slate-500 dark:text-rose-200/60 mt-2 font-medium">
                  سيتم حفظ طلبك تلقائياً ونسخ بياناتك لفتح حساب إنستغرام الرسمي (@neuro_medical)
                </p>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-[#E1306C] to-[#833AB4] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-900/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-2">
                تم حفظ طلب الانضمام بنجاح!
              </h2>
              <p className="text-sm text-slate-600 dark:text-rose-200/70 mb-6 max-w-md mx-auto">
                تم حفظ بياناتك بقاعدة البيانات ونسخ رسالة طلب الانضمام تلقائياً. تم توجيهك إلى حساب إنستغرام الرسمي <strong className="text-[#E1306C] font-mono">@neuro_medical</strong> لتأكيد طلبك.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" /> فتح حساب إنستغرام (@neuro_medical)
                </a>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFullName('');
                    setStudentId('');
                    setPhone('');
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
