/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { ThemeSettings } from './components/ThemeSettings';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { FloatingShareWidget } from './components/FloatingShareWidget';
import { ExitIntentModal } from './components/ExitIntentModal';
import { SectionDivider } from './components/SectionDivider';
import { useMetaTags } from './hooks/useMetaTags';
import { ScrollProgress } from './components/ScrollProgress';

import { ParticleBackground } from './components/ParticleBackground';
import { AnalyticsProvider } from './context/AnalyticsContext';

import { About } from './sections/About';
import { Services } from './sections/Services';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Achievements } from './sections/Achievements';
import { VisitorInsights } from './sections/VisitorInsights';
import { PerformanceDashboard } from './sections/PerformanceDashboard';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

// Loading fallback for lazy components
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-theme-p-500/20 border-t-theme-p-500 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  useMetaTags();
  
  return (
    <AnalyticsProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-theme-p-500/30">
        <ParticleBackground />
        <ScrollProgress />
        <Navbar />
        
        <main>
          <Hero />
          <Suspense fallback={<SectionLoader />}>
            <SectionDivider />
            <About />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Services />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Achievements />
            <SectionDivider />
            <VisitorInsights />
            <SectionDivider />
            <PerformanceDashboard />
            <SectionDivider />
            <Testimonials />
            <SectionDivider />
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
        <ThemeSettings />
        <AIAssistantWidget />
        <FloatingShareWidget />
        <ExitIntentModal />
      </div>
    </AnalyticsProvider>
  );
}
