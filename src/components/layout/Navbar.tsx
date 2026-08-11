"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import { useLanguage } from "../providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { t, isRTL } = useLanguage();

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.anatomy, path: "/anatomy" },
    { name: t.nav.aiAssistant, path: "/ai-assistant" },
    { name: t.nav.courses, path: "/courses" },
    { name: t.nav.doctors, path: "/doctors" },
    { name: t.nav.map, path: "/map" },
    { name: t.nav.gpa, path: "/gpa" },
    { name: t.nav.committees, path: "/committees" },
    { name: t.nav.join, path: "/join" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.contact, path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-[#050816]/80 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-poppins font-bold text-2xl tracking-tighter bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent"
            >
              NEURO
            </motion.span>
          </Link>

          <nav className={`hidden lg:flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="flex space-x-1 overflow-x-auto custom-scrollbar items-center max-w-[70%]">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path} className="relative group px-3 py-2 whitespace-nowrap">
                  <span
                    className={`font-manrope text-sm font-medium transition-colors ${
                      pathname === link.path
                        ? "text-[#2563EB] dark:text-[#06B6D4]"
                        : "text-gray-600 hover:text-[#2563EB] dark:text-gray-300 dark:hover:text-[#06B6D4]"
                    }`}
                  >
                    {link.name}
                  </span>
                  {pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] dark:from-[#06B6D4] dark:to-[#7C3AED]"
                    />
                  )}
                </Link>
              ))}
            </div>
            
            <div className={`flex items-center space-x-3 ${isRTL ? "space-x-reverse ml-0 mr-4" : "ml-4 mr-0"}`}>
              <LanguageSwitcher variant="segmented" />

              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              >
                <motion.div
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme === "dark" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  )}
                </motion.div>
              </button>
            </div>
          </nav>

          <div className={`flex items-center lg:hidden space-x-3 ${isRTL ? "space-x-reverse" : ""}`}>
            <LanguageSwitcher variant="segmented" />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              <motion.div animate={{ rotate: theme === "dark" ? 180 : 0 }}>
                {theme === "dark" ? (
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                )}
              </motion.div>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#06B6D4] focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-[#050816]/95 backdrop-blur-3xl border-b border-gray-200/20 dark:border-white/10 overflow-y-auto"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <div className="flex items-center justify-between px-3 py-2 mb-2 bg-gray-100/50 dark:bg-white/5 rounded-2xl">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{t.common.filter || "Language / اللغة"}</span>
                <LanguageSwitcher variant="segmented" />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3.5 border-b border-gray-100 dark:border-gray-800/50 text-base font-medium font-manrope ${
                    pathname === link.path
                      ? "text-[#2563EB] dark:text-[#06B6D4]"
                      : "text-gray-700 hover:text-[#2563EB] dark:text-gray-300 dark:hover:text-[#06B6D4]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
