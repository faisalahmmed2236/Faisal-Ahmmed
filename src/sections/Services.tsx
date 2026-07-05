import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';

export function Services() {
  const { portfolioData } = useLanguage();
  const { services } = portfolioData;

  return (
    <section id="services" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="System Architecture" subtitle="Specialized services designed to elevate your digital presence." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 rounded-3xl group hover:border-theme-p-500/50 transition-colors bg-[#0A0A0C]"
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
    </section>
  );
}
