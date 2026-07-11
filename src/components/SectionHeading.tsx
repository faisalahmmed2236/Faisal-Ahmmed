import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Info } from 'lucide-react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  readTime?: string;
  tooltipSummary?: string;
}

const DEFAULT_SUMMARIES: Record<string, string> = {
  "core capabilities": "Explore Faisal's foundational software principles: Clean architecture, high-stakes medical/CV algorithms, and systems engineering.",
  "technical arsenal": "A structured map of Faisal's professional engineering stack: Front-End, Back-End, AI/Deep Learning, and DevOps tools.",
  "journey & milestones": "A timeline showcasing Faisal's academic honors, system roles, and dedication to continuous technology mastery.",
  "system architecture": "Advanced systems and services, including full-stack platforms, scalable backends, and explainable deep learning diagnostics.",
  "featured deployments": "Verifiable, production-grade systems and AI tools engineered with elite performance and fully responsive layouts.",
  "career milestones": "A timeline highlighting key accomplishments, honors, and specific technical milestones throughout Faisal's journey.",
  "visitor insights": "An interactive, real-time telemetry panel visualizing user demographics, geographic mapping, and system interest.",
  "performance & seo": "Live Google Lighthouse and Core Web Vitals metric tracker demonstrating elite rendering speed and SEO optimization.",
  "kind words": "Authentic testimonials and feedback from clients and mentors detailing Faisal's engineering excellence.",
  "journey & background": "Academic honors, professional milestones, and continuous technical evolution.",
};

export function SectionHeading({ title, subtitle, readTime, tooltipSummary }: SectionHeadingProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine the summary text based on prop or title matching
  const lowerTitle = title.toLowerCase().trim();
  const summaryText = tooltipSummary || 
    DEFAULT_SUMMARIES[lowerTitle] || 
    Object.entries(DEFAULT_SUMMARIES).find(([key]) => lowerTitle.includes(key) || key.includes(lowerTitle))?.[1] ||
    `Overview of the ${title} section.`;

  return (
    <div className="mb-20 text-center relative select-none flex flex-col items-center">
      <div className="flex flex-col items-center gap-6 mb-6 w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-theme-p-500/20 blur-[80px] pointer-events-none rounded-full" />
        
        <div 
          className="relative inline-block pb-4 cursor-help"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-3 bg-[#0B0B0F]/95 border border-theme-p-500/30 text-slate-200 rounded-2xl shadow-2xl backdrop-blur-xl z-50 w-72 text-center flex flex-col gap-1.5"
                style={{ filter: "drop-shadow(0 10px 25px rgba(236,72,153,0.15))" }}
              >
                <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-theme-p-400">
                  <Info size={11} className="animate-pulse" />
                  <span>Section Details</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                  {summaryText}
                </p>
                {/* Micro pointer arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-6 border-x-transparent border-t-6 border-t-[#0B0B0F]/95" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.h2 
            initial={{ opacity: 0, y: 35, letterSpacing: '-0.05em', scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '-0.025em', scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" as any }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight flex items-center justify-center gap-2"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400 font-sans leading-tight drop-shadow-sm">
              {title}
            </span>
            <motion.span
              animate={{ opacity: isHovered ? 1 : 0.35, scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
              className="text-theme-p-400 shrink-0 self-center hidden sm:inline"
              title="Hover for summary"
            >
              <Info size={18} className="translate-y-[2px]" />
            </motion.span>
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

