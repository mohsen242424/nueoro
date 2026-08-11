"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Facebook, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#9F1239]/15 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3.5 bg-rose-500/10 dark:bg-rose-950/40 border border-rose-900/15 dark:border-rose-900/30 rounded-2xl mb-4">
            <Mail className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-3 tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-rose-200/70 max-w-2xl mx-auto font-inter">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl rounded-3xl p-8 border border-rose-900/10 dark:border-rose-900/30 shadow-xl shadow-rose-950/5">
              <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-rose-100 mb-6">Contact Information</h3>
              
              <div className="space-y-5">
                <a href="mailto:neuro@hu.edu.jo" className="flex items-center group">
                  <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 rounded-xl flex items-center justify-center mr-4 group-hover:bg-[#9F1239] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-[#9F1239] dark:text-rose-200 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-rose-200/60 font-medium">Email Us</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">neuro@hu.edu.jo</p>
                  </div>
                </a>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-[#BE123C] dark:text-rose-300" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-rose-200/60 font-medium">{t.contact.location}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.contact.locationValue}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-rose-900/10 dark:border-rose-900/20">
                <h4 className="text-xs font-bold text-slate-900 dark:text-rose-100 mb-3 uppercase tracking-wider font-manrope">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="https://instagram.com/neuro_hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 rounded-xl flex items-center justify-center text-[#9F1239] dark:text-rose-200 hover:bg-[#9F1239] hover:text-white transition-all shadow-sm">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com/neuro.hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 rounded-xl flex items-center justify-center text-[#9F1239] dark:text-rose-200 hover:bg-[#9F1239] hover:text-white transition-all shadow-sm">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com/company/neuro-hu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-rose-50 dark:bg-rose-950/40 border border-rose-900/15 rounded-xl flex items-center justify-center text-[#9F1239] dark:text-rose-200 hover:bg-[#9F1239] hover:text-white transition-all shadow-sm">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl rounded-3xl p-2 border border-rose-900/10 dark:border-rose-900/30 shadow-xl overflow-hidden h-56">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13531.848834015694!2d36.1834!3d32.1026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b72350a4dae99%3A0xc3f6081ce8f3c7d6!2sThe%20Hashemite%20University!5e0!3m2!1sen!2sjo!4v1714578129037!5m2!1sen!2sjo" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.2rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl rounded-3xl p-8 border border-rose-900/10 dark:border-rose-900/30 shadow-2xl shadow-rose-950/5">
              <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-rose-100 mb-6">Send a Message</h3>
              
              {submitted ? (
                <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Message Sent!</h4>
                  <p className="text-xs text-slate-600 dark:text-rose-200/70">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                      {t.contact.subject}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                      {t.contact.message}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white rounded-xl text-xs font-bold shadow-md shadow-rose-900/30 hover:shadow-rose-900/50 transition-all group"
                  >
                    <span>{t.contact.send}</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
