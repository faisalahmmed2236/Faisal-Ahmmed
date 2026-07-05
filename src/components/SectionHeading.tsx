import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16 text-center lg:text-left relative select-none">
      <div className="relative inline-block overflow-hidden pb-3">
        <motion.h2 
          initial={{ opacity: 0, y: 35, letterSpacing: '-0.05em' }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: '-0.025em' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          <span className="text-gradient font-sans leading-tight">{title}</span>
        </motion.h2>
        
        {/* Sleek cyber tech underline sweep */}
        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 h-[3px] w-24 bg-gradient-to-r from-theme-p-500 to-theme-s-500 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.5)]"
        />
      </div>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-slate-400 max-w-2xl text-base sm:text-lg mt-4 font-normal"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
