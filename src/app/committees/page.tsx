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
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
            {t.committees.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-inter">
            {t.committees.subtitle}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {committeesData.map((committee, index) => {
            const IconComponent = iconMap[committee.icon] || Users;
            
            return (
              <motion.div 
                key={committee.id}
                variants={itemVariants}
                className="group bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 flex flex-col h-full"
              >
                <div className={`h-32 bg-gradient-to-r ${committee.color} p-6 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                  <IconComponent className="w-10 h-10 text-white" />
                  <div className="flex justify-between items-end">
                    <h3 className="text-xl font-bold font-poppins text-white">{committee.name}</h3>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                      {committee.members} {t.committees.members}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 font-inter flex-grow">
                    {committee.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider font-manrope">{t.committees.responsibilities}</h4>
                    <ul className="space-y-2">
                      {committee.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={`/join?committee=${committee.id}`} className="mt-auto block w-full">
                    <button className="w-full py-3 px-4 bg-slate-100 dark:bg-white/5 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-slate-800 dark:text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center group/btn">
                      {t.committees.joinCommittee}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
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
