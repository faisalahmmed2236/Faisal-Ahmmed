import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { triggerVibration, hapticPatterns } from '../lib/haptics';
import { SectionHeading } from '../components/SectionHeading';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';

export function Experience() {
  const { portfolioData } = useLanguage();
  const { experiences, education } = portfolioData;
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  const hasExperience = experiences && experiences.length > 0;
  const hasEducation = education && education.length > 0;

  if (!hasExperience && !hasEducation) return null;

  return (
    <motion.section 
      id="experience" 
      className="py-6 md:py-10 px-6 md:px-12 max-w-7xl mx-auto relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" as any }}
    >
      <div className="absolute top-1/2 right-0 w-[40%] h-[40%] bg-theme-p-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <SectionHeading title="Journey & Milestones" subtitle="Timeline" readTime="2 min" />
      
      <div className="flex justify-center gap-4 mt-8 relative z-20">
        {hasExperience && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setActiveTab('experience'); triggerVibration(hapticPatterns.medium); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors cursor-pointer ${
              activeTab === 'experience' 
                ? 'bg-theme-p-600 text-white shadow-[0_0_20px_rgba(var(--theme-p-500),0.3)]' 
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Briefcase size={18} />
            Experience
          </motion.button>
        )}
        {hasEducation && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setActiveTab('education'); triggerVibration(hapticPatterns.medium); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors cursor-pointer ${
              activeTab === 'education' 
                ? 'bg-theme-p-600 text-white shadow-[0_0_20px_rgba(var(--theme-p-500),0.3)]' 
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <GraduationCap size={18} />
            Education
          </motion.button>
        )}
      </div>

      <div className="mt-16 relative z-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        <AnimatePresence mode="wait">
          {activeTab === 'experience' && hasExperience && (
            <motion.div
              key="experience-tab"
              initial="hidden"
              whileInView="show"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                },
                exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-12"
            >
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={exp.id}
                  variants={{
                    hidden: { opacity: 0, x: idx % 2 === 0 ? -40 : 40, y: 15 },
                    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
                  }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black text-theme-p-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(var(--theme-p-500),0.3)] z-10">
                    <Briefcase size={18} />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl group-hover:border-theme-p-500/50 transition-colors relative overflow-hidden text-center md:text-left">
                     <div className="absolute inset-0 bg-gradient-to-br from-theme-p-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     
                     <div className="flex flex-col gap-1 mb-4 relative z-10">
                        <h3 className="text-xl font-bold font-mono text-white/90">{exp.role}</h3>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-mono mt-2">
                          <span className="text-theme-p-400 font-bold">{exp.company}</span>
                          <span className="text-slate-500 hidden sm:block">•</span>
                          <span className="flex items-center gap-1 text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                            <Calendar size={12} />
                            {exp.duration}
                          </span>
                        </div>
                     </div>
                     
                     <ul className="space-y-3 mb-6 relative z-10">
                       {exp.description.map((desc, i) => (
                         <li key={i} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                           <span className="text-theme-s-500 mt-1">▹</span>
                           <span>{desc}</span>
                         </li>
                       ))}
                     </ul>
                     
                     {exp.techStack && exp.techStack.length > 0 && (
                       <div className="flex flex-wrap gap-2 relative z-10 pt-4 border-t border-white/10">
                         {exp.techStack.map(tech => (
                           <span key={tech} className="text-xs font-mono text-theme-p-400 bg-theme-p-500/10 px-2 py-1 rounded">
                             {tech}
                           </span>
                         ))}
                       </div>
                     )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'education' && hasEducation && (
            <motion.div
              key="education-tab"
              initial="hidden"
              whileInView="show"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                },
                exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-12"
            >
              {education.map((edu, idx) => (
                <motion.div 
                  key={edu.id}
                  variants={{
                    hidden: { opacity: 0, x: idx % 2 === 0 ? -40 : 40, y: 15 },
                    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
                  }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black text-theme-p-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(var(--theme-p-500),0.3)] z-10">
                    <GraduationCap size={18} />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl group-hover:border-theme-p-500/50 transition-colors relative overflow-hidden text-center md:text-left">
                     <div className="absolute inset-0 bg-gradient-to-br from-theme-p-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     
                     <div className="flex flex-col gap-1 mb-4 relative z-10">
                        <h3 className="text-xl font-bold font-mono text-white/90">{edu.degree}</h3>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-mono mt-2">
                          <span className="text-theme-p-400 font-bold">{edu.institution}</span>
                          <span className="text-slate-500 hidden sm:block">•</span>
                          <span className="flex items-center gap-1 text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                            <Calendar size={12} />
                            {edu.duration}
                          </span>
                        </div>
                     </div>
                     
                     <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                       {edu.description}
                     </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
