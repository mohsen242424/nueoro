'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, Plus, Trash2, RotateCcw, ChevronDown, ChevronUp,
  AlertTriangle, CheckCircle2, Award, Target, Info, TrendingUp, BookOpen, XCircle
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

// ── Grade System (Hashemite University - 4.00 scale) ─────────────────
type Grade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F';

const POINTS: Record<Grade, number> = {
  'A+': 4.00, 'A': 3.75, 'A-': 3.50,
  'B+': 3.25, 'B': 3.00, 'B-': 2.75,
  'C+': 2.50, 'C': 2.25, 'C-': 2.00,
  'D+': 1.75, 'D': 1.50, 'F': 0.00,
};

const ARABIC: Record<Grade, string> = {
  'A+': 'أ+', 'A': 'أ', 'A-': 'أ-',
  'B+': 'ب+', 'B': 'ب', 'B-': 'ب-',
  'C+': 'ج+', 'C': 'ج', 'C-': 'ج-',
  'D+': 'د+', 'D': 'د', 'F': 'هـ',
};

const ALL_GRADES = Object.keys(POINTS) as Grade[];

// Maximum grade allowed for re-take (C+ = 2.50)
const MAX_RETAKE_POINTS = 2.50;

function getClassification(gpa: number): { label: string; color: string } {
  if (gpa >= 3.50) return { label: 'ممتاز', color: 'text-emerald-600 dark:text-emerald-400' };
  if (gpa >= 3.00) return { label: 'جيد جداً', color: 'text-blue-600 dark:text-blue-400' };
  if (gpa >= 2.50) return { label: 'جيد', color: 'text-amber-600 dark:text-amber-400' };
  if (gpa >= 2.00) return { label: 'مقبول', color: 'text-orange-600 dark:text-orange-400' };
  return { label: 'ضعيف', color: 'text-rose-600 dark:text-rose-400' };
}

function closestGradeForPoints(pts: number): string {
  if (pts > 4.00) return 'غير قابل للتحقيق';
  if (pts <= 0) return 'محقق أصلاً';
  let closest: Grade = 'F';
  let minDiff = Infinity;
  for (const g of ALL_GRADES) {
    const diff = Math.abs(POINTS[g] - pts);
    if (POINTS[g] >= pts && diff < minDiff) {
      minDiff = diff;
      closest = g;
    }
  }
  return `${closest} (${ARABIC[closest]}) = ${POINTS[closest].toFixed(2)}`;
}

// ── Interfaces ────────────────────────────────────────────────────────
interface CourseRow {
  id: string;
  name: string;
  hours: number;
  grade: Grade | '';
  repeat: boolean;
  oldGrade: Grade | '';
  excluded: boolean;
}

interface CalcResult {
  semesterGPA: number;
  cumulativeGPA: number;
  semesterHours: number;
  totalHours: number;
  semesterClassification: string;
  cumulativeClassification: string;
  semesterClassColor: string;
  cumulativeClassColor: string;
  failedCount: number;
  academicStatus: { label: string; color: string; icon: 'danger' | 'warning' | 'ok' | 'honor' }[];
  details: {
    name: string;
    hours: number;
    grade: Grade;
    gradeAr: string;
    points: number;
    qualityPoints: number;
    note: string;
  }[];
}

function makeId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

function emptyRow(): CourseRow {
  return { id: makeId(), name: '', hours: 3, grade: '', repeat: false, oldGrade: '', excluded: false };
}

