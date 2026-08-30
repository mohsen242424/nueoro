'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, KeyRound, Users, BookOpen, CheckCircle2, XCircle, Search, ToggleLeft, ToggleRight, Trash2, ArrowLeft, RefreshCw, Sparkles, UserPlus, Loader2 } from 'lucide-react';
import { useAuth, User } from '@/components/providers/AuthProvider';
import coursesData from '@/data/courses.json';

export default function AdminPage() {
  const { isAdmin, adminLogin, adminLogout, getAllStudents, toggleUserCourse, deleteStudent } = useAuth();

  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getAllStudents();
      setStudents(data);
      if (selectedStudent) {
        const found = data.find((s) => s.studentId === selectedStudent.studentId);
        setSelectedStudent(found || null);
      }
    } catch (err) {
      console.error('Error loading students in admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadStudents();
    }
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(pin)) {
      setPinError(false);
      setPin('');
    } else {
      setPinError(true);
    }
  };

  const handleToggle = async (studentId: string, courseSlug: string) => {
    const key = `${studentId}-${courseSlug}`;
    setActionLoading(key);
    try {
      await toggleUserCourse(studentId, courseSlug);
      await loadStudents();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (studentId: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف حساب الطالب (${name} - ${studentId})؟`)) {
      setActionLoading(studentId);
      try {
        await deleteStudent(studentId);
        if (selectedStudent?.studentId === studentId) {
          setSelectedStudent(null);
        }
        await loadStudents();
      } finally {
        setActionLoading(null);
      }
    }
  };

  const filteredStudents = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.studentId.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.major.toLowerCase().includes(q)
    );
  }, [students, searchTerm]);

  const totalEnrollments = students.reduce((acc, curr) => acc + (curr.enrolledCourses?.length || 0), 0);

  // PIN Login Screen if not authenticated as admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#9F1239]/15 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/85 dark:bg-[#12070D]/85 backdrop-blur-xl border border-rose-900/20 dark:border-rose-900/40 rounded-3xl p-8 shadow-2xl shadow-rose-950/20 text-center relative z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#BE123C] flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-rose-900/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-rose-100 mb-1 font-poppins">
            لوحة تحكم إدارة نيورو
          </h1>
          <p className="text-xs text-slate-500 dark:text-rose-200/60 mb-6">
            أدخل رمز مرور المشرفين (Admin PIN) للوصول وتفعيل دورات الطلاب
          </p>

          {pinError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold">
              رمز المرور غير صحيح! الرمز الافتراضي: <code>neuro2026</code>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 dark:text-rose-300/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="أدخل رمز المشرف..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all text-center tracking-widest"
                dir="ltr"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-xs shadow-md transition-all"
            >
              تسجيل الدخول للمشرف
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-rose-900/10 text-center">
            <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-[#9F1239] dark:hover:text-white">
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-[#9F1239] text-white text-[11px] font-bold">
                Cloud Admin Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100">
                لوحة تحكم تفعيل الدورات والطلاب (Supabase)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-rose-200/60">
              ابحث بالرقم الجامعي للطلاب وقم بتفعيل أو إلغاء تفعيل أي دورة بنقرة زر واحدة متزامنة سحابياً
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadStudents}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#12070D] border border-rose-900/15 text-slate-700 dark:text-rose-200 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> تحديث القائمة
            </button>
            <button
              onClick={adminLogout}
              className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/20 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors"
            >
              قفل لوحة المشرف
            </button>
          </div>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-rose-200/60">الطلاب المسجلين</span>
              <Users className="w-5 h-5 text-[#9F1239] dark:text-[#FB7185]" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-rose-100">
              {loading ? '...' : students.length}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-rose-200/60">إجمالي الاشتراكات المفعلة</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-rose-100">
              {loading ? '...' : totalEnrollments}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-rose-200/60">الدورات المتاحة</span>
              <BookOpen className="w-5 h-5 text-[#BE123C]" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-rose-100">{coursesData.length}</p>
          </div>
        </div>

        {/* Main Content Layout: Students List & Course Activation Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Student List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث بالرقم الجامعي، الاسم، أو الهاتف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-[#12070D] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239] shadow-sm"
                />
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-rose-50/70 dark:bg-rose-950/30 border-b border-rose-900/10 text-slate-700 dark:text-rose-200/80 font-bold">
                    <tr>
                      <th className="py-3.5 px-4">الطالب</th>
                      <th className="py-3.5 px-4">الرقم الجامعي</th>
                      <th className="py-3.5 px-4">الهاتف</th>
                      <th className="py-3.5 px-4">الدورات المفعلة</th>
                      <th className="py-3.5 px-4 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-900/10 dark:divide-rose-900/20">
                    {filteredStudents.map((s) => {
                      const isSelected = selectedStudent?.studentId === s.studentId;
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
                            <div className="text-[11px] font-normal text-slate-400 dark:text-rose-200/50">{s.major}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#9F1239] dark:text-[#FB7185]">
                            {s.studentId}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-rose-200/70">
                            {s.phone}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
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
                                title="حذف الطالب"
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
                          لم يتم العثور على طلاب يطابقون البحث
                        </td>
                      </tr>
                    )}

                    {loading && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-[#9F1239]" />
                            <span>جاري تحميل الطلاب من Supabase...</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Course Activation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-6 sticky top-24 shadow-sm">
              {selectedStudent ? (
                <div>
                  <div className="border-b border-rose-900/10 dark:border-rose-900/20 pb-4 mb-4">
                    <span className="text-[11px] font-bold text-[#9F1239] dark:text-[#FB7185] uppercase">
                      تفعيل الدورات للطالب المحدد
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-rose-100 mt-0.5">
                      {selectedStudent.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 font-mono mt-0.5">
                      الرقم الجامعي: <strong className="text-slate-900 dark:text-white">{selectedStudent.studentId}</strong>
                    </p>
                  </div>

                  <div className="space-y-3">
                    {coursesData.map((course) => {
                      const isEnrolled = selectedStudent.enrolledCourses?.includes(course.slug);
                      const key = `${selectedStudent.studentId}-${course.slug}`;
                      const isToggling = actionLoading === key;

                      return (
                        <div
                          key={course.id}
                          className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            isEnrolled
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : 'bg-slate-50 dark:bg-[#180A11] border-rose-900/10 dark:border-rose-900/20'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-rose-100 truncate">
                              {course.title}
                            </p>
                            <span className="text-[11px] font-semibold text-slate-500 dark:text-rose-200/50">
                              {course.price}
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
      </div>
    </div>
  );
}
