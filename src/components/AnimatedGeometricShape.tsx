import React from 'react';
import { motion } from 'motion/react';

export const AnimatedGeometricShape = () => (
  <div className="absolute right-[5%] lg:right-[10%] top-[25%] lg:top-[15%] z-0 block scale-50 sm:scale-75 lg:scale-100 opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto [perspective:1000px]">
    <motion.div
      className="relative w-64 h-64 [transform-style:preserve-3d] cursor-pointer"
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
    >
      <div className="absolute inset-0 border-[1px] border-theme-p-500/50 rounded-full [transform:rotateX(0deg)] bg-theme-p-500/5 backdrop-blur-[2px] shadow-[0_0_15px_rgba(var(--theme-p-500),0.2)]" />
      <div className="absolute inset-0 border-[1px] border-theme-s-500/50 rounded-full [transform:rotateX(60deg)] bg-theme-s-500/5 backdrop-blur-[2px] shadow-[0_0_15px_rgba(var(--theme-s-500),0.2)]" />
      <div className="absolute inset-0 border-[1px] border-theme-p-500/50 rounded-full [transform:rotateX(120deg)] bg-theme-p-500/5 backdrop-blur-[2px] shadow-[0_0_15px_rgba(var(--theme-p-500),0.2)]" />
      <div className="absolute inset-0 border-[1px] border-theme-s-500/50 rounded-full [transform:rotateY(60deg)] bg-theme-s-500/5 backdrop-blur-[2px] shadow-[0_0_15px_rgba(var(--theme-s-500),0.2)]" />
      <div className="absolute inset-0 border-[1px] border-theme-p-500/50 rounded-full [transform:rotateY(120deg)] bg-theme-p-500/5 backdrop-blur-[2px] shadow-[0_0_15px_rgba(var(--theme-p-500),0.2)]" />
      
      {/* Inner Core */}
      <motion.div 
        className="absolute inset-[35%] bg-white/20 rounded-full blur-md shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </div>
);
