"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import { useLanguage } from "../providers/LanguageProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react";

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

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-[#050816]/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-slate-200/60 dark:border-white/10 py-3"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#7C3AED] to-[#06B6D4] p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-white dark:bg-[#050816] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4]" />
              </div>
            </div>
            <span className="font-poppins font-black text-2xl tracking-tighter bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              NEURO
            </span>
          </Link>

          {/* Centered Navigation Bar (Desktop) */}
          <nav className="hidden xl:flex items-center justify-center flex-1 max-w-fit mx-auto">
            <div className="flex items-center gap-1 p-1.5 rounded-full bg-slate-100/80 dark:bg-white/[0.06] backdrop-blur-md border border-slate-200/70 dark:border-white/10 shadow-inner">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold font-manrope transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] dark:from-[#06B6D4] dark:to-[#7C3AED] rounded-full z-[-1]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Controls (Language + Theme + Join CTA) */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* Join CTA Button */}
            <Link
              href="/join"
              className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition-all duration-200 border ${
                pathname === "/join"
                  ? "bg-gradient-to-r from-[#C41E3A] to-rose-600 text-white border-transparent shadow-md shadow-rose-500/25"
                  : "bg-rose-500/10 dark:bg-rose-500/20 text-[#C41E3A] dark:text-rose-400 border-rose-500/30 hover:bg-[#C41E3A] hover:text-white hover:border-transparent"
              }`}
            >
              {t.nav.join}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher variant="segmented" />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-slate-100 dark:bg-white/[0.07] border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15 transition-all duration-200 focus:outline-none"
            >
              <motion.div
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {theme === "dark" ? (
                  <Moon className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </motion.div>
            </button>
          </div>

          {/* Mobile / Tablet Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher variant="segmented" />

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-slate-100 dark:bg-white/[0.07] border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4 text-cyan-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-full bg-slate-100 dark:bg-white/[0.07] border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-[#06B6D4] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-white/95 dark:bg-[#050816]/95 backdrop-blur-2xl border-b border-slate-200/70 dark:border-white/10 shadow-2xl mt-3 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-1 max-w-md mx-auto">
              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 mb-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold text-sm shadow-md"
              >
                {t.nav.join}
              </Link>

              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium font-manrope transition-all ${
                      isActive
                        ? "bg-blue-500/10 dark:bg-cyan-500/10 text-[#2563EB] dark:text-[#06B6D4] font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#06B6D4]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
