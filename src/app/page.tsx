'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import WhatIsNeuro from '@/components/home/WhatIsNeuro';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark text-slate-900 dark:text-slate-50 selection:bg-primary/30 overflow-hidden font-inter">
      <HeroSection />
      <StatsSection />
      <WhatIsNeuro />
      <FeaturesGrid />
      <CTASection />
    </main>
  );
}
