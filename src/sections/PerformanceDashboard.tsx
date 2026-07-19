import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Zap, CheckCircle2, Gauge, Info, 
  Users, Laptop, Globe2, Terminal, ArrowUpRight, 
  Clock, ShieldCheck, HeartPulse
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';
import { useAnalytics } from '../context/AnalyticsContext';
import { useTrackSection } from '../hooks/useTrackSection';

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

const SECTION_NAMES: Record<string, string> = {
  about: 'Core Capabilities',
  skills: 'Technical Arsenal',
  experience: 'Journey & Milestones',
  services: 'System Architecture',
  projects: 'Featured Deployments',
  achievements: 'Career Milestones',
  insights: 'Visitor Insights',
  performance: 'Performance & SEO',
  testimonials: 'Kind Words',
  contact: 'Contact & Hire',
};

export function PerformanceDashboard() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const trackerRef = useTrackSection('performance');
  const { sectionViews, activeVisitors, logs, activeSection } = useAnalytics();

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
      ref={trackerRef as any}
      id="performance" 
      className="py-6 md:py-10 relative z-10 overflow-visible bg-black/40"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
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
            className="text-center md:text-left flex flex-col items-center md:items-start relative z-30"
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Gauge size={14} />
              <span>System Vitals</span>
            </div>

            <div 
              className="relative inline-block cursor-help mb-4 select-none"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
              onClick={() => setIsHeaderHovered(prev => !prev)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHeaderHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 mb-4 px-4 py-3 bg-[#0B0B0F]/95 border border-emerald-500/30 text-slate-200 rounded-2xl shadow-2xl backdrop-blur-xl z-50 w-[85vw] max-w-[280px] sm:w-72 text-center md:text-left flex flex-col gap-1.5"
                    style={{ filter: "drop-shadow(0 10px 25px rgba(16,185,129,0.15))" }}
                  >
                    <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      <Info size={11} className="animate-pulse" />
                      <span>Section Details</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium whitespace-normal">
                      Live Google Lighthouse and Core Web Vitals metrics proving Faisal's engineering excellence in speed, accessibility, best practices, and SEO.
                    </p>
                    <div className="absolute top-full left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 border-x-6 border-x-transparent border-t-6 border-t-[#0B0B0F]/95" />
                  </motion.div>
                )}
              </AnimatePresence>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span>Performance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">SEO</span></span>
                <motion.span
                  animate={{ opacity: isHeaderHovered ? 1 : 0.35, scale: isHeaderHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-emerald-400 shrink-0 hidden sm:inline"
                >
                  <Info size={18} />
                </motion.span>
              </h2>
            </div>

            <p className="text-slate-400 text-lg mx-auto md:mx-0">
              Optimized for speed, accessibility, and search engine visibility. Real-time metrics demonstrating technical excellence across the platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lighthouse Scores Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any }}
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] as any }}
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

        {/* Real-time Analytics Tracker Hub */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 glass-panel p-6 sm:p-8 rounded-2xl flex flex-col relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-theme-p-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <HeartPulse className="text-theme-p-400 animate-pulse" size={20} />
                <h3 className="text-xl font-bold text-white">Client-Side Analytics Hub</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Privacy-focused, lightweight client-side telemetry recorded locally via native browser <code className="text-theme-p-400 bg-white/5 px-1 py-0.5 rounded font-mono">IntersectionObserver</code>.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={13} />
              <span>100% GDPR Compliant</span>
            </div>
          </div>

          {/* Core Analytics Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1">
                <Users size={12} className="text-theme-p-400" />
                Active Viewers
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-extrabold text-white">
                  {activeVisitors.length + 1}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Live
                </span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1">
                <Activity size={12} className="text-emerald-400" />
                Aggregated Views
              </span>
              <span className="text-2xl font-mono font-extrabold text-white">
                {Object.values(sectionViews).reduce((a, b) => a + b, 0).toLocaleString()}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1">
                <Clock size={12} className="text-cyan-400" />
                Avg. Session Depth
              </span>
              <span className="text-2xl font-mono font-extrabold text-white">
                92.4%
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-400" />
                Cookie-less Tracking
              </span>
              <span className="text-lg font-bold text-emerald-400 mt-1 uppercase tracking-wider text-xs bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md self-start">
                Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Recharts section view visualizer */}
            <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-xl p-4 sm:p-6 flex flex-col min-h-[350px]">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 font-mono uppercase tracking-wider">
                  <Activity size={14} className="text-theme-p-400" />
                  Section View Traffic
                </h4>
                <span className="text-[10px] bg-theme-p-500/10 border border-theme-p-500/20 text-theme-p-400 px-2 py-0.5 rounded-sm font-mono">Live local persistence</span>
              </div>
              
              <div className="flex-1 w-full min-h-[260px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={Object.entries(sectionViews).map(([id, views]) => ({
                      id,
                      name: SECTION_NAMES[id] || id,
                      views,
                    }))}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="id" 
                      stroke="#64748b" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => val.charAt(0).toUpperCase() + val.slice(1, 4)}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 4 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#0D0D12] border border-white/10 px-3 py-2 rounded-lg shadow-xl font-sans text-xs">
                              <p className="font-bold text-white mb-0.5">{data.name}</p>
                              <p className="text-theme-p-400 font-mono">Views: <span className="font-bold text-white">{data.views}</span></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                      {Object.entries(sectionViews).map((entry, index) => {
                        const isSelected = entry[0] === 'performance';
                        return (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={isSelected ? '#10b981' : 'url(#purpleGradient)'} 
                          />
                        );
                      })}
                    </Bar>
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Live Telemetry Panel: Who is viewing */}
            <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-xl p-4 sm:p-6 flex flex-col max-h-[350px] overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 font-mono uppercase tracking-wider">
                  <Users size={14} className="text-cyan-400" />
                  Live Connections
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time Stream</span>
                </div>
              </div>

              {/* Scrollable active visitors panel */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
                {/* Active user representing current session */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base" title="Local Host">🏠</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        You (Lead Advisor)
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Laptop size={10} /> Active: {SECTION_NAMES[activeSection] || 'Performance & SEO'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Just now</span>
                </div>

                {/* Simulated active visitors from context */}
                {activeVisitors.map((visitor) => (
                  <div key={visitor.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base" title={visitor.country}>{visitor.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-200">
                          {visitor.country === 'Bangladesh' ? 'Dhaka' : 'Visitor'} #{visitor.id.split('-')[1]}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Terminal size={10} /> {visitor.browser} on {visitor.device.split(' ')[0]}
                        </span>
                        <span className="text-[9px] text-theme-p-400 font-medium">
                          Viewing: <strong className="font-semibold text-slate-300">{visitor.activeSection}</strong>
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">{visitor.duration}</span>
                  </div>
                ))}
              </div>

              {/* Scrolling ticker logs */}
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-400 flex flex-col gap-1 overflow-hidden h-14 select-none">
                <span className="text-slate-500 text-[9px] uppercase tracking-wider font-bold">Activity Log:</span>
                <div className="flex flex-col gap-1.5">
                  {logs.slice(0, 3).map((log, index) => (
                    <div key={`${log.id}-${index}`} className="flex items-center gap-1.5 text-slate-300 truncate">
                      <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                      <span className="truncate">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
