'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function CTASection() {
  const { t } = useLanguage();
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic Burgundy Crimson Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#881337] via-[#9F1239] to-[#BE123C] z-0"></div>
      
      {/* Animated Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#E11D48]/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        
        {/* Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: `${(i * 19 + 7) % 100}%`,
              top: `${(i * 23 + 11) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i % 4) * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-poppins font-black text-white mb-6 tracking-tight"
        >
          {t.cta.title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-rose-100/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {t.cta.subtitle}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/join" className="px-9 py-4 bg-white text-[#9F1239] hover:bg-rose-50 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:-translate-y-1 text-base">
            {t.cta.joinNow}
          </Link>
          <Link href="/about" className="px-9 py-4 bg-transparent border-2 border-white/40 text-white hover:bg-white/10 rounded-full font-bold transition-all hover:-translate-y-1 text-base">
            {t.cta.learnMore}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
