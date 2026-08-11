'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'segmented' | 'pill' | 'minimal';
  className?: string;
}

export function LanguageSwitcher({ variant = 'segmented', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleLanguage}
        className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-manrope transition-all duration-300 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-200/20 dark:border-white/10 ${className}`}
        aria-label="Toggle language"
      >
        <Globe className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#06B6D4]" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleLanguage}
        className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-manrope transition-all duration-300 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 hover:from-blue-600/20 hover:via-purple-600/20 hover:to-cyan-600/20 text-gray-900 dark:text-white border border-blue-500/20 dark:border-cyan-500/30 shadow-sm hover:shadow-md ${className}`}
      >
        <Globe className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] transition-transform duration-500 group-hover:rotate-45" />
        <span>{language === 'en' ? 'العربية (AR)' : 'English (EN)'}</span>
      </button>
    );
  }

  // Default: Segmented Switcher [ EN | AR ]
  return (
    <div
      className={`relative inline-flex items-center p-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-300/50 dark:border-slate-700/50 text-xs font-semibold font-manrope ${className}`}
      dir="ltr"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-200 ${
          language === 'en'
            ? 'text-white font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        {language === 'en' && (
          <motion.span
            layoutId="language-switch-pill"
            className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] shadow-sm"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        EN
      </button>

      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-200 ${
          language === 'ar'
            ? 'text-white font-bold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        {language === 'ar' && (
          <motion.span
            layoutId="language-switch-pill"
            className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shadow-sm"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        عربي
      </button>
    </div>
  );
}
