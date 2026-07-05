import React from 'react';
import { motion } from 'motion/react';

export function SectionDivider() {
  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Main horizontal line */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-theme-p-500/30 to-transparent"
      />
      
      {/* Glowing center point */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-1.5 h-1.5 rounded-full bg-theme-p-500 shadow-[0_0_15px_rgba(var(--color-theme-p-500),0.5)] z-10"
        />
        
        {/* Pulsing rings */}
        <motion.div
          animate={{ 
            scale: [1, 2],
            opacity: [0.5, 0]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-theme-p-500/20"
        />
        
        <motion.div
          animate={{ 
            scale: [1, 1.5],
            opacity: [0.3, 0]
          }}
          transition={{ 
            duration: 2.5,
            delay: 1.25,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-theme-s-500/10"
        />
      </div>

      {/* Floating particles or smaller lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ 
              x: i % 2 === 0 ? [0, -100] : [0, 100],
              opacity: [0, 0.4, 0]
            }}
            viewport={{ once: false }}
            transition={{ 
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
            className="absolute h-px w-20 bg-gradient-to-r from-transparent via-theme-p-400/20 to-transparent"
          />
        ))}
      </div>
    </div>
  );
}
