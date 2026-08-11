"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize, Minimize, Share2, Copy, Check, Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export interface AnatomyModel {
  id: string;
  title: string;
  category: string;
  description: string;
  embedUrl: string;
  tags: string[];
  thumbnail?: string;
}

interface SketchfabModalProps {
  model: AnatomyModel | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SketchfabModal({ model, isOpen, onClose }: SketchfabModalProps) {
  const { t } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        setIsFullscreen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleCopyLink = () => {
    if (model) {
      navigator.clipboard.writeText(model.embedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (model && navigator.share) {
      try {
        await navigator.share({
          title: `NEURO Anatomy - ${model.title}`,
          text: model.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const getFullEmbedUrl = (url: string) => {
    if (!url) return '';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autostart=1&preload=1&ui_theme=dark&transparent=0`;
  };

  return (
    <AnimatePresence>
      {isOpen && model && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-2 sm:p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative flex flex-col bg-[#0A0508] border border-rose-900/30 rounded-3xl overflow-hidden shadow-2xl shadow-rose-950/50 transition-all duration-300 ${
              isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[88vh] max-h-[850px]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-rose-900/20 bg-[#12070D]/90 z-20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#E11D48] animate-pulse"></div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold font-poppins text-white truncate max-w-md">
                  {model.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-rose-200/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-rose-200/70 hover:text-white hover:bg-rose-500/20 rounded-xl transition-colors"
                  aria-label={t.anatomy.close}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3D Model Canvas Area */}
            <div className="relative flex-grow w-full h-full bg-black overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#080406] z-10">
                  <div className="w-12 h-12 border-4 border-[#9F1239] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-rose-200 text-xs font-semibold tracking-wide">{t.anatomy.loading}</span>
                </div>
              )}
              <iframe
                ref={iframeRef}
                title={model.title}
                className="absolute inset-0 w-full h-full border-0"
                src={getFullEmbedUrl(model.embedUrl)}
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              ></iframe>
            </div>

            {/* Footer Details */}
            {!isFullscreen && (
              <div className="p-4 sm:p-5 bg-[#12070D] border-t border-rose-900/20 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center z-20">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#881337] to-[#BE123C] rounded-full shadow-sm">
                      {model.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {model.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[11px] font-semibold text-rose-200/80 bg-white/5 rounded-lg border border-rose-900/20">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-rose-200/70 text-xs flex items-start gap-1.5 leading-relaxed">
                    <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#FB7185]" />
                    <span>{model.description}</span>
                  </p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto shrink-0">
                  <button
                    onClick={handleShare}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-rose-900/20 rounded-xl text-rose-100 text-xs font-bold transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" /> {t.anatomy.share}
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#881337] to-[#9F1239] hover:from-[#9F1239] hover:to-[#BE123C] text-white rounded-xl text-xs font-bold transition-all shadow-sm relative"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? t.anatomy.copied : t.anatomy.copyLink}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
