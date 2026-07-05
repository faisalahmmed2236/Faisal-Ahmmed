import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Eye, MousePointerClick, Globe2, Activity } from 'lucide-react';

const trafficData = [
  { name: 'Mon', views: 400, unique: 240 },
  { name: 'Tue', views: 300, unique: 139 },
  { name: 'Wed', views: 550, unique: 380 },
  { name: 'Thu', views: 278, unique: 190 },
  { name: 'Fri', views: 189, unique: 140 },
  { name: 'Sat', views: 239, unique: 120 },
  { name: 'Sun', views: 349, unique: 210 },
];

const projectInterestData = [
  { name: 'E-Commerce', clicks: 120 },
  { name: 'AI Dashboard', clicks: 250 },
  { name: 'Finance App', clicks: 180 },
  { name: 'Social Platform', clicks: 90 },
];

export function VisitorInsights() {
  return (
    <section id="insights" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-theme-p-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-s-500/10 border border-theme-s-500/20 text-theme-s-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Activity size={14} />
              <span>Platform Analytics</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Visitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-p-400 to-theme-s-400">Insights</span>
            </h2>
            <p className="text-slate-400 max-w-lg text-lg">
              Real-time portfolio telemetry and engagement metrics visualized.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {[
            { label: 'Total Page Views', value: '12,450', increase: '+14%', icon: Eye },
            { label: 'Unique Visitors', value: '8,210', increase: '+22%', icon: Globe2 },
            { label: 'Project Clicks', value: '3,142', increase: '+8%', icon: MousePointerClick },
            { label: 'Avg. Session', value: '4m 12s', increase: '+12%', icon: Activity },
          ].map((metric, idx) => (
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
              <h3 className="text-2xl font-bold">{metric.value}</h3>
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
                <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <BarChart data={projectInterestData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.7)" fontSize={11} tickLine={false} axisLine={false} />
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
    </section>
  );
}
