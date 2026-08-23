'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Brain, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function WhatIsNeuro() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      title: t.whatIsNeuro.educationFirst,
      description: t.whatIsNeuro.educationFirstDesc,
      icon: <BookOpen className="w-6 h-6 text-[#BE123C]" />,
      delay: 0.2
    },
    {
      title: t.whatIsNeuro.aiPowered,
      description: t.whatIsNeuro.aiPoweredDesc,
      icon: <Brain className="w-6 h-6 text-[#9F1239]" />,
      delay: 0.4
    },
    {
      title: t.whatIsNeuro.community,
      description: t.whatIsNeuro.communityDesc,
      icon: <HeartHandshake className="w-6 h-6 text-[#E11D48]" />,
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Ambient Burgundy Glow */}
      <div className="absolute right-0 top-1/4 opacity-15 dark:opacity-25 pointer-events-none w-96 h-96 bg-[#9F1239] rounded-full blur-[140px]" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black mb-6 text-slate-900 dark:text-rose-100" dangerouslySetInnerHTML={{ __html: t.whatIsNeuro.title }} />
            <p className="text-lg text-slate-600 dark:text-rose-200/70 mb-8 leading-relaxed font-inter">
              {t.whatIsNeuro.description}
            </p>
            
            <div className="space-y-4 mt-8">
              {highlights.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className="flex gap-4 p-5 rounded-2xl bg-white/70 dark:bg-[#12070D]/70 backdrop-blur-md border border-rose-900/10 dark:border-rose-900/25 shadow-sm hover:shadow-md hover:border-rose-900/30 transition-all"
                >
                  <div className="mt-1 flex-shrink-0 p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-900/15">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 text-slate-900 dark:text-rose-100">{item.title}</h4>
                    <p className="text-slate-600 dark:text-rose-200/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Decorative Brand Card */}
          <motion.div 
            className="flex-1 w-full relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#881337]/30 to-[#BE123C]/30 rounded-[40px] rotate-6 backdrop-blur-3xl animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-white/70 dark:bg-[#12070D]/80 rounded-[40px] -rotate-2 border border-rose-900/15 dark:border-rose-900/30 backdrop-blur-xl flex flex-col items-center justify-center p-8 shadow-2xl shadow-rose-950/10 overflow-hidden">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-3">
                  <div className="absolute inset-0 bg-[#9F1239]/15 dark:bg-[#E11D48]/20 rounded-full blur-2xl animate-pulse-slow"></div>
                  <Image
                    src="/logo.png"
                    alt="NEURO Brand"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(159,18,57,0.35)]"
                  />
                </div>
                <span className="font-poppins font-black text-2xl tracking-tight bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] bg-clip-text text-transparent">
                  NEURO
                </span>
                <span className="text-xs font-semibold text-rose-950/60 dark:text-rose-200/50 mt-1">
                  The Hashemite University
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
