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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
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
      handleCopyLink(e);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex flex-col bg-white/5 dark:bg-black/20 backdrop-blur-lg border border-gray-200/20 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-[#2563EB]/20 transition-all duration-300"
    >
      {/* Decorative gradient blur */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#2563EB]/0 to-[#7C3AED]/0 group-hover:from-[#2563EB]/20 group-hover:to-[#7C3AED]/20 blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100 z-0"></div>

      <div className="relative z-10 flex flex-col h-full bg-white dark:bg-[#050816]/80 rounded-2xl overflow-hidden">
        {/* Header Image/Gradient Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-[#050816] to-[#1a1c2c] border-b border-gray-100 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => onOpenModal(model)}>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#2563EB]/20 transition-colors z-10"
          >
            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
          </motion.div>
          {/* Category Badge overlay */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10">
              {model.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-2 line-clamp-1">
            {model.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
            {model.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-5">
            {model.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4] bg-[#2563EB]/10 dark:bg-[#06B6D4]/10 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-white/10">
            <button
              onClick={() => onOpenModal(model)}
              className="flex-grow flex items-center justify-center py-2 px-4 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white rounded-lg text-sm font-semibold transition-colors"
            >
              {t.anatomy.view3D}
            </button>
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorite 
                  ? 'bg-red-500/10 border-red-500/20 text-[#C41E3A]' 
                  : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-white'
              }`}
              aria-label="Favorite"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <div className="relative group/tooltip">
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                aria-label="Copy Link"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {copied ? t.anatomy.copied : t.anatomy.copyLink}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
