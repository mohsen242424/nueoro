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
        className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-manrope transition-all duration-300 bg-rose-500/10 dark:bg-rose-950/40 hover:bg-rose-500/20 text-rose-950 dark:text-rose-200 border border-rose-900/15 dark:border-rose-800/30 ${className}`}
        aria-label="Toggle language"
      >
        <Globe className="w-3.5 h-3.5 text-[#BE123C] dark:text-[#FB7185]" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleLanguage}
        className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-manrope transition-all duration-300 bg-gradient-to-r from-rose-900/10 via-red-800/10 to-rose-700/10 hover:from-rose-900/20 hover:via-red-800/20 hover:to-rose-700/20 text-gray-900 dark:text-white border border-rose-800/20 dark:border-rose-700/30 shadow-sm hover:shadow-md ${className}`}
      >
        <Globe className="w-4 h-4 text-[#BE123C] dark:text-[#FB7185] transition-transform duration-500 group-hover:rotate-45" />
        <span>{language === 'en' ? 'العربية (AR)' : 'English (EN)'}</span>
      </button>
    );
  }

  // Default: Segmented Switcher [ EN | AR ]
  return (
    <div
      className={`relative inline-flex items-center p-1 rounded-full bg-slate-200/80 dark:bg-[#180A11] backdrop-blur-md border border-slate-300/60 dark:border-rose-900/30 text-xs font-semibold font-manrope ${className}`}
      dir="ltr"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-200 ${
          language === 'en'
            ? 'text-white font-bold'
            : 'text-slate-600 dark:text-rose-200/70 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        {language === 'en' && (
          <motion.span
            layoutId="language-switch-pill"
            className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-[#9F1239] to-[#E11D48] shadow-sm"
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
            : 'text-slate-600 dark:text-rose-200/70 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        {language === 'ar' && (
          <motion.span
            layoutId="language-switch-pill"
            className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-[#881337] to-[#BE123C] shadow-sm"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        عربي
      </button>
    </div>
  );
}
