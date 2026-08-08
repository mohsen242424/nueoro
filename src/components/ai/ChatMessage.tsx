"use client";

import { motion } from 'framer-motion';
import { Copy, Check, User, Bot } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/components/providers/LanguageProvider';

export interface MessageProps {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export default function ChatMessage({ message }: { message: MessageProps }) {
  const { t } = useLanguage();
  const isAi = message.role === 'ai';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full ${isAi ? 'justify-start' : 'justify-end'} mb-6 group`}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isAi ? 'flex-row' : 'flex-row-reverse'} gap-3 items-end`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md
          ${isAi 
            ? 'bg-gradient-to-br from-[#06B6D4] to-[#2563EB] text-white' 
            : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200'}`}
        >
          {isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>

        {/* Message Bubble */}
        <div className={`relative flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
          <div className={`px-5 py-3.5 rounded-2xl shadow-sm border ${
            isAi 
              ? 'bg-white/80 dark:bg-[#1a1c2c]/80 backdrop-blur-md border-gray-100 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-bl-sm' 
              : 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] border-transparent text-white rounded-br-sm'
          }`}>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {isAi ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                <p className="whitespace-pre-wrap m-0">{message.content}</p>
              )}
            </div>
          </div>
          
          <div className={`flex items-center gap-2 mt-1 text-[11px] text-gray-500 dark:text-gray-400 ${isAi ? 'ml-1' : 'mr-1'}`}>
            <span>{message.timestamp}</span>
            {isAi && (
              <button 
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1"
                aria-label="Copy message"
              >
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? (t.ai?.copied || t.anatomy?.copied || 'Copied') : (t.ai?.copy || 'Copy')}
              </button>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
