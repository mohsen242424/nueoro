"use client";

import { motion } from 'framer-motion';

const SUGGESTIONS = [
  "Explain the nervous system",
  "What are cranial nerves?",
  "Summarize pharmacology basics",
  "Generate a quiz on anatomy",
  "Explain heart physiology",
  "Medical terminology help"
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled: boolean;
}

export default function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-2 pt-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {SUGGESTIONS.map((suggestion, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelect(suggestion)}
            disabled={disabled}
            className="snap-start shrink-0 px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#06B6D4] hover:border-[#2563EB]/50 dark:hover:border-[#06B6D4]/50 hover:bg-white dark:hover:bg-white/10 transition-all whitespace-nowrap shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
