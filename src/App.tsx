/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
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
import { ThemeSettings } from './components/ThemeSettings';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { FloatingShareWidget } from './components/FloatingShareWidget';
import { SectionDivider } from './components/SectionDivider';
import { useMetaTags } from './hooks/useMetaTags';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  useMetaTags();
  
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-theme-p-500/30">
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
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
      </main>

      <Footer />
      <ThemeSettings />
      <AIAssistantWidget />
      <FloatingShareWidget />
    </div>
  );
}
