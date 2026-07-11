import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Download, Terminal, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { generateResume } from '../utils/pdfGenerator';
import { triggerVibration, hapticPatterns } from '../lib/haptics';
import { AnimatedGeometricShape } from '../components/AnimatedGeometricShape';
import { TechMarquee } from '../components/TechMarquee';
import { Interactive3DObject } from '../components/Interactive3DObject';
import { GlitchTypewriter } from '../components/GlitchTypewriter';

export function Hero() {
  const { portfolioData } = useLanguage();
  const { profile } = portfolioData;

  const imageRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-start lg:items-center pt-20 sm:pt-24 lg:pt-20 pb-12 lg:pb-0 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-theme-p-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-theme-s-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <Interactive3DObject />
      <AnimatedGeometricShape />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left z-10 pt-2 sm:pt-6 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-theme-p-500/10 border border-theme-p-500/20 text-theme-p-400 text-xs font-bold tracking-widest uppercase">
              <Terminal size={14} /> System Online
            </span>
          </motion.div>
          
          {/* Mobile/Tablet Image - Visible ONLY on screens < lg (Placed just after System badge) */}
          <div className="lg:hidden w-full flex justify-center my-4 sm:my-6 [perspective:1000px] z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative w-[240px] sm:w-[300px] aspect-square group cursor-pointer"
            >
              {/* Frame / Background */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 via-white/5 to-transparent border border-white/20 backdrop-blur-md p-3 shadow-2xl transition-all duration-500 group-hover:border-theme-p-500/50">
                 <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                    <div className="absolute inset-0 bg-theme-p-500 opacity-10 mix-blend-overlay z-10" />
                    <img 
                      referrerPolicy="no-referrer"
                      src={profile.image} 
                      alt={profile.name}
                      className="w-full h-full object-cover relative z-0 filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                 </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-theme-p-500 rounded-tl-[1.5rem] z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-theme-s-500 rounded-br-[1.5rem] z-20 pointer-events-none" />
              
              {/* Floating Tech Badge */}
              <div className="absolute bottom-3 right-0 bg-black/90 backdrop-blur-xl border border-theme-p-500/30 p-2.5 px-3.5 rounded-xl z-30 flex items-center gap-2.5 shadow-2xl scale-90 sm:scale-100 origin-bottom-right">
                <div className="w-8 h-8 rounded-full bg-theme-p-500/20 flex items-center justify-center text-theme-p-400 shrink-0">
                  <Terminal size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 font-mono leading-none mb-1">System Status</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs font-bold text-white uppercase tracking-wider leading-none">Ready to Build</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight text-white"
          >
            {profile.name}
          </motion.h1>
          
          {/* Desktop Glitch Typewriter - Visible ONLY on screens >= lg */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center justify-start gap-3 text-theme-p-400 font-mono text-base sm:text-lg md:text-xl mb-6 min-h-[2.5rem]"
          >
            <Code2 size={24} className="animate-pulse hidden sm:block text-theme-p-500" />
            <span className="text-left leading-relaxed">
              <GlitchTypewriter 
                words={[
                  "I am Faisal Ahmmed",
                  profile.role,
                  "Web, Mobile & Solutions",
                  "Transforming Data into Insights"
                ]} 
              />
            </span>
          </motion.div>

          {/* Mobile/Tablet Glitch Typewriter - Visible ONLY on screens < lg (Placed right after Name title) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex lg:hidden items-center justify-center gap-3 text-theme-p-400 font-mono text-base sm:text-lg mb-4 sm:mb-6 min-h-[2.5rem]"
          >
            <Code2 size={20} className="animate-pulse text-theme-p-500 shrink-0" />
            <span className="text-center leading-relaxed">
              <GlitchTypewriter 
                words={[
                  "I am Faisal Ahmmed",
                  profile.role,
                  "Web, Mobile & Solutions",
                  "Transforming Data into Insights"
                ]} 
              />
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0"
          >
            {profile.tagline}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full max-w-sm mx-auto lg:mx-0 sm:max-w-none px-4 sm:px-0"
          >
            <motion.a 
              href="#projects"
               onClick={() => triggerVibration(hapticPatterns.light)} 
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)" }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-theme-p-500 to-theme-s-500 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              View Projects <ArrowRight size={20} />
            </motion.a>
            <motion.button 
              onClick={() => { generateResume(portfolioData); triggerVibration(hapticPatterns.medium); }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            >
              Download CV <Download size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex flex-1 w-full justify-center lg:justify-end relative z-10 mt-12 md:mt-0 [perspective:1000px]"
        >
          <motion.div 
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-[280px] sm:w-[350px] lg:w-[450px] xl:w-[500px] aspect-square group cursor-pointer"
          >
            {/* Frame / Background */}
            <div 
              className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/20 via-white/5 to-transparent border border-white/20 backdrop-blur-md p-4 shadow-2xl transition-all duration-500 group-hover:border-theme-p-500/50 group-hover:shadow-theme-p-500/20"
              style={{ transform: "translateZ(-20px)" }}
            >
               <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                  <div className="absolute inset-0 bg-theme-p-500 opacity-10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
                  <img 
                    src={profile.image} 
                    alt={profile.name}
                    className="w-full h-full object-cover relative z-0 filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
               </div>
            </div>
            
            {/* Corner Accents */}
            <div 
              className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-theme-p-500 rounded-tl-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" 
              style={{ transform: "translateZ(40px)" }}
            />
            <div 
              className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-theme-s-500 rounded-br-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" 
              style={{ transform: "translateZ(40px)" }}
            />
            
            {/* Floating Tech Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ transform: "translateZ(60px)" }}
              className="absolute bottom-4 right-0 sm:bottom-10 sm:-right-6 lg:-right-10 bg-black/90 backdrop-blur-xl border border-theme-p-500/30 p-4 rounded-2xl z-30 flex items-center gap-4 shadow-2xl group-hover:border-theme-p-500 transition-colors scale-75 sm:scale-100 origin-bottom-right"
            >
              <div className="w-10 h-10 rounded-full bg-theme-p-500/20 flex items-center justify-center text-theme-p-400 shrink-0">
                <Terminal size={20} />
              </div>
              <div className="text-left pr-4">
                <p className="text-[11px] text-slate-400 font-mono mb-0.5">System Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Ready to Build</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <TechMarquee />
    </section>
  );
}
