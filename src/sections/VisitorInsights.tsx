import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Eye, MousePointerClick, Globe2, Activity } from 'lucide-react';

function AnimatedCounter({ value, isTime = false }: { value: number, isTime?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
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

export function VisitorInsights() {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" as any }}
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
            className="text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-theme-s-500/10 border border-theme-s-500/20 text-theme-s-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Activity size={14} />
              <span>Platform Analytics</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Visitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-p-400 to-theme-s-400">Insights</span>
            </h2>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 glass-panel p-6 rounded-2xl"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold">Traffic Overview</h3>
              <p className="text-sm text-slate-400">Weekly engagement trends</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="unique" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorUnique)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Project Interest Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-panel p-6 rounded-2xl flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold">Project Interest</h3>
              <p className="text-sm text-slate-400">Clicks by case study</p>
            </div>
            <div className="h-[300px] w-full flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectInterestData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" width={110} stroke="rgba(255,255,255,0.7)" fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="clicks" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
