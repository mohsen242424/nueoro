"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ChevronRight, ChevronLeft, Upload, File, CheckCircle2 } from 'lucide-react';
import committeesData from '@/data/committees.json';

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
    { num: 1, title: 'Personal Info' },
    { num: 2, title: 'Academic Info' },
    { num: 3, title: 'Skills & Exp' },
    { num: 4, title: 'Submit' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const InputField = ({ label, name, type = "text", placeholder, required = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-manrope">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={(formData as any)[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-white/50 dark:bg-[#11162a] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white"
      />
    </div>
  );

  const TextAreaField = ({ label, name, placeholder, required = false }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-manrope">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={(formData as any)[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full px-4 py-3 bg-white/50 dark:bg-[#11162a] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white resize-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-cyan-600/10 blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl mb-6 relative">
            <Sparkles className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
            Join NEURO
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-inter">
            Ready to make an impact? Apply to join our exceptional team of students pushing the boundaries of medical sciences.
          </p>
        </motion.div>

        {!isSuccess ? (
          <div className="bg-white/70 dark:bg-[#0a0f25]/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-slate-100 dark:bg-white/5 p-6 border-b border-slate-200 dark:border-white/10">
              <div className="flex justify-between items-center relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-white/10 -z-10 rounded-full" />
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 -z-10 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((step - 1) / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
                
                {steps.map((s) => (
                  <div key={s.num} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                      step >= s.num 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-[#1a1f35] border-2 border-slate-200 dark:border-slate-700 text-slate-400'
                    }`}>
                      {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className={`text-xs mt-2 font-medium hidden sm:block ${
                      step >= s.num ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
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
                    <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-6">Personal Information</h2>
                    <InputField label="Full Name" name="fullName" placeholder="John Doe" required />
                    <InputField label="Student ID" name="studentId" placeholder="e.g. 2100000" required />
                    <InputField label="Phone Number" name="phone" type="tel" placeholder="+962 7..." required />
                    <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" required />
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
                    <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-6">Academic Information</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-manrope">
                        Major <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="major" 
                        value={formData.major} 
                        onChange={handleInputChange} 
                        required
                        className="w-full px-4 py-3 bg-white/50 dark:bg-[#11162a] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white"
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
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-manrope">
                        Academic Year <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="year" 
                        value={formData.year} 
                        onChange={handleInputChange} 
                        required
                        className="w-full px-4 py-3 bg-white/50 dark:bg-[#11162a] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white"
                      >
                        <option value="">Select year</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                        <option value="5">Fifth Year</option>
                        <option value="6">Sixth Year</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-manrope">
                        Committee of Interest <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="committee" 
                        value={formData.committee} 
                        onChange={handleInputChange} 
                        required
                        className="w-full px-4 py-3 bg-white/50 dark:bg-[#11162a] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white"
                      >
                        <option value="">Select committee</option>
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
                    <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-6">Skills & Experience</h2>
                    
                    <TextAreaField label="Key Skills" name="skills" placeholder="List your relevant skills..." />
                    <TextAreaField label="Previous Experience" name="experience" placeholder="Any relevant past experience..." />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="LinkedIn URL" name="linkedin" placeholder="https://linkedin.com/in/..." />
                      <InputField label="Portfolio/GitHub URL" name="portfolio" placeholder="https://..." />
                    </div>

                    <TextAreaField label="Why do you want to join NEURO?" name="motivation" placeholder="Tell us your motivation..." required />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-manrope">
                        Availability <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="availability" 
                        value={formData.availability} 
                        onChange={handleInputChange} 
                        required
                        className="w-full px-4 py-3 bg-white/50 dark:bg-[#11162a] border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white"
                      >
                        <option value="">Select availability</option>
                        <option value="full">Full-time (10+ hrs/week)</option>
                        <option value="part">Part-time (5-10 hrs/week)</option>
                        <option value="weekends">Weekends only</option>
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
                    <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-2">Review & Submit</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Please review your information before submitting.</p>
                    
                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl space-y-3 text-sm">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500 font-medium">Name:</span>
                        <span className="col-span-2 text-slate-900 dark:text-white font-medium">{formData.fullName || '-'}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500 font-medium">Student ID:</span>
                        <span className="col-span-2 text-slate-900 dark:text-white font-medium">{formData.studentId || '-'}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-slate-500 font-medium">Committee:</span>
                        <span className="col-span-2 text-slate-900 dark:text-white font-medium">{formData.committee ? committeesData.find(c => c.id === formData.committee)?.name : '-'}</span>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer group bg-white/50 dark:bg-[#11162a]">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Upload your CV</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">PDF, DOCX up to 5MB</p>
                      <button type="button" className="px-4 py-2 bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white rounded-lg text-sm font-medium">
                        Browse Files
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-between pt-6 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1 || isSubmitting}
                  className={`flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    step === 1 
                      ? 'opacity-0 pointer-events-none' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/30"
                  >
                    Next Step <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-8 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70"
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
                      <span className="flex items-center">
                        Submit Application <CheckCircle2 className="w-4 h-4 ml-2" />
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
            className="bg-white/70 dark:bg-[#0a0f25]/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-4">Application Submitted!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Thank you for applying to NEURO, {formData.fullName.split(' ')[0] || 'Student'}! We have received your application and will be in touch shortly via email.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
                setFormData({
                  fullName: '', studentId: '', phone: '', email: '', major: '', year: '', committee: '', skills: '', experience: '', portfolio: '', linkedin: '', github: '', motivation: '', availability: ''
                });
              }}
              className="px-6 py-3 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded-xl text-sm font-medium transition-all"
            >
              Submit Another Application
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
