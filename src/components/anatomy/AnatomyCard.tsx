"use client";

import { motion } from 'framer-motion';
import { Heart, Share2, Copy, Play, Check } from 'lucide-react';
import { useState } from 'react';
import { AnatomyModel } from './SketchfabModal';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface AnatomyCardProps {
  model: AnatomyModel;
  onOpenModal: (model: AnatomyModel) => void;
}

export default function AnatomyCard({ model, onOpenModal }: AnatomyCardProps) {
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(model.embedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex flex-col bg-white/70 dark:bg-[#12070D]/80 backdrop-blur-xl border border-rose-900/10 dark:border-rose-900/30 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-rose-950/30 transition-all duration-300"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#9F1239]/0 to-[#E11D48]/0 group-hover:from-[#9F1239]/20 group-hover:to-[#E11D48]/20 blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100 z-0"></div>

      <div className="relative z-10 flex flex-col h-full rounded-3xl overflow-hidden">
        {/* Header Image / Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-[#080406] via-[#15070E] to-[#250D19] border-b border-rose-900/10 dark:border-rose-900/30 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => onOpenModal(model)}>
          <div className="absolute inset-0 bg-[radial-gradient(#9F1239_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
          <motion.div 
            whileHover={{ scale: 1.15 }}
            className="w-16 h-16 rounded-full bg-rose-500/10 backdrop-blur-md flex items-center justify-center border border-rose-500/30 group-hover:bg-[#9F1239] transition-all shadow-lg z-10"
          >
            <Play className="w-6 h-6 text-rose-200 ml-1 group-hover:text-white" fill="currentColor" />
          </motion.div>
          {/* Category Badge overlay */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-100 bg-[#080406]/80 backdrop-blur-md rounded-full border border-rose-800/40">
              {model.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-lg font-bold font-poppins text-slate-900 dark:text-rose-100 mb-2 line-clamp-1">
            {model.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-rose-200/70 line-clamp-2 mb-4 flex-grow">
            {model.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mb-5">
            {model.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs font-semibold text-[#9F1239] dark:text-[#FDA4AF] bg-rose-500/10 dark:bg-rose-950/40 rounded-lg border border-rose-900/10">
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-rose-900/10 dark:border-rose-900/20">
            <button
              onClick={() => onOpenModal(model)}
              className="flex-grow flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-[#9F1239] to-[#BE123C] hover:from-[#BE123C] hover:to-[#E11D48] text-white rounded-xl text-xs font-bold shadow-md shadow-rose-900/30 transition-all"
            >
              {t.anatomy.view3D}
            </button>
            <button
              onClick={handleFavorite}
              className={`p-2.5 rounded-xl border transition-colors ${
                isFavorite 
                  ? 'bg-rose-500/20 border-rose-500/30 text-[#E11D48]' 
                  : 'bg-white dark:bg-[#180A11] border-rose-900/15 dark:border-rose-900/30 text-rose-900/50 dark:text-rose-300 hover:text-[#9F1239] dark:hover:text-white'
              }`}
              aria-label="Favorite"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <div className="relative group/tooltip">
              <button
                onClick={handleCopyLink}
                className="p-2.5 rounded-xl bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 text-rose-900/50 dark:text-rose-300 hover:text-[#9F1239] dark:hover:text-white transition-colors"
                aria-label="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {copied ? t.anatomy.copied : t.anatomy.copyLink}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
