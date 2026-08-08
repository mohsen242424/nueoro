'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, RotateCcw } from 'lucide-react';

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
    return '#ef4444'; // red
  };

  const dashOffset = 283 - (283 * (gpa / 4)); // 283 is approx 2 * pi * 45 (radius)

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-brand-purple/20 blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <Calculator className="w-8 h-8 text-brand-cyan" />
            </div>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white tracking-tight">
              GPA Calculator
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Calculate your semester or cumulative Grade Point Average accurately and easily.
          </motion.p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
            <button
              onClick={() => setTab('semester')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === 'semester'
                  ? 'bg-brand-blue text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Semester GPA
            </button>
            <button
              onClick={() => setTab('cumulative')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === 'cumulative'
                  ? 'bg-brand-purple text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Cumulative GPA
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              layout
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              {tab === 'cumulative' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-white/10"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Previous GPA</label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      step="0.01"
                      value={prevGPA}
                      onChange={(e) => setPrevGPA(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                      placeholder="e.g. 3.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Previous Credits</label>
                    <input
                      type="number"
                      min="0"
                      value={prevCredits}
                      onChange={(e) => setPrevCredits(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                      placeholder="e.g. 60"
                    />
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400 px-2">
                  <div className="col-span-5 md:col-span-6">Course Name</div>
                  <div className="col-span-3 md:col-span-2 text-center">Credits</div>
                  <div className="col-span-3 md:col-span-3">Grade</div>
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
                    <div className="col-span-5 md:col-span-6">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        placeholder={`Course ${index + 1}`}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={course.credits || ''}
                        onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-2 md:px-4 py-2.5 text-white text-center focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-3">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value as Grade)}
                        className="w-full bg-[#1A1D2D] border border-white/10 rounded-xl px-2 md:px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all appearance-none cursor-pointer"
                      >
                        {Object.keys(gradeValues).map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeCourse(course.id)}
                        disabled={courses.length === 1}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={addCourse}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> Add Course
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              layout
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sticky top-24 flex flex-col items-center justify-center min-h-[300px]"
            >
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-white/10 stroke-current"
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
                    className="text-4xl font-bold text-white font-poppins"
                  >
                    {gpa.toFixed(2)}
                  </motion.span>
                  <span className="text-sm text-gray-400 mt-1">GPA</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-gray-400">Total Credits</p>
                <p className="text-2xl font-semibold text-white">{totalCredits}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
