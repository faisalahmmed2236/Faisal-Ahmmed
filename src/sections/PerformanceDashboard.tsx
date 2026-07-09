import React from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, CheckCircle2, Gauge } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  label: string;
  color?: string;
  delay?: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, label, color = "#10b981", delay = 0 }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="relative w-28 h-28 mb-4">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" as any }}
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-slate-400 text-center">{label}</span>
    </motion.div>
  );
};

export function PerformanceDashboard() {
  const metrics = [
    { label: "Performance", score: 98, color: "#10b981" },
    { label: "Accessibility", score: 100, color: "#10b981" },
    { label: "Best Practices", score: 100, color: "#10b981" },
    { label: "SEO", score: 100, color: "#10b981" },
  ];

  const coreVitals = [
    { label: "First Contentful Paint (FCP)", value: "0.8s", status: "Good", percent: 92 },
    { label: "Largest Contentful Paint (LCP)", value: "1.2s", status: "Good", percent: 88 },
    { label: "Total Blocking Time (TBT)", value: "10ms", status: "Good", percent: 98 },
    { label: "Cumulative Layout Shift (CLS)", value: "0.01", status: "Good", percent: 96 },
  ];

  return (
    <motion.section 
      id="performance" 
      className="py-6 md:py-10 relative overflow-hidden bg-black/40"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" as any }}
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Gauge size={14} />
              <span>System Vitals</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Performance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">SEO</span>
            </h2>
            <p className="text-slate-400 text-lg mx-auto md:mx-0">
              Optimized for speed, accessibility, and search engine visibility. Real-time metrics demonstrating technical excellence across the platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lighthouse Scores Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 glass-panel p-4 sm:p-8 rounded-2xl flex flex-col"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Activity className="text-emerald-400" size={20} />
                Lighthouse Scores
              </h3>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">Mobile & Desktop</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-4 flex-1 content-center">
              {metrics.map((m, i) => (
                <ScoreGauge key={i} score={m.score} label={m.label} color={m.color} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Core Web Vitals Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7 glass-panel p-8 rounded-2xl flex flex-col"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Zap className="text-emerald-400" size={20} />
              Core Web Vitals
            </h3>
            
            <div className="space-y-6 flex-1">
              {coreVitals.map((vital, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-slate-300">{vital.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white font-mono">{vital.value}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-sm">
                        {vital.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden border border-white/5">
                    <motion.div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full relative"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${vital.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 + 0.4, ease: "easeOut" as any }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Checklist */}
            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["HTTPS Optimized", "PWA Ready", "Minified Assets", "Next-Gen Images"].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  className="flex flex-col items-start gap-2 text-xs text-slate-400"
                >
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
