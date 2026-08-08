'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Stethoscope } from 'lucide-react';
import DoctorCard from '@/components/doctors/DoctorCard';
import doctorsData from '@/data/doctors.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function DoctorsPage() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDept, setActiveDept] = useState('All');

  const departments = [
    { id: 'All', label: t.doctors.all },
    { id: 'Anatomy', label: 'Anatomy' },
    { id: 'Physiology', label: 'Physiology' },
    { id: 'Pharmacology', label: 'Pharmacology' },
    { id: 'Nursing', label: 'Nursing' },
    { id: 'Medical Lab Sciences', label: 'Medical Lab Sciences' },
    { id: 'Radiology', label: 'Radiology' }
  ];

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = activeDept === 'All' || doctor.department === activeDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-purple/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-brand-cyan/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              <Stethoscope className="w-8 h-8 text-brand-red" />
            </div>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white tracking-tight">
              {t.doctors.title}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t.doctors.subtitle}
          </motion.p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.doctors.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeDept === dept.id
                    ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
          
          {filteredDoctors.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400">
              <p className="text-xl">No doctors found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveDept('All');}}
                className="mt-4 text-brand-blue hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
