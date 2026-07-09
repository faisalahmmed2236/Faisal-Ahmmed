import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Search, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { getReadingTime } from '../utils/readingTime';
import { ProjectImpact } from '../components/ProjectImpact';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

export function Projects() {
  const { portfolioData } = useLanguage();
  const { projects } = portfolioData;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.techStack.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTech = selectedTech ? project.techStack.includes(selectedTech) : true;
      return matchesSearch && matchesTech;
    });
  }, [projects, searchQuery, selectedTech]);

  return (
    <motion.section 
      id="projects" 
      className="py-6 md:py-10 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" as any }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Featured Deployments" subtitle="A showcase of recent projects highlighting my expertise." readTime="4 min" />
        
        <div className="mb-16 flex flex-col md:flex-row gap-6 items-center justify-between bg-[#0A0A0C] border border-white/5 p-6 rounded-3xl shadow-xl relative z-10 text-center md:text-left">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-theme-p-500/50 transition-colors"
            />
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full md:w-auto">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { setSelectedTech(null); triggerVibration(hapticPatterns.light); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedTech === null 
                  ? 'bg-theme-p-500/20 text-theme-p-300 border border-theme-p-500/30' 
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
              }`}
            >
              All
            </motion.button>
            {allTechs.map(tech => (
              <motion.button
                whileTap={{ scale: 0.9 }}
                key={tech}
                onClick={() => { setSelectedTech(tech); triggerVibration(hapticPatterns.light); }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedTech === tech 
                    ? 'bg-theme-p-500/20 text-theme-p-300 border border-theme-p-500/30' 
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
                }`}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          className="flex flex-col gap-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-center py-20 text-slate-500"
              >
                No projects match your search criteria.
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 45, scale: 0.98 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: "easeOut" as any } },
                    exit: { opacity: 0, scale: 0.95 }
                  }}
                  exit="exit"
                  className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 items-center`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.02, rotateY: index % 2 === 0 ? 1 : -1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full lg:w-1/2 relative group overflow-hidden rounded-3xl glow-effect border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent opacity-80 z-10" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                  
                  <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                    {project.featured && (
                      <span className="text-theme-p-400 font-mono text-xs mb-2 block tracking-wider uppercase">Featured Project</span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">{project.title}</h3>
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 text-slate-400 text-xs font-mono uppercase tracking-wider">
                      <Clock size={12} /> {getReadingTime(project.description)}
                    </div>
                    
                    <div className={`bg-[#0A0A0C]/80 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-3xl mb-6 relative z-20 hover:border-theme-p-500/50 transition-colors shadow-2xl ${index % 2 === 0 ? 'lg:-ml-12 lg:mr-0' : 'lg:-mr-12 lg:ml-0'}`}>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      {project.metrics && <ProjectImpact metrics={project.metrics} />}
                    </div>
                    
                    <ul className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                      {project.techStack.map(tech => (
                        <li key={tech} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-theme-p-400 uppercase">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-center lg:justify-start gap-4">
                      {project.githubUrl && (
                        <motion.a 
                          href={project.githubUrl}
                          onClick={() => triggerVibration(hapticPatterns.light)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          whileTap={{ scale: 0.9 }}
                          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          aria-label="GitHub Repository"
                        >
                          <Github size={24} />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a 
                          href={project.liveUrl}
                          onClick={() => triggerVibration(hapticPatterns.light)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          whileTap={{ scale: 0.9 }}
                          className="text-slate-400 hover:text-theme-p-400 transition-colors cursor-pointer"
                          aria-label="Live Site"
                        >
                          <ExternalLink size={24} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
