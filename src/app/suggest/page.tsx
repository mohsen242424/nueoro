'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Send,
  CheckCircle2,
  ShieldCheck,
  EyeOff,
  Sparkles,
  MessageSquarePlus,
  ArrowLeft,
  Loader2,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { saveSuggestionToDb } from '@/lib/supabase';

const CATEGORIES = [
  { id: 'فكرة أو مبادرة جديدة', label: '💡 فكرة أو مبادرة جديدة', icon: Sparkles },
  { id: 'المواد والمصادر الأكاديمية', label: '📚 المواد والمصادر الأكاديمية', icon: Lightbulb },
  { id: 'تحسين الموقع والمنصة', label: '💻 تحسين الموقع والمنصة', icon: MessageSquarePlus },
  { id: 'فعاليات وأنشطة طلابية', label: '🎪 فعاليات وأنشطة طلابية', icon: Sparkles },
  { id: 'مستلزمات ومتجر نيورو', label: '🩺 مستلزمات ومتجر نيورو', icon: Sparkles },
  { id: 'اقتراح عام أو ملاحظة', label: '💬 اقتراح عام أو ملاحظة', icon: MessageSquarePlus },
];

export default function SuggestPage() {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setErrorMsg('يرجى كتابة نص الاقتراح أولاً');
      return;
    }
    if (content.trim().length < 5) {
      setErrorMsg('يرجى كتابة اقتراح واضح (5 أحرف على الأقل)');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await saveSuggestionToDb({
        content: content.trim(),
        category: selectedCategory,
      });

      if (res.success) {
        setIsSuccess(true);
        setContent('');
      } else {
        setErrorMsg('حدث خطأ أثناء إرسال الاقتراح، يرجى المحاولة لاحقاً');
      }
    } catch (err) {
      setErrorMsg('حدث خطأ غير متوقع، يرجى المحاولة مجدداً');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setContent('');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[15%] right-[-5%] w-[45%] h-[45%] rounded-full bg-[#9F1239]/15 blur-[130px]" />
        <div className="absolute top-[45%] -left-[10%] w-[40%] h-[45%] rounded-full bg-[#BE123C]/10 blur-[140px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 dark:bg-rose-950/40 text-[#9F1239] dark:text-[#FB7185] font-bold text-xs mb-4 border border-rose-900/15 dark:border-rose-900/30"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>بسرية تامة 100% وبدون اسم</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-poppins text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-rose-100 tracking-tight mb-3"
          >
            اقترح على نيورو
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-rose-200/70 text-sm sm:text-base max-w-xl mx-auto font-inter leading-relaxed"
          >
            صوتك يصنع الفرق! شاركنا أفكارك وملاحظاتك واقتراحاتك لتطوير الفريق والمنصة، وستصل مباشرة إلى لوحة إدارة الفريق دون الحاجة لأي بيانات شخصية.
          </motion.p>
        </div>

        {/* Main Suggestion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 dark:bg-[#12070D]/90 backdrop-blur-xl rounded-3xl border border-rose-900/10 dark:border-rose-900/25 shadow-2xl shadow-rose-950/5 p-6 sm:p-8 lg:p-10 relative"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10 space-y-5"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-rose-100 font-poppins">
                    تم إرسال اقتراحك بنجاح!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-rose-200/70 max-w-md mx-auto leading-relaxed">
                    وصل اقتراحك بسرية تامة إلى إدارة Neuro Medical. نقدّر كل فكرة تسهم في تحسين تجربة طلبة الجامعة والارتقاء بالمجتمع الطلابي.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white font-bold text-xs shadow-lg shadow-rose-900/25 hover:opacity-95 transition-all"
                  >
                    إرسال اقتراح آخر
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-[#1A0B13] hover:bg-slate-200 dark:hover:bg-[#250E1B] text-slate-700 dark:text-rose-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    العودة للرئيسية
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Confidentiality Notice */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-900/10 dark:border-rose-900/20 text-xs text-[#9F1239] dark:text-rose-200">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-[#9F1239] dark:text-[#FB7185]" />
                  <span>
                    هذا النموذج مجهول الهوية بالكامل. لا نسجل اسمك، رقمك الجامعي، أو أي وسيلة تعريف.
                  </span>
                </div>

                {/* Category Selection */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/90">
                    تصنيف الاقتراح:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-2.5 rounded-xl text-xs font-bold text-right transition-all border flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#9F1239] text-white border-[#9F1239] shadow-md shadow-rose-950/20'
                              : 'bg-white dark:bg-[#180A11] border-rose-900/10 dark:border-rose-900/20 text-slate-700 dark:text-rose-200/70 hover:border-rose-900/30'
                          }`}
                        >
                          <span className="truncate">{cat.label}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mr-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Suggestion Textarea */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="suggestion-content"
                      className="block text-xs font-bold text-slate-700 dark:text-rose-200/90"
                    >
                      تفاصيل فكرتك أو اقتراحك:
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {content.length} حرف
                    </span>
                  </div>

                  <textarea
                    id="suggestion-content"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    rows={5}
                    placeholder="اكتب اقتراحك، فكرتك لتطوير الفريق، ملحوظة على مادة أو فعالية، أو أي فكرة تود أن يطبقها فريق نيورو... أفكارك مرحب بها دوماً!"
                    className="w-full p-4 rounded-2xl bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 text-slate-900 dark:text-rose-100 placeholder:text-slate-400 dark:placeholder:text-rose-200/30 focus:outline-none focus:ring-2 focus:ring-[#9F1239] text-sm leading-relaxed transition-all resize-none shadow-inner"
                  />

                  {errorMsg && (
                    <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">
                      {errorMsg}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !content.trim()}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-sm shadow-xl shadow-rose-900/25 hover:shadow-2xl hover:shadow-rose-900/35 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري إرسال الاقتراح...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:-translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      <span>إرسال الاقتراح بسرية تامة</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Feature / Guarantee Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
        >
          <div className="bg-white/60 dark:bg-[#12070D]/60 backdrop-blur-md p-4 rounded-2xl border border-rose-900/10 dark:border-rose-900/20 text-center">
            <div className="w-9 h-9 mx-auto mb-2 rounded-xl bg-rose-500/10 flex items-center justify-center text-[#9F1239] dark:text-[#FB7185]">
              <EyeOff className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-rose-100 mb-1">سرية ومجهول 100%</h4>
            <p className="text-[11px] text-slate-500 dark:text-rose-200/50 leading-relaxed">
              لا يتم طلب أو تخزين أي هوية شخصية أو رقم جامعي.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-[#12070D]/60 backdrop-blur-md p-4 rounded-2xl border border-rose-900/10 dark:border-rose-900/20 text-center">
            <div className="w-9 h-9 mx-auto mb-2 rounded-xl bg-rose-500/10 flex items-center justify-center text-[#9F1239] dark:text-[#FB7185]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-rose-100 mb-1">مباشرة للأدمن</h4>
            <p className="text-[11px] text-slate-500 dark:text-rose-200/50 leading-relaxed">
              تظهر الاقتراحات في لوحة إدارة الفريق للمراجعة والاهتمام.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-[#12070D]/60 backdrop-blur-md p-4 rounded-2xl border border-rose-900/10 dark:border-rose-900/20 text-center">
            <div className="w-9 h-9 mx-auto mb-2 rounded-xl bg-rose-500/10 flex items-center justify-center text-[#9F1239] dark:text-[#FB7185]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-rose-100 mb-1">تطوير مستمر</h4>
            <p className="text-[11px] text-slate-500 dark:text-rose-200/50 leading-relaxed">
              كل فكرة تسهم في تطوير المنصة والمبادرات القادمة لخدمتكم.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
