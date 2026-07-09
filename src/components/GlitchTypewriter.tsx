import React, { useState, useEffect } from 'react';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

interface GlitchTypewriterProps {
  words: string[];
  interval?: number;
}

const CYBER_GLYPHS = "日ハミヒーウシナーモラキプリツコタエトネス★⚡█▚▞▓░▒▕▌▄▀❖◈☌☍";

export function GlitchTypewriter({ words, interval = 3500 }: GlitchTypewriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let active = true;
    const targetWord = words[currentIndex];
    let iteration = 0;
    let timerId: any;

    setIsGlitching(true);
    // Soft haptic tick when transition starts
    triggerVibration(hapticPatterns.light);

    const runScramble = () => {
      if (!active) return;
      
      setDisplayText(() => {
        return targetWord
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            // If the iteration has progressed past this letter, resolve it
            if (index < iteration) {
              return targetWord[index];
            }
            // Otherwise, keep scrambling with cyber glyphs
            return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          })
          .join("");
      });

      if (iteration >= targetWord.length) {
        setIsGlitching(false);
        return;
      }

      iteration += 0.5; // Controls resolution speed
      timerId = setTimeout(runScramble, 35);
    };

    runScramble();

    return () => {
      active = false;
      clearTimeout(timerId);
    };
  }, [currentIndex, words]);

  useEffect(() => {
    const cycle = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(cycle);
  }, [words, interval]);

  return (
    <span 
      className={`font-mono transition-all duration-300 relative inline-block select-none ${
        isGlitching 
          ? 'text-theme-s-400 font-bold drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' 
          : 'text-theme-p-400 hover:text-theme-s-400'
      }`}
    >
      <span className="relative z-10">{displayText || words[0]}</span>
      <span className="animate-pulse ml-1 inline-block w-2.5 h-4 bg-theme-p-500 align-middle" />
      
      {/* Glitch CRT split channels scanline lines under text during intense glitch */}
      {isGlitching && (
        <>
          <span className="absolute left-0 top-0 text-red-500/30 font-bold animate-pulse -translate-x-[1px] select-none pointer-events-none blur-[0.5px]">
            {displayText}
          </span>
          <span className="absolute left-0 top-0 text-cyan-500/30 font-bold animate-pulse translate-x-[1px] select-none pointer-events-none blur-[0.5px]">
            {displayText}
          </span>
        </>
      )}
    </span>
  );
}
