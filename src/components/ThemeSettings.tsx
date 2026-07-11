import React, { useState, useEffect } from 'react';
import { Settings, X, Check, Moon, Sun, Monitor, Globe, Download, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAudio } from '../context/AudioContext';
import { generateResume } from '../utils/pdfGenerator';
import { triggerVibration, hapticPatterns } from '../lib/haptics';
import { motion, AnimatePresence } from 'motion/react';

const themes = [
  { id: 'default', name: 'Nebula (Default)', color1: 'bg-indigo-500', color2: 'bg-purple-500', glow: 'shadow-[0_0_15px_rgba(99,102,241,0.3)]' },
  { id: 'emerald', name: 'Aurora', color1: 'bg-emerald-500', color2: 'bg-teal-500', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
  { id: 'rose', name: 'Supernova', color1: 'bg-rose-500', color2: 'bg-orange-500', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]' },
  { id: 'blue', name: 'Deep Space', color1: 'bg-blue-500', color2: 'bg-cyan-500', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
 ] as const;

export function ThemeSettings() {
  const { theme, setTheme, displayMode, setDisplayMode } = useTheme();
  const { language, setLanguage, portfolioData } = useLanguage();
  const { soundEnabled, setSoundEnabled, playClick, playHover, playToggle, playOpen, playClose } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom open events from other parts of the app (like mobile nav)
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      playOpen();
    };
    window.addEventListener('open-theme-settings', handleOpen);
    return () => window.removeEventListener('open-theme-settings', handleOpen);
  }, [playOpen]);

  const selectMode = (mode: 'dark' | 'light' | 'system') => {
    playToggle();
    setDisplayMode(mode);
  };

  const selectLanguage = (lang: 'en' | 'es' | 'bn' | 'ar') => {
    playToggle();
    setLanguage(lang);
  };

  const handleOpenPanel = () => {
    triggerVibration(hapticPatterns.medium);
    setIsOpen(true);
    playOpen();
  };

  const handleClosePanel = () => {
    triggerVibration(hapticPatterns.light);
    setIsOpen(false);
    playClose();
  };

  const selectTheme = (themeId: typeof themes[number]['id']) => {
    setTheme(themeId);
    playClick();
  };

  return (
    <>
      {/* Floating Gear Button */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleOpenPanel}
        onMouseEnter={playHover}
        className="fixed bottom-4 right-4 z-40 p-3 rounded-full bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:border-theme-p-500/50 transition-colors backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] group cursor-pointer"
        aria-label="Theme Settings"
      >
        <Settings size={20} className="transition-transform duration-700 group-hover:rotate-180 text-theme-p-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePanel}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            {/* Sliding Sidebar Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-sm h-full bg-[#030305]/95 backdrop-blur-2xl border-l border-white/10 p-6 sm:p-8 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-theme-p-400 animate-pulse" />
                    <h3 className="text-lg font-bold text-white tracking-wide">Control Center</h3>
                  </div>
                  <button 
                    onClick={handleClosePanel}
                    onMouseEnter={playHover}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* Settings Body */}
                <div className="space-y-6">
                  {/* Accent Themes */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Accent Nebula Color</p>
                    <div className="grid grid-cols-2 gap-3">
                      {themes.map(t => (
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          key={t.id}
                          onClick={() => { selectTheme(t.id as any); triggerVibration(hapticPatterns.medium); }}
                          onMouseEnter={playHover}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            theme === t.id 
                              ? 'bg-white/10 border-theme-p-500/50 ' + t.glow 
                              : 'bg-white/5 border-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className="flex w-full h-6 rounded-md overflow-hidden relative">
                            <div className={`flex-1 ${t.color1}`} />
                            <div className={`flex-1 ${t.color2}`} />
                            {theme === t.id && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <Check size={12} className="text-white drop-shadow" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-slate-300">{t.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* UI Display Mode */}
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Display Mode</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => { selectMode('dark'); triggerVibration(hapticPatterns.light); }}
                        onMouseEnter={playHover}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          displayMode === 'dark'
                            ? 'bg-white/10 border-theme-p-500/50 text-white' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <Moon size={14} />
                        Dark
                      </button>
                      <button
                        onClick={() => { selectMode('light'); triggerVibration(hapticPatterns.light); }}
                        onMouseEnter={playHover}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          displayMode === 'light'
                            ? 'bg-white/10 border-theme-p-500/50 text-white' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <Sun size={14} />
                        Light
                      </button>
                      <button
                        onClick={() => { selectMode('system'); triggerVibration(hapticPatterns.light); }}
                        onMouseEnter={playHover}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          displayMode === 'system'
                            ? 'bg-white/10 border-theme-p-500/50 text-white' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <Monitor size={14} />
                        System
                      </button>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">System Language</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { if (language !== 'en') selectLanguage('en'); triggerVibration(hapticPatterns.light); }}
                        onMouseEnter={playHover}
                        className={`flex-1 py-2 px-1 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                          language === 'en'
                            ? 'bg-white/10 border-theme-p-500/50 text-white'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => { if (language !== 'es') selectLanguage('es'); triggerVibration(hapticPatterns.light); }}
                        onMouseEnter={playHover}
                        className={`flex-1 py-2 px-1 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                          language === 'es'
                            ? 'bg-white/10 border-theme-p-500/50 text-white'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        Español
                      </button>
                      <button
                        onClick={() => { if (language !== 'bn') selectLanguage('bn'); triggerVibration(hapticPatterns.light); }}
                        onMouseEnter={playHover}
                        className={`flex-1 py-2 px-1 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                          language === 'bn'
                            ? 'bg-white/10 border-theme-p-500/50 text-white'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        বাংলা
                      </button>
                      <button
                        onClick={() => { if (language !== 'ar') selectLanguage('ar'); triggerVibration(hapticPatterns.light); }}
                        onMouseEnter={playHover}
                        className={`flex-1 py-2 px-1 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                          language === 'ar'
                            ? 'bg-white/10 border-theme-p-500/50 text-white'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        العربية
                      </button>
                    </div>
                  </div>

                  {/* UI Sound Effects Toggle */}
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">UI Audio Feedback</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setSoundEnabled(true);
                          triggerVibration(hapticPatterns.light);
                          // Soft timeout delay to let state write, then play beautiful sound feedback confirmation
                          setTimeout(() => playToggle(), 40);
                        }}
                        onMouseEnter={playHover}
                        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          soundEnabled 
                            ? 'bg-white/10 border-theme-p-500/50 text-white' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <Volume2 size={14} />
                        Enabled
                      </button>
                      <button
                        onClick={() => { setSoundEnabled(false); triggerVibration(hapticPatterns.light); }}
                        onMouseEnter={playHover}
                        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          !soundEnabled 
                            ? 'bg-white/10 border-theme-p-500/50 text-white' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <VolumeX size={14} />
                        Muted
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="pt-6 border-t border-white/10">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playClick();
                    generateResume(portfolioData);
                  }}
                  onMouseEnter={playHover}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-theme-p-500 to-theme-s-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Download size={14} />
                  Download Complete CV
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
