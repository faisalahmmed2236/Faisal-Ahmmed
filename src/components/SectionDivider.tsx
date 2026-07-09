import React, { memo } from 'react';
import { motion } from 'motion/react';

export const SectionDivider = memo(function SectionDivider() {
  return (
    <div className="relative h-4 md:h-8 flex items-center justify-center pointer-events-none my-1 md:my-0">
      {/* Main horizontal line */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-theme-p-500/30 to-transparent"
      />
      
      {/* 3D Visual Core */}
      <div className="relative w-10 h-10 md:w-16 md:h-16 flex items-center justify-center" style={{ perspective: '800px' }}>
        <motion.div
          className="absolute inset-0 m-auto w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 180],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Inner point */}
          <div className="absolute inset-0 m-auto w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-theme-p-500 shadow-[0_0_15px_rgba(var(--color-theme-p-500),1)]" style={{ transform: 'translateZ(0px)' }} />
          
          {/* 3D Rings */}
          <div className="absolute inset-0 m-auto w-6 h-6 md:w-10 md:h-10 border border-theme-p-500/50 rounded-full" style={{ transform: 'rotateX(75deg)' }} />
          <div className="absolute inset-0 m-auto w-6 h-6 md:w-10 md:h-10 border border-theme-s-500/40 rounded-full" style={{ transform: 'rotateX(75deg) rotateY(60deg)' }} />
          <div className="absolute inset-0 m-auto w-6 h-6 md:w-10 md:h-10 border border-theme-p-500/40 rounded-full" style={{ transform: 'rotateX(75deg) rotateY(120deg)' }} />
        </motion.div>
      </div>
    </div>
  );
});
