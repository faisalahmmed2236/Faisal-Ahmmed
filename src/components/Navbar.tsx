import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Download, Moon, Sun, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAudio } from '../context/AudioContext';
import { generateResume } from '../utils/pdfGenerator';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Insights', href: '#insights' },
  { name: 'Performance', href: '#performance' },
  { name: 'Services', href: '#services' },
];

export function Navbar() {
  const { playClick, playHover, playToggle, playOpen, playClose } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpenState] = useState(false);

  const setMobileMenuOpen = (open: boolean) => {
    if (open) {
      playOpen();
    } else {
      playClose();
    }
    setMobileMenuOpenState(open);
  };
  const [isLightMode, setIsLightMode] = useState(() => {
    return document.documentElement.getAttribute('data-mode') === 'light';
  });
  const [isOnline, setIsOnline] = useState(() => typeof window !== 'undefined' ? navigator.onLine : true);
  const { language, setLanguage, portfolioData } = useLanguage();

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

  const toggleLanguage = () => {
    playToggle();
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleMode = () => {
    playToggle();
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    if (newMode) {
      document.documentElement.setAttribute('data-mode', 'light');
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClick();
    setMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
  };

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
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
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
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => generateResume(portfolioData)}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Download Resume"
          >
            <Download size={16} />
            <span>Resume</span>
          </motion.button>
          <motion.a 
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-theme-p-500/10 border border-theme-p-500/20 rounded-full hover:bg-theme-p-500/20 transition-colors cursor-pointer"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-theme-p-400 animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-theme-p-300">Let's Talk</span>
          </motion.a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleMode}
            className="flex items-center justify-center p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
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
                Theme & Settings Center
              </button>
              <button
                onClick={() => {
                  generateResume(portfolioData);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5 text-center cursor-pointer"
              >
                <Download size={16} />
                Download Resume
              </button>
              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="inline-flex justify-center items-center gap-2 mt-4 px-6 py-3.5 rounded-full bg-gradient-to-r from-theme-p-500/20 to-theme-s-500/20 border border-theme-p-500/30 text-theme-p-300 font-bold text-xs uppercase tracking-widest hover:border-theme-p-500/50 transition-colors cursor-pointer"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-theme-p-400 animate-pulse"></div>
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
