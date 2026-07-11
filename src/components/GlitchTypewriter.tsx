import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

interface GlitchTypewriterProps {
  words: string[];
  interval?: number;
}

const CYBER_GLYPHS = "日ハミヒーウシナーモラキプリツコタエトネス★⚡█▚▞▓░▒▕▌▄▀❖◈☌☍01<>[]/_";

export function GlitchTypewriter({ words, interval = 4000 }: GlitchTypewriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const textRef = useRef<string>(words[0]);

  // Cycle words state
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  // Listen to window resize to adjust responsive sizing cleanly
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive font size matching Tailwind text-base / text-lg / text-xl
  const getFontSize = (width: number) => {
    if (width < 640) return 15; // Mobile: 15px
    if (width < 768) return 18; // Tablet: 18px
    return 20; // Desktop: 20px
  };

  // High-performance canvas and animation controller
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetWord = words[currentIndex];
    textRef.current = targetWord;
    setIsGlitching(true);
    triggerVibration(hapticPatterns.medium);

    const startTime = performance.now();
    const scrambleDuration = 900; // 900ms scrambling decode phase
    let lastHapticTime = 0;

    const dpr = window.devicePixelRatio || 1;
    const fontSize = getFontSize(windowWidth);
    ctx.font = `bold ${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace`;
    ctx.textBaseline = 'middle';

    // 1. Measure all words to find the absolute maximum width.
    // This guarantees the canvas width NEVER changes between words, preventing any layout shifting!
    let maxTextWidth = 0;
    words.forEach(word => {
      const metrics = ctx.measureText(word);
      if (metrics.width > maxTextWidth) {
        maxTextWidth = metrics.width;
      }
    });

    const textHeight = fontSize * 1.5;
    const maxDisplayWidth = Math.ceil(maxTextWidth + 24); // extra padding for glitch offset shifts
    const displayHeight = Math.ceil(textHeight + 12);

    canvas.width = maxDisplayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${maxDisplayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    ctx.scale(dpr, dpr);

    let active = true;

    const tick = (now: number) => {
      if (!active) return;

      const elapsed = now - startTime;
      let currentText = "";
      let glitchActive = false;

      // Logic Phase: Determine text and glitch state based on timestamp
      if (elapsed < scrambleDuration) {
        glitchActive = true;
        const progress = elapsed / scrambleDuration;
        const resolvedLength = Math.floor(progress * targetWord.length);

        currentText = targetWord
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < resolvedLength) return targetWord[index];
            if (Math.random() < 0.1) return targetWord[index];
            return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          })
          .join("");

        if (now - lastHapticTime > 90) {
          triggerVibration(hapticPatterns.light);
          lastHapticTime = now;
        }
      } else {
        if (isGlitching) {
          setIsGlitching(false);
        }
        currentText = targetWord;

        // Periodic micro-glitch (150ms every 3000ms)
        const timeSinceScramble = elapsed - scrambleDuration;
        const cycleLength = 3000;
        const glitchWindow = 150;
        const cycleTime = timeSinceScramble % cycleLength;
        if (cycleTime < glitchWindow) {
          glitchActive = true;
        }
      }

      // 2. Direct DOM Cursor Update: Position the custom cursor at the end of the current text
      const curMetrics = ctx.measureText(currentText);
      const currentWordWidth = curMetrics.width;
      const isCenteredMode = windowWidth < 1024;

      let cursorX = 0;
      if (isCenteredMode) {
        cursorX = (maxDisplayWidth + currentWordWidth) / 2;
      } else {
        cursorX = 6 + currentWordWidth;
      }

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
      }

      // 3. Rendering Phase: Draw to canvas
      ctx.clearRect(0, 0, maxDisplayWidth, displayHeight);

      ctx.font = `bold ${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = isCenteredMode ? 'center' : 'left';

      const x = isCenteredMode ? maxDisplayWidth / 2 : 6;
      const y = displayHeight / 2;

      if (glitchActive) {
        // Red Channel shift
        ctx.save();
        ctx.fillStyle = '#f43f5e';
        const rX = x + (Math.random() - 0.5) * 4;
        const rY = y + (Math.random() - 0.5) * 2;
        ctx.fillText(currentText, rX, rY);
        ctx.restore();

        // Cyan Channel shift
        ctx.save();
        ctx.fillStyle = '#06b6d4';
        const bX = x + (Math.random() - 0.5) * -4;
        const bY = y + (Math.random() - 0.5) * -2;
        ctx.fillText(currentText, bX, bY);
        ctx.restore();

        // Main white composited layer
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(currentText, x + (Math.random() - 0.5) * 1.5, y);
        ctx.restore();

        // Slice displacement effect
        if (Math.random() < 0.25) {
          const sliceY = Math.random() * displayHeight;
          const sliceH = 3 + Math.random() * 6;
          const sliceOffset = (Math.random() - 0.5) * 8;

          ctx.save();
          ctx.beginPath();
          ctx.rect(0, sliceY, maxDisplayWidth, sliceH);
          ctx.clip();
          ctx.translate(sliceOffset, 0);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(currentText, x, y);
          ctx.restore();
        }

        // Horizontal CRT scanlines overlay
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < displayHeight; i += 4) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(maxDisplayWidth, i);
          ctx.stroke();
        }
        ctx.restore();
      } else {
        // Linear gradient rendering centered correctly
        ctx.save();
        const startX = isCenteredMode ? (maxDisplayWidth - currentWordWidth) / 2 : 6;
        const grad = ctx.createLinearGradient(startX, 0, startX + currentWordWidth, 0);
        grad.addColorStop(0, '#ec4899'); // theme-s-500 / theme-p-400
        grad.addColorStop(0.5, '#a78bfa'); // theme-s-400
        grad.addColorStop(1, '#f472b6'); // theme-p-400
        
        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(236, 72, 153, 0.4)';
        ctx.shadowBlur = 10;
        ctx.fillText(currentText, x, y);
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentIndex, words, windowWidth]);

  return (
    <div className="relative inline-flex items-center select-none justify-center">
      <motion.div
        animate={isGlitching ? {
          x: [0, -1.5, 1.5, -1, 1, 0],
          y: [0, 1, -1, 0.5, -0.5, 0],
          skewX: [0, -1, 1, 0]
        } : {}}
        transition={{
          duration: 0.2,
          ease: "linear",
          repeat: isGlitching ? Infinity : 0
        }}
        className="relative inline-block"
      >
        <canvas 
          ref={canvasRef} 
          className="block align-middle filter drop-shadow-[0_0_8px_rgba(236,72,153,0.25)] transition-all duration-300"
        />
        
        {/* Absolutely Positioned Custom Pulse Cursor - directly manipulated at 60fps */}
        <span 
          ref={cursorRef}
          className={`absolute ml-1 top-1/2 -translate-y-1/2 w-2 h-4.5 bg-theme-s-400 ${
            isGlitching ? 'animate-none' : 'animate-pulse'
          }`}
          style={{
            boxShadow: '0 0 12px #ec4899',
            borderRadius: '1px',
            transition: 'left 0.05s linear' // micro-smoothing transition for cursor tracking
          }}
        />
      </motion.div>
    </div>
  );
}
