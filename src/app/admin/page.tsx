'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ShieldCheck,
  KeyRound,
  Mail,
  Users,
  BookOpen,
  CheckCircle2,
  XCircle,
  Search,
  Trash2,
  RefreshCw,
  Sparkles,
  UserPlus,
  Loader2,
  MessageCircle,
  Download,
  Lock,
  Check,
  Database,
  Layers,
  ExternalLink,
  Eye,
  EyeOff,
  ShieldAlert,
  Server,
  Activity,
} from 'lucide-react';
import { useAuth, User } from '@/components/providers/AuthProvider';
import { fetchAllJoinRequests, JoinRequestRecord } from '@/lib/supabase';
import coursesData from '@/data/courses.json';

const INSTAGRAM_URL = 'https://www.instagram.com/neuro_medical?igsi=MXU4Yng2dmdpdzdnMA==';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 60;

export default function AdminPage() {
  const {
    isAdmin,
    adminEmail,
    adminLogin,
    adminLoginWithEmail,
    adminLogout,
    getAllStudents,
    toggleUserCourse,
    deleteStudent,
  } = useAuth();

  // Auth form state (Zero exposed hints, clean empty defaults)
  const [authMethod, setAuthMethod] = useState<'id' | 'pin'>('id');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Brute-force protection & Lockout
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'students' | 'requests' | 'courses' | 'system'>('students');
  const [students, setStudents] = useState<User[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Filter & selection state
  const [searchTerm, setSearchTerm] = useState('');
  const [majorFilter, setMajorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'enrolled' | 'none'>('all');
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsData, requestsData] = await Promise.all([
        getAllStudents(),
        fetchAllJoinRequests(),
      ]);
      setStudents(studentsData);
      setJoinRequests(requestsData);

      if (selectedStudent) {
        const found = studentsData.find((s) => s.studentId === selectedStudent.studentId);
        setSelectedStudent(found || null);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await adminLoginWithEmail(emailInput, passwordInput);
      if (res.success) {
        setLoginError('');
        setPasswordInput('');
        setEmailInput('');
        setFailedAttempts(0);
      } else {
        const newFailCount = failedAttempts + 1;
        setFailedAttempts(newFailCount);
        if (newFailCount >= MAX_FAILED_ATTEMPTS) {
          setLockoutRemaining(LOCKOUT_SECONDS);
          setLoginError(`تم تجاوز الحد الأقصى للمحاولات. تم تعليق الدخول مؤقتاً لمدة ${LOCKOUT_SECONDS} ثانية لدواعي الأمان.`);
        } else {
          setLoginError('بيانات الدخول غير صحيحة. يرجى التحقق من المدخلات.');
        }
      }
    } catch (err: any) {
      setLoginError('تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    setLoginError('');
    setIsLoggingIn(true);

    if (adminLogin(pinInput)) {
      setLoginError('');
      setPinInput('');
      setFailedAttempts(0);
    } else {
      const newFailCount = failedAttempts + 1;
      setFailedAttempts(newFailCount);
      if (newFailCount >= MAX_FAILED_ATTEMPTS) {
        setLockoutRemaining(LOCKOUT_SECONDS);
        setLoginError(`تم تجاوز الحد الأقصى للمحاولات. تم تعليق الدخول مؤقتاً لمدة ${LOCKOUT_SECONDS} ثانية.`);
      } else {
        setLoginError('رمز المرور غير صحيح.');
      }
    }
    setIsLoggingIn(false);
  };

  const handleToggle = async (studentId: string, courseSlug: string) => {
    const key = `${studentId}-${courseSlug}`;
    setActionLoading(key);
    try {
      await toggleUserCourse(studentId, courseSlug);
      await loadData();
      showToast('تم تحديث وتثبيت حالة الدورة بنجاح');
    } catch (err) {
      showToast('حدث خطأ أثناء التحديث');
    } finally {
      setActionLoading(null);
    }
  };

  const handleActivateAll = async (studentId: string) => {
    setActionLoading(`all-${studentId}`);
    try {
      for (const course of coursesData) {
        if (!selectedStudent?.enrolledCourses.includes(course.slug)) {
          await toggleUserCourse(studentId, course.slug);
        }
      }
      await loadData();
      showToast('تم تفعيل كافة الدورات للطالب بنجاح');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeactivateAll = async (studentId: string) => {
    if (!confirm('هل أنت متأكد من إلغاء تفعيل جميع الدورات لهذا الطالب؟')) return;
    setActionLoading(`none-${studentId}`);
    try {
      for (const course of coursesData) {
        if (selectedStudent?.enrolledCourses.includes(course.slug)) {
          await toggleUserCourse(studentId, course.slug);
        }
      }
      await loadData();
      showToast('تم إلغاء تفعيل كافة الدورات للطالب');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (studentId: string, name: string) => {
    if (confirm(`هل أنت متأكد تماماً من حذف حساب الطالب (${name} - ${studentId}) نهائياً؟`)) {
      setActionLoading(studentId);
      try {
        await deleteStudent(studentId);
        if (selectedStudent?.studentId === studentId) {
          setSelectedStudent(null);
        }
        await loadData();
        showToast(`تم حذف حساب الطالب بنجاح`);
      } finally {
        setActionLoading(null);
      }
    }
  };

  // Export students to CSV
  const handleExportCsv = () => {
    if (students.length === 0) return;
    const headers = ['الرقم الجامعي,الاسم الكامل,رقم الهاتف,التخصص,تاريخ التسجيل,الدورات المفعلة'];
    const rows = students.map((s) => {
      const courses = s.enrolledCourses.join(' | ') || 'لا يوجد';
      return `"${s.studentId}","${s.name}","${s.phone}","${s.major}","${s.registeredAt}","${courses}"`;
    });
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `neuro_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('تم تصدير ملف بيانات الطلاب بنجاح');
  };

  // Filtered Students list
  const filteredStudents = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return students.filter((s) => {
      const matchSearch =
        !q ||
        s.studentId.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.major.toLowerCase().includes(q);

      const matchMajor = majorFilter === 'All' || s.major === majorFilter;

      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'enrolled' && (s.enrolledCourses?.length || 0) > 0) ||
        (statusFilter === 'none' && (s.enrolledCourses?.length || 0) === 0);

      return matchSearch && matchMajor && matchStatus;
    });
  }, [students, searchTerm, majorFilter, statusFilter]);

  const totalEnrollments = students.reduce((acc, curr) => acc + (curr.enrolledCourses?.length || 0), 0);

  // Distinct majors for filtering
  const availableMajors = useMemo(() => {
    const set = new Set(students.map((s) => s.major).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [students]);

  // -------------------------------------------------------------
  // Professional Secure Admin Login Screen (Zero Exposed Hints)
  // -------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#9F1239]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#BE123C]/10 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/95 dark:bg-[#12070D]/95 backdrop-blur-2xl border border-rose-900/20 dark:border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/20 text-center relative z-10"
        >
          {/* Security Shield Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#BE123C] flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-rose-900/30">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-rose-100 mb-1 font-poppins">
            بوابة الإدارة المركزية
          </h1>
          <p className="text-xs text-slate-500 dark:text-rose-200/60 mb-6 font-medium">
            نظام إدارة شؤون الطلاب والاعتمادات الأكاديمية
          </p>

          {/* Toggle Login Mode */}
          <div className="flex rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 p-1 mb-6 border border-rose-900/15">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('id');
                setLoginError('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'id'
                  ? 'bg-white dark:bg-[#1C0B14] text-[#9F1239] dark:text-rose-200 shadow-sm'
                  : 'text-slate-500 dark:text-rose-200/60 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> حساب المشرف
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('pin');
                setLoginError('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'pin'
                  ? 'bg-white dark:bg-[#1C0B14] text-[#9F1239] dark:text-rose-200 shadow-sm'
                  : 'text-slate-500 dark:text-rose-200/60 hover:text-slate-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" /> الرمز السريع (PIN)
            </button>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Lockout Banner */}
          {lockoutRemaining > 0 && (
            <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold">
              يرجى الانتظار {lockoutRemaining} ثانية قبل إعادة المحاولة
            </div>
          )}

          {authMethod === 'id' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-right">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
                  معرّف الحساب (الرقم أو البريد)
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    disabled={lockoutRemaining > 0}
                    placeholder="أدخل معرّف الحساب..."
                    className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239]"
                    dir="ltr"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
                  كلمة المرور
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    disabled={lockoutRemaining > 0}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239]"
                    dir="ltr"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn || lockoutRemaining > 0}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>تسجيل الدخول الآمن</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handlePinLogin} className="space-y-4">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  disabled={lockoutRemaining > 0}
                  className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3.5 pl-10 pr-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239] text-center tracking-widest disabled:opacity-50"
                  dir="ltr"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn || lockoutRemaining > 0}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                تأكيد الدخول
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-rose-900/10 text-center">
            <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-[#9F1239] dark:hover:text-white transition-colors">
              العودة إلى الموقع
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Full Professional Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-white/85 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#9F1239] text-white text-[10px] font-bold tracking-wider uppercase">
                Portal Management
              </span>
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                خادم النظام نشط ومتصل 🟢
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-rose-100">
              لوحة التحكم والإدارة المركزية
            </h1>
            <p className="text-xs text-slate-500 dark:text-rose-200/60 font-mono mt-0.5">
              المشرف العام المسؤول: <strong className="text-slate-800 dark:text-white">Super Administrator</strong>
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-rose-950/40 hover:bg-slate-200 text-slate-800 dark:text-rose-200 text-xs font-bold border border-rose-900/15 transition-all flex items-center gap-1.5 shadow-sm"
              title="تصدير قائمة الطلاب كملف CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير CSV</span>
            </button>

            <button
              onClick={loadData}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#12070D] border border-rose-900/15 text-slate-700 dark:text-rose-200 text-xs font-bold hover:bg-rose-50 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>تحديث البيانات</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/20 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        {/* Analytics KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-rose-200/60">إجمالي الطلاب</span>
              <div className="p-2 rounded-xl bg-rose-500/10 text-[#9F1239] dark:text-[#FB7185]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100">
              {loading ? '...' : students.length}
            </p>
            <span className="text-[10px] text-slate-400 mt-1 block">مسجلين في المنصة</span>
          </div>

          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-rose-200/60">الاشتراكات المفعلة</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100">
              {loading ? '...' : totalEnrollments}
            </p>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block">دورات مفتوحة للطلاب</span>
          </div>

          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-rose-200/60">طلبات الانضمام</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                <UserPlus className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100">
              {loading ? '...' : joinRequests.length}
            </p>
            <span className="text-[10px] text-slate-400 mt-1 block">طلبات عضوية الفريق</span>
          </div>

          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-rose-200/60">الدورات المعتمدة</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100">{coursesData.length}</p>
            <span className="text-[10px] text-slate-400 mt-1 block">دورة امتحانات المستوى</span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-900/15">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-[#881337] to-[#9F1239] text-white shadow-md'
                : 'text-slate-600 dark:text-rose-200/70 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>إدارة الطلاب وتفعيل الدورات ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-gradient-to-r from-[#881337] to-[#9F1239] text-white shadow-md'
                : 'text-slate-600 dark:text-rose-200/70 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>طلبات الانضمام للفريق ({joinRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-gradient-to-r from-[#881337] to-[#9F1239] text-white shadow-md'
                : 'text-slate-600 dark:text-rose-200/70 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>الدورات والمحاضرات ({coursesData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'system'
                ? 'bg-gradient-to-r from-[#881337] to-[#9F1239] text-white shadow-md'
                : 'text-slate-600 dark:text-rose-200/70 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>حالة النظام والأمان</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: Students & Course Activations                      */}
        {/* ========================================================= */}
        {activeTab === 'students' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Students Table & Filters */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ابحث بالرقم الجامعي، الاسم، أو الهاتف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-[#12070D] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239] shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                  <select
                    value={majorFilter}
                    onChange={(e) => setMajorFilter(e.target.value)}
                    className="bg-white dark:bg-[#12070D] border border-rose-900/15 text-slate-700 dark:text-rose-200 text-xs font-bold rounded-2xl px-3 py-2.5 focus:outline-none"
                  >
                    {availableMajors.map((m) => (
                      <option key={m} value={m}>
                        {m === 'All' ? 'جميع التخصصات' : m}
                      </option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-white dark:bg-[#12070D] border border-rose-900/15 text-slate-700 dark:text-rose-200 text-xs font-bold rounded-2xl px-3 py-2.5 focus:outline-none"
                  >
                    <option value="all">كل الحالات</option>
                    <option value="enrolled">مشتركين في دورات</option>
                    <option value="none">غير مشتركين</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-rose-50/70 dark:bg-rose-950/30 border-b border-rose-900/10 text-slate-700 dark:text-rose-200/80 font-bold">
                      <tr>
                        <th className="py-3.5 px-4">الطالب</th>
                        <th className="py-3.5 px-4">الرقم الجامعي</th>
                        <th className="py-3.5 px-4">الهاتف والواتساب</th>
                        <th className="py-3.5 px-4">الدورات المفعلة</th>
                        <th className="py-3.5 px-4 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-900/10 dark:divide-rose-900/20">
                      {filteredStudents.map((s) => {
                        const isSelected = selectedStudent?.studentId === s.studentId;
                        const cleanPhone = s.phone.replace(/[^0-9]/g, '');
                        const waUrl = cleanPhone.startsWith('0')
                          ? `https://wa.me/962${cleanPhone.substring(1)}`
                          : `https://wa.me/${cleanPhone}`;

                        return (
                          <tr
                            key={s.studentId}
                            onClick={() => setSelectedStudent(s)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-rose-500/10 dark:bg-rose-950/50'
                                : 'hover:bg-rose-50/40 dark:hover:bg-rose-950/20'
                            }`}
                          >
                            <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-rose-100">
                              {s.name}
                              <div className="text-[11px] font-normal text-slate-400 dark:text-rose-200/50">
                                {s.major}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-[#9F1239] dark:text-[#FB7185]">
                              {s.studentId}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-rose-200/70" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1.5">
                                <span>{s.phone}</span>
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                                  title="مراسلة الطالب عبر واتساب"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                  (s.enrolledCourses?.length || 0) > 0
                                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-slate-100 dark:bg-rose-950/30 text-slate-400'
                                }`}
                              >
                                {s.enrolledCourses?.length || 0} دورات
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedStudent(s)}
                                  className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#881337] to-[#9F1239] text-white font-bold text-[11px] shadow-sm"
                                >
                                  إدارة الدورات
                                </button>
                                <button
                                  onClick={() => handleDelete(s.studentId, s.name)}
                                  disabled={actionLoading === s.studentId}
                                  className="p-1 text-slate-400 hover:text-rose-600 rounded-lg disabled:opacity-50"
                                  title="حذف حساب الطالب"
                                >
                                  {actionLoading === s.studentId ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredStudents.length === 0 && !loading && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400">
                            لم يتم العثور على طلاب يطابقون خيارات البحث
                          </td>
                        </tr>
                      )}

                      {loading && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400">
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-[#9F1239]" />
                              <span>جاري تحميل بيانات الطلاب...</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Course Activation Box */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-6 sticky top-24 shadow-sm">
                {selectedStudent ? (
                  <div>
                    <div className="border-b border-rose-900/10 dark:border-rose-900/20 pb-4 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#9F1239] dark:text-[#FB7185] uppercase">
                          تفعيل الدورات للطالب
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {selectedStudent.enrolledCourses?.length || 0} / {coursesData.length} دورة
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-black text-slate-900 dark:text-rose-100 mt-1">
                        {selectedStudent.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 font-mono mt-0.5">
                        الرقم الجامعي: <strong className="text-slate-900 dark:text-white">{selectedStudent.studentId}</strong>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {selectedStudent.major} | {selectedStudent.phone}
                      </p>

                      {/* Bulk activation buttons */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleActivateAll(selectedStudent.studentId)}
                          disabled={actionLoading === `all-${selectedStudent.studentId}`}
                          className="flex-1 py-1.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-[11px] transition-colors flex items-center justify-center gap-1"
                        >
                          {actionLoading === `all-${selectedStudent.studentId}` ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                          <span>تفعيل الكل</span>
                        </button>

                        <button
                          onClick={() => handleDeactivateAll(selectedStudent.studentId)}
                          disabled={actionLoading === `none-${selectedStudent.studentId}`}
                          className="flex-1 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold text-[11px] transition-colors flex items-center justify-center gap-1"
                        >
                          {actionLoading === `none-${selectedStudent.studentId}` ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          <span>إلغاء الكل</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                      {coursesData.map((course) => {
                        const isEnrolled = selectedStudent.enrolledCourses?.includes(course.slug);
                        const key = `${selectedStudent.studentId}-${course.slug}`;
                        const isToggling = actionLoading === key;

                        return (
                          <div
                            key={course.id}
                            className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                              isEnrolled
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-slate-50 dark:bg-[#180A11] border-rose-900/10 dark:border-rose-900/20'
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 dark:text-rose-100 truncate">
                                {course.title}
                              </p>
                              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                {course.price} ({course.category})
                              </span>
                            </div>

                            <button
                              onClick={() => handleToggle(selectedStudent.studentId, course.slug)}
                              disabled={isToggling}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all ${
                                isEnrolled
                                  ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                                  : 'bg-slate-200 dark:bg-rose-950/50 text-slate-700 dark:text-rose-200 hover:bg-[#9F1239] hover:text-white'
                              }`}
                            >
                              {isToggling ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : isEnrolled ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" /> مفعل
                                </>
                              ) : (
                                <>
                                  <span>تفعيل</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 dark:text-rose-200/50">
                    <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#9F1239]" />
                    <p className="text-xs font-bold">حدد طالباً من القائمة لإدارة وتفعيل دوراته</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: Join Requests                                      */}
        {/* ========================================================= */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-rose-100 mb-1">
                طلبات الانضمام للمجتمع وفريق نيورو
              </h2>
              <p className="text-xs text-slate-500">
                قائمة بالطلبات المسجلة من الطلاب عبر نموذج الانضمام
              </p>
            </div>

            <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-rose-50/70 dark:bg-rose-950/30 border-b border-rose-900/10 text-slate-700 dark:text-rose-200/80 font-bold">
                    <tr>
                      <th className="py-3.5 px-4">اسم الطالب</th>
                      <th className="py-3.5 px-4">الرقم الجامعي</th>
                      <th className="py-3.5 px-4">التخصص الأكاديمي</th>
                      <th className="py-3.5 px-4">السنة الدراسية</th>
                      <th className="py-3.5 px-4">تاريخ الإرسال</th>
                      <th className="py-3.5 px-4 text-center">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-900/10 dark:divide-rose-900/20">
                    {joinRequests.map((req, idx) => {
                      return (
                        <tr key={req.id || idx} className="hover:bg-rose-50/40 dark:hover:bg-rose-950/20">
                          <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-rose-100">
                            {req.full_name}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#9F1239] dark:text-[#FB7185]">
                            {req.student_id}
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 dark:text-rose-200">
                            {req.major}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-[#9F1239] dark:text-rose-300 font-bold text-[11px]">
                              {req.year}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-500">
                            {req.created_at ? new Date(req.created_at).toLocaleDateString('ar-JO') : 'حديثاً'}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="text-[11px] text-emerald-600 font-bold flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> مسجل
                            </span>
                          </td>
                        </tr>
                      );
                    })}

                    {joinRequests.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          لا توجد طلبات انضمام حالياً
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: Courses Overview                                   */}
        {/* ========================================================= */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 dark:text-rose-100 mb-1">
                نظرة عامة على الدورات والمشغل المدمج
              </h2>
              <p className="text-xs text-slate-500">
                استعرض الدورات، عدد الدروس، والمحاضرات التي يشاهدها الطلاب داخل الموقع
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData.map((c) => {
                return (
                  <div
                    key={c.id}
                    className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#9F1239]/10 text-[#9F1239] dark:text-[#FDA4AF] text-[11px] font-bold">
                          {c.category}
                        </span>
                        <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                          {c.price}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 dark:text-rose-100 mb-1">
                        {c.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {c.description}
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-600 dark:text-rose-200/70 border-t border-rose-900/10 pt-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span>المحاضر:</span>
                          <strong className="text-slate-800 dark:text-white">{c.instructor}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>عدد الدروس:</span>
                          <strong>{c.lessons.length} محاضرات</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>المدة:</span>
                          <strong>{c.duration}</strong>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Link
                        href={`/courses/${c.slug}`}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#881337] to-[#9F1239] text-white hover:from-[#9F1239] hover:to-[#E11D48] text-xs font-bold text-center transition-all shadow-sm block"
                      >
                        معاينة مشغل الدورة بالموقع
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: Professional System & Security Diagnostics         */}
        {/* ========================================================= */}
        {activeTab === 'system' && (
          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-rose-100 mb-1">
                حالة النظام والبروتوكول الأمني
              </h2>
              <p className="text-xs text-slate-500">
                مؤشرات استقرار النظام والأمان والتشفير لقواعد البيانات
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400">مستوى الصلاحية</span>
                <p className="text-xs font-mono font-bold text-[#9F1239] dark:text-[#FB7185]">
                  Super Administrator (مدير النظام)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400">بروتوكول الأمان والتشفير</span>
                <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  AES-256 / SSL End-to-End Encrypted
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400">قناة استقبال طلبات التفعيل</span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-[#E1306C] hover:underline flex items-center gap-1"
                >
                  <span>@neuro_medical</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-900/15 space-y-2">
              <h4 className="text-xs font-bold text-[#9F1239] dark:text-[#FB7185] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> آلية إدارة وتفعيل الدورات للطلاب
              </h4>
              <p className="text-xs text-slate-600 dark:text-rose-200/80 leading-relaxed">
                جميع دورات المنصة مجانية بالكامل. عندما يرسل لك الطالب رسالة على حساب إنستغرام (<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#E1306C] underline">@neuro_medical</a>) تحتوي رقمه الجامعي، ابحث عن رقمه الجامعي في جدول «إدارة الطلاب» واضغط «إدارة الدورات» ثم انقر على «تفعيل». سيتم فتح الفيديوهات بحسابه فوراً وتلقائياً على الموقع!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
