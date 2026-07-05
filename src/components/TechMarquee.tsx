import React from 'react';
import { motion } from 'motion/react';

const technologies = [
  "Python", "React", "Next.js", "TypeScript", "TensorFlow", "PyTorch", "Docker", "AWS", "Node.js", "PostgreSQL", "GraphQL", "Tailwind CSS", "Framer Motion", "OpenCV", "FastAPI"
];

export function TechMarquee() {
  return (
    <div className="w-full overflow-hidden bg-black/40 border-y border-white/5 py-4 mt-20 relative z-20">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="flex w-[200%]">
        <motion.div 
          className="flex whitespace-nowrap items-center gap-12 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...technologies, ...technologies].map((tech, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 text-slate-400 font-mono text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-theme-p-500/50" />
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
