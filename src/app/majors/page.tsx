'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Clock, DollarSign, BookOpen, Briefcase, ChevronDown, Stethoscope, Sparkles,
} from 'lucide-react';

interface Major {
  id: string;
  emoji: string;
  name: string;
  college: string;
  admissionRate: string;
  admissionRateNote?: string;
  creditHours: string;
  priceCompetitive: string;
  priceParallel: string;
  description: string;
  subjects: string;
  careers: string;
  accentColor: string;
}

const majors: Major[] = [
  {
    id: 'radiology',
    emoji: '🩻',
    name: 'التصوير الطبي والإشعاعي',
    college: 'كلية العلوم الطبية التطبيقية',
    admissionRate: '89.85%',
    creditHours: '136 ساعة',
    priceCompetitive: '30 د.أ',
    priceParallel: '55 د.أ',
    description: 'تخصص صحي يهتم باستخدام تقنيات التصوير الطبي للحصول على صور دقيقة تساعد الأطباء في تشخيص الأمراض والحالات المختلفة. يدرس الطالب مبادئ الأشعة والتصوير باستخدام تقنيات مثل الأشعة السينية، والتصوير المقطعي CT، والرنين المغناطيسي MRI، مع التركيز على التعامل الآمن مع أجهزة التصوير والإشعاع.',
    subjects: 'التشريح ووظائف الأعضاء، والفيزياء الطبية، وعلوم الإشعاع، وتقنيات التصوير الشعاعي، والأشعة السينية، والتصوير المقطعي CT، والرنين المغناطيسي MRI، والموجات فوق الصوتية، والطب النووي، والحماية من الإشعاع.',
    careers: 'أقسام الأشعة والتصوير الطبي في المستشفيات والمراكز الصحية ومراكز التصوير التشخيصي.',
    accentColor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'nutrition',
    emoji: '🥑',
    name: 'التغذية السريرية والحميات',
    college: 'كلية العلوم الطبية التطبيقية',
    admissionRate: '88.90%',
    creditHours: '136 ساعة',
    priceCompetitive: '30 د.أ',
    priceParallel: '55 د.أ',
    description: 'تخصص يجمع بين العلوم الطبية وعلوم التغذية، ويهتم بدراسة احتياجات الجسم الغذائية وعلاقة الغذاء بالصحة والمرض. يتعلم الطالب تقييم الحالة الغذائية ووضع الخطط والحميات العلاجية المناسبة للحالات المختلفة، مثل السكري وأمراض القلب والكلى والجهاز الهضمي، إضافةً إلى التغذية العلاجية والوقاية وتعزيز الصحة.',
    subjects: 'الكيمياء والأحياء، والتشريح ووظائف الأعضاء، والكيمياء الحيوية، وعلم الأغذية، والعناصر الغذائية، والتغذية العلاجية، وتغذية الفئات المختلفة، والحميات الغذائية وتقييم الحالة الغذائية.',
    careers: 'المستشفيات والمراكز الصحية والعيادات والمراكز التغذوية وغيرها من مجالات الرعاية الصحية.',
    accentColor: 'from-green-500 to-emerald-500',
  },
  {
    id: 'occupational-therapy',
    emoji: '🧠',
    name: 'العلاج الوظيفي',
    college: 'كلية العلوم الطبية التطبيقية',
    admissionRate: '89.35%',
    creditHours: '136 ساعة',
    priceCompetitive: '30 د.أ',
    priceParallel: '55 د.أ',
    description: 'تخصص صحي يركز على مساعدة الأشخاص على تطوير أو استعادة قدرتهم على أداء الأنشطة اليومية والاستقلالية في حياتهم. يتعامل مع حالات متنوعة مثل الإصابات الجسدية، والاضطرابات العصبية، وصعوبات النمو، ومشكلات المهارات الحركية والإدراكية.',
    subjects: 'التشريح ووظائف الأعضاء، وعلم النفس، وعلم الأعصاب، والنمو والتطور، والمهارات الحركية والإدراكية، وتأهيل الأطفال وكبار السن، والعلاج الوظيفي للحالات الجسدية والعصبية، وتصميم الأنشطة العلاجية والأجهزة المساعدة.',
    careers: 'المستشفيات ومراكز التأهيل والمراكز الخاصة والمدارس ومراكز رعاية الأطفال.',
    accentColor: 'from-purple-500 to-violet-500',
  },
  {
    id: 'physical-therapy',
    emoji: '🦴',
    name: 'العلاج الطبيعي',
    college: 'كلية العلوم الطبية التطبيقية',
    admissionRate: '90.85%',
    creditHours: '136 ساعة',
    priceCompetitive: '30 د.أ',
    priceParallel: '55 د.أ',
    description: 'تخصص صحي يهتم بتقييم وعلاج المشكلات التي تؤثر في الحركة والوظائف الجسدية، ومساعدة المرضى على استعادة قدرتهم على الحركة وتقليل الألم وتحسين جودة حياتهم.',
    subjects: 'التشريح، ووظائف الأعضاء، وعلم الحركة، والميكانيكا الحيوية، وعلم الأعصاب، وأمراض العظام والعضلات، والتمارين العلاجية، ووسائل العلاج الطبيعي المختلفة، والتأهيل والإصابات الرياضية.',
    careers: 'المستشفيات ومراكز التأهيل والعيادات والمراكز العلاجية والرياضية.',
    accentColor: 'from-orange-500 to-amber-500',
  },
  {
    id: 'lab-sciences',
    emoji: '🧪',
    name: 'العلوم الطبية المخبرية',
    college: 'كلية العلوم الطبية التطبيقية',
    admissionRate: '89.05%',
    creditHours: '136 ساعة',
    priceCompetitive: '30 د.أ',
    priceParallel: '60 د.أ',
    description: 'تخصص طبي مخبري يهتم بتحليل العينات الحيوية مثل الدم والبول والأنسجة، بهدف المساعدة في تشخيص الأمراض ومتابعة الحالة الصحية للمريض.',
    subjects: 'الكيمياء والأحياء، والتشريح ووظائف الأعضاء، والكيمياء الحيوية، وعلم الأحياء الدقيقة، وأمراض الدم، والمناعة، والطفيليات، والفيروسات، والكيمياء السريرية، والأنسجة، وبنوك الدم، والمواد العملية والمختبرات المكثفة.',
    careers: 'المختبرات الطبية والمستشفيات والمراكز الصحية والمختبرات التشخيصية وبنوك الدم.',
    accentColor: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'nursing',
    emoji: '🩺',
    name: 'التمريض',
    college: 'كلية التمريض',
    admissionRate: 'إناث: 89.65% | ذكور: 90.90%',
    creditHours: '137 ساعة',
    priceCompetitive: '20 د.أ',
    priceParallel: '60 د.أ',
    description: 'تخصص صحي يهتم بتقديم الرعاية الصحية الشاملة للمرضى والأفراد في مختلف مراحل الحياة، من خلال تقييم حالتهم الصحية، ومتابعة العلاج، والوقاية من الأمراض، وتعزيز الصحة. يعمل الممرض كجزء أساسي من الفريق الطبي، ويتعامل بشكل مباشر مع المرضى في مختلف الحالات الصحية والطوارئ.',
    subjects: 'التشريح ووظائف الأعضاء، والأحياء الدقيقة، وعلم الأدوية، وأساسيات التمريض، والتمريض الباطني والجراحي، وتمريض الأطفال، وتمريض الأمومة والنسائية، وتمريض الصحة النفسية، وتمريض صحة المجتمع، وتمريض الحالات الحرجة والطوارئ، والتدريب السريري المكثف في المستشفيات.',
    careers: 'المستشفيات والمراكز الصحية والعيادات ومراكز الرعاية الأولية والطوارئ والعناية الحثيثة، والمدارس والمؤسسات الصحية المختلفة.',
    accentColor: 'from-rose-500 to-pink-500',
  },
];

