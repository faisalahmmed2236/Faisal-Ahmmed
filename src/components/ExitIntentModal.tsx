import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { portfolioData } = useLanguage();
  const { profile } = portfolioData;

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves the top of the viewport (y < 10)
      if (e.clientY < 10 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        triggerVibration(hapticPatterns.medium);
        // Save to sessionStorage so it doesn't trigger again in the same session
        sessionStorage.setItem('exitIntentTriggered', 'true');
      }
    };

    // Check if it already triggered in this session
    if (sessionStorage.getItem('exitIntentTriggered')) {
      setHasTriggered(true);
      return;
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  const closeModal = () => {
    setIsOpen(false);
    triggerVibration(hapticPatterns.light);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0A0C] border border-theme-p-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-3xl">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-theme-p-600/20 rounded-full blur-[60px]" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-theme-s-600/20 rounded-full blur-[60px]" />
            </div>

            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-theme-p-500/20 to-theme-s-500/20 border border-theme-p-500/30 flex items-center justify-center text-theme-p-400">
                <Mail size={28} />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Leaving so soon?</h3>
              <p className="text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                Let's stay connected! Drop me a message or find me on social media. I'm always open to discussing new opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a 
                  href={`mailto:${profile.socials.email}`}
                  onClick={() => { closeModal(); triggerVibration(hapticPatterns.light); }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-theme-p-500 to-theme-s-500 text-white font-bold transition-all shadow-lg shadow-theme-p-500/25 hover:shadow-theme-p-500/40"
                >
                  <Mail size={18} />
                  Email Me
                </a>
                <div className="flex justify-center gap-4">
                  <a 
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { closeModal(); triggerVibration(hapticPatterns.light); }}
                    className="flex items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-theme-p-500/50 text-slate-300 hover:text-white transition-all"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { closeModal(); triggerVibration(hapticPatterns.light); }}
                    className="flex items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-theme-p-500/50 text-slate-300 hover:text-white transition-all"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              <button 
                onClick={closeModal}
                className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                No thanks, maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
