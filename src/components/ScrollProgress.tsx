import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-theme-p-500 via-theme-s-500 to-theme-p-500 origin-left z-[60] shadow-[0_-6px_20px_rgba(236,72,153,0.8),0_-2px_6px_rgba(139,92,246,0.6)]"
      style={{ scaleX }}
    />
  );
}
