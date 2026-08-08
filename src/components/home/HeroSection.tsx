'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Zap, BrainCircuit, Box, Users } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
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
        delayChildren: 0.3,
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

  const subtitleWords = "Learn Smarter. Visualize Better. Grow Together.".split(' ');

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10"></div>
        
        {/* Floating blobs */}
        <motion.div 
          className="absolute top-[10%] left-[20%] w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute top-[40%] right-[30%] w-72 h-72 bg-accent/20 rounded-full blur-[80px]"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Particles */}
        {mounted && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}

        {/* Neural Network SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <motion.path d="M100 200 L300 400 L500 150 L700 500 L900 250" stroke="url(#line-grad)" strokeWidth="2" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
             <motion.path d="M200 600 L400 300 L600 700 L800 350 L1000 600" stroke="url(#line-grad)" strokeWidth="2" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
            />
            {[
                {cx: 100, cy: 200}, {cx: 300, cy: 400}, {cx: 500, cy: 150}, {cx: 700, cy: 500}, {cx: 900, cy: 250},
                {cx: 200, cy: 600}, {cx: 400, cy: 300}, {cx: 600, cy: 700}, {cx: 800, cy: 350}, {cx: 1000, cy: 600}
            ].map((pt, i) => (
                <motion.circle key={`dot-${i}`} cx={pt.cx} cy={pt.cy} r="4" fill="#06B6D4"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}
        </svg>

        {/* 3D Floating Brain Illustration */}
        <motion.div 
            className="absolute top-1/4 right-1/4 opacity-10 pointer-events-none hidden md:block"
            animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
             <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                 <path d="M9.5 2h5v5l2.5 2.5V14a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V9.5L9.5 7V2z" />
                 <path d="M7 16v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1" />
                 <path d="M12 2v5" />
                 <path d="M7 9.5H5.5A2.5 2.5 0 0 0 3 12v0a2.5 2.5 0 0 0 2.5 2.5H7" />
                 <path d="M17 9.5h1.5A2.5 2.5 0 0 1 21 12v0a2.5 2.5 0 0 1-2.5 2.5H17" />
             </svg>
        </motion.div>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-7xl md:text-9xl font-poppins font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x py-4"
          variants={itemVariants}
        >
          NEURO
        </motion.h1>

        <motion.div 
          className="text-xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-4 flex flex-wrap justify-center gap-x-2"
          variants={containerVariants}
        >
          {subtitleWords.map((word, i) => (
            <motion.span key={i} variants={wordVariants}>
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p 
          className="text-sm md:text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-2xl font-light tracking-wide"
          variants={itemVariants}
        >
          The Hashemite University | Faculty of Applied Medical Sciences
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 w-full px-4"
          variants={itemVariants}
        >
          <Link href="/courses" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 w-full sm:w-auto">
            Explore <Zap className="w-4 h-4" />
          </Link>
          <Link href="/ai-assistant" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-secondary hover:bg-violet-700 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-1 w-full sm:w-auto">
            Use AI <BrainCircuit className="w-4 h-4" />
          </Link>
          <Link href="/anatomy" className="flex items-center justify-center gap-2 px-8 py-3.5 border border-slate-300 dark:border-slate-700 hover:border-accent hover:bg-accent/10 dark:hover:bg-accent/20 rounded-full font-medium transition-all hover:-translate-y-1 w-full sm:w-auto bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            3D Anatomy <Box className="w-4 h-4" />
          </Link>
          <Link href="/join" className="flex items-center justify-center gap-2 px-8 py-3.5 border border-slate-300 dark:border-slate-700 hover:border-brand-red hover:bg-brand-red/10 dark:hover:bg-brand-red/20 rounded-full font-medium transition-all hover:-translate-y-1 w-full sm:w-auto bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            Join Neuro <Users className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
