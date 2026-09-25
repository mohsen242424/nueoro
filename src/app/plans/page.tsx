"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GitBranch, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Plan {
  id: string;
  title: string;
  emoji: string;
  color: string;
  image: string;
  width: number;
  height: number;
}

const plans: Plan[] = [
  {
    id: "pt",
    title: "العلاج الطبيعي",
    emoji: "🦾",
    color: "from-rose-600 to-rose-800",
    image: "/plan-pt.png",
    width: 1200,
    height: 750,
  },
  {
    id: "radiology",
    title: "التصوير الطبي والإشعاعي",
    emoji: "🔬",
    color: "from-violet-600 to-violet-800",
    image: "/plan-radiology.png",
    width: 1200,
    height: 750,
  },
  {
    id: "nutrition",
    title: "التغذية السريرية والحميات",
    emoji: "🥗",
    color: "from-emerald-600 to-emerald-800",
    image: "/plan-nutrition.png",
    width: 1200,
    height: 750,
  },
  {
    id: "ot",
    title: "العلاج الوظيفي",
    emoji: "🙌",
    color: "from-amber-600 to-amber-800",
    image: "/plan-ot.png",
    width: 1200,
    height: 750,
  },
  {
    id: "lab",
    title: "العلوم الطبية المخبرية",
    emoji: "🧪",
    color: "from-sky-600 to-sky-800",
    image: "/plan-lab.png",
    width: 1200,
    height: 750,
  },
  {
    id: "nursing",
    title: "التمريض",
    emoji: "🏥",
    color: "from-teal-600 to-teal-800",
    image: "/plan-nursing.png",
    width: 1200,
    height: 750,
  },
];

export default function PlansPage() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const current = plans[active];

  const prev = () => {
    setZoomed(false);
    setActive((p) => (p - 1 + plans.length) % plans.length);
  };
  const next = () => {
    setZoomed(false);
    setActive((p) => (p + 1) % plans.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-white dark:from-[#080406] dark:via-[#150B10]/60 dark:to-[#080406] pt-24 pb-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-sm font-semibold mb-4">
          <GitBranch className="w-4 h-4" />
          الجامعة الهاشمية
        </span>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] bg-clip-text text-transparent mb-3">
          الخطط الشجرية للتخصصات
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base max-w-lg mx-auto">
          الخطة الدراسية الكاملة لكل تخصص في كلية العلوم الطبية التطبيقية والتمريض
        </p>
      </motion.div>

      {/* Tab Buttons */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {plans.map((plan, i) => (
            <button
              key={plan.id}
              onClick={() => { setActive(i); setZoomed(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                active === i
                  ? "bg-gradient-to-r from-[#9F1239] to-[#E11D48] text-white border-transparent shadow-md shadow-rose-900/30"
                  : "bg-white dark:bg-[#100508] text-slate-700 dark:text-rose-200 border-rose-900/15 dark:border-rose-900/30 hover:border-rose-500/40"
              }`}
            >
              <span>{plan.emoji}</span>
              <span className="hidden sm:inline">{plan.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Plan Card */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl overflow-hidden border border-rose-900/15 dark:border-rose-900/30 shadow-2xl shadow-rose-900/10 bg-white dark:bg-[#100508]"
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${current.color} px-6 py-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{current.emoji}</span>
                <div>
                  <p className="text-white/70 text-xs font-semibold">الخطة الشجرية لتخصص</p>
                  <h2 className="text-white font-black text-lg leading-tight">{current.title}</h2>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomed(!zoomed)}
                  title={zoomed ? "تصغير" : "تكبير"}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                >
                  {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                </button>
                <a
                  href={current.image}
                  download={`خطة-${current.title}.png`}
                  title="تحميل الخطة"
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Image */}
            <div className={`overflow-auto transition-all duration-400 ${zoomed ? "max-h-[90vh]" : "max-h-[70vh]"}`}>
              <Image
                src={current.image}
                alt={`الخطة الشجرية لتخصص ${current.title}`}
                width={1200}
                height={750}
                className={`w-full object-contain transition-transform duration-500 cursor-zoom-in ${zoomed ? "scale-150 origin-top-right cursor-zoom-out" : ""}`}
                onClick={() => setZoomed(!zoomed)}
                priority
              />
            </div>

            {/* Navigation Footer */}
            <div className="px-5 py-3 bg-slate-50/80 dark:bg-rose-950/20 border-t border-rose-900/10 dark:border-rose-900/20 flex items-center justify-between">
              <button
                onClick={prev}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-rose-300 hover:text-[#9F1239] dark:hover:text-rose-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </button>

              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                {active + 1} / {plans.length}
              </span>

              <button
                onClick={next}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-rose-300 hover:text-[#9F1239] dark:hover:text-rose-100 transition-colors"
              >
                التالي
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hint */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-4">
          انقر على الخطة للتكبير · استخدم الأسهم للتنقل بين التخصصات
        </p>
      </div>
    </div>
  );
}
