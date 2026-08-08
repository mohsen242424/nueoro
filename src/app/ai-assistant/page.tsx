"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage, { MessageProps } from '@/components/ai/ChatMessage';
import ChatInput from '@/components/ai/ChatInput';
import SuggestedQuestions from '@/components/ai/SuggestedQuestions';

// Mock AI Logic
const getMockResponse = (input: string): string => {
  const lower = input.toLowerCase();
  
  if (lower.includes('nervous system')) {
    return "The **nervous system** is a highly complex part of an animal that coordinates its actions by transmitting signals to and from different parts of its body. It consists of two main parts:\n\n1. **Central Nervous System (CNS)**: Includes the brain and spinal cord.\n2. **Peripheral Nervous System (PNS)**: Consists of all nerves outside the CNS.\n\nWould you like me to elaborate on a specific part?";
  }
  if (lower.includes('cranial nerves')) {
    return "There are **12 pairs of cranial nerves** that emerge directly from the brain. Some key ones include:\n\n- **I. Olfactory nerve**: Smell\n- **II. Optic nerve**: Vision\n- **X. Vagus nerve**: Parasympathetic control of the heart, lungs, and digestive tract\n\nI can provide a complete mnemonic if you're studying for an exam!";
  }
  if (lower.includes('quiz')) {
    return "Let's test your knowledge! Here is a quick quiz on anatomy:\n\n**Question 1:** What is the longest bone in the human body?\n*A) Tibia*\n*B) Femur*\n*C) Humerus*\n\nReply with your answer!";
  }
  if (lower.includes('heart')) {
    return "The **human heart** is a muscular organ that pumps blood through the circulatory system. It has four chambers:\n\n- **Right Atrium**: Receives deoxygenated blood from the body.\n- **Right Ventricle**: Pumps blood to the lungs.\n- **Left Atrium**: Receives oxygenated blood from the lungs.\n- **Left Ventricle**: Pumps blood to the rest of the body (thickest wall).\n\nCheck out the 3D model in our Anatomy Library to visualize the valves!";
  }

  return "I'm the NEURO AI Assistant. I can help you study anatomy, explain complex medical concepts, or generate practice quizzes. Feel free to ask me anything related to human biology or your coursework!";
};

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      role: 'ai',
      content: "Hello! I am NEURO, your AI medical and anatomy assistant. How can I help you study today?",
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
    // Add user message
    const newUserMsg: MessageProps = {
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const responseContent = getMockResponse(content);
      const newAiMsg: MessageProps = {
        role: 'ai',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5 - 2.5 second delay
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] dark:bg-[#050816] transition-colors duration-300 font-inter">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 blur-[120px] mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-20 pb-4 px-6 bg-white/50 dark:bg-black/20 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
              NEURO AI Assistant
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your personal study companion</p>
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
              <div className="flex items-center gap-3 bg-white/80 dark:bg-[#1a1c2c]/80 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm">
                <div className="flex space-x-1.5">
                  <motion.div
                    className="w-2 h-2 bg-[#2563EB] dark:bg-[#06B6D4] rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-[#2563EB] dark:bg-[#06B6D4] rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-[#2563EB] dark:bg-[#06B6D4] rounded-full"
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
      <div className="relative z-20 flex-shrink-0 border-t border-gray-200 dark:border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-xl">
        <SuggestedQuestions onSelect={handleSendMessage} disabled={isTyping} />
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
