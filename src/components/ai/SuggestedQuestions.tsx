"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled: boolean;
}

export default function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-2 pt-3">
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar snap-x no-scrollbar">
        {(t.ai.suggestedQuestions as string[] || []).map((suggestion, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelect(suggestion)}
            disabled={disabled}
            className="snap-start shrink-0 px-3.5 py-1.5 bg-white dark:bg-[#150910] backdrop-blur-md border border-rose-900/15 dark:border-rose-900/30 rounded-full text-xs font-bold text-slate-700 dark:text-rose-200/80 hover:text-[#9F1239] dark:hover:text-white hover:border-[#9F1239] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all whitespace-nowrap shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
