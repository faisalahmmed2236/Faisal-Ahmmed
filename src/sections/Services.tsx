import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';

export function Services() {
  const { portfolioData } = useLanguage();
  const { services } = portfolioData;

  const ui = portfolioData.ui || {};

  return (
    <motion.section 
      id="services" 
      className="py-6 md:py-10 relative bg-black/20"
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as any }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title={ui.servicesTitle || "Elite Offerings"} 
          subtitle={ui.servicesSubtitle || "Professional Systems Engineering Solutions"} 
          readTime={`3 ${ui.readTime || 'min read'}`} 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
              className="glass-panel p-8 rounded-3xl group hover:border-theme-p-500/50 transition-colors bg-[#0A0A0C] text-center md:text-left flex flex-col items-center md:items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-theme-p-500/10 border border-theme-p-500/20 flex items-center justify-center mb-6 text-theme-p-400 group-hover:scale-110 transition-transform">
                <Icon name={service.iconName} size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
