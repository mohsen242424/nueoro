"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ZoomIn, ZoomOut, Download } from 'lucide-react';
import Image from 'next/image';

export default function MapPage() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-white dark:from-[#080406] dark:via-[#150B10]/60 dark:to-[#080406] pt-24 pb-20 px-4 transition-colors duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-sm font-semibold mb-4">
          <MapPin className="w-4 h-4" />
          الجامعة الهاشمية
        </span>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] bg-clip-text text-transparent mb-3">
          خريطة الحرم الجامعي
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base max-w-lg mx-auto">
          خريطة بوابات وأقسام الجامعة الهاشمية — كلية العلوم الطبية التطبيقية والتمريض
        </p>
      </motion.div>

      {/* Map Image Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative rounded-3xl overflow-hidden border border-rose-900/15 dark:border-rose-900/30 shadow-2xl shadow-rose-900/10 bg-white dark:bg-[#100508]">
          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setZoomed(!zoomed)}
              title={zoomed ? "تصغير" : "تكبير"}
              className="p-2 rounded-full bg-white/90 dark:bg-[#1a0810]/90 border border-rose-900/20 text-slate-700 dark:text-rose-200 shadow-md hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-all"
            >
              {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <a
              href="/university-map.png"
              download="خريطة-الجامعة-الهاشمية.png"
              title="تحميل الخريطة"
              className="p-2 rounded-full bg-white/90 dark:bg-[#1a0810]/90 border border-rose-900/20 text-slate-700 dark:text-rose-200 shadow-md hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-all"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

          {/* Map Image */}
          <div
            className={`transition-all duration-500 overflow-auto ${zoomed ? 'max-h-[85vh]' : 'max-h-[75vh]'}`}
          >
            <Image
              src="/university-map.png"
              alt="خريطة بوابات الجامعة الهاشمية"
              width={825}
              height={1000}
              className={`w-full object-contain transition-transform duration-500 ${zoomed ? 'scale-150 origin-top cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setZoomed(!zoomed)}
              priority
            />
          </div>

          {/* Bottom info bar */}
          <div className="px-5 py-3 bg-rose-50/80 dark:bg-rose-950/30 border-t border-rose-900/10 dark:border-rose-900/20 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#9F1239] dark:text-rose-400 shrink-0" />
            <p className="text-xs font-semibold text-slate-600 dark:text-rose-200/70">
              خريطة بوابات الجامعة الهاشمية — بوابة الزرقاء · البوابة الرئيسية · بوابة الشمال · بوابة عمان
            </p>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-4">
          انقر على الخريطة للتكبير · أو استخدم زر التنزيل لحفظها
        </p>
      </motion.div>
    </div>
  );
}
