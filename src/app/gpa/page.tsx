'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

type Grade = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F';

interface CourseEntry {
  id: string;
  name: string;
  credits: number;
  grade: Grade;
}

const gradeValues: Record<Grade, number> = {
  'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0
};

export default function GPACalculator() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'semester' | 'cumulative'>('semester');
  const [courses, setCourses] = useState<CourseEntry[]>([
    { id: '1', name: '', credits: 3, grade: 'A' }
  ]);
  const [prevGPA, setPrevGPA] = useState<number | ''>('');
  const [prevCredits, setPrevCredits] = useState<number | ''>('');
  const [gpa, setGpa] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    let currentPoints = 0;
    let currentCredits = 0;

    courses.forEach(course => {
      if (course.credits > 0) {
        currentCredits += course.credits;
        currentPoints += course.credits * gradeValues[course.grade];
      }
    });

    if (tab === 'cumulative' && prevGPA !== '' && prevCredits !== '') {
      currentPoints += (Number(prevGPA) * Number(prevCredits));
      currentCredits += Number(prevCredits);
    }

    setTotalCredits(currentCredits);
    setGpa(currentCredits > 0 ? currentPoints / currentCredits : 0);
  }, [courses, tab, prevGPA, prevCredits]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: '', credits: 3, grade: 'A' }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof CourseEntry, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const reset = () => {
    setCourses([{ id: '1', name: '', credits: 3, grade: 'A' }]);
    setPrevGPA('');
    setPrevCredits('');
  };

  const getStrokeColor = () => {
    if (gpa >= 3.5) return '#10b981'; // green
    if (gpa >= 2.5) return '#f59e0b'; // yellow
    return '#e11d48'; // crimson red
  };

  const dashOffset = 283 - (283 * (gpa / 4));

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[#BE123C]/10 blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <div className="p-3 bg-rose-500/10 dark:bg-rose-950/40 rounded-2xl border border-rose-900/15 dark:border-rose-900/30">
              <Calculator className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
            </div>
            <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-rose-100 tracking-tight">
              {t.gpa.title}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-rose-200/70 text-base md:text-lg max-w-2xl mx-auto font-inter"
          >
            {t.gpa.subtitle}
          </motion.p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1.5 bg-white dark:bg-[#12070D] backdrop-blur-md rounded-2xl border border-rose-900/15 dark:border-rose-900/30 shadow-md shadow-rose-950/5">
            <button
              onClick={() => setTab('semester')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === 'semester'
                  ? 'bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30'
                  : 'text-slate-600 dark:text-rose-200/70 hover:text-slate-900 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              {t.gpa.semesterGPA}
            </button>
            <button
              onClick={() => setTab('cumulative')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === 'cumulative'
                  ? 'bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] text-white shadow-md shadow-rose-900/30'
                  : 'text-slate-600 dark:text-rose-200/70 hover:text-slate-900 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              {t.gpa.cumulativeGPA}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Courses Input List */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              layout
              className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl border border-rose-900/10 dark:border-rose-900/30 rounded-3xl p-6 shadow-xl shadow-rose-950/5"
            >
              {tab === 'cumulative' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-rose-900/10 dark:border-rose-900/20"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-2">{t.gpa.previousGPA}</label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      step="0.01"
                      value={prevGPA}
                      onChange={(e) => setPrevGPA(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all text-sm font-medium"
                      placeholder="e.g. 3.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-2">{t.gpa.previousCredits}</label>
                    <input
                      type="number"
                      min="0"
                      value={prevCredits}
                      onChange={(e) => setPrevCredits(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all text-sm font-medium"
                      placeholder="e.g. 60"
                    />
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2 md:gap-4 text-xs font-bold text-slate-500 dark:text-rose-200/60 px-2 uppercase tracking-wider">
                  <div className="col-span-4 md:col-span-6">{t.gpa.courseName}</div>
                  <div className="col-span-3 md:col-span-2 text-center">{t.gpa.creditHours}</div>
                  <div className="col-span-4 md:col-span-3">{t.gpa.grade}</div>
                  <div className="col-span-1"></div>
                </div>

                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid grid-cols-12 gap-2 md:gap-4 items-center group"
                  >
                    <div className="col-span-4 md:col-span-6">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        placeholder={`Course ${index + 1}`}
                        className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-3 md:px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={course.credits || ''}
                        onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-2 md:px-4 py-2.5 text-slate-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all text-sm font-bold"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value as Grade)}
                        className="w-full bg-slate-50 dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl px-2 md:px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all cursor-pointer text-sm font-bold"
                      >
                        {Object.keys(gradeValues).map(g => (
                          <option key={g} value={g} className="bg-white dark:bg-[#12070D] text-slate-900 dark:text-white">{g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeCourse(course.id)}
                        disabled={courses.length === 1}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-rose-900/10 dark:border-rose-900/20">
                <button
                  onClick={addCourse}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500/10 dark:bg-rose-950/40 hover:bg-[#9F1239] hover:text-white border border-rose-900/15 dark:border-rose-900/30 rounded-xl text-[#9F1239] dark:text-rose-200 transition-all text-xs font-bold shadow-sm"
                >
                  <Plus className="w-4 h-4" /> {t.gpa.addCourse}
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 px-4 py-2 text-slate-500 dark:text-rose-200/50 hover:text-[#9F1239] dark:hover:text-white transition-colors text-xs font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> {t.gpa.reset}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-1">
            <motion.div
              layout
              className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl border border-rose-900/10 dark:border-rose-900/30 rounded-3xl p-8 sticky top-28 flex flex-col items-center justify-center shadow-xl shadow-rose-950/5"
            >
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-rose-900/10 dark:text-rose-900/20 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                  />
                  <motion.circle
                    className="stroke-current"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: dashOffset, stroke: getStrokeColor() }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ strokeDasharray: 283 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    key={gpa}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-black text-slate-900 dark:text-white font-poppins"
                  >
                    {gpa.toFixed(2)}
                  </motion.span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-rose-200/60 mt-1">{t.gpa.yourGPA}</span>
                </div>
              </div>

              <div className="text-center space-y-1 bg-slate-50 dark:bg-[#180A11] px-6 py-3 rounded-2xl border border-rose-900/10 dark:border-rose-900/25 w-full">
                <p className="text-xs text-slate-500 dark:text-rose-200/60 font-medium">{t.gpa.totalCredits}</p>
                <p className="text-2xl font-black text-[#9F1239] dark:text-rose-200">{totalCredits}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
