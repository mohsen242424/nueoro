"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  Download,
  Bus,
  Video,
  Phone,
  Clock,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Sparkles,
  Share2,
  Copy,
  Check,
  Building,
  Navigation,
  Compass,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import Image from 'next/image';
import {
  LAB_VIDEOS,
  TRANSPORT_ROUTES,
  TRANSPORT_POSTERS,
  HAKAYA_MANAGEMENT,
  LabVideo,
  TransportRoute
} from '@/data/campusGuide';

type TabType = 'map' | 'labs' | 'transport' | 'posters';

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [mapZoomed, setMapZoomed] = useState(false);

  // Lab Videos State
  const [selectedLabVideo, setSelectedLabVideo] = useState<LabVideo>(LAB_VIDEOS[0]);

  // Transport Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGateFilter, setSelectedGateFilter] = useState<'all' | 'zarqa' | 'main' | 'amman' | 'new' | 'hakaya' | 'misk'>('all');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Poster Modal / Zoom State
  const [selectedPoster, setSelectedPoster] = useState<number>(0);
  const [posterZoomed, setPosterZoomed] = useState(false);

  const handleCopyPhone = (phone: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(phone);
      setTimeout(() => setCopiedPhone(null), 2500);
    }
  };

  // Filtered Routes
  const filteredRoutes = useMemo(() => {
    return TRANSPORT_ROUTES.filter((route) => {
      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        route.name.toLowerCase().includes(query) ||
        route.gate.toLowerCase().includes(query) ||
        (route.supervisorName && route.supervisorName.toLowerCase().includes(query)) ||
        (route.supervisorPhone && route.supervisorPhone.includes(query)) ||
        (route.routeDetails && route.routeDetails.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Filter match
      if (selectedGateFilter === 'all') return true;
      if (selectedGateFilter === 'new') return !!route.isNew;
      if (selectedGateFilter === 'zarqa') return route.gateKey === 'zarqa';
      if (selectedGateFilter === 'main') return route.gateKey === 'main';
      if (selectedGateFilter === 'amman') return route.gateKey === 'amman';
      if (selectedGateFilter === 'hakaya') return route.company === 'حكايا';
      if (selectedGateFilter === 'misk') return route.company === 'مسك والمتكاملة والأسطول';

      return true;
    });
  }, [searchQuery, selectedGateFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-white dark:from-[#080406] dark:via-[#150B10]/60 dark:to-[#080406] pt-24 pb-20 px-3 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 max-w-4xl mx-auto"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold mb-3 border border-rose-900/10">
          <Compass className="w-4 h-4 text-[#9F1239] dark:text-rose-400" />
          الجامعة الهاشمية · الدليل الإرشادي المتكامل
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#E11D48] bg-clip-text text-transparent mb-3">
          خريطة الحرم والمواصلات والمختبرات
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          دليلك التفاعلي الشامل: خريطة بوابات الجامعة، فيديوهات إرشادية لمواقع المختبرات، ومواعيد وأرقام مشرفي شبكة باصات النقل للجامعة.
        </p>
      </motion.div>

      {/* Main Tabs Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-white/80 dark:bg-[#12070D]/90 backdrop-blur-md border border-rose-900/15 dark:border-rose-900/30 shadow-lg shadow-rose-950/5">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30'
                : 'text-slate-600 dark:text-rose-200/80 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>خريطة الحرم الجامعي</span>
          </button>

          <button
            onClick={() => setActiveTab('labs')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === 'labs'
                ? 'bg-gradient-to-r from-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30'
                : 'text-slate-600 dark:text-rose-200/80 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>فيديوهات المختبرات</span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-rose-500/20 text-rose-100 font-mono">
              3
            </span>
          </button>

          <button
            onClick={() => setActiveTab('transport')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === 'transport'
                ? 'bg-gradient-to-r from-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30'
                : 'text-slate-600 dark:text-rose-200/80 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>دليل المواصلات والمشرفين</span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              جديد
            </span>
          </button>

          <button
            onClick={() => setActiveTab('posters')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === 'posters'
                ? 'bg-gradient-to-r from-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30'
                : 'text-slate-600 dark:text-rose-200/80 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>بوسترات البوابات الإرشادية</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CAMPUS MAP */}
      {activeTab === 'map' && (
        <motion.div
          key="tab-map"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-4xl mx-auto"
        >
          {/* Quick Gates Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/20 shadow-sm text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-600 mb-1"></span>
              <p className="text-xs font-bold text-slate-800 dark:text-rose-100">بوابة الزرقاء</p>
              <p className="text-[10px] text-slate-500 dark:text-rose-300/60">حكايا وباصات الزرقاء</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/20 shadow-sm text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-700 mb-1"></span>
              <p className="text-xs font-bold text-slate-800 dark:text-rose-100">البوابة الرئيسية</p>
              <p className="text-[10px] text-slate-500 dark:text-rose-300/60">باصات المحافظات</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/20 shadow-sm text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-600 mb-1"></span>
              <p className="text-xs font-bold text-slate-800 dark:text-rose-100">بوابة عمان</p>
              <p className="text-[10px] text-slate-500 dark:text-rose-300/60">رغدان وسحاب والبيادر</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#12070D]/80 border border-rose-900/10 dark:border-rose-900/20 shadow-sm text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-600 mb-1"></span>
              <p className="text-xs font-bold text-slate-800 dark:text-rose-100">بوابة الشمال</p>
              <p className="text-[10px] text-slate-500 dark:text-rose-300/60">الربط بالباص السريع</p>
            </div>
          </div>

          {/* Map Card */}
          <div className="relative rounded-3xl overflow-hidden border border-rose-900/15 dark:border-rose-900/30 shadow-2xl shadow-rose-900/10 bg-white dark:bg-[#100508]">
            {/* Top Toolbar Controls */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => setMapZoomed(!mapZoomed)}
                title={mapZoomed ? "تصغير" : "تكبير"}
                className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#1a0810]/95 border border-rose-900/20 text-slate-700 dark:text-rose-200 shadow-md hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-all flex items-center gap-1.5 text-xs font-bold"
              >
                {mapZoomed ? <ZoomOut className="w-4 h-4 text-rose-600" /> : <ZoomIn className="w-4 h-4 text-[#9F1239]" />}
                <span>{mapZoomed ? 'تصغير' : 'تكبير'}</span>
              </button>
              <a
                href="/university-map.png"
                download="خريطة-الجامعة-الهاشمية.png"
                title="تحميل الخريطة بجودة عالية"
                className="p-2.5 rounded-2xl bg-[#9F1239] text-white shadow-md hover:bg-[#881337] transition-all flex items-center gap-1.5 text-xs font-bold"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الخريطة</span>
              </a>
            </div>

            {/* Map Image Viewer */}
            <div
              className={`transition-all duration-500 overflow-auto ${mapZoomed ? 'max-h-[90vh]' : 'max-h-[75vh]'}`}
            >
              <Image
                src="/university-map.png"
                alt="خريطة بوابات وأقسام الجامعة الهاشمية"
                width={825}
                height={1000}
                className={`w-full object-contain transition-transform duration-500 ${mapZoomed ? 'scale-150 origin-top cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setMapZoomed(!mapZoomed)}
                priority
              />
            </div>

            {/* Bottom info bar */}
            <div className="px-5 py-3.5 bg-rose-50/80 dark:bg-rose-950/30 border-t border-rose-900/10 dark:border-rose-900/20 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9F1239] dark:text-rose-400 shrink-0" />
                <p className="text-xs font-semibold text-slate-700 dark:text-rose-200">
                  خريطة الحرم الجامعي — كلية العلوم الطبية التطبيقية والتمريض والمباني الرئيسية
                </p>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-rose-300/60 font-medium">
                انقر على الخريطة لتكبير التفاصيل
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: LAB VIDEOS */}
      {activeTab === 'labs' && (
        <motion.div
          key="tab-labs"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          {/* Section Introduction */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100 mb-2">
              فيديوهات إرشادية لمواقع المختبرات
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-rose-200/70">
              شاهد المسار الفعلي لطريق الوصول إلى مختبرك بكل دقة من خلال تصوير ميداني واضح ومباشر داخل الجامعة.
            </p>
          </div>

          {/* Quick Selectors for the 3 Lab Groups */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LAB_VIDEOS.map((lab) => {
              const isSelected = selectedLabVideo.id === lab.id;
              return (
                <button
                  key={lab.id}
                  onClick={() => setSelectedLabVideo(lab)}
                  className={`text-right p-4 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-[#15070F] border-[#9F1239] shadow-xl shadow-rose-950/10 ring-2 ring-[#9F1239]/20'
                      : 'bg-white/70 dark:bg-[#100508]/70 border-rose-900/10 dark:border-rose-900/20 hover:border-rose-500/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${lab.badgeColor}`}>
                        فيديو إرشادي
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#9F1239] dark:text-[#FDA4AF]">
                          <PlayCircle className="w-3.5 h-3.5" /> يعرض الآن
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-rose-100 leading-snug">
                      {lab.title}
                    </h3>
                  </div>

                  {/* Labs Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-rose-900/10 dark:border-rose-900/20">
                    {lab.labs.map((lname, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-[10px] font-semibold text-slate-700 dark:text-rose-200"
                      >
                        {lname}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Video Player Screen */}
          <div className="bg-white/85 dark:bg-[#12070D]/90 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-4 sm:p-7 shadow-xl shadow-rose-950/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-900/10 dark:border-rose-900/20">
              <div>
                <span className="text-[11px] font-bold text-[#9F1239] dark:text-[#FDA4AF] uppercase tracking-wide">
                  المسار الإرشادي المختار
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-rose-100 mt-1">
                  {selectedLabVideo.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedLabVideo.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-rose-950/50 hover:bg-rose-100 text-slate-700 dark:text-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح في Google Drive</span>
                </a>
              </div>
            </div>

            {/* Video Player (Responsive Iframe with Zero Obstruction) */}
            <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-rose-900/30">
              <iframe
                src={selectedLabVideo.embedUrl}
                className="w-full h-full border-0 block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                title={selectedLabVideo.title}
              />
            </div>

            {/* Description & Included Labs */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-900/15 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-rose-100 leading-relaxed">
                {selectedLabVideo.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold text-[#9F1239] dark:text-rose-300">
                  المختبرات المشمولة في هذا الفيديو:
                </span>
                {selectedLabVideo.labs.map((lname, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white dark:bg-[#180A11] border border-rose-900/20 text-xs font-bold text-slate-800 dark:text-rose-100 shadow-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {lname}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: TRANSPORTATION & SUPERVISORS */}
      {activeTab === 'transport' && (
        <motion.div
          key="tab-transport"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Important Official Alert Banner (BRT + Hakaya) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/10 border-2 border-amber-500/30 shadow-lg text-right space-y-2.5">
            <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-200 font-black text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>تنويه هام للطلبة بشأن خطوط الباص السريع BRT ومواصلات الجامعة:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-rose-100/90 leading-relaxed">
              تمّ <strong>إلغاء خطيّ مجمع الشمال وصويلح المباشرين</strong>، واستخدام <strong>الباص السريع BRT</strong> من محطة الشمال أو محطة صويلح وصولاً إلى <strong>محطة الزرقاء</strong>، ثم استقلال باصات <strong>(حكايا - الجامعة الهاشمية)</strong> المتواجدة داخل المحطة.
              <br />
              💳 <strong>طريقة الدفع:</strong> تتم من خلال بطاقة الباص السريع الذكية.
            </p>
          </div>

          {/* Operations Management Callout Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-[#15070F] border border-rose-900/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-right w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9F1239] to-[#E11D48] text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-900/20">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#9F1239] dark:text-[#FDA4AF] uppercase">
                  إدارة الحركة والمتابعة الميدانية
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-rose-100">
                  {HAKAYA_MANAGEMENT.role}: {HAKAYA_MANAGEMENT.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-rose-300/70">
                  للاستفسارات والشكاوى الميدانية الخاصة بحركة باصات حكايا
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${HAKAYA_MANAGEMENT.phone}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#9F1239] to-[#BE123C] text-white text-xs font-bold hover:opacity-95 transition-all shadow-md shadow-rose-900/20 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span className="font-mono">{HAKAYA_MANAGEMENT.phone}</span>
              </a>
              <button
                onClick={() => handleCopyPhone(HAKAYA_MANAGEMENT.phone)}
                title="نسخ الرقم"
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-rose-950/50 hover:bg-slate-200 text-slate-700 dark:text-rose-200 border border-rose-900/10 transition-colors"
              >
                {copiedPhone === HAKAYA_MANAGEMENT.phone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl border border-rose-900/15 dark:border-rose-900/30 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث باسم المنطقة، الباص، البوابة، أو رقم المشرف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-2xl bg-rose-50/50 dark:bg-[#180A11] border border-rose-900/15 text-xs sm:text-sm text-slate-800 dark:text-rose-100 placeholder:text-slate-400 dark:placeholder:text-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239]/30 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setSelectedGateFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGateFilter === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-rose-950/40 text-slate-700 dark:text-rose-200 hover:bg-rose-50'
                }`}
              >
                جميع الخطوط ({TRANSPORT_ROUTES.length})
              </button>

              <button
                onClick={() => setSelectedGateFilter('new')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedGateFilter === 'new'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border border-rose-500/20'
                }`}
              >
                <span>🔴 مسارات مستحدثة</span>
              </button>

              <button
                onClick={() => setSelectedGateFilter('zarqa')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGateFilter === 'zarqa'
                    ? 'bg-[#9F1239] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-rose-950/40 text-slate-700 dark:text-rose-200 hover:bg-rose-50'
                }`}
              >
                بوابة الزرقاء
              </button>

              <button
                onClick={() => setSelectedGateFilter('main')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGateFilter === 'main'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-rose-950/40 text-slate-700 dark:text-rose-200 hover:bg-rose-50'
                }`}
              >
                البوابة الرئيسية (المحافظات)
              </button>

              <button
                onClick={() => setSelectedGateFilter('amman')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGateFilter === 'amman'
                    ? 'bg-indigo-700 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-rose-950/40 text-slate-700 dark:text-rose-200 hover:bg-rose-50'
                }`}
              >
                بوابة عمان
              </button>

              <button
                onClick={() => setSelectedGateFilter('hakaya')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGateFilter === 'hakaya'
                    ? 'bg-rose-900 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-rose-950/40 text-slate-700 dark:text-rose-200 hover:bg-rose-50'
                }`}
              >
                باصات حكايا
              </button>

              <button
                onClick={() => setSelectedGateFilter('misk')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGateFilter === 'misk'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-rose-950/40 text-slate-700 dark:text-rose-200 hover:bg-rose-50'
                }`}
              >
                مسك والمتكاملة والأسطول
              </button>
            </div>
          </div>

          {/* Route Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoutes.map((route) => {
              const gateBadgeColor =
                route.gateKey === 'zarqa'
                  ? 'bg-rose-100 dark:bg-rose-950/50 text-[#9F1239] dark:text-rose-300 border-rose-200 dark:border-rose-900/30'
                  : route.gateKey === 'main'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                  : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/30';

              return (
                <div
                  key={route.id}
                  className={`rounded-3xl border p-5 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg ${
                    route.isNew
                      ? 'bg-gradient-to-b from-rose-500/5 to-white dark:to-[#12070D] border-rose-500/40'
                      : 'bg-white/85 dark:bg-[#12070D]/85 border-rose-900/10 dark:border-rose-900/25 hover:border-rose-500/30'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${gateBadgeColor}`}>
                        {route.gate}
                      </span>
                      {route.isNew ? (
                        <span className="px-2.5 py-1 rounded-xl bg-rose-500 text-white text-[10px] font-bold animate-pulse">
                          🔴 مسار مستحدث
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-400 dark:text-rose-300/50">
                          {route.company}
                        </span>
                      )}
                    </div>

                    {/* Route Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-rose-100 leading-snug">
                      {route.name}
                    </h3>

                    {/* Route Path / Pickup point if present */}
                    {route.pickupPoint && (
                      <p className="text-xs font-semibold text-[#9F1239] dark:text-[#FDA4AF] bg-rose-50 dark:bg-rose-950/40 p-2 rounded-xl border border-rose-900/10">
                        📍 نقطة التحميل: {route.pickupPoint}
                      </p>
                    )}

                    {route.routeDetails && (
                      <p className="text-[11px] text-slate-600 dark:text-rose-200/70 bg-slate-50 dark:bg-[#180A11] p-2 rounded-xl border border-rose-900/10">
                        🛣️ خط السير: {route.routeDetails}
                      </p>
                    )}

                    {/* Schedule Details */}
                    <div className="space-y-1.5 pt-1 text-xs">
                      <div className="flex items-start gap-2 text-slate-700 dark:text-rose-100">
                        <Clock className="w-3.5 h-3.5 text-[#9F1239] dark:text-rose-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          <strong>الانطلاق:</strong> {route.schedule}
                        </span>
                      </div>

                      {route.returnSchedule && (
                        <div className="flex items-start gap-2 text-slate-600 dark:text-rose-200/80">
                          <Navigation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">
                            <strong>العودة:</strong> {route.returnSchedule}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions / Supervisor Info Footer */}
                  <div className="pt-3 border-t border-rose-900/10 dark:border-rose-900/20 space-y-2">
                    {route.supervisorPhone ? (
                      <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-900/10">
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-500 dark:text-rose-300/60 truncate">
                            {route.supervisorName || 'مشرف الخط'}
                          </p>
                          <p className="text-xs font-bold font-mono text-slate-900 dark:text-rose-100">
                            {route.supervisorPhone}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <a
                            href={`tel:${route.supervisorPhone}`}
                            title="اتصال مباشر"
                            className="p-2 rounded-xl bg-[#9F1239] text-white hover:bg-[#881337] transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleCopyPhone(route.supervisorPhone!)}
                            title="نسخ الرقم"
                            className="p-2 rounded-xl bg-white dark:bg-[#180A11] text-slate-700 dark:text-rose-200 border border-rose-900/15 hover:bg-rose-50 transition-colors"
                          >
                            {copiedPhone === route.supervisorPhone ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 dark:text-rose-200/50 text-center py-1">
                        حركة الباصات مستمرة حسب جدول المحطة
                      </p>
                    )}

                    {/* WhatsApp Group Link if available */}
                    {route.whatsappGroup && (
                      <a
                        href={route.whatsappGroup}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>الانضمام لجروب واتساب الخط</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="p-8 text-center bg-white/70 dark:bg-[#12070D]/70 rounded-3xl border border-rose-900/15">
              <Bus className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold text-slate-700 dark:text-rose-200">
                لم يتم العثور على خط يطابق بحثك
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGateFilter('all');
                }}
                className="mt-3 text-xs text-[#9F1239] dark:text-[#FB7185] font-bold underline"
              >
                إعادة ضبط الفلترة
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* TAB 4: POSTERS & INFOGRAPHICS */}
      {activeTab === 'posters' && (
        <motion.div
          key="tab-posters"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-5xl mx-auto space-y-6"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-rose-100 mb-2">
              بوسترات دليل مواصلات الجامعة الهاشمية
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-rose-200/70">
              سلسلة بوسترات «اعرف باصك... واعرف بوابتك» الرسمية من فريق NEURO. يمكنك استعراضها وتكبيرها وتحميلها مباشرة لهاتفك.
            </p>
          </div>

          {/* Posters Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TRANSPORT_POSTERS.map((poster, index) => (
              <button
                key={poster.id}
                onClick={() => {
                  setSelectedPoster(index);
                  setPosterZoomed(false);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                  selectedPoster === index
                    ? 'bg-[#9F1239] text-white border-transparent shadow-md shadow-rose-900/25'
                    : 'bg-white/80 dark:bg-[#12070D]/80 text-slate-700 dark:text-rose-200 border-rose-900/15 hover:border-rose-400'
                }`}
              >
                {poster.gate}
              </button>
            ))}
          </div>

          {/* Main Poster Showcase */}
          <div className="relative rounded-3xl overflow-hidden border border-rose-900/20 bg-white dark:bg-[#100508] shadow-2xl">
            {/* Top Toolbar */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => setPosterZoomed(!posterZoomed)}
                title={posterZoomed ? "تصغير" : "تكبير"}
                className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#1a0810]/95 border border-rose-900/20 text-slate-700 dark:text-rose-200 shadow-md hover:bg-rose-50 transition-all flex items-center gap-1.5 text-xs font-bold"
              >
                {posterZoomed ? <ZoomOut className="w-4 h-4 text-rose-600" /> : <ZoomIn className="w-4 h-4 text-[#9F1239]" />}
                <span>{posterZoomed ? 'تصغير' : 'تكبير'}</span>
              </button>
              <a
                href={TRANSPORT_POSTERS[selectedPoster].image}
                download={`${TRANSPORT_POSTERS[selectedPoster].title}.png`}
                title="تحميل البوستر"
                className="p-2.5 rounded-2xl bg-[#9F1239] text-white shadow-md hover:bg-[#881337] transition-all flex items-center gap-1.5 text-xs font-bold"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الصورة</span>
              </a>
            </div>

            {/* Poster Image */}
            <div
              className={`transition-all duration-500 overflow-auto flex items-center justify-center p-2 sm:p-4 ${
                posterZoomed ? 'max-h-[90vh]' : 'max-h-[75vh]'
              }`}
            >
              <Image
                src={TRANSPORT_POSTERS[selectedPoster].image}
                alt={TRANSPORT_POSTERS[selectedPoster].title}
                width={800}
                height={1000}
                className={`max-w-full h-auto object-contain rounded-2xl transition-transform duration-500 ${
                  posterZoomed ? 'scale-125 origin-top cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setPosterZoomed(!posterZoomed)}
              />
            </div>

            {/* Bottom Caption */}
            <div className="p-4 sm:p-5 bg-rose-50/80 dark:bg-rose-950/30 border-t border-rose-900/10 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-rose-100">
                  {TRANSPORT_POSTERS[selectedPoster].title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-rose-300/60 mt-0.5">
                  {TRANSPORT_POSTERS[selectedPoster].description}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#9F1239] dark:text-[#FDA4AF]">
                انقر على الصورة للتكبير أو استخدم زر التحميل
              </span>
            </div>
          </div>

          {/* Quick Thumbnails Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {TRANSPORT_POSTERS.map((poster, index) => (
              <button
                key={poster.id}
                onClick={() => {
                  setSelectedPoster(index);
                  setPosterZoomed(false);
                }}
                className={`relative rounded-2xl overflow-hidden border transition-all text-right p-1.5 ${
                  selectedPoster === index
                    ? 'border-[#9F1239] ring-2 ring-[#9F1239]/30 bg-rose-50/50'
                    : 'border-rose-900/10 hover:border-rose-400 bg-white dark:bg-[#12070D]'
                }`}
              >
                <div className="aspect-[4/5] relative rounded-xl overflow-hidden bg-slate-100 dark:bg-black/30">
                  <Image
                    src={poster.image}
                    alt={poster.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] font-bold text-slate-800 dark:text-rose-200 mt-1.5 truncate px-1">
                  {poster.gate}
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
