'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MessageSquareText, Cuboid, Landmark } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface StatProps {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  gradientClass: string;
  delay: number;
}

const StatCounter = ({ value, duration = 2, inView }: { value: number; duration?: number; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = (totalMiliseconds / end) * 50; 
      // simple interpolation
      if(incrementTime < 10) incrementTime = 10;

      let timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / incrementTime));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [value, duration, inView]);

  return <span>{count.toLocaleString()}</span>;
};

const StatCard = ({ label, value, suffix = '', icon, gradientClass, delay }: StatProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay }}
      className="relative p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden group hover:scale-[1.02] transition-transform"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40 ${gradientClass}`} />
      
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientClass} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      
      <div className="flex flex-col">
        <h3 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white flex items-baseline">
          <StatCounter value={value} inView={isInView} />
          <span className="text-primary ml-1">{suffix}</span>
        </h3>
        <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

export default function StatsSection() {
  const { t, isRTL } = useLanguage();
  const stats = [
    {
      label: t.stats.studentsHelped,
      value: 500,
      suffix: '+',
      icon: <Users className="w-6 h-6" />,
      gradientClass: 'from-blue-500 to-indigo-600',
      delay: 0.1
    },
    {
      label: t.stats.aiAnswers,
      value: 10000,
      suffix: '+',
      icon: <MessageSquareText className="w-6 h-6" />,
      gradientClass: 'from-violet-500 to-purple-600',
      delay: 0.2
    },
    {
      label: t.stats.models3D,
      value: 50,
      suffix: '+',
      icon: <Cuboid className="w-6 h-6" />,
      gradientClass: 'from-cyan-500 to-blue-600',
      delay: 0.3
    },
    {
      label: t.stats.departments,
      value: 8,
      suffix: '',
      icon: <Landmark className="w-6 h-6" />,
      gradientClass: 'from-emerald-500 to-teal-600',
      delay: 0.4
    }
  ];

  return (
    <section className="py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
