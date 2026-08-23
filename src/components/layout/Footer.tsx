"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../providers/LanguageProvider";

export default function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-rose-50/50 dark:bg-[#070305] backdrop-blur-md border-t border-rose-900/10 dark:border-rose-900/20">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9F1239] dark:via-[#BE123C] to-transparent opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="NEURO Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain drop-shadow-sm"
              />
              <span className="font-poppins font-black text-2xl tracking-tighter bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#FDA4AF] bg-clip-text text-transparent">
                NEURO
              </span>
            </Link>
            <p className="text-rose-950/70 dark:text-rose-200/60 font-inter text-sm max-w-xs leading-relaxed">
              {t.footer.description}
            </p>
            <div className={`flex space-x-3 pt-2 ${isRTL ? "space-x-reverse" : ""}`}>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://instagram.com/neuro_hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#150B10] text-rose-900 dark:text-rose-200 hover:text-white hover:bg-[#9F1239] dark:hover:bg-[#BE123C] border border-rose-900/10 dark:border-rose-900/30 transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://facebook.com/neuro.hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#150B10] text-rose-900 dark:text-rose-200 hover:text-white hover:bg-[#9F1239] dark:hover:bg-[#BE123C] border border-rose-900/10 dark:border-rose-900/30 transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://linkedin.com/company/neuro-hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#150B10] text-rose-900 dark:text-rose-200 hover:text-white hover:bg-[#9F1239] dark:hover:bg-[#BE123C] border border-rose-900/10 dark:border-rose-900/30 transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://github.com/neuro-hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#150B10] text-rose-900 dark:text-rose-200 hover:text-white hover:bg-[#9F1239] dark:hover:bg-[#BE123C] border border-rose-900/10 dark:border-rose-900/30 transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="font-poppins font-bold text-slate-900 dark:text-rose-100 mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {[{name: t.nav.home, path: '/'}, {name: t.nav.about, path: '/about'}, {name: t.nav.committees, path: '/committees'}, {name: t.nav.join, path: '/join'}].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-slate-600 dark:text-rose-200/70 hover:text-[#9F1239] dark:hover:text-[#FB7185] transition-colors font-inter text-sm group flex items-center">
                    <span className={`w-0 group-hover:w-2 h-[1px] bg-[#9F1239] dark:bg-[#FB7185] ${isRTL ? "ml-0 group-hover:ml-2" : "mr-0 group-hover:mr-2"} transition-all duration-300`}></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-bold text-slate-900 dark:text-rose-100 mb-6">{t.footer.features}</h3>
            <ul className="space-y-3">
              {[{name: t.nav.anatomy, path: '/anatomy'}, {name: t.nav.aiAssistant, path: '/ai-assistant'}, {name: t.nav.gpa, path: '/gpa'}, {name: t.nav.map, path: '/map'}].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-slate-600 dark:text-rose-200/70 hover:text-[#9F1239] dark:hover:text-[#FB7185] transition-colors font-inter text-sm group flex items-center">
                    <span className={`w-0 group-hover:w-2 h-[1px] bg-[#9F1239] dark:bg-[#FB7185] ${isRTL ? "ml-0 group-hover:ml-2" : "mr-0 group-hover:mr-2"} transition-all duration-300`}></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-bold text-slate-900 dark:text-rose-100 mb-6">{t.footer.stayConnected}</h3>
            <p className="text-slate-600 dark:text-rose-200/70 font-inter text-sm mb-4">
              {t.footer.newsletterDesc}
            </p>
            <form className="relative mt-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t.footer.emailPlaceholder}
                className={`w-full bg-white dark:bg-[#12070D] border border-rose-900/15 dark:border-rose-900/30 rounded-xl ${isRTL ? 'pl-24 pr-4' : 'pr-24 pl-4'} py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9F1239] dark:focus:ring-[#BE123C] transition-all text-slate-900 dark:text-white`}
              />
              <button 
                type="submit" 
                className={`absolute ${isRTL ? "left-1.5" : "right-1.5"} top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-[#9F1239] to-[#BE123C] hover:from-[#BE123C] hover:to-[#E11D48] text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-rose-900/30`}
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-rose-900/10 dark:border-rose-900/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-rose-950/60 dark:text-rose-200/50 font-inter text-xs">
            {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <div className={`flex space-x-6 ${isRTL ? "space-x-reverse" : ""}`}>
            <Link href="/privacy" className="text-rose-950/60 dark:text-rose-200/50 hover:text-[#9F1239] dark:hover:text-white text-xs transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="text-rose-950/60 dark:text-rose-200/50 hover:text-[#9F1239] dark:hover:text-white text-xs transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
