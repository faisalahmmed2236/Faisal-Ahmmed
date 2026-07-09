import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Twitter, Linkedin, Github, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

export function FloatingShareWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { portfolioData } = useLanguage();
  
  const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const title = encodeURIComponent(`Check out ${portfolioData.profile.name}'s Portfolio`);

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
      color: 'hover:text-blue-500 hover:bg-blue-500/10'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      url: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`,
      color: 'hover:text-sky-500 hover:bg-sky-500/10'
    },
    {
      name: 'GitHub',
      icon: <Github size={20} />,
      url: portfolioData.profile.socials.github,
      color: 'hover:text-white hover:bg-white/10'
    }
  ];

  return (
    <div className="fixed bottom-4 right-[112px] z-40 flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 mb-4"
          >
            {shareLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                onClick={() => triggerVibration(hapticPatterns.light)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.05 }}
                className={`p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 backdrop-blur-md shadow-lg transition-colors cursor-pointer ${link.color}`}
                title={link.name === 'GitHub' ? `Visit ${link.name}` : `Share on ${link.name}`}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => { setIsOpen(!isOpen); triggerVibration(hapticPatterns.medium); }}
        className="p-3 rounded-full bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:border-theme-p-500/50 transition-all backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] group cursor-pointer"
        aria-label="Share"
      >
        {isOpen ? (
          <X size={20} className="transition-transform duration-500 group-hover:rotate-90 text-theme-p-400" />
        ) : (
          <Share2 size={20} className="transition-transform duration-500 group-hover:scale-110 text-theme-p-400" />
        )}
      </motion.button>
    </div>
  );
}
