import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isHidden) setIsHidden(false);

      // Event delegation for hover state - massively faster than MutationObserver
      const target = e.target as HTMLElement;
      // Using closest to check if we are hovering over an interactive element
      const isHoverable = target.closest('a, button, input, textarea, select, [role="button"], .cursor-hover, label, summary, .interactive, .cursor-pointer') !== null;
      
      setIsHovered(isHoverable);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isHidden]);

  if (isHidden) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[10000] bg-theme-p-500 shadow-[0_0_8px_#3b82f6]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 32 : 20,
          height: isHovered ? 32 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {!isHovered && (
            <motion.div 
              key="normal"
              className="absolute inset-0 rounded-full border border-theme-p-400/50"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {isHovered && (
            <motion.div
              key="hovered"
              className="absolute inset-0"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ 
                scale: { duration: 0.2 },
                opacity: { duration: 0.2 },
                rotate: { duration: 10, repeat: Infinity, ease: "linear" }
              }}
            >
              <div 
                className="absolute inset-0 rounded-full border-[1.5px] border-theme-p-400/60"
                style={{ transform: 'rotateX(75deg) rotateY(20deg)' }}
              />
              <div 
                className="absolute inset-0 rounded-full border-[1.5px] border-theme-s-400/60"
                style={{ transform: 'rotateX(75deg) rotateY(-40deg)' }}
              />
              <div 
                className="absolute inset-0 rounded-full border-[1.5px] border-theme-p-300/40"
                style={{ transform: 'rotateX(75deg) rotateY(80deg)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
