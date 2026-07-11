import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Instagram, Linkedin, X, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

export function FloatingShareWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { portfolioData } = useLanguage();
  
  // Custom URL requested by the user
  const currentUrl = encodeURIComponent('https://faisalahmmed2236.vercel.app');
  const title = encodeURIComponent(`Check out ${portfolioData.profile.name}'s Portfolio`);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      color: 'hover:text-blue-500 hover:bg-blue-500/10'
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${title}%20${currentUrl}`,
      color: 'hover:text-green-500 hover:bg-green-500/10'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
      color: 'hover:text-blue-400 hover:bg-blue-400/10'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      // Instagram doesn't have a direct share URL for links, so we'll just open Instagram
      url: `https://instagram.com`,
      color: 'hover:text-pink-500 hover:bg-pink-500/10',
      copyFirst: true
    }
  ];

  const handleShareClick = (e: React.MouseEvent, link: any) => {
    triggerVibration(hapticPatterns.light);
    if (link.copyFirst) {
      // Copy to clipboard before opening Instagram
      navigator.clipboard.writeText('https://faisalahmmed2236.vercel.app');
      // Optional: you could show a toast here
    }
  };

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
                onClick={(e) => handleShareClick(e, link)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.05 }}
                className={`p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 backdrop-blur-md shadow-lg transition-colors cursor-pointer ${link.color}`}
                title={link.name === 'Instagram' ? 'Copy link and open Instagram' : `Share on ${link.name}`}
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
          <ShareIcon />
        )}
      </motion.button>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:scale-110 text-theme-p-400">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}
