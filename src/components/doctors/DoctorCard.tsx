'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, MessageSquare, Copy, Check, Award, Phone } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface Doctor {
  id: number;
  name: string;
  nameEn?: string;
  role?: string;
  department: string;
  office: string;
  officeHours?: string;
  email: string;
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(doctor.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get clean initials for avatar
  const getInitials = (name: string) => {
    const clean = name.replace(/^(أ\.د\.|د\.|أ\.|م\.)\s*/, '').trim();
    const parts = clean.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`;
    }
    return clean.substring(0, 2);
  };

  const isProfessor = doctor.role?.includes('استاذ') || doctor.role?.includes('أستاذ');

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-rose-900/10 dark:border-rose-900/30 bg-white/85 dark:bg-[#12070D]/85 backdrop-blur-xl transition-all duration-300 hover:border-rose-600/40 hover:shadow-2xl hover:shadow-rose-950/20"
    >
      <div className="p-5 pb-0 flex flex-col items-center text-center">
        {/* Avatar badge */}
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#881337] via-[#9F1239] to-[#BE123C] text-lg font-black text-white shadow-md shadow-rose-900/30 group-hover:scale-105 transition-transform">
          {getInitials(doctor.name)}
        </div>
        
        {/* Name */}
        <h3 className="font-poppins mb-1 text-base font-bold text-slate-900 dark:text-rose-100 line-clamp-1 leading-snug">
          {isRTL ? doctor.name : (doctor.nameEn || doctor.name)}
        </h3>

        {/* Academic Role / Rank */}
        {doctor.role && (
          <span className={`mb-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
            isProfessor 
              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20' 
              : 'bg-rose-500/10 text-[#9F1239] dark:text-rose-300 border border-rose-900/15'
          }`}>
            <Award className="w-3 h-3" />
            {doctor.role}
          </span>
        )}
        
        {/* Department Badge */}
        <span className="mb-4 rounded-xl bg-slate-100 dark:bg-rose-950/40 border border-rose-900/10 dark:border-rose-900/25 px-3 py-1 text-[11px] font-semibold text-slate-700 dark:text-rose-200/80">
          {doctor.department}
        </span>
      </div>

      {/* Info Details */}
      <div className="flex-grow space-y-2 px-5 text-xs font-medium text-slate-600 dark:text-rose-200/70 border-t border-rose-900/10 dark:border-rose-900/20 pt-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#9F1239] dark:text-[#FB7185]" />
          <span><strong className="text-slate-800 dark:text-rose-100">{t.doctors.office}:</strong> {doctor.office}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-[#BE123C] dark:text-[#FDA4AF]" />
          <a href={`mailto:${doctor.email}`} className="hover:text-[#9F1239] dark:hover:text-white transition-colors truncate font-mono text-[11px]">
            {doctor.email}
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex border-t border-rose-900/10 dark:border-rose-900/20 bg-rose-50/40 dark:bg-rose-950/20">
        <a 
          href={`https://teams.microsoft.com/l/chat/0/0?users=${doctor.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 border-r border-rose-900/10 dark:border-rose-900/20 py-2.5 text-xs font-bold text-[#9F1239] dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          {t.doctors.openTeams}
        </a>
        <button 
          onClick={handleCopyEmail}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-[#9F1239] dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? t.doctors.emailCopied : t.doctors.copyEmail}
        </button>
      </div>
    </motion.div>
  );
}
