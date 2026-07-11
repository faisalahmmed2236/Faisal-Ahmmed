import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';
import { Eye, MousePointerClick, Globe2, Activity, Info } from 'lucide-react';

function AnimatedCounter({ value, isTime = false }: { value: number, isTime?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (isTime) {
      const m = Math.floor(latest / 60);
      const s = Math.floor(latest % 60);
      return `${m}m ${s}s`;
    }
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (inView) {
      const current = count.get();
      const duration = current === 0 ? 2.5 : 1.5;
      const controls = animate(count, value, { duration, ease: "easeOut" as any });
      return controls.stop;
    }
  }, [inView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const generateTrafficData = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  
  const baseData = [
    { views: 400, unique: 240 },
    { views: 300, unique: 139 },
    { views: 550, unique: 380 },
    { views: 278, unique: 190 },
    { views: 189, unique: 140 },
    { views: 239, unique: 120 },
    { views: 349, unique: 210 },
  ];
  
  return baseData.map((data, index) => {
    const dayIndex = (((today - (6 - index)) % 7) + 7) % 7;
    return {
      name: days[dayIndex],
      ...data
    };
  });
};

const initialTrafficData = generateTrafficData();

const initialProjectInterestData = [
  { name: 'E-Commerce', clicks: 120 },
  { name: 'AI Dashboard', clicks: 250 },
  { name: 'Finance App', clicks: 180 },
  { name: 'Social Platform', clicks: 90 },
];

interface TrafficDataPoint {
  name: string;
  views: number;
  unique: number;
}

function CustomAreaChart({ data }: { data: TrafficDataPoint[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 500;
  const height = 250;

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const maxVal = Math.max(...data.flatMap(d => [d.views, d.unique]), 100) * 1.15;

  const pointsViews = data.map((d, i) => {
    const x = margin.left + (i / (data.length - 1)) * chartWidth;
    const y = margin.top + chartHeight - (d.views / maxVal) * chartHeight;
    return { x, y, data: d };
  });

  const pointsUnique = data.map((d, i) => {
    const x = margin.left + (i / (data.length - 1)) * chartWidth;
    const y = margin.top + chartHeight - (d.unique / maxVal) * chartHeight;
    return { x, y, data: d };
  });

  const pathViews = pointsViews.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
  const areaViews = `${pathViews} L ${pointsViews[pointsViews.length - 1].x} ${margin.top + chartHeight} L ${pointsViews[0].x} ${margin.top + chartHeight} Z`;

  const pathUnique = pointsUnique.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
  const areaUnique = `${pathUnique} L ${pointsUnique[pointsUnique.length - 1].x} ${margin.top + chartHeight} L ${pointsUnique[0].x} ${margin.top + chartHeight} Z`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const relativeX = (x / rect.width) * width - margin.left;
    const pct = relativeX / chartWidth;
    const idx = Math.max(0, Math.min(data.length - 1, Math.round(pct * (data.length - 1))));
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="relative w-full h-full" style={{ minHeight: '220px' }}>
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full select-none overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient id="svgViewsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="svgUniqueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((ratio, i) => {
          const y = margin.top + ratio * chartHeight;
          const val = Math.round(maxVal * (1 - ratio));
          return (
            <g key={i} className="opacity-40">
              <line 
                x1={margin.left} 
                y1={y} 
                x2={margin.left + chartWidth} 
                y2={y} 
                stroke="rgba(255, 255, 255, 0.08)" 
                strokeDasharray="4 4"
              />
              <text 
                x={margin.left - 8} 
                y={y + 4} 
                fill="rgba(255, 255, 255, 0.4)" 
                fontSize={10} 
                textAnchor="end"
                className="font-mono"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, i) => {
          const x = margin.left + (i / (data.length - 1)) * chartWidth;
          return (
            <text 
              key={i}
              x={x} 
              y={height - margin.bottom + 16} 
              fill="rgba(255, 255, 255, 0.4)" 
              fontSize={10} 
              textAnchor="middle"
              className="font-mono"
            >
              {d.name}
            </text>
          );
        })}

        {/* Areas */}
        <path d={areaViews} fill="url(#svgViewsGrad)" />
        <path d={areaUnique} fill="url(#svgUniqueGrad)" />

        {/* Lines */}
        <path d={pathViews} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
        <path d={pathUnique} fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />

        {/* Hover vertical indicator line */}
        {hoveredIdx !== null && (
          <line 
            x1={pointsViews[hoveredIdx].x} 
            y1={margin.top} 
            x2={pointsViews[hoveredIdx].x} 
            y2={margin.top + chartHeight} 
            stroke="rgba(255, 255, 255, 0.2)" 
            strokeDasharray="2 2"
          />
        )}

        {/* Active Dots on hover */}
        {hoveredIdx !== null && (
          <g>
            <circle 
              cx={pointsViews[hoveredIdx].x} 
              cy={pointsViews[hoveredIdx].y} 
              r="5" 
              fill="#8b5cf6" 
              stroke="#fff" 
              strokeWidth="1.5" 
            />
            <circle 
              cx={pointsUnique[hoveredIdx].x} 
              cy={pointsUnique[hoveredIdx].y} 
              r="5" 
              fill="#ec4899" 
              stroke="#fff" 
              strokeWidth="1.5" 
            />
          </g>
        )}

        {/* Custom Tooltip inside SVG */}
        {hoveredIdx !== null && (
          <g>
            <rect 
              x={Math.min(width - 130, Math.max(10, pointsViews[hoveredIdx].x - 60))} 
              y={Math.max(10, Math.min(pointsViews[hoveredIdx].y, pointsUnique[hoveredIdx].y) - 65)} 
              width="120" 
              height="55" 
              rx="8" 
              fill="rgba(3, 3, 5, 0.95)" 
              stroke="rgba(255, 255, 255, 0.15)" 
              strokeWidth="1"
            />
            <text 
              x={Math.min(width - 130, Math.max(10, pointsViews[hoveredIdx].x - 60)) + 10} 
              y={Math.max(10, Math.min(pointsViews[hoveredIdx].y, pointsUnique[hoveredIdx].y) - 65) + 15} 
              fill="#fff" 
              fontSize="10" 
              fontWeight="bold"
              className="font-mono"
            >
              {data[hoveredIdx].name}
            </text>
            <circle 
              cx={Math.min(width - 130, Math.max(10, pointsViews[hoveredIdx].x - 60)) + 15} 
              cy={Math.max(10, Math.min(pointsViews[hoveredIdx].y, pointsUnique[hoveredIdx].y) - 65) + 28} 
              r="3" 
              fill="#8b5cf6" 
            />
            <text 
              x={Math.min(width - 130, Math.max(10, pointsViews[hoveredIdx].x - 60)) + 24} 
              y={Math.max(10, Math.min(pointsViews[hoveredIdx].y, pointsUnique[hoveredIdx].y) - 65) + 31} 
              fill="rgba(255,255,255,0.7)" 
              fontSize="9"
              className="font-mono"
            >
              Views: <tspan fill="#fff" fontWeight="bold">{data[hoveredIdx].views}</tspan>
            </text>
            <circle 
              cx={Math.min(width - 130, Math.max(10, pointsViews[hoveredIdx].x - 60)) + 15} 
              cy={Math.max(10, Math.min(pointsViews[hoveredIdx].y, pointsUnique[hoveredIdx].y) - 65) + 40} 
              r="3" 
              fill="#ec4899" 
            />
            <text 
              x={Math.min(width - 130, Math.max(10, pointsViews[hoveredIdx].x - 60)) + 24} 
              y={Math.max(10, Math.min(pointsViews[hoveredIdx].y, pointsUnique[hoveredIdx].y) - 65) + 43} 
              fill="rgba(255,255,255,0.7)" 
              fontSize="9"
              className="font-mono"
            >
              Unique: <tspan fill="#fff" fontWeight="bold">{data[hoveredIdx].unique}</tspan>
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

interface ProjectInterestPoint {
  name: string;
  clicks: number;
}

function CustomBarChart({ data }: { data: ProjectInterestPoint[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = Math.max(...data.map(d => d.clicks), 50) * 1.15;

  return (
    <div className="space-y-4 flex flex-col justify-center h-full">
      {data.map((item, idx) => {
        const percent = Math.min(100, (item.clicks / maxVal) * 100);
        return (
          <div 
            key={idx} 
            className="flex flex-col gap-1.5 group cursor-pointer"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{item.name}</span>
              <span className="font-bold font-mono text-theme-p-400">{item.clicks} clicks</span>
            </div>
            
            <div className="w-full h-8 bg-black/40 rounded-xl overflow-hidden border border-white/5 relative flex items-center pr-3">
              {/* Dynamic glowing bar width */}
              <motion.div 
                className="bg-gradient-to-r from-theme-p-500 to-theme-s-500 h-full rounded-l-xl relative"
                initial={{ width: 0 }}
                whileInView={{ width: `${percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: idx * 0.1, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent w-full h-full" />
              </motion.div>
              
              {hoveredIdx === idx && (
                <div className="absolute inset-0 bg-white/5 pointer-events-none transition-opacity duration-200" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function VisitorInsights() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [metrics, setMetrics] = useState([
    { label: 'Total Page Views', value: 12450, increase: '+14%', icon: Eye, isTime: false },
    { label: 'Unique Visitors', value: 8210, increase: '+22%', icon: Globe2, isTime: false },
    { label: 'Project Clicks', value: 3142, increase: '+8%', icon: MousePointerClick, isTime: false },
    { label: 'Avg. Session', value: 252, increase: '+12%', icon: Activity, isTime: true },
  ]);
  const [trafficData, setTrafficData] = useState(initialTrafficData);
  const [projectInterestData, setProjectInterestData] = useState(initialProjectInterestData);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live metric updates
      setMetrics(prev => prev.map(m => {
        let increment = 0;
        if (m.label === 'Total Page Views') increment = Math.floor(Math.random() * 4);
        if (m.label === 'Unique Visitors') increment = Math.floor(Math.random() * 2);
        if (m.label === 'Project Clicks') increment = Math.floor(Math.random() * 2);
        if (m.label === 'Avg. Session') increment = Math.random() > 0.8 ? 1 : 0;
        return { ...m, value: m.value + increment };
      }));

      // Simulate live traffic data updates
      setTrafficData(prev => {
        const newData = [...prev];
        const last = newData[newData.length - 1];
        newData[newData.length - 1] = {
          ...last,
          views: last.views + Math.floor(Math.random() * 4),
          unique: last.unique + Math.floor(Math.random() * 2)
        };
        return newData;
      });

      // Simulate live project clicks updates
      setProjectInterestData(prev => {
        return prev.map(p => ({
          ...p,
          clicks: p.clicks + (Math.random() > 0.7 ? Math.floor(Math.random() * 2) : 0)
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      id="insights" 
      className="py-6 md:py-10 relative overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-theme-p-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left flex flex-col items-center md:items-start relative"
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-theme-s-500/10 border border-theme-s-500/20 text-theme-s-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Activity size={14} />
              <span>Platform Analytics</span>
            </div>
            
            <div 
              className="relative inline-block cursor-help mb-4"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHeaderHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 mb-4 px-4 py-3 bg-[#0B0B0F]/95 border border-theme-s-500/30 text-slate-200 rounded-2xl shadow-2xl backdrop-blur-xl z-50 w-72 text-center md:text-left flex flex-col gap-1.5"
                    style={{ filter: "drop-shadow(0 10px 25px rgba(236,72,153,0.15))" }}
                  >
                    <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-theme-s-400">
                      <Info size={11} className="animate-pulse" />
                      <span>Section Details</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                      An interactive, real-time telemetry panel visualizing user demographics, geographic mapping, and system interest.
                    </p>
                    <div className="absolute top-full left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 border-x-6 border-x-transparent border-t-6 border-t-[#0B0B0F]/95" />
                  </motion.div>
                )}
              </AnimatePresence>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center md:justify-start gap-2">
                <span>Visitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-p-400 to-theme-s-400">Insights</span></span>
                <motion.span
                  animate={{ opacity: isHeaderHovered ? 1 : 0.35, scale: isHeaderHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-theme-s-400 shrink-0 hidden sm:inline"
                >
                  <Info size={18} />
                </motion.span>
              </h2>
            </div>

            <p className="text-slate-400 max-w-lg text-lg mx-auto md:mx-0">
              Real-time portfolio telemetry and engagement metrics visualized.
            </p>
          </motion.div>
        </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] as any }}
                className="glass-panel p-4 sm:p-6 rounded-2xl relative overflow-hidden group"
              >
              <div className="absolute inset-0 bg-gradient-to-br from-theme-p-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300">
                  <metric.icon size={20} />
                </div>
                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  {metric.increase}
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium mb-1">{metric.label}</p>
              <h3 className="text-2xl font-bold">
                <AnimatedCounter value={metric.value} isTime={metric.isTime} />
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Traffic Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:col-span-2 glass-panel p-6 rounded-2xl"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold">Traffic Overview</h3>
              <p className="text-sm text-slate-400">Weekly engagement trends</p>
            </div>
            <div className="h-[250px] w-full flex items-center justify-center">
              <CustomAreaChart data={trafficData} />
            </div>
          </motion.div>

          {/* Project Interest Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] as any }}
            className="glass-panel p-6 rounded-2xl flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold">Project Interest</h3>
              <p className="text-sm text-slate-400">Clicks by case study</p>
            </div>
            <div className="w-full flex-grow flex flex-col justify-center">
              <CustomBarChart data={projectInterestData} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
