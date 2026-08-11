'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Mail, MessageSquare, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface Doctor {
  id: number;
  name: string;
  department: string;
  office: string;
  officeHours: string;
  email: string;
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(doctor.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-900/10 dark:border-rose-900/30 bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl transition-all duration-300 hover:border-rose-600/40 hover:shadow-2xl hover:shadow-rose-950/20"
    >
      <div className="p-6 pb-0 flex flex-col items-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#881337] via-[#9F1239] to-[#BE123C] text-xl font-black text-white shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
          {initials}
        </div>
        
        <h3 className="font-poppins mb-1.5 text-center text-lg font-bold text-slate-900 dark:text-rose-100 line-clamp-1">
          {doctor.name}
        </h3>
        
        <span className="mb-6 rounded-full bg-rose-500/10 dark:bg-rose-950/50 border border-rose-900/15 dark:border-rose-900/30 px-3 py-1 text-xs font-bold text-[#9F1239] dark:text-[#FDA4AF]">
          {doctor.department}
        </span>
      </div>

      <div className="flex-grow space-y-2.5 px-6 text-xs font-medium text-slate-600 dark:text-rose-200/70">
        <div className="flex items-start gap-2.5">
          <MapPin className="h-4 w-4 shrink-0 text-[#9F1239] dark:text-[#FB7185] mt-0.5" />
          <span><strong className="text-slate-800 dark:text-rose-100">{t.doctors.office}:</strong> {doctor.office}</span>
        </div>
        <div className="flex items-start gap-2.5">
          <Clock className="h-4 w-4 shrink-0 text-[#BE123C] dark:text-[#FDA4AF] mt-0.5" />
          <span><strong className="text-slate-800 dark:text-rose-100">{t.doctors.officeHours}:</strong> {doctor.officeHours}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 shrink-0 text-[#E11D48] dark:text-[#FB7185]" />
          <a href={`mailto:${doctor.email}`} className="hover:text-[#9F1239] dark:hover:text-white transition-colors truncate">
            <strong className="text-slate-800 dark:text-rose-100">{t.doctors.email}:</strong> {doctor.email}
          </a>
        </div>
      </div>

      <div className="mt-6 flex border-t border-rose-900/10 dark:border-rose-900/20">
        <a 
          href={`https://teams.microsoft.com/l/chat/0/0?users=${doctor.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 border-r border-rose-900/10 dark:border-rose-900/20 py-3 text-xs font-bold text-[#9F1239] dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          {t.doctors.openTeams}
        </a>
        <button 
          onClick={handleCopyEmail}
          className="flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-bold text-[#9F1239] dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? t.doctors.emailCopied : t.doctors.copyEmail}
        </button>
      </div>
    </motion.div>
  );
}
