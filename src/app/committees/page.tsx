"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Camera, Brain, Microscope, Calendar, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import committeesData from '@/data/committees.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Camera,
  Brain,
  Microscope,
  Calendar,
  Heart,
  Users
};

export default function CommitteesPage() {
  const { t, isRTL } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#BE123C]/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3.5 bg-rose-500/10 dark:bg-rose-950/40 border border-rose-900/15 dark:border-rose-900/30 rounded-2xl mb-4">
            <Users className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-3 tracking-tight">
            {t.committees.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-rose-200/70 max-w-2xl mx-auto font-inter">
            {t.committees.subtitle}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {committeesData.map((committee) => {
            const IconComponent = iconMap[committee.icon] || Users;
            
            return (
              <motion.div 
                key={committee.id}
                variants={itemVariants}
                className="group bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-rose-900/10 dark:border-rose-900/30 hover:border-rose-600/40 transition-all duration-300 shadow-xl shadow-rose-950/5 hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="h-32 bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                  <IconComponent className="w-8 h-8 text-white" />
                  <div className="flex justify-between items-end">
                    <h3 className="text-xl font-bold font-poppins text-white">{committee.name}</h3>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                      {committee.members} {t.committees.members}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-slate-600 dark:text-rose-200/70 text-sm mb-6 font-inter flex-grow leading-relaxed">
                    {committee.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-rose-100 mb-3 uppercase tracking-wider font-manrope">{t.committees.responsibilities}</h4>
                    <ul className="space-y-2">
                      {committee.responsibilities.map((resp, i) => (
                        <li key={i} className="text-xs font-medium text-slate-600 dark:text-rose-200/60 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#9F1239] dark:bg-[#FB7185] mt-1.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={`/join?committee=${committee.id}`} className="mt-auto block w-full">
                    <button className="w-full py-3 px-4 bg-rose-50 dark:bg-rose-950/30 hover:bg-[#9F1239] dark:hover:bg-[#BE123C] hover:text-white text-[#9F1239] dark:text-rose-200 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn text-xs">
                      <span>{t.committees.joinCommittee}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
