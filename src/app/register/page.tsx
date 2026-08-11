'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, User, KeyRound, Phone, BookOpen, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    phone: '',
    major: 'العلوم الطبية المخبرية',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const majors = [
    'العلوم الطبية المخبرية',
    'التغذية السريرية و الحميات',
    'العلاج الطبيعي',
    'التصوير الطبي',
    'العلاج الوظيفي',
    'تخصص طبي آخر / سنة أولى',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.studentId.trim() || !formData.phone.trim() || !formData.password.trim()) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    setLoading(true);
    const res = register({
      name: formData.name,
      studentId: formData.studentId,
      phone: formData.phone,
      major: formData.major,
      password: formData.password,
    });
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } else {
      setError(res.error || 'حدث خطأ أثناء التسجيل');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#9F1239]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#BE123C]/15 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-rose-950/20 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#BE123C] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-900/30 text-white">
            <UserPlus className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100 tracking-tight font-poppins">
            إنشاء حساب طالب جديد
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-rose-200/70 mt-1.5">
            سجّل برقمك الجامعي للاشتراك وتفعيل الدورات المدفوعة في منصة نيورو
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

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            <span>تم إنشاء حسابك بنجاح! جاري الانتقال إلى لوحة حسابك...</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
              الاسم الكامل (Full Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="أحمد محمد علي"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
                الرقم الجامعي (Student ID) *
              </label>
              <input
                type="text"
                placeholder="2134567"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
                رقم الهاتف (WhatsApp) *
              </label>
              <input
                type="text"
                placeholder="0791234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
              التخصص الأكاديمي (Major)
            </label>
            <select
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all"
            >
              {majors.map((m) => (
                <option key={m} value={m} className="bg-white dark:bg-[#180A11] text-slate-900 dark:text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
                كلمة المرور *
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
                تأكيد كلمة المرور *
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all"
                dir="ltr"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-sm shadow-lg shadow-rose-900/30 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'جاري التسجيل...' : 'إنشاء الحساب الآن'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-rose-900/10 dark:border-rose-900/20 text-center">
          <p className="text-xs font-semibold text-slate-600 dark:text-rose-200/70">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-[#9F1239] dark:text-[#FB7185] font-bold hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
