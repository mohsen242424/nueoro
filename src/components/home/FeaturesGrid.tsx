'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Bone, Bot, BookOpenCheck, Calculator, Map, Stethoscope, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  link: string;
  delay: number;
}

const FeatureCard = ({ title, description, icon, gradient, link, delay }: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
      className="group relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />

      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 mb-6 shadow-lg`}>
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
            {React.cloneElement(icon as React.ReactElement, { className: 'w-7 h-7 text-transparent bg-clip-text bg-gradient-to-br ' + gradient })}
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white font-poppins">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        {description}
      </p>

      <Link href={link} className={`inline-flex items-center gap-2 font-medium text-transparent bg-clip-text bg-gradient-to-r ${gradient} hover:gap-3 transition-all`}>
        {title} &rarr;
      </Link>
    </motion.div>
  );
};

export default function FeaturesGrid() {
  const { t, isRTL } = useLanguage();
  const features = [
    {
      title: t.features.anatomyTitle,
      description: t.features.anatomyDesc,
      icon: <Bone />,
      gradient: 'from-blue-500 to-cyan-500',
      link: '/anatomy',
      delay: 0.1
    },
    {
      title: t.features.aiTitle,
      description: t.features.aiDesc,
      icon: <Bot />,
      gradient: 'from-purple-500 to-pink-500',
      link: '/ai-assistant',
      delay: 0.2
    },
    {
      title: t.features.coursesTitle,
      description: t.features.coursesDesc,
      icon: <BookOpenCheck />,
      gradient: 'from-cyan-500 to-teal-500',
      link: '/courses',
      delay: 0.3
    },
    {
      title: t.features.gpaTitle,
      description: t.features.gpaDesc,
      icon: <Calculator />,
      gradient: 'from-emerald-500 to-green-500',
      link: '/gpa',
      delay: 0.4
    },
    {
      title: t.features.mapTitle,
      description: t.features.mapDesc,
      icon: <Map />,
      gradient: 'from-orange-500 to-amber-500',
      link: '/map',
      delay: 0.5
    },
    {
      title: t.features.doctorsTitle || t.features.directoryTitle,
      description: t.features.doctorsDesc || t.features.directoryDesc,
      icon: <Stethoscope />,
      gradient: 'from-red-500 to-rose-500',
      link: '/doctors',
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-slate-900 dark:text-white"
          >
            {t.features.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            {t.features.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
