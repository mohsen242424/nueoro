"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ChevronRight, ChevronLeft, Upload, CheckCircle2 } from 'lucide-react';
import committeesData from '@/data/committees.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

type FormData = {
  fullName: string;
  studentId: string;
  phone: string;
  email: string;
  major: string;
  year: string;
  committee: string;
  skills: string;
  experience: string;
  portfolio: string;
  linkedin: string;
  github: string;
  motivation: string;
  availability: string;
};

export default function JoinPage() {
  const { t, isRTL } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    studentId: '',
    phone: '',
    email: '',
    major: '',
    year: '',
    committee: '',
    skills: '',
    experience: '',
    portfolio: '',
    linkedin: '',
    github: '',
    motivation: '',
    availability: ''
  });

  const steps = [
    { num: 1, title: t.join.step1 },
    { num: 2, title: t.join.step2 },
    { num: 3, title: t.join.step3 },
    { num: 4, title: t.join.step4 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const InputField = ({ label, name, type = 'text', placeholder, required = false }: any) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={(formData as any)[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm"
      />
    </div>
  );

  const TextAreaField = ({ label, name, placeholder, required = false }: any) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>
      <textarea
        name={name}
        value={(formData as any)[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 text-sm font-medium shadow-sm resize-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] pt-24 pb-20 px-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#9F1239]/15 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#BE123C]/10 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3.5 bg-rose-500/10 dark:bg-rose-950/40 border border-rose-900/15 dark:border-rose-900/30 rounded-2xl mb-4">
            <Sparkles className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-3 tracking-tight">
            {t.join.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-rose-200/70 max-w-2xl mx-auto font-inter">
            {t.join.subtitle}
          </p>
        </motion.div>

        {!isSuccess ? (
          <div className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl rounded-3xl border border-rose-900/10 dark:border-rose-900/30 shadow-2xl shadow-rose-950/5 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-rose-50/50 dark:bg-rose-950/20 p-6 border-b border-rose-900/10 dark:border-rose-900/20">
              <div className="flex justify-between items-center relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-rose-900/10 dark:bg-rose-900/20 -z-10 rounded-full" />
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#881337] to-[#BE123C] -z-10 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((step - 1) / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
                
                {steps.map((s) => (
                  <div key={s.num} className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= s.num 
                        ? 'bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30' 
                        : 'bg-white dark:bg-[#180A11] border-2 border-rose-900/15 dark:border-rose-900/30 text-slate-400 dark:text-rose-200/40'
                    }`}>
                      {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className={`text-xs mt-2 font-bold hidden sm:block ${
                      step >= s.num ? 'text-[#9F1239] dark:text-rose-200' : 'text-slate-400 dark:text-rose-200/40'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-6">{t.join.step1}</h2>
                    <InputField label={t.join.fullName} name="fullName" placeholder="John Doe" required />
                    <InputField label={t.join.studentId} name="studentId" placeholder="e.g. 2100000" required />
                    <InputField label={t.join.phone} name="phone" type="tel" placeholder="+962 7..." required />
                    <InputField label={t.join.email || 'Email'} name="email" type="email" placeholder="john@example.com" required />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-6">{t.join.step2}</h2>
                    
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                        {t.join.major || 'Major'} <span className="text-rose-600">*</span>
                      </label>
                      <select 
                        name="major" 
                        value={formData.major} 
                        onChange={handleInputChange} 
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white text-sm font-medium shadow-sm cursor-pointer"
                      >
                        <option value="">Select your major</option>
                        <option value="medicine">Doctor of Medicine</option>
                        <option value="dentistry">Dentistry</option>
                        <option value="pharmacy">Pharmacy</option>
                        <option value="nursing">Nursing</option>
                        <option value="pt">Physical Therapy</option>
                        <option value="medlab">Medical Laboratory</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                        {t.join.year || 'Academic Year'} <span className="text-rose-600">*</span>
                      </label>
                      <select 
                        name="year" 
                        value={formData.year} 
                        onChange={handleInputChange} 
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white text-sm font-medium shadow-sm cursor-pointer"
                      >
                        <option value="">{t.join.selectYear}</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                        <option value="5">Fifth Year</option>
                        <option value="6">Sixth Year</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                        {t.join.committee || 'Committee of Interest'} <span className="text-rose-600">*</span>
                      </label>
                      <select 
                        name="committee" 
                        value={formData.committee} 
                        onChange={handleInputChange} 
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white text-sm font-medium shadow-sm cursor-pointer"
                      >
                        <option value="">{t.join.selectCommittee}</option>
                        {committeesData.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-6">{t.join.step3}</h2>
                    
                    <TextAreaField label={t.join.skills || 'Skills'} name="skills" placeholder="List your relevant skills..." />
                    <TextAreaField label={t.join.experience || 'Experience'} name="experience" placeholder="Any relevant past experience..." />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label={t.join.linkedin || 'LinkedIn'} name="linkedin" placeholder="https://linkedin.com/in/..." />
                      <InputField label={t.join.portfolio || 'Portfolio'} name="portfolio" placeholder="https://..." />
                    </div>

                    <TextAreaField label={t.join.motivation || 'Motivation'} name="motivation" placeholder="Tell us your motivation..." required />
                    
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 dark:text-rose-200/80 mb-1.5 font-manrope">
                        {t.join.availability || 'Availability'} <span className="text-rose-600">*</span>
                      </label>
                      <select 
                        name="availability" 
                        value={formData.availability} 
                        onChange={handleInputChange} 
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-[#180A11] border border-rose-900/15 dark:border-rose-900/30 rounded-xl focus:ring-2 focus:ring-[#9F1239] outline-none transition-all text-slate-900 dark:text-white text-sm font-medium shadow-sm cursor-pointer"
                      >
                        <option value="">{t.join.selectAvailability}</option>
                        <option value="full">{t.join.fullTime}</option>
                        <option value="part">{t.join.partTime}</option>
                        <option value="weekends">{t.join.weekends}</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-2">{t.join.step4}</h2>
                    
                    <div className="bg-slate-50 dark:bg-[#180A11] border border-rose-900/10 dark:border-rose-900/25 p-5 rounded-2xl space-y-3 text-xs">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500 dark:text-rose-200/60 font-semibold">{t.join.fullName || 'Name'}:</span>
                        <span className="col-span-2 text-slate-900 dark:text-white font-bold">{formData.fullName || '-'}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500 dark:text-rose-200/60 font-semibold">{t.join.studentId || 'Student ID'}:</span>
                        <span className="col-span-2 text-slate-900 dark:text-white font-bold">{formData.studentId || '-'}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500 dark:text-rose-200/60 font-semibold">{t.join.committee || 'Committee'}:</span>
                        <span className="col-span-2 text-slate-900 dark:text-white font-bold">{formData.committee ? committeesData.find(c => c.id === formData.committee)?.name : '-'}</span>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-rose-900/20 dark:border-rose-900/40 rounded-2xl p-8 text-center hover:border-rose-600 transition-colors cursor-pointer group bg-white dark:bg-[#180A11]">
                      <div className="w-14 h-14 bg-rose-500/10 dark:bg-rose-950/40 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-7 h-7 text-[#9F1239] dark:text-[#FB7185]" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Upload your CV</h3>
                      <p className="text-xs text-slate-500 dark:text-rose-200/60 mb-3">PDF, DOCX up to 5MB</p>
                      <button type="button" className="px-4 py-2 bg-rose-50 dark:bg-rose-950/30 text-[#9F1239] dark:text-rose-200 rounded-xl text-xs font-bold border border-rose-900/15">
                        Browse Files
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between pt-6 border-t border-rose-900/10 dark:border-rose-900/20">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1 || isSubmitting}
                  className={`flex items-center gap-1 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    step === 1 
                      ? 'opacity-0 pointer-events-none' 
                      : 'text-slate-700 dark:text-rose-200/70 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> {t.join.previous}
                </button>
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-1 px-6 py-2.5 bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white rounded-xl text-xs font-bold shadow-md shadow-rose-900/30 transition-all hover:shadow-rose-900/50"
                  >
                    <span>{t.join.next}</span> <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#E11D48] text-white rounded-xl text-xs font-bold shadow-md shadow-rose-900/30 transition-all hover:shadow-rose-900/50 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        {t.join.submit} <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-[#12070D]/80 backdrop-blur-xl rounded-3xl border border-rose-900/10 dark:border-rose-900/30 shadow-2xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 dark:text-rose-100 mb-3">{t.join.successTitle}</h2>
            <p className="text-slate-600 dark:text-rose-200/70 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              {t.join.successMessage}
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
                setFormData({
                  fullName: '', studentId: '', phone: '', email: '', major: '', year: '', committee: '', skills: '', experience: '', portfolio: '', linkedin: '', github: '', motivation: '', availability: ''
                });
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white rounded-xl text-xs font-bold shadow-md shadow-rose-900/30 transition-all"
            >
              Submit Another Application
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
