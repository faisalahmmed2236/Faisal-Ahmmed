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
import { CustomCursor } from './components/CustomCursor';

import { ParticleBackground } from './components/ParticleBackground';
import { AnalyticsProvider } from './context/AnalyticsContext';

const About = React.lazy(() => import('./sections/About').then(m => ({ default: m.About })));
const Services = React.lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const Skills = React.lazy(() => import('./sections/Skills').then(m => ({ default: m.Skills })));
const Experience = React.lazy(() => import('./sections/Experience').then(m => ({ default: m.Experience })));
const Projects = React.lazy(() => import('./sections/Projects').then(m => ({ default: m.Projects })));
const Achievements = React.lazy(() => import('./sections/Achievements').then(m => ({ default: m.Achievements })));
const VisitorInsights = React.lazy(() => import('./sections/VisitorInsights').then(m => ({ default: m.VisitorInsights })));
const PerformanceDashboard = React.lazy(() => import('./sections/PerformanceDashboard').then(m => ({ default: m.PerformanceDashboard })));
const Testimonials = React.lazy(() => import('./sections/Testimonials').then(m => ({ default: m.Testimonials })));
const Contact = React.lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

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
        <CustomCursor />
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
