'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, GraduationCap, Users } from 'lucide-react';
import DoctorCard from '@/components/doctors/DoctorCard';
import doctorsData from '@/data/doctors.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function DoctorsPage() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDept, setActiveDept] = useState('All');

  const departments = [
    { id: 'All', label: t.doctors.all },
    { id: 'العلوم الطبية المخبرية', label: isRTL ? 'العلوم الطبية المخبرية' : 'Medical Lab Sciences' },
    { id: 'التغذية السريرية و الحميات', label: isRTL ? 'التغذية السريرية والحميات' : 'Clinical Nutrition' },
    { id: 'العلاج الطبيعي', label: isRTL ? 'العلاج الطبيعي' : 'Physical Therapy' },
    { id: 'التصوير الطبي', label: isRTL ? 'التصوير الطبي' : 'Medical Imaging' },
    { id: 'العلاج الوظيفي', label: isRTL ? 'العلاج الوظيفي' : 'Occupational Therapy' },
    { id: 'العلوم الطبية المساندة', label: isRTL ? 'العلوم الطبية المساندة' : 'Basic Medical Sciences' },
    { id: 'الديوان والإدارة', label: isRTL ? 'الديوان والإدارة' : 'Administration' },
  ];

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        doctor.name.toLowerCase().includes(q) || 
        (doctor.nameEn && doctor.nameEn.toLowerCase().includes(q)) ||
        doctor.department.toLowerCase().includes(q) ||
        (doctor.role && doctor.role.toLowerCase().includes(q)) ||
        doctor.office.toLowerCase().includes(q) ||
        doctor.email.toLowerCase().includes(q);

      const matchesDept = activeDept === 'All' || doctor.department === activeDept;
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, activeDept]);

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-[#BE123C]/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <div className="p-3 bg-rose-500/10 dark:bg-rose-950/40 rounded-2xl border border-rose-900/15 dark:border-rose-900/30">
              <GraduationCap className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
            </div>
            <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-rose-100 tracking-tight">
              {t.doctors.title}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-rose-200/70 text-base md:text-lg max-w-3xl mx-auto font-inter"
          >
            {t.doctors.subtitle}
          </motion.p>
        </div>

        {/* Search & Department Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-rose-300/40" />
            <input
              type="text"
              placeholder={t.doctors.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-[#12070D] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl py-3 pl-11 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all text-sm font-medium shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeDept === dept.id
                    ? 'bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30'
                    : 'bg-white dark:bg-[#12070D] text-slate-600 dark:text-rose-200/70 hover:text-slate-900 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-900/10 dark:border-rose-900/30'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count badge */}
        <div className="mb-6 flex items-center justify-between px-2 text-xs font-semibold text-slate-500 dark:text-rose-200/60">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" />
            <span>عدد الأعضاء المعروضين: <strong className="text-slate-900 dark:text-rose-100">{filteredDoctors.length}</strong></span>
          </div>
        </div>

        {/* Doctors Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}

          {filteredDoctors.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500 dark:text-rose-200/50 bg-white/50 dark:bg-[#12070D]/40 rounded-3xl border border-rose-900/10">
              <p className="text-lg font-bold">{t.common.noResults}</p>
              <p className="text-xs mt-1">جرّب البحث بكلمات أخرى أو اختر قسماً آخر</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
