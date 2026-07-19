import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Database, Wrench, Brain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { useTrackSection } from '../hooks/useTrackSection';

const getCategoryIcon = (category: string) => {
  if (category.toLowerCase().includes('ai') || category.toLowerCase().includes('ia') || category.toLowerCase().includes('deep')) return <Brain size={20} />;
  if (category.toLowerCase().includes('frontend')) return <Terminal size={20} />;
  if (category.toLowerCase().includes('backend') || category.toLowerCase().includes('sistemas')) return <Database size={20} />;
  return <Wrench size={20} />;
};

const barVariants = {
  hidden: { width: 0 },
  show: (custom: { level: number; idx: number }) => ({
    width: `${custom.level}%`,
    transition: { 
      duration: 1.0, 
      delay: 0.1 + custom.idx * 0.08,
      ease: "easeOut" as any
    }
  })
};

export function Skills() {
  const { portfolioData } = useLanguage();
  const skills = portfolioData.skills;
  const trackerRef = useTrackSection('skills');

  const ui = portfolioData.ui || {};

  if (!skills || skills.length === 0) return null;

  return (
    <motion.section 
      ref={trackerRef as any}
      id="skills" 
      className="py-6 md:py-10 px-6 md:px-12 max-w-7xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as any }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-theme-p-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <SectionHeading 
        title={ui.skillsTitle || "Core Expertise"} 
        subtitle={ui.skillsSubtitle || "Deep Technical Competence Matrix"} 
        readTime={`1 ${ui.readTime || 'min read'}`} 
      />
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.25 }
          }
        }}
      >
        {skills.map((skillGroup, groupIdx) => (
          <motion.div 
            key={groupIdx}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(5px)" },
              show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
            }}
            className="flex flex-col gap-6 bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-theme-p-500/50 transition-colors"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none opacity-50" />
            
            <div className="flex items-center justify-center md:justify-start gap-3 border-b border-white/10 pb-4 relative z-10 text-center md:text-left">
              <div className="text-theme-p-400 p-2 bg-theme-p-500/10 rounded-xl">
                {getCategoryIcon(skillGroup.category)}
              </div>
              <h3 className="text-lg font-bold font-mono text-white/90">
                {skillGroup.category}
              </h3>
            </div>
            
            <div className="flex flex-col gap-5 relative z-10">
              {skillGroup.items.map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-2 group/skill hover:-translate-y-0.5 transition-transform cursor-default">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-300 group-hover/skill:text-white transition-colors">{skill.name}</span>
                    <span className="font-mono text-theme-p-400 text-xs group-hover/skill:scale-110 transition-transform origin-right">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/50 border border-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-theme-p-600 to-theme-p-400 rounded-full relative"
                      variants={barVariants}
                      custom={{ level: skill.level, idx }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
