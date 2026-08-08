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
      whileHover={{ y: -5 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
    >
      <div className="p-6 pb-0 flex flex-col items-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-2xl font-bold text-white shadow-lg">
          {initials}
        </div>
        
        <h3 className="font-poppins mb-1 text-center text-xl font-semibold text-white">
          {doctor.name}
        </h3>
        
        <span className="mb-6 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-cyan">
          {doctor.department}
        </span>
      </div>

      <div className="flex-grow space-y-3 px-6 text-sm text-gray-300">
        <div className="flex items-start">
          <MapPin className="mr-3 h-5 w-5 shrink-0 text-brand-blue" />
          <span><span className="font-semibold">{t.doctors.office}:</span> {doctor.office}</span>
        </div>
        <div className="flex items-start">
          <Clock className="mr-3 h-5 w-5 shrink-0 text-brand-purple" />
          <span><span className="font-semibold">{t.doctors.officeHours}:</span> {doctor.officeHours}</span>
        </div>
        <div className="flex items-center">
          <Mail className="mr-3 h-5 w-5 shrink-0 text-brand-red" />
          <a href={`mailto:${doctor.email}`} className="hover:text-white transition-colors truncate">
            <span className="font-semibold">{t.doctors.email}:</span> {doctor.email}
          </a>
        </div>
      </div>

      <div className="mt-6 flex border-t border-white/10">
        <a 
          href={`https://teams.microsoft.com/l/chat/0/0?users=${doctor.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 border-r border-white/10 py-4 font-medium text-white transition-colors hover:bg-white/5"
        >
          <MessageSquare className="h-4 w-4" />
          {t.doctors.openTeams}
        </a>
        <button 
          onClick={handleCopyEmail}
          className="flex flex-1 items-center justify-center gap-2 py-4 font-medium text-white transition-colors hover:bg-white/5"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          {copied ? t.doctors.emailCopied : t.doctors.copyEmail}
        </button>
      </div>
    </motion.div>
  );
}
