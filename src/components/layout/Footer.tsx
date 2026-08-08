"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../providers/LanguageProvider";

export default function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-white/30 dark:bg-[#050816]/50 backdrop-blur-md border-t border-gray-200/20 dark:border-white/10">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2563EB] dark:via-[#7C3AED] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-poppins font-bold text-2xl tracking-tighter bg-gradient-to-r from-[#2563EB] to-[#7C3AED] dark:from-[#06B6D4] dark:to-[#7C3AED] bg-clip-text text-transparent">
                NEURO
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 font-inter text-sm max-w-xs leading-relaxed">
              {t.footer.description}
            </p>
            <div className={`flex space-x-4 pt-2 ${isRTL ? "space-x-reverse" : ""}`}>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://instagram.com/neuro_hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://facebook.com/neuro.hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://linkedin.com/company/neuro-hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://github.com/neuro-hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {[{name: t.nav.home, path: '/'}, {name: t.nav.about, path: '/about'}, {name: t.nav.committees, path: '/committees'}, {name: t.nav.join, path: '/join'}].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-gray-600 dark:text-gray-400 hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors font-inter text-sm group flex items-center">
                    <span className={`w-0 group-hover:w-2 h-[1px] bg-[#2563EB] dark:bg-[#06B6D4] ${isRTL ? "ml-0 group-hover:ml-2" : "mr-0 group-hover:mr-2"} transition-all duration-300`}></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6">{t.footer.features}</h3>
            <ul className="space-y-3">
              {[{name: t.nav.anatomy, path: '/anatomy'}, {name: t.nav.aiAssistant, path: '/ai-assistant'}, {name: t.nav.gpa, path: '/gpa'}, {name: t.nav.map, path: '/map'}].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-gray-600 dark:text-gray-400 hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors font-inter text-sm group flex items-center">
                    <span className={`w-0 group-hover:w-2 h-[1px] bg-[#2563EB] dark:bg-[#06B6D4] ${isRTL ? "ml-0 group-hover:ml-2" : "mr-0 group-hover:mr-2"} transition-all duration-300`}></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6">{t.footer.stayConnected}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-inter text-sm mb-4">
              {t.footer.newsletterDesc}
            </p>
            <form className="relative mt-4">
              <input 
                type="email" 
                placeholder={t.footer.emailPlaceholder}
                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#7C3AED] transition-all dark:text-white"
              />
              <button 
                type="submit" 
                className={`absolute ${isRTL ? "left-1" : "right-1"} top-1 bottom-1 px-4 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity`}
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 dark:text-gray-400 font-inter text-sm">
            {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
          <div className={`flex space-x-6 ${isRTL ? "space-x-reverse" : ""}`}>
            <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
