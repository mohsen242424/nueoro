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
  ToggleLeft,
  ToggleRight,
  Trash2,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  UserPlus,
  Loader2,
  Phone,
  MessageCircle,
  Download,
  FolderOpen,
  GraduationCap,
  Calendar,
  ExternalLink,
  Lock,
  Unlock,
  Check,
  Database,
  Layers,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useAuth, User } from '@/components/providers/AuthProvider';
import { fetchAllJoinRequests, JoinRequestRecord } from '@/lib/supabase';
import coursesData from '@/data/courses.json';

const ADMIN_PRIMARY_ID = '2437109';
const ADMIN_PRIMARY_EMAIL = 'neurowebsite2026@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/neuro_medical?igsi=MXU4Yng2dmdpdzdnMA==';

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

  // Auth form state
  const [authMethod, setAuthMethod] = useState<'id' | 'pin'>('id');
  const [emailInput, setEmailInput] = useState(ADMIN_PRIMARY_ID);
  const [passwordInput, setPasswordInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await adminLoginWithEmail(emailInput, passwordInput);
      if (res.success) {
        setLoginError('');
        setPasswordInput('');
      } else {
        setLoginError(res.error || 'الرقم الجامعي أو كلمة المرور غير صحيحة');
      }
    } catch (err: any) {
      setLoginError(err.message || 'حدث خطأ في الاتصال بقاعدة البيانات');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    if (adminLogin(pinInput)) {
      setLoginError('');
      setPinInput('');
    } else {
      setLoginError('رمز PIN غير صحيح (الرمز الافتراضي: 2437109)');
    }
    setIsLoggingIn(false);
  };

  const handleToggle = async (studentId: string, courseSlug: string) => {
    const key = `${studentId}-${courseSlug}`;
    setActionLoading(key);
    try {
      await toggleUserCourse(studentId, courseSlug);
      await loadData();
      showToast('تم تحديث حالة الدورة بنجاح في Supabase Cloud');
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
      showToast('تم تفعيل كافة الدورات للطالب بنجاح 🎉');
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
    if (confirm(`هل أنت متأكد تماماً من حذف حساب الطالب (${name} - ${studentId}) من قاعدة البيانات السحابية؟`)) {
      setActionLoading(studentId);
      try {
        await deleteStudent(studentId);
        if (selectedStudent?.studentId === studentId) {
          setSelectedStudent(null);
        }
        await loadData();
        showToast(`تم حذف حساب الطالب ${name} بنجاح`);
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
    showToast('تم تنزيل ملف بيانات الطلاب (CSV) بنجاح');
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
  // Admin Login Screen (Dedicated for neurowebsite2026@gmail.com)
  // -------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#9F1239]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#BE123C]/15 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/90 dark:bg-[#12070D]/90 backdrop-blur-2xl border border-rose-900/20 dark:border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/20 text-center relative z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#BE123C] flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-rose-900/30">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-slate-900 dark:text-rose-100 mb-1 font-poppins">
            لوحة الإدارة المركزية (Admin)
          </h1>
          <p className="text-xs text-slate-500 dark:text-rose-200/60 mb-6">
            مخصصة لإدارة طلاب منصة نيورو وتفعيل الدورات السحابية
          </p>

          {/* Login Method Toggle Tabs */}
          <div className="flex rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-1 mb-6 border border-rose-900/15">
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
              <Users className="w-3.5 h-3.5" /> بالرقم الجامعي / الإيميل
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
              <KeyRound className="w-3.5 h-3.5" /> رمز المشرف PIN
            </button>
          </div>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold">
              {loginError}
            </div>
          )}

          {authMethod === 'id' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-right">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
                  الرقم الجامعي أو البريد الإلكتروني للمشرف
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    placeholder="2437109 أو neurowebsite2026@gmail.com"
                    className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239]"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">
                  كلمة المرور (Password)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    placeholder="NeuroAdmin2026!#"
                    className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239]"
                    dir="ltr"
                  />
                </div>
                <div className="p-2.5 mt-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-900/10 text-[11px] text-slate-600 dark:text-rose-200/70 text-right">
                  <p>🔑 كلمة المرور: <code className="font-bold text-[#9F1239] dark:text-[#FB7185]">NeuroAdmin2026!#</code></p>
                  <p className="text-[10px] text-slate-400 mt-0.5">(أو استخدام الرقم الجامعي نفسه 2437109)</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>دخول لوحة تحكم المشرف (Online Supabase)</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handlePinLogin} className="space-y-4">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="أدخل الرقم الجامعي 2437109..."
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239] text-center tracking-widest"
                  dir="ltr"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-slate-400">رمز PIN السريع: <strong>2437109</strong></p>
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-xs shadow-md transition-all"
              >
                تسجيل الدخول بالرمز
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-rose-900/10 text-center">
            <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-[#9F1239] dark:hover:text-white">
              العودة للموقع الرئيسي
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Full Admin Dashboard
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
        <div className="bg-white/80 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#9F1239] text-white text-[10px] font-bold tracking-wider uppercase">
                Admin Master Dashboard
              </span>
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Supabase Live Connected
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-rose-100">
              لوحة التحكم والإدارة المركزية
            </h1>
            <p className="text-xs text-slate-500 dark:text-rose-200/60 font-mono mt-0.5">
              الحساب النشط: <strong className="text-slate-800 dark:text-white">المشرف العام (الرقم الجامعي: 2437109 | {adminEmail || ADMIN_PRIMARY_EMAIL})</strong>
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-rose-950/40 hover:bg-slate-200 text-slate-800 dark:text-rose-200 text-xs font-bold border border-rose-900/15 transition-all flex items-center gap-1.5 shadow-sm"
              title="تنزيل قائمة الطلاب كملف CSV"
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
              <span>تحديث السحابة</span>
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
            <span className="text-[10px] text-slate-400 mt-1 block">مسجلين في Supabase</span>
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
              <span className="text-xs font-bold text-slate-500 dark:text-rose-200/60">الدورات المتاحة</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100">{coursesData.length}</p>
            <span className="text-[10px] text-slate-400 mt-1 block">شاملة امتحانات المستوى</span>
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
            <span>حالة النظام و Supabase</span>
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
                                  title="حذف الطالب نهائياً من السحابة"
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
                              <span>جاري تحميل بيانات الطلاب من Supabase Cloud...</span>
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
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-rose-200/50">
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
                                  <ToggleRight className="w-3.5 h-3.5" /> تفعيل
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
                قائمة بالطلبات المسجلة من الطلاب عبر نموذج الانضمام (`/join`)
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
                      <th className="py-3.5 px-4 text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-900/10 dark:divide-rose-900/20">
                    {joinRequests.map((req, idx) => {
                      const msg = `مرحباً ${req.full_name}، نرحب بك في فريق نيورو (NEURO) الطبي! بخصوص طلب انضمامك للجنة...`;
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
        {/* TAB 3: Courses & Drive Content                            */}
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
        {/* TAB 4: System Diagnostics                                 */}
        {/* ========================================================= */}
        {activeTab === 'system' && (
          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-rose-100 mb-1">
                معلومات النظام والربط السحابي (Supabase Diagnostics)
              </h2>
              <p className="text-xs text-slate-500">
                حالة الاتصال وقواعد البيانات السحابية لنيورو
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400">الرقم الجامعي للمشرف</span>
                <p className="text-xs font-mono font-bold text-[#9F1239] dark:text-[#FB7185]">
                  2437109
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400">البريد الإلكتروني للمشرف</span>
                <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  neurowebsite2026@gmail.com
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400">حساب Instagram المربوط للتفعيل</span>
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
                <ShieldCheck className="w-4 h-4" /> آلية تفعيل الدورات المجانية للطلاب
              </h4>
              <p className="text-xs text-slate-600 dark:text-rose-200/80 leading-relaxed">
                جميع دورات المنصة مجانية بالكامل. عندما يرسل لك الطالب رسالة على حساب إنستغرام (<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#E1306C] underline">@neuro_medical</a>) تحتوي رقمه الجامعي واسم الدورة، ابحث عن رقمه الجامعي في جدول «إدارة الطلاب» واضغط «إدارة الدورات» ثم انقر على «تفعيل». سيتم فتح الفيديوهات بحسابه فوراً وتلقائياً على الموقع!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
