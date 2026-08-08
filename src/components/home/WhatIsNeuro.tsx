'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Brain, HeartHandshake } from 'lucide-react';

export default function WhatIsNeuro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      title: 'Education First',
      description: 'We believe in accessible, high-quality resources tailored specifically for applied medical sciences students.',
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      delay: 0.2
    },
    {
      title: 'AI-Powered Learning',
      description: 'Leveraging cutting-edge artificial intelligence to provide instant answers, summarize complex topics, and guide your studies.',
      icon: <Brain className="w-6 h-6 text-secondary" />,
      delay: 0.4
    },
    {
      title: 'Community Driven',
      description: 'Built by students, for students. A collaborative environment where knowledge is shared and everyone grows together.',
      icon: <HeartHandshake className="w-6 h-6 text-accent" />,
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Decorative Background Elements */}
      <div className="absolute right-0 top-1/4 opacity-10 dark:opacity-20 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100" className="animate-spin-slow">
            <path d="M50 10 C 20 10, 10 30, 50 50 C 90 70, 80 90, 50 90" fill="none" stroke="#2563EB" strokeWidth="2" />
            <path d="M50 10 C 80 10, 90 30, 50 50 C 10 70, 20 90, 50 90" fill="none" stroke="#7C3AED" strokeWidth="2" />
            {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1="50" y1={10 + i * 10} x2={50 + Math.sin(i)*20} y2={10 + i * 10} stroke="#06B6D4" strokeWidth="0.5" />
            ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-slate-900 dark:text-white">
              What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">NEURO?</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              NEURO is the official student team for the Faculty of Applied Medical Sciences at The Hashemite University. 
              We are a dedicated group of innovators aiming to revolutionize the medical educational experience by blending 
              traditional study methods with advanced technology, interactive 3D anatomy, and AI assistance.
            </p>
            
            <div className="space-y-6 mt-12">
              {highlights.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className="flex gap-4 p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mt-1 flex-shrink-0 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Decorative Column */}
          <motion.div 
            className="flex-1 w-full relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[40px] rotate-6 backdrop-blur-3xl animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10 rounded-[40px] -rotate-3 border border-white/20 dark:border-white/5 backdrop-blur-xl flex items-center justify-center shadow-2xl overflow-hidden">
                <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="net-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                    <motion.path 
                        d="M50 200 L150 100 L250 250 L350 150 L400 300 M100 300 L200 200 L300 350 L400 200" 
                        stroke="url(#net-grad)" strokeWidth="3" fill="none"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    {[
                        {cx: 50, cy: 200}, {cx: 150, cy: 100}, {cx: 250, cy: 250}, {cx: 350, cy: 150}, {cx: 400, cy: 300},
                        {cx: 100, cy: 300}, {cx: 200, cy: 200}, {cx: 300, cy: 350}, {cx: 400, cy: 200}
                    ].map((pt, i) => (
                        <circle key={`node-${i}`} cx={pt.cx} cy={pt.cy} r="6" fill="#7C3AED" />
                    ))}
                </svg>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
