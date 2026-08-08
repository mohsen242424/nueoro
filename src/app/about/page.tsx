"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Lightbulb, Zap, Users, Shield, Trophy } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-6 border border-blue-200 dark:border-blue-800/50">
              <Zap className="w-4 h-4 mr-2" />
              Empowering Students
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-poppins text-slate-900 dark:text-white mb-6 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">NEURO</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
              We are a premier student initiative at The Hashemite University, dedicated to fostering excellence, innovation, and community among medical sciences students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-6" />
              <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                To elevate the academic experience of medical sciences students by providing comprehensive resources, peer support, and opportunities for practical skill development, while fostering a vibrant and inclusive community.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
              <Lightbulb className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mb-6" />
              <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                To be the leading student organization that shapes the future healthcare professionals of Jordan, recognized for our commitment to excellence, innovation, and positive societal impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-slate-100/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">Core Values</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Innovation", desc: "We constantly seek new and better ways to support our students and enhance their learning experience.", color: "text-amber-500" },
              { icon: Users, title: "Community", desc: "We build strong, supportive networks that help students thrive both academically and personally.", color: "text-blue-500" },
              { icon: Trophy, title: "Excellence", desc: "We strive for the highest standards in all our initiatives, events, and resources.", color: "text-purple-500" }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white dark:bg-[#0a0f25] p-8 rounded-3xl border border-slate-200 dark:border-white/5 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">Our Journey</h2>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
            {[
              { year: "2021", title: "The Beginning", desc: "NEURO was founded by a small group of passionate medical students aiming to bridge the gap between theoretical knowledge and practical skills." },
              { year: "2022", title: "Rapid Growth", desc: "Expanded our committees, launched our first major university-wide events, and reached over 500 active members." },
              { year: "2023", title: "Digital Transformation", desc: "Introduced innovative digital tools, AI assistance for students, and established partnerships with major healthcare institutions." },
              { year: "2024", title: "Leading the Future", desc: "Recognized as the top student initiative at The Hashemite University, continuing to innovate and inspire." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#050816] bg-blue-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">{item.title}</h3>
                    <span className="text-blue-600 dark:text-blue-400 font-bold font-manrope bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm">{item.year}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Placeholder */}
      <section className="py-20 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl font-bold font-poppins mb-6">Meet the Leadership</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            The dedicated individuals working tirelessly behind the scenes to make NEURO's vision a reality.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="w-24 h-24 mx-auto bg-slate-700 rounded-full mb-4 animate-pulse"></div>
                <div className="h-5 w-32 bg-slate-700 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 w-24 bg-slate-600 rounded mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
