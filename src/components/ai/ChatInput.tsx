"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative p-4 md:p-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent dark:from-[#050816] dark:via-[#050816]">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto flex items-end gap-2 bg-white/80 dark:bg-[#1a1c2c]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-2 shadow-lg shadow-black/5"
      >
        <button 
          className="p-3 text-gray-400 hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
          disabled={disabled}
        >
          <Mic className="w-5 h-5" />
        </button>
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask NEURO AI anything..."
          className="flex-grow max-h-[120px] bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-inter focus:outline-none"
          rows={1}
        />

        <button
          onClick={handleSubmit}
          disabled={!input.trim() || disabled}
          className={`p-3 rounded-full flex items-center justify-center transition-all ${
            input.trim() && !disabled
              ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-md hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5 ml-0.5" />
        </button>
      </motion.div>
      <div className="text-center mt-3 text-xs text-gray-500 dark:text-gray-500">
        NEURO AI can make mistakes. Verify important medical information.
      </div>
    </div>
  );
}
