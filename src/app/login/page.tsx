'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, KeyRound, User as UserIcon, AlertCircle, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function LoginPage() {
  const { login, currentUser } = useAuth();
  const { isRTL } = useLanguage();
  const router = useRouter();

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentId.trim() || !password.trim()) {
      setError('الرجاء إدخال الرقم الجامعي وكلمة المرور');
      return;
    }

    setLoading(true);
    const res = login(studentId, password);
    setLoading(false);

    if (res.success) {
      router.push('/profile');
    } else {
      setError(res.error || 'فشل تسجيل الدخول');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#9F1239]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#BE123C]/15 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-rose-950/20 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#BE123C] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-900/30 text-white">
            <LogIn className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100 tracking-tight font-poppins">
            تسجيل الدخول
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-rose-200/70 mt-1.5">
            أدخل رقمك الجامعي للوصول إلى دوراتك وحسابك في نيورو
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-[#E11D48]" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
              الرقم الجامعي (Student ID)
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="مثال: 2134567"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
              كلمة المرور (Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all"
                dir="ltr"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-sm shadow-lg shadow-rose-900/30 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-rose-900/10 dark:border-rose-900/20 text-center space-y-3">
          <p className="text-xs font-semibold text-slate-600 dark:text-rose-200/70">
            ليس لديك حساب بعد؟{' '}
            <Link href="/register" className="text-[#9F1239] dark:text-[#FB7185] font-bold hover:underline">
              إنشاء حساب جديد بالرقم الجامعي
            </Link>
          </p>

          <div className="pt-2">
            <Link href="/admin" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 dark:text-rose-200/40 hover:text-[#9F1239] dark:hover:text-rose-200 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" /> دخول المشرفين (Admin Portal)
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