function MajorCard({ major, index }: { major: Major; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <div className={`relative bg-white/90 dark:bg-[#12070D]/90 backdrop-blur-xl rounded-3xl border border-rose-900/10 dark:border-rose-900/25 shadow-xl shadow-rose-950/5 overflow-hidden transition-all duration-300 ${expanded ? 'ring-2 ring-[#9F1239]/30 dark:ring-[#FB7185]/30' : 'hover:shadow-2xl hover:-translate-y-1'}`}>
        
        {/* Header - Always visible */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-right p-5 sm:p-6 flex items-start gap-4 cursor-pointer"
        >
          {/* Emoji Icon */}
          <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 dark:from-rose-950/50 dark:to-rose-900/20 border border-rose-900/10 dark:border-rose-900/25 flex items-center justify-center text-2xl sm:text-3xl shadow-sm">
            {major.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 dark:bg-rose-950/40 text-[#9F1239] dark:text-[#FB7185] border border-rose-900/10 dark:border-rose-900/25">
                {major.college}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-rose-100 font-poppins mb-1.5">
              {major.name}
            </h3>

            {/* Quick Stats Row */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/30 px-2 py-0.5 rounded-lg">
                <GraduationCap className="w-3 h-3" />
                {major.admissionRate}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-950/30 px-2 py-0.5 rounded-lg">
                <Clock className="w-3 h-3" />
                {major.creditHours}
              </span>
            </div>
          </div>

          {/* Expand Arrow */}
          <div className={`shrink-0 mt-2 w-8 h-8 rounded-xl bg-rose-500/10 dark:bg-rose-950/40 flex items-center justify-center border border-rose-900/10 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" />
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 space-y-5 border-t border-rose-900/10 dark:border-rose-900/20 pt-5">

                {/* Price Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 rounded-2xl p-3.5 border border-emerald-200/50 dark:border-emerald-900/20 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">تنافس</span>
                    </div>
                    <span className="text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono">{major.priceCompetitive}</span>
                    <span className="text-[10px] text-emerald-500 block">/ ساعة</span>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-2xl p-3.5 border border-amber-200/50 dark:border-amber-900/20 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">موازي</span>
                    </div>
                    <span className="text-lg font-black text-amber-700 dark:text-amber-300 font-mono">{major.priceParallel}</span>
                    <span className="text-[10px] text-amber-500 block">/ ساعة</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" />
                    <h4 className="text-sm font-black text-slate-900 dark:text-rose-100">نبذة عن التخصص</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-rose-200/60 leading-relaxed pr-6">
                    {major.description}
                  </p>
                </div>

                {/* Subjects */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" />
                    <h4 className="text-sm font-black text-slate-900 dark:text-rose-100">طبيعة المواد</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-rose-200/60 leading-relaxed pr-6">
                    يدرس الطالب مواد في {major.subjects}
                  </p>
                </div>

                {/* Career Fields */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" />
                    <h4 className="text-sm font-black text-slate-900 dark:text-rose-100">مجالات العمل</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-rose-200/60 leading-relaxed pr-6">
                    {major.careers}
                  </p>
                </div>

                {/* Admission Rate Highlight */}
                <div className="bg-gradient-to-r from-rose-50 to-rose-100/50 dark:from-rose-950/20 dark:to-[#12070D] rounded-2xl p-4 border border-rose-200/50 dark:border-rose-900/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#9F1239]/10 dark:bg-[#9F1239]/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#9F1239] dark:text-[#FB7185]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-rose-200/50 block">معدل القبول لسنة 2025</span>
                    <span className="text-base font-black text-[#9F1239] dark:text-[#FB7185] font-mono">{major.admissionRate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function MajorsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute top-[50%] -right-[15%] w-[40%] h-[50%] rounded-full bg-[#BE123C]/10 blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="p-3.5 bg-gradient-to-br from-rose-500/15 to-rose-600/10 dark:from-rose-950/50 dark:to-rose-900/30 rounded-2xl border border-rose-900/15 dark:border-rose-900/30 shadow-lg shadow-rose-950/5">
              <GraduationCap className="w-8 h-8 text-[#9F1239] dark:text-[#FB7185]" />
            </div>
            <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-rose-100 tracking-tight">
              دليل التخصصات
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-rose-200/70 text-sm sm:text-base max-w-2xl mx-auto font-inter leading-relaxed"
          >
            تعرّف على تخصصات كلية العلوم الطبية التطبيقية وكلية التمريض في الجامعة الهاشمية — معدلات القبول، الساعات، الأسعار، طبيعة المواد، ومجالات العمل
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C]"
          />
        </div>

        {/* College Sections */}
        <div className="space-y-8">
          {/* Faculty of Applied Medical Sciences */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#9F1239]" />
              <h2 className="text-base font-black text-slate-800 dark:text-rose-200">
                كلية العلوم الطبية التطبيقية
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-rose-900/15 dark:to-rose-900/30" />
            </motion.div>
            <div className="space-y-4">
              {majors.filter(m => m.college === 'كلية العلوم الطبية التطبيقية').map((major, i) => (
                <MajorCard key={major.id} major={major} index={i} />
              ))}
            </div>
          </div>

          {/* Faculty of Nursing */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#9F1239]" />
              <h2 className="text-base font-black text-slate-800 dark:text-rose-200">
                كلية التمريض
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-rose-900/15 dark:to-rose-900/30" />
            </motion.div>
            <div className="space-y-4">
              {majors.filter(m => m.college === 'كلية التمريض').map((major, i) => (
                <MajorCard key={major.id} major={major} index={i + 5} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/60 dark:bg-[#12070D]/60 border border-rose-900/10 dark:border-rose-900/20 text-xs text-slate-500 dark:text-rose-200/50 backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 text-[#9F1239]" />
            <span>معدلات القبول والأسعار لسنة 2025 — الجامعة الهاشمية</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
