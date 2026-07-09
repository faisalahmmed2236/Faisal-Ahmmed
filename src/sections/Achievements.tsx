import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';

export function Achievements() {
  const { portfolioData } = useLanguage();
  const { achievements } = portfolioData;

  return (
    <motion.section 
      id="achievements" 
      className="py-6 md:py-10 relative bg-black/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" as any }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Career Milestones" subtitle="Key accomplishments throughout my career journey." readTime="1 min" />
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={achievement.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 15 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" as any }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0A0A0C] text-theme-p-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Award size={18} />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/5 p-6 rounded-3xl group-hover:border-theme-p-500/50 transition-colors text-center md:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 className="font-bold text-white text-lg">{achievement.title}</h4>
                  <time className="text-theme-p-400 text-sm font-mono mt-1 sm:mt-0">{achievement.year}</time>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
