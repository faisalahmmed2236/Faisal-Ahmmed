import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { generateResume } from '../utils/pdfGenerator';
import { triggerVibration, hapticPatterns } from '../lib/haptics';
import { Download } from 'lucide-react';

export function Footer() {
  const { portfolioData } = useLanguage();
  const { profile } = portfolioData;

  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-6 border-t border-white/5 bg-black/40 text-[10px] font-mono text-slate-500 py-6 md:py-4">
      <div className="flex gap-6 mb-4 md:mb-0">
        <span>PORTFOLIO_SYSTEM_V.1.0.4</span>
        <span className="text-green-500/70 uppercase tracking-tighter">● SYSTEM_OPTIMAL</span>
      </div>
      
      <div className="flex gap-6 uppercase items-center flex-wrap justify-center">
        <button
          onClick={() => { generateResume(portfolioData); triggerVibration(hapticPatterns.medium); }}
          className="flex items-center gap-1 hover:text-white transition-colors"
          title="Download Resume"
        >
          <Download size={12} />
          <span>RESUME</span>
        </button>
        <span className="text-slate-700 hidden md:inline">|</span>
        {Object.entries(profile.socials).map(([platform, url]) => {
          if (!url) return null;
          const urlStr = url as string;
          let href = urlStr;
          if (platform === 'email') href = `mailto:${urlStr}`;
          else if (platform === 'phone') {
            const firstNum = urlStr.split(',')[0].replace(/[^0-9+]/g, '');
            href = `tel:${firstNum}`;
          }
          else if (platform === 'whatsapp') {
            const cleanNum = urlStr.replace(/[^0-9]/g, '');
            href = `https://wa.me/${cleanNum}`;
          }
          
          return (
            <a 
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {platform}
            </a>
          );
        })}
        <span className="text-slate-700 hidden md:inline">|</span>
        <span className="hidden md:inline">EST. {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
