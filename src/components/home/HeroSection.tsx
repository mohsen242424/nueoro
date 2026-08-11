'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Zap, BrainCircuit, Box, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const subtitleWords = t.hero.subtitle.split(' ');

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
      {/* Background Ambient Glow & Neural Network */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#9F1239_1px,transparent_1px)] [background-size:24px_24px] opacity-15 dark:opacity-20"></div>
        
        {/* Floating Brand Glow Blobs */}
        <motion.div 
          className="absolute top-[10%] left-[15%] w-96 h-96 bg-primary/25 rounded-full blur-[120px] pointer-events-none"
          animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-[15%] right-[10%] w-96 h-96 bg-rose-600/20 rounded-full blur-[130px] pointer-events-none"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4C0519]/30 rounded-full blur-[160px] pointer-events-none"
        />

        {/* Neural Network Connecting Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9F1239" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#E11D48" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.2" />
                </linearGradient>
            </defs>
            <motion.path 
                d="M 100,200 Q 300,50 500,250 T 900,150 T 1200,300" 
                fill="none" 
                stroke="url(#neural-grad)" 
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <motion.path 
                d="M 50,500 Q 250,300 600,450 T 1000,350 T 1300,600" 
                fill="none" 
                stroke="url(#neural-grad)" 
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            {/* Animated Synapse Nodes */}
            {[
                {cx: 100, cy: 200}, {cx: 500, cy: 250}, {cx: 900, cy: 150}, {cx: 1200, cy: 300},
                {cx: 250, cy: 300}, {cx: 600, cy: 450}, {cx: 1000, cy: 350}, {cx: 1300, cy: 600}
            ].map((pt, i) => (
                <motion.circle key={`dot-${i}`} cx={pt.cx} cy={pt.cy} r="4" fill="#FB7185"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
                />
            ))}
        </svg>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Transparent Brand Logo Emblem */}
        <motion.div 
          variants={itemVariants}
          className="relative mb-6 flex items-center justify-center group cursor-pointer"
        >
          {/* Ambient soft crimson glow */}
          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 bg-[#9F1239]/20 dark:bg-[#E11D48]/25 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
          
          <Image
            src="/logo.png"
            alt="NEURO"
            width={200}
            height={200}
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-contain drop-shadow-[0_10px_30px_rgba(159,18,57,0.35)] group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </motion.div>

        {/* Main Brand Title */}
        <motion.h1 
          className="text-6xl sm:text-7xl md:text-9xl font-poppins font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#9F1239] via-[#E11D48] to-[#FDA4AF] animate-gradient-x py-2 drop-shadow-sm"
          variants={itemVariants}
        >
          {t.hero.title}
        </motion.h1>

        {/* Tagline Words */}
        <motion.div 
          className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-rose-100/90 mb-4 flex flex-wrap justify-center gap-x-2"
          variants={containerVariants}
        >
          {subtitleWords.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="hover:text-[#E11D48] transition-colors">
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* University & Faculty */}
        <motion.p 
          className="text-xs sm:text-sm md:text-base text-rose-900/70 dark:text-rose-200/60 mb-10 max-w-2xl font-medium tracking-wide"
          variants={itemVariants}
        >
          {t.hero.university}
        </motion.p>

        {/* 4 Premium Cohesive Action Buttons - Responsive 2x2 on Mobile, Full Row on Tablet/Laptop */}
        <motion.div 
          className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2.5 sm:gap-3.5 w-full max-w-4xl px-2"
          variants={itemVariants}
        >
          {/* Explore Courses */}
          <Link 
            href="/courses" 
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(159,18,57,0.35)] hover:shadow-[0_6px_28px_rgba(225,29,72,0.55)] hover:-translate-y-1 transition-all duration-200 border border-rose-400/20 w-full sm:w-auto"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 fill-amber-300" />
            </div>
            <span className="truncate">{t.hero.explore}</span>
          </Link>

          {/* AI Assistant */}
          <Link 
            href="/ai-assistant" 
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(190,18,60,0.35)] hover:shadow-[0_6px_28px_rgba(225,29,72,0.55)] hover:-translate-y-1 transition-all duration-200 border border-rose-400/25 w-full sm:w-auto"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <BrainCircuit className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-200" />
            </div>
            <span className="truncate">{t.hero.useAI}</span>
          </Link>

          {/* 3D Anatomy */}
          <Link 
            href="/anatomy" 
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white/80 dark:bg-[#150910]/80 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/35 text-slate-800 dark:text-rose-100 hover:text-[#9F1239] dark:hover:text-white hover:border-rose-600/50 hover:bg-rose-50/80 dark:hover:bg-[#220E1A] font-bold text-xs sm:text-sm shadow-sm hover:shadow-lg hover:shadow-rose-950/20 hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-rose-500/10 dark:bg-rose-950/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#9F1239] group-hover:text-white transition-all shrink-0">
              <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9F1239] dark:text-rose-300 group-hover:text-white" />
            </div>
            <span className="truncate">{t.hero.anatomy3D}</span>
          </Link>

          {/* Join Neuro */}
          <Link 
            href="/join" 
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white/80 dark:bg-[#150910]/80 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/35 text-slate-800 dark:text-rose-100 hover:text-[#9F1239] dark:hover:text-white hover:border-rose-600/50 hover:bg-rose-50/80 dark:hover:bg-[#220E1A] font-bold text-xs sm:text-sm shadow-sm hover:shadow-lg hover:shadow-rose-950/20 hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-rose-500/10 dark:bg-rose-950/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#9F1239] group-hover:text-white transition-all shrink-0">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9F1239] dark:text-rose-300 group-hover:text-white" />
            </div>
            <span className="truncate">{t.hero.joinNeuro}</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-rose-900/40 dark:text-rose-200/30 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-5 h-5 text-primary" />
      </motion.div>
    </section>
  );
}
