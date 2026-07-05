import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity } from 'lucide-react';

interface ProjectImpactProps {
  metrics: {
    engagementScore: number;
    sparklineData: { time: string; value: number }[];
  };
}

export function ProjectImpact({ metrics }: ProjectImpactProps) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center bg-[#0A0A0C]/50 border border-white/5 p-4 rounded-2xl w-full max-w-sm relative z-20 backdrop-blur-md">
      <div className="flex flex-col justify-center items-center px-4 border-r border-white/10 shrink-0">
        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1">Engagement</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">{metrics.engagementScore}</span>
          <span className="text-xs text-theme-p-400">/100</span>
        </div>
      </div>
      
      <div className="flex-1 w-full flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-1 pl-2">
          <Activity size={12} className="text-slate-400" />
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">View Trends</span>
        </div>
        <div className="h-10 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.sparklineData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8b5cf6" 
                strokeWidth={1.5} 
                fillOpacity={1} 
                fill="url(#sparklineGrad)" 
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