// ── Component ─────────────────────────────────────────────────────────
export default function GPACalculator() {
  const { t } = useLanguage();

  const [rows, setRows] = useState<CourseRow[]>([emptyRow(), emptyRow(), emptyRow()]);
  const [prevGPA, setPrevGPA] = useState('');
  const [prevHours, setPrevHours] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showRefTable, setShowRefTable] = useState(false);

  // Target GPA planner
  const [targetGPA, setTargetGPA] = useState('');
  const [targetHours, setTargetHours] = useState('');

  const addRow = () => setRows([...rows, emptyRow()]);
  const removeRow = (id: string) => { if (rows.length > 1) setRows(rows.filter(r => r.id !== id)); };
  const updateRow = (id: string, field: keyof CourseRow, value: any) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const reset = () => {
    setRows([emptyRow(), emptyRow(), emptyRow()]);
    setPrevGPA('');
    setPrevHours('');
    setResult(null);
    setErrors([]);
    setTargetGPA('');
    setTargetHours('');
  };

  // ── Calculation ───────────────────────────────────────────────────
  const calculate = () => {
    const errs: string[] = [];
    const pGPA = prevGPA === '' ? 0 : parseFloat(prevGPA);
    const pH = prevHours === '' ? 0 : parseFloat(prevHours);

    if (prevGPA !== '' && (pGPA < 0 || pGPA > 4.00)) errs.push('المعدل التراكمي السابق يجب أن يكون بين 0 و 4.00');
    if (prevHours !== '' && pH < 0) errs.push('الساعات المقطوعة يجب أن تكون عدداً موجباً');

    // Filter out active rows (not excluded and have a grade)
    const activeRows = rows.filter(r => !r.excluded && r.grade);
    if (activeRows.length === 0) { errs.push('أدخل مادة واحدة على الأقل مع رمز العلامة'); }

    // Validate each row
    for (const r of rows) {
      if (r.excluded) continue;
      if (!r.grade && (r.name || r.hours)) continue; // partially filled, skip
      if (r.grade && r.hours <= 0) errs.push(`المادة "${r.name || '—'}" يجب أن تحتوي على ساعات أكبر من صفر`);
      if (r.repeat && !r.oldGrade) errs.push(`المادة "${r.name || '—'}" معادة ولكن لم تختر العلامة السابقة`);
      if (r.repeat && r.oldGrade && POINTS[r.oldGrade as Grade] > MAX_RETAKE_POINTS) {
        errs.push(`المادة "${r.name || '—'}": الإعادة لرفع المعدل مسموحة فقط إذا كانت العلامة السابقة (ج+ = 2.50) أو أقل`);
      }
    }

    if (errs.length > 0) { setErrors(errs); setResult(null); return; }
    setErrors([]);

    // ── Semester GPA (uses actual new grades, ignores excluded) ───
    let semQP = 0;
    let semH = 0;
    for (const r of activeRows) {
      const g = r.grade as Grade;
      semQP += POINTS[g] * r.hours;
      semH += r.hours;
    }
    const semesterGPA = semH > 0 ? +(semQP / semH).toFixed(2) : 0;

    // ── Cumulative GPA (with retake logic: best grade, no double hours) ──
    let qp = pGPA * pH;
    let h = pH;

    for (const r of activeRows) {
      const g = r.grade as Grade;
      if (r.repeat && r.oldGrade) {
        // Remove old attempt from cumulative
        qp -= POINTS[r.oldGrade as Grade] * r.hours;
        h -= r.hours;
        // Use the higher grade
        const eff = Math.max(POINTS[g], POINTS[r.oldGrade as Grade]);
        qp += eff * r.hours;
        h += r.hours;
      } else {
        qp += POINTS[g] * r.hours;
        h += r.hours;
      }
    }
    const cumulativeGPA = h > 0 ? +(qp / h).toFixed(2) : 0;

    // ── Classification ──
    const semClass = getClassification(semesterGPA);
    const cumClass = getClassification(cumulativeGPA);

    // ── Failed count ──
    let failedCount = 0;
    for (const r of activeRows) {
      if (r.grade === 'F') failedCount++;
    }

    // ── Academic status alerts ──
    const statuses: CalcResult['academicStatus'] = [];
    if (cumulativeGPA < 1.50) {
      statuses.push({ label: 'تراكمي دون 1.50 — خطر الفصل الأكاديمي', color: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30', icon: 'danger' });
    } else if (cumulativeGPA < 2.00) {
      statuses.push({ label: 'إنذار أكاديمي — التراكمي دون الحد المطلوب (2.00)', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30', icon: 'warning' });
    } else {
      statuses.push({ label: 'مؤهل للتخرج بهذا التراكمي', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30', icon: 'ok' });
    }
    if (semesterGPA >= 3.50 && semH >= 15) {
      statuses.push({ label: 'لائحة شرف الكلية — تقدير ممتاز مع 15 ساعة أو أكثر!', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30', icon: 'honor' });
    }
    if (failedCount > 0) {
      statuses.push({ label: `عدد المواد الراسبة التي تحتاج إعادة: ${failedCount}`, color: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30', icon: 'danger' });
    }

    // ── Detail rows ──
    const details: CalcResult['details'] = [];
    for (const r of activeRows) {
      const g = r.grade as Grade;
      let effectivePoints = POINTS[g];
      let note = '';
      if (r.repeat && r.oldGrade) {
        const oldP = POINTS[r.oldGrade as Grade];
        effectivePoints = Math.max(POINTS[g], oldP);
        if (oldP > POINTS[g]) {
          note = `معادة — احتُسبت العلامة الأعلى (${r.oldGrade} = ${ARABIC[r.oldGrade as Grade]})`;
        } else if (oldP === POINTS[g]) {
          note = 'معادة — نفس العلامة';
        } else {
          note = `معادة — احتُسبت العلامة الجديدة (${g} = ${ARABIC[g]})`;
        }
      }
      details.push({
        name: r.name || `مادة ${details.length + 1}`,
        hours: r.hours,
        grade: g,
        gradeAr: ARABIC[g],
        points: effectivePoints,
        qualityPoints: +(effectivePoints * r.hours).toFixed(2),
        note,
      });
    }

    // Add excluded rows for info
    for (const r of rows) {
      if (r.excluded && r.grade) {
        details.push({
          name: r.name || 'مادة مستثناة',
          hours: r.hours,
          grade: r.grade as Grade,
          gradeAr: ARABIC[r.grade as Grade],
          points: POINTS[r.grade as Grade],
          qualityPoints: 0,
          note: 'لا تدخل في المعدل — مستثناة',
        });
      }
    }

    setResult({
      semesterGPA, cumulativeGPA, semesterHours: semH, totalHours: h,
      semesterClassification: semClass.label, cumulativeClassification: cumClass.label,
      semesterClassColor: semClass.color, cumulativeClassColor: cumClass.color,
      failedCount, academicStatus: statuses, details,
    });
  };

  // ── Target GPA planner ────────────────────────────────────────────
  const targetResult = useMemo(() => {
    if (!result || !targetGPA || !targetHours) return null;
    const tGPA = parseFloat(targetGPA);
    const tH = parseFloat(targetHours);
    if (isNaN(tGPA) || isNaN(tH) || tH <= 0 || tGPA < 0 || tGPA > 4.00) return null;

    const currentCum = result.cumulativeGPA;
    const currentH = result.totalHours;

    const required = +((tGPA * (currentH + tH) - currentCum * currentH) / tH).toFixed(2);

    if (required > 4.00) return { achievable: false, required, message: 'الهدف غير قابل للتحقيق حتى لو حصلت على A+ في جميع المواد' };
    if (required <= 0) return { achievable: true, required: 0, message: 'الهدف محقق أصلاً بمعدلك الحالي! 🎉' };
    return { achievable: true, required, message: `المعدل الفصلي المطلوب: ${required.toFixed(2)} — أقرب رمز: ${closestGradeForPoints(required)}` };
  }, [result, targetGPA, targetHours]);

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[#BE123C]/10 blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 bg-rose-500/10 dark:bg-rose-950/40 rounded-2xl border border-rose-900/15 dark:border-rose-900/30">
              <Calculator className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
            </div>
            <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-rose-100 tracking-tight">
              حاسبة المعدل الجامعي
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-slate-600 dark:text-rose-200/70 text-base md:text-lg max-w-2xl mx-auto font-inter">
            احسب معدلك الفصلي والتراكمي بدقة على نظام النقاط من 4.00
          </motion.p>
        </div>

        {/* Collapsible Grade Reference Table */}
        <div className="mb-6">
          <button
            onClick={() => setShowRefTable(!showRefTable)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/30 text-sm font-bold text-slate-700 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shadow-sm"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#9F1239]" />
              جدول الرموز والنقاط (مرجع)
            </span>
            {showRefTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {showRefTable && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/30 rounded-2xl p-4 shadow-sm overflow-x-auto">
                  <table className="w-full text-xs text-center">
                    <thead>
                      <tr className="text-slate-500 dark:text-rose-200/60 font-bold">
                        <th className="py-2 px-2">الرمز</th>
                        <th className="py-2 px-2">بالعربي</th>
                        <th className="py-2 px-2">النقاط</th>
                        <th className="py-2 px-2">الرمز</th>
                        <th className="py-2 px-2">بالعربي</th>
                        <th className="py-2 px-2">النقاط</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-900 dark:text-rose-100 font-semibold">
                      {[
                        [['A+', 'A', 'A-', 'B+', 'B', 'B-'], ['C+', 'C', 'C-', 'D+', 'D', 'F']],
                      ].map((pair, pi) =>
                        pair[0].map((g, i) => (
                          <tr key={i} className="border-t border-rose-900/5 dark:border-rose-900/15">
                            <td className="py-2 px-2 font-mono">{g}</td>
                            <td className="py-2 px-2">{ARABIC[g as Grade]}</td>
                            <td className="py-2 px-2 font-mono text-[#9F1239] dark:text-[#FB7185]">{POINTS[g as Grade].toFixed(2)}</td>
                            <td className="py-2 px-2 font-mono">{pair[1][i]}</td>
                            <td className="py-2 px-2">{ARABIC[pair[1][i] as Grade]}</td>
                            <td className="py-2 px-2 font-mono text-[#9F1239] dark:text-[#FB7185]">{POINTS[pair[1][i] as Grade].toFixed(2)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-bold">
                    {[
                      { r: '3.50 – 4.00', l: 'ممتاز', c: 'text-emerald-600' },
                      { r: '3.00 – 3.49', l: 'جيد جداً', c: 'text-blue-600' },
                      { r: '2.50 – 2.99', l: 'جيد', c: 'text-amber-600' },
                      { r: '2.00 – 2.49', l: 'مقبول', c: 'text-orange-600' },
                      { r: 'دون 2.00', l: 'ضعيف', c: 'text-rose-600' },
                    ].map(c => (
                      <div key={c.l} className="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 text-center">
                        <span className={`${c.c} block`}>{c.l}</span>
                        <span className="text-slate-400 text-[10px]">{c.r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Form Card */}
        <motion.div layout className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl border border-rose-900/10 dark:border-rose-900/30 rounded-3xl p-4 sm:p-6 shadow-xl shadow-rose-950/5 mb-6">

          {/* Previous Record */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-5 border-b border-rose-900/10 dark:border-rose-900/20">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">المعدل التراكمي السابق <span className="text-slate-400 font-normal">(اترك فارغاً إذا أول فصل)</span></label>
              <input
                type="number" min="0" max="4" step="0.01" value={prevGPA}
                onChange={(e) => setPrevGPA(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239] text-sm font-medium"
                placeholder="مثال: 2.80"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5">الساعات المقطوعة سابقاً</label>
              <input
                type="number" min="0" value={prevHours}
                onChange={(e) => setPrevHours(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239] text-sm font-medium"
                placeholder="مثال: 60"
              />
            </div>
          </div>

          {/* Column Headers */}
          <div className="hidden sm:grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-500 dark:text-rose-200/60 px-1 mb-2 uppercase tracking-wider">
            <div className="col-span-3">اسم المادة</div>
            <div className="col-span-1 text-center">الساعات</div>
            <div className="col-span-2">الرمز</div>
            <div className="col-span-1 text-center">معادة؟</div>
            <div className="col-span-2">العلامة السابقة</div>
            <div className="col-span-2 text-center">لا تدخل بالمعدل</div>
            <div className="col-span-1"></div>
          </div>

          {/* Course Rows */}
          <div className="space-y-2.5">
            {rows.map((row, idx) => (
              <motion.div
                key={row.id} layout
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-2.5 rounded-2xl border transition-all ${
                  row.excluded
                    ? 'bg-slate-50/50 dark:bg-[#180A11]/50 border-slate-200 dark:border-rose-900/15 opacity-60'
                    : 'bg-white dark:bg-[#12070D] border-rose-900/10 dark:border-rose-900/20'
                }`}
              >
                {/* Mobile label */}
                <span className="sm:hidden text-[10px] font-bold text-[#9F1239] col-span-1">مادة {idx + 1}</span>

                {/* Name */}
                <div className="col-span-1 sm:col-span-3">
                  <input
                    type="text" value={row.name}
                    onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                    placeholder={`المادة ${idx + 1}`}
                    className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 dark:border-rose-900/20 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9F1239]"
                  />
                </div>

                {/* Hours */}
                <div className="col-span-1 sm:col-span-1">
                  <input
                    type="number" min="1" max="6" value={row.hours || ''}
                    onChange={(e) => updateRow(row.id, 'hours', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 dark:border-rose-900/20 rounded-xl px-2 py-2 text-xs font-bold text-center text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9F1239]"
                    placeholder="3"
                  />
                </div>

                {/* Grade */}
                <div className="col-span-1 sm:col-span-2">
                  <select
                    value={row.grade}
                    onChange={(e) => updateRow(row.id, 'grade', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 dark:border-rose-900/20 rounded-xl px-2 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9F1239] cursor-pointer"
                  >
                    <option value="">— اختر —</option>
                    {ALL_GRADES.map(g => (
                      <option key={g} value={g}>{g} ({ARABIC[g]}) — {POINTS[g].toFixed(2)}</option>
                    ))}
                  </select>
                </div>

                {/* Repeat checkbox */}
                <div className="col-span-1 sm:col-span-1 flex items-center justify-center">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox" checked={row.repeat}
                      onChange={(e) => updateRow(row.id, 'repeat', e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-rose-900/20 text-[#9F1239] focus:ring-[#9F1239] cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-500 sm:hidden">معادة</span>
                  </label>
                </div>

                {/* Old Grade (only if repeat) */}
                <div className="col-span-1 sm:col-span-2">
                  {row.repeat ? (
                    <select
                      value={row.oldGrade}
                      onChange={(e) => updateRow(row.id, 'oldGrade', e.target.value)}
                      className="w-full bg-amber-50 dark:bg-amber-950/20 border border-amber-500/30 rounded-xl px-2 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="">— السابقة —</option>
                      {ALL_GRADES.map(g => (
                        <option key={g} value={g}>{g} ({ARABIC[g]})</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-[10px] text-slate-300 dark:text-rose-200/30 text-center">—</div>
                  )}
                </div>

                {/* Excluded checkbox */}
                <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox" checked={row.excluded}
                      onChange={(e) => updateRow(row.id, 'excluded', e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-rose-900/20 text-slate-500 focus:ring-slate-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-500 sm:hidden">لا تدخل</span>
                  </label>
                </div>

                {/* Delete */}
                <div className="col-span-1 sm:col-span-1 flex justify-center">
                  <button onClick={() => removeRow(row.id)} disabled={rows.length <= 1}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg transition-colors disabled:opacity-20">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-rose-900/10 dark:border-rose-900/20">
            <div className="flex items-center gap-2">
              <button onClick={addRow}
                className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 dark:bg-rose-950/40 hover:bg-[#9F1239] hover:text-white border border-rose-900/15 rounded-xl text-[#9F1239] dark:text-rose-200 text-xs font-bold shadow-sm transition-all">
                <Plus className="w-4 h-4" /> إضافة مادة
              </button>
              <button onClick={reset}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:text-[#9F1239] text-xs font-medium transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> إعادة ضبط
              </button>
            </div>

            <button onClick={calculate}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-sm shadow-lg shadow-rose-900/30 transition-all flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              <span>احسب المعدل</span>
            </button>
          </div>
        </motion.div>

        {/* Errors */}
        <AnimatePresence>
          {errors.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
              {errors.map((e, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-bold text-rose-700 dark:text-rose-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{e}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results ────────────────────────────────────────────── */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Main KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Cumulative GPA */}
                <div className="sm:col-span-2 bg-white/90 dark:bg-[#12070D]/90 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-6 shadow-lg text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">المعدل التراكمي بعد الفصل</span>
                  <div className="mt-2 flex items-center justify-center gap-4">
                    <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white font-poppins">{result.cumulativeGPA.toFixed(2)}</span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                      result.cumulativeGPA >= 3.50 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                      result.cumulativeGPA >= 3.00 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' :
                      result.cumulativeGPA >= 2.50 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' :
                      result.cumulativeGPA >= 2.00 ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30' :
                      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                    }`}>
                      {result.cumulativeClassification}
                    </span>
                  </div>
                </div>

                {/* Semester GPA */}
                <div className="bg-white/90 dark:bg-[#12070D]/90 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-lg text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">المعدل الفصلي</span>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-2 font-poppins">{result.semesterGPA.toFixed(2)}</p>
                  <span className={`text-xs font-bold ${result.semesterClassColor}`}>{result.semesterClassification}</span>
                </div>

                {/* Hours */}
                <div className="bg-white/90 dark:bg-[#12070D]/90 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 shadow-lg text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">الساعات</span>
                  <p className="text-3xl font-black text-[#9F1239] dark:text-[#FB7185] mt-2 font-poppins">{result.totalHours}</p>
                  <span className="text-xs text-slate-400">({result.semesterHours} ساعة هذا الفصل)</span>
                </div>
              </div>

              {/* Academic Status Alerts */}
              <div className="space-y-2">
                {result.academicStatus.map((s, i) => (
                  <div key={i} className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-bold ${s.color}`}>
                    {s.icon === 'danger' && <XCircle className="w-4 h-4 shrink-0" />}
                    {s.icon === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0" />}
                    {s.icon === 'ok' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    {s.icon === 'honor' && <Award className="w-4 h-4 shrink-0" />}
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Detailed Table */}
              <div className="bg-white/90 dark:bg-[#12070D]/90 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl overflow-hidden shadow-lg">
                <div className="px-5 py-4 border-b border-rose-900/10 dark:border-rose-900/20">
                  <h3 className="text-sm font-black text-slate-900 dark:text-rose-100">جدول تفصيلي للمواد</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-rose-50/70 dark:bg-rose-950/30 text-slate-600 dark:text-rose-200/80 font-bold">
                      <tr>
                        <th className="py-3 px-4">المادة</th>
                        <th className="py-3 px-3 text-center">الساعات</th>
                        <th className="py-3 px-3 text-center">الرمز</th>
                        <th className="py-3 px-3 text-center">النقاط</th>
                        <th className="py-3 px-3 text-center">نقاط × ساعات</th>
                        <th className="py-3 px-4">ملاحظة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-900/5 dark:divide-rose-900/15">
                      {result.details.map((d, i) => (
                        <tr key={i} className={d.note.includes('مستثناة') ? 'opacity-50' : ''}>
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-rose-100">{d.name}</td>
                          <td className="py-3 px-3 text-center font-mono">{d.hours}</td>
                          <td className="py-3 px-3 text-center font-bold">
                            <span className="text-[#9F1239] dark:text-[#FB7185]">{d.grade}</span>
                            <span className="text-slate-400 mr-1">({d.gradeAr})</span>
                          </td>
                          <td className="py-3 px-3 text-center font-mono">{d.points.toFixed(2)}</td>
                          <td className="py-3 px-3 text-center font-mono font-bold">{d.qualityPoints.toFixed(2)}</td>
                          <td className="py-3 px-4 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{d.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Target GPA Planner */}
              <div className="bg-white/90 dark:bg-[#12070D]/90 border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-5 sm:p-6 shadow-lg">
                <h3 className="text-sm font-black text-slate-900 dark:text-rose-100 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#9F1239]" />
                  كم لازمك؟ — تخطيط المعدل المستهدف
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-rose-200/70 mb-1">المعدل التراكمي المستهدف</label>
                    <input type="number" min="0" max="4" step="0.01" value={targetGPA}
                      onChange={(e) => setTargetGPA(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9F1239]"
                      placeholder="مثال: 3.00" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-rose-200/70 mb-1">ساعات الفصل القادم</label>
                    <input type="number" min="1" value={targetHours}
                      onChange={(e) => setTargetHours(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9F1239]"
                      placeholder="مثال: 15" />
                  </div>
                  <div className="flex items-end">
                    {targetResult && (
                      <div className={`w-full p-3 rounded-xl text-xs font-bold border ${
                        targetResult.achievable 
                          ? targetResult.required === 0 
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                            : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30'
                          : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30'
                      }`}>
                        <TrendingUp className="w-4 h-4 inline-block ml-1" />
                        {targetResult.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 px-4 py-3 rounded-2xl bg-slate-100/80 dark:bg-[#180A11]/80 border border-rose-900/10 text-[11px] text-slate-500 dark:text-rose-200/50">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  النتيجة تقديرية ولا تُغني عن كشف العلامات الرسمي. جدول النقاط مبني على تعليمات منح درجة البكالوريوس في الجامعات الأردنية، تعليمات رقم (8) لسنة 2016 وتعديلاتها.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
