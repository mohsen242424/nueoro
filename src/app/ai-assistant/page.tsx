"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage, { MessageProps } from '@/components/ai/ChatMessage';
import ChatInput from '@/components/ai/ChatInput';
import SuggestedQuestions from '@/components/ai/SuggestedQuestions';
import { useLanguage } from '@/components/providers/LanguageProvider';

// Mock AI Logic
const getMockResponse = (input: string): string => {
  const lower = input.toLowerCase();
  
  if (lower.includes('nervous system') || lower.includes('الجهاز العصبي')) {
    return "The **nervous system** (الجهاز العصبي) is a highly complex part that coordinates bodily actions by transmitting electrical and chemical impulses. It consists of two main parts:\n\n1. **Central Nervous System (CNS)**: Includes the brain (المخ) and spinal cord (الحبل الشوكي).\n2. **Peripheral Nervous System (PNS)**: Consists of cranial and spinal nerves.\n\nWould you like me to elaborate on a specific part or cranial nerve?";
  }
  if (lower.includes('cranial nerves') || lower.includes('الأعصاب القحفية')) {
    return "There are **12 pairs of cranial nerves** (12 زوجاً من الأعصاب القحفية) that emerge directly from the brain. Key ones include:\n\n- **CN I (Olfactory)**: Sensory for smell\n- **CN II (Optic)**: Sensory for vision\n- **CN X (Vagus)**: Parasympathetic control of the heart, lungs, and digestive tract\n\nI can provide a complete mnemonic if you're studying for an anatomy exam!";
  }
  if (lower.includes('quiz') || lower.includes('اختبار')) {
    return "Let's test your medical knowledge! Here is a quick quiz on human anatomy:\n\n**Question 1:** What is the longest and strongest bone in the human body?\n*A) Tibia*\n*B) Femur*\n*C) Humerus*\n\nReply with your answer!";
  }
  if (lower.includes('heart') || lower.includes('القلب') || lower.includes('cardio')) {
    return "The **human heart** is a muscular organ that pumps blood through the circulatory system. It has four chambers:\n\n- **Right Atrium**: Receives deoxygenated blood from the body.\n- **Right Ventricle**: Pumps blood to the pulmonary circulation.\n- **Left Atrium**: Receives oxygenated blood from the lungs.\n- **Left Ventricle**: Pumps blood to the systemic circulation (thickest myocardium).\n\nCheck out the 3D model in our Anatomy Library to visualize the chambers!";
  }

  return "I'm the NEURO AI Assistant (مساعد نيورو الذكي). I can help you study anatomy, explain complex medical sciences concepts, or generate practice quizzes. Feel free to ask me anything related to human biology or your university coursework!";
};

export default function AiAssistantPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      role: 'ai',
      content: t.ai.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    const newUserMsg: MessageProps = {
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getMockResponse(content);
      const newAiMsg: MessageProps = {
        role: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col min-h-[90vh] bg-[#FAF7F5] dark:bg-[#080406] transition-colors duration-300 font-inter">
      {/* Ambient Crimson Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-[15%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#9F1239]/20 to-[#BE123C]/20 blur-[130px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-6 bg-white/70 dark:bg-[#12070D]/80 backdrop-blur-md border-b border-rose-900/10 dark:border-rose-900/30 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48]">
              {t.ai.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-rose-200/60 mt-1">{t.ai.subtitle}</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="relative z-10 flex-grow overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col justify-end min-h-full">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-6"
            >
              <div className="flex items-center gap-3 bg-white/90 dark:bg-[#180A11]/90 backdrop-blur-md border border-rose-900/10 dark:border-rose-900/30 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm">
                <div className="flex space-x-1.5">
                  <motion.div
                    className="w-2 h-2 bg-[#9F1239] dark:bg-[#FB7185] rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-[#9F1239] dark:bg-[#FB7185] rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-[#9F1239] dark:bg-[#FB7185] rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Input Area */}
      <div className="relative z-20 flex-shrink-0 border-t border-rose-900/10 dark:border-rose-900/30 bg-white/80 dark:bg-[#0E0509]/90 backdrop-blur-xl">
        <SuggestedQuestions onSelect={handleSendMessage} disabled={isTyping} />
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
