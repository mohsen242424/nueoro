'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Send, CheckCircle2, EyeOff, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { saveSuggestionToDb } from '@/lib/supabase';

export default function SuggestionSection() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('عام');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setErrorMsg('يرجى كتابة نص الاقتراح');
      return;
    }
    if (content.trim().length < 5) {
      setErrorMsg('يرجى كتابة اقتراح أوضح (5 أحرف على الأقل)');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await saveSuggestionToDb({
        content: content.trim(),
        category,
      });

      if (res.success) {
        setIsSuccess(true);
        setContent('');
      } else {
        setErrorMsg('تعذر الإرسال حالياً، يرجى المحاولة لاحقاً');
      }
    } catch {
      setErrorMsg('حدث خطأ غير متوقع');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9F1239]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-white/95 via-white/90 to-rose-50/40 dark:from-[#14080F] dark:via-[#12070D] dark:to-[#1A0912] rounded-3xl p-6 sm:p-10 border border-rose-900/15 dark:border-rose-900/30 shadow-2xl shadow-rose-950/10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="flex-1 text-right space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-950/40 text-[#9F1239] dark:text-[#FB7185] font-bold text-xs border border-rose-900/15">
                <EyeOff className="w-3.5 h-3.5" />
                <span>مجهول الهوية 100% وبدون اسم</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100 font-poppins">
                اقترح على نيورو 💡
              </h2>

              <p className="text-sm text-slate-600 dark:text-rose-200/70 leading-relaxed font-inter">
                عندك فكرة أو مقترح لتطوير الفريق أو المنصة؟ شاركنا رأيك بكل حرية وشفافية! لا يظهر اسمك ولا رقمك الجامعي، واقتراحك يصل مباشرة للوحة إدارة الفريق.
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-rose-200/50 pt-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#9F1239]" /> سرية تامة
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> متابعة دورية من الإدارة
                </span>
              </div>

              <div className="pt-2">
                <Link
                  href="/suggest"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9F1239] dark:text-[#FB7185] hover:underline"
                >
                  <span>فتح صفحة الاقتراحات المخصصة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Form Box */}
            <div className="w-full md:w-[380px] bg-white dark:bg-[#180A11] p-5 rounded-2xl border border-rose-900/10 dark:border-rose-900/25 shadow-lg">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-6 text-center space-y-3"
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-rose-100 text-sm">
                      تم استلام اقتراحك بسرية!
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-rose-200/60 leading-relaxed">
                      شكراً لمساهمتك في تطوير نيورو. نراجع المقترحات باهتمام في الإدارة.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-xs text-[#9F1239] dark:text-[#FB7185] font-bold hover:underline pt-2 block mx-auto"
                    >
                      كتابة اقتراح آخر
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-rose-200">
                          اقتراحك أو فكرتك:
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="text-[10px] bg-rose-50 dark:bg-rose-950/40 text-[#9F1239] dark:text-rose-300 font-bold px-2 py-0.5 rounded-lg border border-rose-900/15 focus:outline-none"
                        >
                          <option value="عام">عام</option>
                          <option value="فكرة أو مبادرة جديدة">فكرة جديدة</option>
                          <option value="المواد والمصادر الأكاديمية">أكاديمي</option>
                          <option value="تحسين الموقع والمنصة">الموقع</option>
                          <option value="فعاليات وأنشطة طلابية">فعاليات</option>
                          <option value="مستلزمات ومتجر نيورو">المتجر</option>
                        </select>
                      </div>

                      <textarea
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        rows={4}
                        placeholder="شاركنا فكرتك أو ملاحظتك هنا بحرية تامة..."
                        className="w-full p-3 rounded-xl bg-slate-50/50 dark:bg-[#12070D] border border-rose-900/15 dark:border-rose-900/30 text-xs text-slate-900 dark:text-rose-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#9F1239] resize-none"
                      />

                      {errorMsg && (
                        <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mt-1">
                          {errorMsg}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !content.trim()}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#881337] to-[#9F1239] hover:from-[#9F1239] hover:to-[#BE123C] text-white font-bold text-xs shadow-md shadow-rose-950/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>جاري الإرسال...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>إرسال الاقتراح بدون اسم</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
