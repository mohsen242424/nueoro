"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Lightbulb, Zap, Users, Trophy } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function AboutPage() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] relative overflow-hidden transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute top-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] rounded-full bg-[#BE123C]/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 dark:bg-rose-950/40 text-[#9F1239] dark:text-[#FDA4AF] font-bold text-xs mb-6 border border-rose-900/15 dark:border-rose-900/30">
              <Zap className="w-3.5 h-3.5" />
              Empowering Medical Students
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-6 leading-tight tracking-tight">
              {t.about.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-rose-200/70 font-inter leading-relaxed max-w-3xl mx-auto">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-rose-900/10 dark:border-rose-900/30 shadow-xl shadow-rose-950/5 relative overflow-hidden group"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 dark:bg-rose-950/50 flex items-center justify-center mb-6 border border-rose-900/15">
                <Target className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-4">{t.about.missionTitle}</h2>
              <p className="text-base text-slate-600 dark:text-rose-200/70 font-inter leading-relaxed">
                {t.about.mission}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-rose-900/10 dark:border-rose-900/30 shadow-xl shadow-rose-950/5 relative overflow-hidden group"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 dark:bg-rose-950/50 flex items-center justify-center mb-6 border border-rose-900/15">
                <Lightbulb className="w-7 h-7 text-[#BE123C] dark:text-[#FDA4AF]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-4">{t.about.visionTitle}</h2>
              <p className="text-base text-slate-600 dark:text-rose-200/70 font-inter leading-relaxed">
                {t.about.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-rose-50/40 dark:bg-[#070305]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-3">{t.about.valuesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: t.about.innovation, desc: t.about.innovationDesc || "We constantly seek new and better ways to support our students and enhance their learning experience.", color: "text-[#9F1239] dark:text-[#FB7185]" },
              { icon: Users, title: t.about.community, desc: t.about.communityDesc || "We build strong, supportive networks that help students thrive both academically and personally.", color: "text-[#BE123C] dark:text-[#FDA4AF]" },
              { icon: Trophy, title: t.about.excellence, desc: t.about.excellenceDesc || "We strive for the highest standards in all our initiatives, events, and resources.", color: "text-[#E11D48] dark:text-rose-300" }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white dark:bg-[#12070D] p-8 rounded-3xl border border-rose-900/10 dark:border-rose-900/30 text-center shadow-lg shadow-rose-950/5 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-rose-100 mb-3">{value.title}</h3>
                <p className="text-sm text-slate-600 dark:text-rose-200/70 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-3">{t.about.storyTitle}</h2>
            <p className="text-base text-slate-600 dark:text-rose-200/70 max-w-2xl mx-auto">
              {t.about.story}
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rose-900/20 dark:before:via-rose-900/40 before:to-transparent">
            {[
              { year: "2021", title: "The Beginning", desc: "NEURO was founded by passionate medical students aiming to bridge the gap between theoretical knowledge and clinical practical skills." },
              { year: "2022", title: "Rapid Growth", desc: "Expanded our committees, launched our first major university-wide academic workshops, and reached hundreds of active medical students." },
              { year: "2023", title: "Digital Transformation", desc: "Introduced interactive 3D Anatomy tools, AI assistance for medical courses, and specialized academic materials." },
              { year: "2024", title: "Leading the Future", desc: "Recognized as the premier medical student initiative at The Hashemite University, Faculty of Applied Medical Sciences." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#080406] bg-[#9F1239] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white dark:bg-[#12070D] border border-rose-900/10 dark:border-rose-900/30 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-rose-100">{item.title}</h3>
                    <span className="text-[#9F1239] dark:text-[#FB7185] font-black font-manrope bg-rose-50 dark:bg-rose-950/50 px-3 py-0.5 rounded-full text-xs">{item.year}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-rose-200/70 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
