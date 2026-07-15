import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Download, Moon, Sun, Monitor, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { generateResume } from '../utils/pdfGenerator';
import { triggerVibration, hapticPatterns } from '../lib/haptics';
import { DEFAULT_SUMMARIES } from './SectionHeading';

export function Navbar() {
  const { playClick, playHover, playToggle, playOpen, playClose } = useAudio();
  const { displayMode, setDisplayMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpenState] = useState(false);

  const { language, setLanguage, portfolioData } = useLanguage();
  const ui = portfolioData.ui || {};

  const navLinks = [
    { name: ui.navAbout || 'About', href: '#about' },
    { name: ui.navSkills || 'Skills', href: '#skills' },
    { name: ui.navExperience || 'Experience', href: '#experience' },
    { name: ui.navProjects || 'Projects', href: '#projects' },
    { name: ui.navInsights || 'Insights', href: '#insights' },
    { name: ui.navPerformance || 'Performance', href: '#performance' },
    { name: ui.navServices || 'Services', href: '#services' },
  ];

  const setMobileMenuOpen = useCallback((open: boolean) => {
    if (open) {
      playOpen();
    } else {
      playClose();
    }
    setMobileMenuOpenState(open);
    triggerVibration(open ? hapticPatterns.medium : hapticPatterns.light);
  }, [playOpen, playClose]);

  const [isOnline, setIsOnline] = useState(() => typeof window !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleLanguage = useCallback(() => {
    triggerVibration(hapticPatterns.light);
    playToggle();
    const nextLang = language === 'en' ? 'es' : language === 'es' ? 'bn' : language === 'bn' ? 'ar' : 'en';
    setLanguage(nextLang);
  }, [language, playToggle, setLanguage]);

  const toggleMode = useCallback(() => {
    triggerVibration(hapticPatterns.light);
    playToggle();
    const nextMode = displayMode === 'dark' ? 'light' : displayMode === 'light' ? 'system' : 'dark';
    setDisplayMode(nextMode);
  }, [displayMode, playToggle, setDisplayMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    triggerVibration(hapticPatterns.medium);
    e.preventDefault();
    playClick();
    setMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [playClick, setMobileMenuOpen]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    triggerVibration(hapticPatterns.light);
    e.preventDefault();
    playClick();
    const id = href.replace('#', '');
    
    // Close mobile menu first if open
    setMobileMenuOpen(false);
    
    // Find the target element
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [playClick, setMobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" onClick={scrollToTop} className="flex items-center gap-2 group">
          <div className="font-mono text-2xl font-bold tracking-tighter flex items-center relative">
            <span className="text-theme-s-500 mr-1 opacity-70 group-hover:opacity-100 transition-opacity">&lt;</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-theme-p-400 drop-shadow-[0_0_10px_rgba(var(--theme-p-500),0.3)]">
              {portfolioData.profile.name.split(' ')[0]}
            </span>
            <span className="text-theme-p-500 ml-1 opacity-70 group-hover:opacity-100 transition-opacity">/&gt;</span>
            <div className={`ml-2 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isOnline ? 'bg-green-500' : 'bg-red-500'} ${isOnline ? 'animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} title={isOnline ? 'Online' : 'Offline'}></div>
            <motion.div 
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-theme-s-500 to-theme-p-500 rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileHover={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const summaryKey = Object.keys(DEFAULT_SUMMARIES).find(k => 
              link.name.toLowerCase().includes(k) || k.includes(link.name.toLowerCase())
            );
            const summaryText = summaryKey ? DEFAULT_SUMMARIES[summaryKey] : `Navigate to the ${link.name} section.`;
            
            return (
              <div key={link.name} className="relative group flex items-center justify-center">
                <a 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-[#0A0A0C]/98 border border-white/10 text-slate-300 text-[10px] font-medium px-4 py-3 rounded-xl shadow-2xl backdrop-blur-2xl w-48 text-center leading-relaxed">
                    <span className="block text-theme-p-400 font-mono font-bold mb-1 uppercase tracking-widest">{link.name}</span>
                    <span className="text-[11px] leading-relaxed block">{summaryText}</span>
                    <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 border-x-[6px] border-x-transparent border-b-[6px] border-b-white/10">
                       <div className="absolute top-[1px] -left-[5px] border-x-[5px] border-x-transparent border-b-[5px] border-b-[#0A0A0C]/98" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleLanguage}
            className="flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Switch Language"
          >
            <Globe size={18} />
            <span className="ml-1 text-xs font-bold uppercase">{language}</span>
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleMode}
            className="flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title={`Switch Display Mode (Current: ${displayMode})`}
          >
            {displayMode === 'light' ? <Sun size={18} /> : displayMode === 'system' ? <Monitor size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => { generateResume(portfolioData); triggerVibration(hapticPatterns.medium); }}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={ui.downloadResume || "Download Resume"}
          >
            <Download size={16} />
            <span>{ui.downloadResume || "Resume"}</span>
          </motion.button>
          <motion.a 
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-theme-p-500/10 border border-theme-p-500/20 rounded-full hover:bg-theme-p-500/20 transition-colors cursor-pointer"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-theme-p-400 animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-theme-p-300">{ui.letsTalk || "Let's Talk"}</span>
          </motion.a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleMode}
            className="flex items-center justify-center p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title={`Switch Display Mode (Current: ${displayMode})`}
          >
            {displayMode === 'light' ? <Sun size={18} /> : displayMode === 'system' ? <Monitor size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleLanguage}
            className="flex items-center justify-center p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Globe size={18} />
            <span className="ml-1 text-[10px] font-bold uppercase">{language}</span>
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="text-slate-300 hover:text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-x-0 border-t-0 border-b border-glass-border overflow-y-auto max-h-[75vh] bg-black/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col px-6 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 cursor-pointer text-center"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  // Trigger opening the ThemeSettings sliding sidebar panel
                  window.dispatchEvent(new CustomEvent('open-theme-settings'));
                }}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-theme-p-400 hover:text-white transition-colors py-2 border-b border-white/5 text-center cursor-pointer"
              >
                <Settings size={16} className="text-theme-p-400 animate-pulse" />
                {ui.themeCenter || "Theme & Settings Center"}
              </button>
              <button
                onClick={() => {
                  generateResume(portfolioData);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-center cursor-pointer"
              >
                <Download size={16} />
                {ui.downloadResume || "Download Resume"}
              </button>
              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="inline-flex justify-center items-center gap-2 mt-4 px-6 py-3.5 rounded-full bg-gradient-to-r from-theme-p-500/20 to-theme-s-500/20 border border-theme-p-500/30 text-theme-p-300 font-bold text-xs uppercase tracking-widest hover:border-theme-p-500/50 transition-colors cursor-pointer"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-theme-p-400 animate-pulse"></div>
                {ui.letsTalk || "Let's Talk"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
