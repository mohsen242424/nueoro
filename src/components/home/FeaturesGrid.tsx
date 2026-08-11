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
      className="group relative bg-white/70 dark:bg-[#12070D]/80 backdrop-blur-xl border border-rose-900/10 dark:border-rose-900/30 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-950/20 dark:hover:shadow-rose-950/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity`} />

      <div>
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 mb-6 shadow-lg shadow-rose-900/20`}>
          <div className="w-full h-full bg-white dark:bg-[#180A11] rounded-[14px] flex items-center justify-center text-[#9F1239] dark:text-rose-200">
              {icon}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-rose-100 font-poppins">{title}</h3>
        <p className="text-slate-600 dark:text-rose-200/70 mb-6 leading-relaxed text-sm">
          {description}
        </p>
      </div>

      <Link href={link} className={`inline-flex items-center gap-2 font-bold text-sm text-[#9F1239] dark:text-[#FB7185] hover:text-[#BE123C] dark:hover:text-white transition-all group-hover:gap-3`}>
        <span>{title}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
};

export default function FeaturesGrid() {
  const { t } = useLanguage();
  const features = [
    {
      title: t.features.anatomyTitle,
      description: t.features.anatomyDesc,
      icon: <Bone className="w-6 h-6" />,
      gradient: 'from-[#881337] to-[#BE123C]',
      link: '/anatomy',
      delay: 0.1
    },
    {
      title: t.features.aiTitle,
      description: t.features.aiDesc,
      icon: <Bot className="w-6 h-6" />,
      gradient: 'from-[#9F1239] to-[#E11D48]',
      link: '/ai-assistant',
      delay: 0.2
    },
    {
      title: t.features.coursesTitle,
      description: t.features.coursesDesc,
      icon: <BookOpenCheck className="w-6 h-6" />,
      gradient: 'from-[#BE123C] to-[#FDA4AF]',
      link: '/courses',
      delay: 0.3
    },
    {
      title: t.features.gpaTitle,
      description: t.features.gpaDesc,
      icon: <Calculator className="w-6 h-6" />,
      gradient: 'from-[#7F1D1D] to-[#9F1239]',
      link: '/gpa',
      delay: 0.4
    },
    {
      title: t.features.mapTitle,
      description: t.features.mapDesc,
      icon: <Map className="w-6 h-6" />,
      gradient: 'from-[#9F1239] to-[#D97706]',
      link: '/map',
      delay: 0.5
    },
    {
      title: t.features.doctorsTitle || t.features.directoryTitle,
      description: t.features.doctorsDesc || t.features.directoryDesc,
      icon: <Stethoscope className="w-6 h-6" />,
      gradient: 'from-[#881337] to-[#FB7185]',
      link: '/doctors',
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 bg-rose-50/30 dark:bg-[#070305]/40 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-poppins font-black text-slate-900 dark:text-rose-100 mb-4"
          >
            {t.features.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-rose-200/70 max-w-2xl mx-auto font-inter"
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
