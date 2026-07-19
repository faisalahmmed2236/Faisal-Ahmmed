import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';

export function Testimonials() {
  const { portfolioData } = useLanguage();
  const { testimonials } = portfolioData;

  const ui = portfolioData.ui || {};

  return (
    <motion.section 
      id="testimonials" 
      className="py-6 md:py-10 relative z-10 overflow-visible"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
    >
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-theme-p-500/20 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title={ui.testimonialsTitle || "Client Endorsements"} 
          subtitle={ui.testimonialsSubtitle || "What people are saying about my work."} 
          readTime={`2 ${ui.readTime || 'min read'}`} 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as any }}
              className="bg-gradient-to-br from-theme-p-500/10 to-transparent border border-white/5 p-8 rounded-3xl relative flex flex-col h-full text-center md:text-left"
            >
              <Quote className="absolute top-8 right-8 text-white/5" size={64} />
              
              <p className="text-slate-300 text-sm leading-relaxed relative z-10 italic mb-8 flex-1">
                "{testimonial.feedback}"
              </p>
              
              <div className="flex flex-col md:flex-row items-center md:items-center gap-4 relative z-10 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-white font-bold text-xs">{testimonial.name}</h4>
                  <p className="text-slate-500 text-[10px]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
