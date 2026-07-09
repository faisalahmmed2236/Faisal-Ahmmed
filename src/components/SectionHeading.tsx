import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  readTime?: string;
}

export function SectionHeading({ title, subtitle, readTime }: SectionHeadingProps) {
  return (
    <div className="mb-20 text-center relative select-none flex flex-col items-center">
      <div className="flex flex-col items-center gap-6 mb-6 w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-theme-p-500/20 blur-[80px] pointer-events-none rounded-full" />
        <div className="relative inline-block pb-4">
          <motion.h2 
            initial={{ opacity: 0, y: 35, letterSpacing: '-0.05em', scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '-0.025em', scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" as any }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400 font-sans leading-tight drop-shadow-sm">{title}</span>
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" as any }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-32 bg-gradient-to-r from-transparent via-theme-p-500 to-transparent rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)] origin-center"
          />
        </div>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" as any }}
            className="text-slate-400 max-w-2xl text-lg sm:text-xl font-medium tracking-wide uppercase text-center mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      
      {readTime && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#0A0A0C]/80 border border-white/10 text-sm font-medium text-slate-300 backdrop-blur-md shadow-lg mt-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-theme-p-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Clock size={14} className="text-theme-p-400" />
          <span>{readTime} read</span>
        </motion.div>
      )}
    </div>
  );
}
