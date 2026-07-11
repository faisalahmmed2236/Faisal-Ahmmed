import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

export function Contact() {
  const { portfolioData } = useLanguage();
  const { profile } = portfolioData;

  return (
    <motion.section 
      id="contact" 
      className="py-10 md:py-16 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: "easeOut" as any }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-theme-p-900/10 -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 40, letterSpacing: '-0.04em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as any }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight"
          >
            Let's build something <span className="text-gradient">extraordinary.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" as any }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Currently accepting new projects and full-time opportunities. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as any }}
          >
            <motion.a 
              href={`mailto:${profile.socials.email}`}
              onClick={() => triggerVibration(hapticPatterns.medium)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-theme-p-500 to-theme-s-500 text-white font-bold transition-all text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] cursor-pointer"
            >
              <Mail size={20} />
              Say Hello <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
