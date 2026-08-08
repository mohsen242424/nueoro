"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize, Share2, Copy, Check, Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export interface AnatomyModel {
  id: string;
  title: string;
  category: string;
  description: string;
  embedUrl: string;
  tags: string[];
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

  return (
    <AnimatePresence>
      {isOpen && model && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 md:p-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative flex flex-col bg-[#050816]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
              isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl max-h-[90vh]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <h2 className="text-xl md:text-2xl font-bold font-poppins text-white">{model.title}</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label={t.anatomy.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Viewer Body */}
            <div className="relative flex-grow bg-black/50 overflow-hidden" style={{ minHeight: isFullscreen ? '0' : '400px', flexBasis: '100%' }}>
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white text-sm font-medium">{t.anatomy.loading}</span>
                </div>
              )}
              <iframe
                ref={iframeRef}
                title={model.title}
                className="w-full h-full border-none"
                src={model.embedUrl}
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              ></iframe>
            </div>

            {/* Footer Details */}
            {!isFullscreen && (
              <div className="p-6 bg-[#050816] border-t border-white/10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full">
                      {model.category}
                    </span>
                    <div className="flex gap-2">
                      {model.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs text-gray-400 bg-white/5 rounded-md border border-white/10">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#06B6D4]" />
                    {model.description}
                  </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={handleShare}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> {t.anatomy.share}
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors relative"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
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
