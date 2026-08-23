"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import { useLanguage } from "../providers/LanguageProvider";
import { useAuth } from "../providers/AuthProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Menu, X, Sun, Moon, User, ShieldCheck, LogIn } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { t, isRTL } = useLanguage();
  const { currentUser, isAdmin } = useAuth();

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-[#080406]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(159,18,57,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.7)] border-b border-rose-900/10 dark:border-rose-900/20 py-3"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo with Real Brand Graphic */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <Image
              src="/logo.png"
              alt="NEURO Logo"
              width={42}
              height={42}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
              priority
            />
            <span className="font-poppins font-black text-xl sm:text-2xl tracking-tighter bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] bg-clip-text text-transparent">
              NEURO
            </span>
          </Link>

          {/* Centered Navigation Bar (Desktop) */}
          <nav className="hidden xl:flex items-center justify-center flex-1 max-w-fit mx-auto">
            <div className="flex items-center gap-1 p-1.5 rounded-full bg-slate-100/90 dark:bg-[#150B10]/80 backdrop-blur-md border border-rose-900/10 dark:border-rose-900/30 shadow-inner">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold font-manrope transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-slate-700 dark:text-rose-100/80 hover:text-rose-950 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] rounded-full z-[-1] shadow-md shadow-rose-900/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Controls (Auth + Language + Theme + Join CTA) */}
          <div className="hidden xl:flex items-center gap-2.5 flex-shrink-0">
            
            {/* Student Auth Button / Profile Badge */}
            {currentUser ? (
              <Link
                href="/profile"
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-manrope transition-all duration-200 flex items-center gap-1.5 border ${
                  pathname === "/profile"
                    ? "bg-[#9F1239] text-white border-transparent shadow-md shadow-rose-900/30"
                    : "bg-rose-50 dark:bg-rose-950/40 text-[#9F1239] dark:text-rose-200 border-rose-900/15 hover:bg-[#9F1239] hover:text-white hover:border-transparent"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#9F1239] text-white flex items-center justify-center text-[10px] font-black">
                  {currentUser.name.substring(0, 1)}
                </div>
                <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-manrope transition-all duration-200 flex items-center gap-1.5 border ${
                  pathname === "/login" || pathname === "/register"
                    ? "bg-[#9F1239] text-white border-transparent shadow-md shadow-rose-900/30"
                    : "bg-slate-100 dark:bg-[#150B10] text-slate-700 dark:text-rose-200 border-rose-900/15 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>دخول / حساب</span>
              </Link>
            )}

            {/* Admin Portal Link if Admin */}
            {isAdmin && (
              <Link
                href="/admin"
                className="px-2.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1"
                title="لوحة تحكم المشرفين"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}

            {/* Join CTA Button */}
            <Link
              href="/join"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-manrope transition-all duration-200 border ${
                pathname === "/join"
                  ? "bg-gradient-to-r from-[#9F1239] to-[#E11D48] text-white border-transparent shadow-md shadow-rose-900/30"
                  : "bg-rose-900/10 dark:bg-rose-900/25 text-[#9F1239] dark:text-rose-300 border-rose-900/20 dark:border-rose-800/40 hover:bg-gradient-to-r hover:from-[#9F1239] hover:to-[#E11D48] hover:text-white hover:border-transparent"
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
              className="p-2 rounded-full bg-slate-100 dark:bg-[#150B10] border border-rose-900/10 dark:border-rose-900/30 text-slate-700 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all duration-200 focus:outline-none"
            >
              <motion.div
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {theme === "dark" ? (
                  <Moon className="w-4 h-4 text-rose-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </motion.div>
            </button>
          </div>

          {/* Mobile / Tablet Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            {currentUser ? (
              <Link
                href="/profile"
                className="w-8 h-8 rounded-full bg-[#9F1239] text-white flex items-center justify-center text-xs font-black"
                title="حسابي"
              >
                {currentUser.name.substring(0, 1)}
              </Link>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-full bg-slate-100 dark:bg-[#150B10] border border-rose-900/15 text-slate-700 dark:text-rose-200"
                title="تسجيل الدخول"
              >
                <LogIn className="w-4 h-4" />
              </Link>
            )}

            <LanguageSwitcher variant="segmented" />

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-slate-100 dark:bg-[#150B10] border border-rose-900/10 dark:border-rose-900/30 text-slate-700 dark:text-rose-200 focus:outline-none"
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4 text-rose-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-full bg-slate-100 dark:bg-[#150B10] border border-rose-900/10 dark:border-rose-900/30 text-slate-700 dark:text-rose-200 hover:text-[#BE123C] dark:hover:text-[#FB7185] focus:outline-none"
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
            className="xl:hidden bg-white/95 dark:bg-[#080406]/95 backdrop-blur-2xl border-b border-rose-900/10 dark:border-rose-900/30 shadow-2xl mt-3 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-1 max-w-md mx-auto">
              {currentUser ? (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full p-3 mb-3 rounded-2xl bg-rose-500/10 border border-rose-900/20 text-[#9F1239] dark:text-rose-200 font-bold text-xs"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>حساب الطالب: {currentUser.name} ({currentUser.studentId})</span>
                  </div>
                  <span className="text-[11px] underline">عرض الدورات</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full py-2.5 mb-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-900/20 text-[#9F1239] dark:text-rose-200 font-bold text-xs"
                >
                  <LogIn className="w-4 h-4 mr-1.5" /> تسجيل الدخول بالرقم الجامعي
                </Link>
              )}

              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 mb-3 rounded-2xl bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] text-white font-bold text-sm shadow-md shadow-rose-900/30"
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
                        ? "bg-rose-500/10 dark:bg-rose-500/15 text-[#BE123C] dark:text-[#FB7185] font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-rose-50/70 dark:hover:bg-rose-950/30"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#BE123C] dark:bg-[#FB7185]" />
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
