import React from 'react';
import { motion } from 'motion/react';
import { Clock, Github, Linkedin, Twitter, Mail, Phone, MessageCircle, Facebook, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { getReadingTime } from '../utils/readingTime';

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github': return <Github size={14} />;
    case 'linkedin': return <Linkedin size={14} />;
    case 'twitter': return <Twitter size={14} />;
    case 'email': return <Mail size={14} />;
    case 'phone': return <Phone size={14} />;
    case 'whatsapp': return <MessageCircle size={14} />;
    case 'facebook': return <Facebook size={14} />;
    default: return <LinkIcon size={14} />;
  }
};

export function About() {
  const { portfolioData } = useLanguage();
  const { profile } = portfolioData;

  return (
    <motion.section 
      id="about" 
      className="py-6 md:py-10 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" as any }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Core Capabilities" subtitle="A brief introduction to who I am and what I do." readTime="2 min" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden text-center md:text-left">
               <div className="absolute top-0 right-0 w-64 h-64 bg-theme-p-600/10 rounded-full blur-[80px]" />
               <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-theme-p-400 text-xs font-mono uppercase tracking-wider relative z-10 border-b border-white/10 pb-4">
                 <div className="flex gap-1.5 mr-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                 </div>
                 <Clock size={14} /> {getReadingTime(profile.bio)} | system_profile.ts
               </div>
               
               <div className="font-mono text-sm leading-loose text-slate-300 relative z-10 text-left inline-block">
                 <span className="text-theme-p-400">const</span> <span className="text-blue-400">engineer</span> = {'{'}
                 <div className="pl-4 border-l border-white/5 ml-2 mt-2 mb-2 space-y-2">
                    <span className="text-theme-s-400">name:</span> <span className="text-green-300">"{profile.name}"</span>,<br/>
                    <span className="text-theme-s-400">role:</span> <span className="text-green-300">"{profile.role}"</span>,<br/>
                    <span className="text-theme-s-400">bio:</span> <span className="text-slate-400">"{profile.bio}"</span>
                 </div>
                 {'}'};
               </div>
               
               <div className="mt-8 flex gap-4 relative z-10 flex-wrap pt-6 border-t border-white/10 justify-center md:justify-start">
                 {Object.entries(profile.socials).map(([platform, url]) => {
                   if (!url) return null;
                   const urlStr = url as string;
                   let href = urlStr;
                   if (platform === 'email') href = `mailto:${urlStr}`;
                   else if (platform === 'phone') href = `tel:${urlStr.split(',')[0].trim()}`;
                   else if (platform === 'whatsapp') href = `https://wa.me/${urlStr}`;
                   
                   return (
                    <a 
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors capitalize text-sm font-medium text-slate-300 hover:text-white flex items-center gap-2"
                    >
                      {getPlatformIcon(platform)}
                      {platform}
                    </a>
                   );
                 })}
               </div>
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="grid grid-cols-2 gap-4"
          >
            <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col justify-center text-center">
              <span className="text-4xl font-bold text-white mb-2">3</span>
              <span className="text-slate-400 text-sm">Years Experience</span>
            </div>
            <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col justify-center text-center">
              <span className="text-4xl font-bold text-white mb-2">19</span>
              <span className="text-slate-400 text-sm">Projects Delivered</span>
            </div>
            <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col justify-center text-center col-span-2">
              <span className="text-4xl font-bold text-gradient mb-2">Top 1%</span>
              <span className="text-slate-400 text-sm">Rated Talent</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
