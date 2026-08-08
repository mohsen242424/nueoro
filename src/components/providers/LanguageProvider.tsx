'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/locales/en';
import { ar } from '@/locales/ar';

type Language = 'en' | 'ar';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: en,
  toggleLanguage: () => {},
  isRTL: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('neuro-lang') as Language | null;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguage(saved);
      document.documentElement.setAttribute('dir', saved === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('neuro-lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', newLang);
  };

  const t = language === 'en' ? en : ar;
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
