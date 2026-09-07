'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Send, ExternalLink, AlertCircle, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  details: string[];
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 'scrubs',
    name: 'سكراب طبي',
    description: 'سكراب طبي متوفر بجميع الألوان والمقاسات',
    details: [
      'متوفر بجميع الألوان والمقاسات',
      'متوفر بأنواع الأقمشة الثلاث:',
      'مينيمات — الباربي — 4 Way',
    ],
    image: '/products/scrubs.png',
    category: 'ملابس طبية',
  },
  {
    id: 'goniometer',
    name: 'جهاز الجينوميتر الطبي',
    description: 'أداة بسيطة ودقيقة لقياس المدى الحركي وزوايا المفاصل',
    details: [
      'يُستخدم في العلاج الطبيعي والطب الرياضي',
      'لقياس المدى الحركي وزوايا مفاصل الجسم',
      'متوفر بمقاسات: S — M — L',
    ],
    image: '/products/goniometer.png',
    category: 'أدوات طبية',
  },
  {
    id: 'labcoat',
    name: 'اللابكوت الطبي',
    description: 'الزي الرسمي والوقائي في جميع التخصصات الطبية',
    details: [
      'الزي الرسمي والوقائي في جميع التخصصات الطبية',
      'متوفر بجميع المقاسات',
      'متوفر بقماش المينيمات',
    ],
    image: '/products/labcoat.png',
    category: 'ملابس طبية',
  },
  {
    id: 'graduation',
    name: 'مستلزمات التخرج',
    description: 'روب وشاح وطاقية تخرج بتصميم كلاسيكي فاخر',
    details: [
      '🎓 روب تخرج — تصميم كلاسيكي، متوفر بجميع المقاسات باللون الأسود',
      '🎗️ وشاح التخرج — متوفر الملكي والرسمي باللون الأسود مع إمكانية التطريز بالفضي والذهبي',
      '🎩 طاقية التخرج — متوفر باللون الأسود',
    ],
    image: '/products/graduation.png',
    category: 'تخرج',
  },
  {
    id: 'stethoscope',
    name: 'السماعة الطبية',
    description: 'أداة طبية أساسية للاستماع إلى الأصوات الداخلية في الجسم',
    details: [
      'أداة طبية أساسية',
      'تُستخدم للاستماع إلى الأصوات الداخلية في الجسم',
      'جودة عالية ومناسبة لجميع التخصصات',
    ],
    image: '/products/stethoscope.png',
    category: 'أدوات طبية',
  },
  {
    id: 'nametag',
    name: 'التاغ نيم',
    description: 'بطاقة تعريفية صغيرة تُثبت على الملابس لإظهار اسمك وتخصصك',
    details: [
      'بطاقة تعريفية تُثبت على الملابس',
      'تُستخدم لإظهار اسم الشخص وتخصصه',
      'متوفر باللون الفضي والذهبي والأبيض',
    ],
    image: '/products/nametag.jpg',
    category: 'إكسسوارات',
  },
];

const STORE_INSTAGRAM_URL = 'https://www.instagram.com/neuro__store?stkn=MTgxdnkycmhneTlzeQ==';
const STORE_INSTAGRAM_DM = 'https://ig.me/m/neuro__store';

export default function StorePage() {
  const { currentUser } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleOrder = (product: Product) => {
    if (!currentUser) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 5000);
      return;
    }

    const message = [
      `السلام عليكم 👋`,
      ``,
      `أرغب بطلب المنتج التالي من متجر نيورو (Neuro Store):`,
      ``,
      `📦 المنتج: ${product.name}`,
      ``,
      `👤 معلومات الطلب:`,
      `• الاسم: ${currentUser.name}`,
      `• رقم الهاتف: ${currentUser.phone}`,
      ``,
      `أرجو التواصل معي لإتمام الطلب. شكراً لكم 🙏`,
    ].join('\n');

    const encoded = encodeURIComponent(message);
    window.open(`${STORE_INSTAGRAM_DM}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute top-[40%] -right-[15%] w-[40%] h-[50%] rounded-full bg-[#BE123C]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[40%] rounded-full bg-[#E11D48]/8 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="p-3.5 bg-gradient-to-br from-rose-500/15 to-rose-600/10 dark:from-rose-950/50 dark:to-rose-900/30 rounded-2xl border border-rose-900/15 dark:border-rose-900/30 shadow-lg shadow-rose-950/5">
              <ShoppingBag className="w-8 h-8 text-[#9F1239] dark:text-[#FB7185]" />
            </div>
            <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-rose-100 tracking-tight">
              متجر نيورو
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-rose-200/70 text-base md:text-lg max-w-2xl mx-auto font-inter leading-relaxed"
          >
            مستلزماتك الطبية والجامعية في مكان واحد — اطلب مباشرة عبر رسائل الإنستغرام
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C]"
          />
        </div>

        {/* Login Alert */}
        {showLoginAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 max-w-2xl mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
                يجب تسجيل الدخول أولاً لإتمام الطلب
              </p>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/70 mt-0.5">
                سجّل دخولك حتى نتمكن من إرسال بياناتك مع الطلب تلقائياً
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/login" className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-1">
                <LogIn className="w-3 h-3" /> تسجيل الدخول
              </Link>
              <Link href="/register" className="px-3 py-1.5 text-xs font-bold border border-amber-500/40 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-500/10 transition-colors">
                حساب جديد
              </Link>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white/90 dark:bg-[#12070D]/90 backdrop-blur-xl rounded-3xl border border-rose-900/10 dark:border-rose-900/25 shadow-xl shadow-rose-950/5 overflow-hidden hover:shadow-2xl hover:shadow-rose-950/10 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 dark:bg-[#12070D]/90 backdrop-blur-md text-[#9F1239] dark:text-[#FB7185] border border-rose-900/15 dark:border-rose-900/30 shadow-sm">
                  {product.category}
                </span>
              </div>

              {/* Image */}
              <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-rose-50/30 dark:from-[#180A11] dark:to-[#12070D] overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-rose-200/20">
                    <ShoppingBag className="w-20 h-20 mb-3" />
                    <span className="text-xs font-bold text-slate-400 dark:text-rose-200/40">
                      الصورة قريباً
                    </span>
                  </div>
                )}

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-rose-100 mb-2 font-poppins">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-rose-200/60 mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-5">
                  {product.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-[#9F1239] dark:text-[#FB7185] mt-1 shrink-0" />
                      <span className="text-xs text-slate-500 dark:text-rose-200/50 leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Order Button */}
                <button
                  onClick={() => handleOrder(product)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] hover:from-[#9F1239] hover:to-[#E11D48] text-white font-bold text-sm shadow-lg shadow-rose-900/25 hover:shadow-xl hover:shadow-rose-900/35 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <Send className="w-4 h-4 group-hover/btn:-rotate-12 transition-transform" />
                  <span>اطلب الآن عبر الإنستغرام</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/60 dark:bg-[#12070D]/60 border border-rose-900/10 dark:border-rose-900/20 text-xs text-slate-500 dark:text-rose-200/50 backdrop-blur-md">
            <Send className="w-3.5 h-3.5 text-[#9F1239]" />
            <span>
              جميع الطلبات تتم عبر رسائل إنستغرام متجر نيورو (
              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#9F1239] dark:text-[#FB7185] hover:underline"
              >
                @neuro__store
              </a>
              ) مباشرة — سيتم التواصل معك لتأكيد الطلب والتفاصيل
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
