import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { triggerVibration, hapticPatterns } from '../lib/haptics';
import { SectionHeading } from '../components/SectionHeading';
import { 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Cpu, 
  Server, 
  Activity, 
  Code, 
  Terminal, 
  Database, 
  Zap, 
  Sliders, 
  Check, 
  Play, 
  Network,
  RefreshCw
} from 'lucide-react';
import { useTrackSection } from '../hooks/useTrackSection';

export function Experience() {
  const { portfolioData, language } = useLanguage();
  const { experiences, education } = portfolioData;
  const ui = portfolioData.ui || {};
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<Record<string, string>>({});
  const [terminalLogs, setTerminalLogs] = useState<Record<string, string[]>>({});
  const [terminalInput, setTerminalInput] = useState<Record<string, string>>({});
  const [simulatedLoad, setSimulatedLoad] = useState<Record<string, number>>({});
  const [isSimulating, setIsSimulating] = useState<Record<string, boolean>>({});

  const trackerRef = useTrackSection('experience');

  const hasExperience = experiences && experiences.length > 0;
  const hasEducation = education && education.length > 0;

  if (!hasExperience && !hasEducation) return null;

  const toggleNode = (id: string) => {
    triggerVibration(hapticPatterns.medium);
    if (expandedNode === id) {
      setExpandedNode(null);
    } else {
      setExpandedNode(id);
      // Initialize default sub tab if not set
      if (!activeSubTab[id]) {
        setActiveSubTab(prev => ({ ...prev, [id]: id.startsWith('e') ? 'topology' : 'academics' }));
      }
      // Initialize terminal logs if not set
      if (!terminalLogs[id]) {
        setTerminalLogs(prev => ({ 
          ...prev, 
          [id]: [`[SYSTEM_INITIALIZED]: Node secondary interface active.`, `Type help or select interactive commands below.`] 
        }));
      }
    }
  };

  const setSubTab = (nodeId: string, tab: string) => {
    triggerVibration(hapticPatterns.light);
    setActiveSubTab(prev => ({ ...prev, [nodeId]: tab }));
  };

  const runTerminalCommand = (nodeId: string, cmd: string) => {
    triggerVibration(hapticPatterns.light);
    const logs = [...(terminalLogs[nodeId] || [])];
    logs.push(`> ${cmd}`);

    const cleanCmd = cmd.toLowerCase().trim();

    if (cleanCmd === 'help') {
      logs.push(
        `Available instructions:`,
        `  diagnose   - Run microservice self-tests & measure latency`,
        `  sys_info   - Fetch current environment and cluster statuses`,
        `  clear      - Wipe screen buffer`,
        `  deploy_log - Read latest automated rolling deployment logs`
      );
    } else if (cleanCmd === 'diagnose') {
      logs.push(`[DIAGNOSTIC]: Pinging available clusters...`);
      if (nodeId === 'e1') {
        logs.push(
          `  - API Gateway Node: ONLINE (rtt: 12ms)`,
          `  - PyTorch CV Node: ONLINE (vram: 6.4GB / 8.0GB)`,
          `  - Grad-CAM Engine: ACTIVE (confidence threshold: 0.85)`,
          `  - Microservices: 3/3 replication healthy.`,
          `[RESULT]: System telemetry green. 0 latency anomalies detected.`
        );
      } else {
        logs.push(
          `  - Redis Memory: 1.2GB allocated (hits: 94.6%)`,
          `  - PG Master Cluster: ONLINE (active connections: 42)`,
          `  - Caching Layer: p95 Read Latency at 4ms`,
          `[RESULT]: Query speeds stabilized.`
        );
      }
    } else if (cleanCmd === 'sys_info') {
      if (nodeId === 'e1') {
        logs.push(
          `SYSTEM ARCHITECTURE CONTEXT:`,
          `  - Deployment Target: Docker, PyTorch Inference Server`,
          `  - Network Ingress: Envoy Load Balancer`,
          `  - Active Pipelines: Computer Vision Diagnostics, B2B Multi-Tenant Core`
        );
      } else {
        logs.push(
          `SYSTEM ARCHITECTURE CONTEXT:`,
          `  - Primary DB: PostgreSQL (v14) with Master-Replica Sync`,
          `  - Caching Engine: Redis Distributed Store`,
          `  - Microservice Gateway: FastAPI Router & Express Backends`
        );
      }
    } else if (cleanCmd === 'clear') {
      setTerminalLogs(prev => ({ ...prev, [nodeId]: [`[SYSTEM_INITIALIZED]: Screen cleared.`] }));
      return;
    } else if (cleanCmd === 'deploy_log') {
      logs.push(
        `[BUILD RUNNER]: Deploying version v2.4.1`,
        `  - linting check passed...`,
        `  - type compiling complete.`,
        `  - compiling webpack/esbuild bundle...`,
        `  - docker container image pushed: sha256:7c9e0a...`,
        `  - k8s rollout complete: Zero-downtime rolling update SUCCESS.`
      );
    } else {
      logs.push(`Command not found: '${cmd}'. Type 'help' for support.`);
    }

    setTerminalLogs(prev => ({ ...prev, [nodeId]: logs }));
  };

  const triggerSimulation = (nodeId: string) => {
    if (isSimulating[nodeId]) return;
    triggerVibration(hapticPatterns.medium);
    setIsSimulating(prev => ({ ...prev, [nodeId]: true }));
    setSimulatedLoad(prev => ({ ...prev, [nodeId]: 10 }));

    const logs = [...(terminalLogs[nodeId] || [])];
    logs.push(`[SIMULATOR]: Firing load stress simulation...`);
    setTerminalLogs(prev => ({ ...prev, [nodeId]: logs }));

    let currentStep = 10;
    const interval = setInterval(() => {
      currentStep += 15;
      if (currentStep >= 100) {
        currentStep = 100;
        clearInterval(interval);
        setIsSimulating(prev => ({ ...prev, [nodeId]: false }));
        
        const finalLogs = [...(terminalLogs[nodeId] || [])];
        finalLogs.push(
          `[SIMULATOR]: Stress test finished.`,
          `  - Handled 15k virtual requests/sec`,
          nodeId === 'e1' 
            ? `  - PyTorch GPU throughput: 45fps medical scans` 
            : `  - Cache Hit Ratio remained steady at 94.2%`
        );
        setTerminalLogs(prev => ({ ...prev, [nodeId]: finalLogs }));
      }
      setSimulatedLoad(prev => ({ ...prev, [nodeId]: currentStep }));
    }, 200);
  };

  return (
    <motion.section 
      ref={trackerRef as any}
      id="experience" 
      className="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
    >
      {/* Decorative Grid and Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-theme-p-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-theme-s-600/5 rounded-full blur-[140px] pointer-events-none" />
      
      <SectionHeading 
        title={ui.experienceTitle || "Professional Timeline"} 
        subtitle={ui.experienceSubtitle || "Elite Systems Engineering History"} 
        readTime={`3 ${ui.readTime || 'min read'}`} 
      />
      
      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-8 relative z-20">
        {hasExperience && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setActiveTab('experience'); triggerVibration(hapticPatterns.medium); }}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-bold text-sm tracking-wide uppercase cursor-pointer border transition-all ${
              activeTab === 'experience' 
                ? 'bg-gradient-to-br from-theme-p-600 to-theme-s-600 text-white border-transparent shadow-[0_0_25px_rgba(var(--theme-p-500),0.35)] font-bold' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Briefcase size={16} />
            {language === 'bn' ? 'অভিজ্ঞতা' : language === 'es' ? 'Experiencia' : language === 'ar' ? 'الخبرة المهنية' : 'Engineering Experience'}
          </motion.button>
        )}
        {hasEducation && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setActiveTab('education'); triggerVibration(hapticPatterns.medium); }}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-bold text-sm tracking-wide uppercase cursor-pointer border transition-all ${
              activeTab === 'education' 
                ? 'bg-gradient-to-br from-theme-p-600 to-theme-s-600 text-white border-transparent shadow-[0_0_25px_rgba(var(--theme-p-500),0.35)] font-bold' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <GraduationCap size={16} />
            {language === 'bn' ? 'শিক্ষা' : language === 'es' ? 'Educación' : language === 'ar' ? 'التحصيل الأكاديمي' : 'Academic Training'}
          </motion.button>
        )}
      </div>

      {/* Main Timeline Stream */}
      <div className="mt-20 relative z-10 max-w-5xl mx-auto">
        
        {/* Modern glowing pipeline trace line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 overflow-hidden pointer-events-none">
          <motion.div 
            className="w-full h-40 bg-gradient-to-b from-transparent via-theme-p-500 to-transparent absolute"
            animate={{ y: ['-100%', '300%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'experience' && hasExperience && (
            <motion.div
              key="experience-timeline"
              initial="hidden"
              whileInView="show"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } },
                exit: { opacity: 0, y: -20, transition: { duration: 0.25 } }
              }}
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-16"
            >
              {experiences.map((exp) => {
                const isNodeExpanded = expandedNode === exp.id;
                const nodeSubTab = activeSubTab[exp.id] || 'topology';
                const logs = terminalLogs[exp.id] || [];

                return (
                  <motion.div 
                    key={exp.id}
                    variants={{
                      hidden: { opacity: 0, y: 25, scale: 0.98 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="relative flex flex-col md:flex-row md:items-start group"
                  >
                    {/* Glowing Node Point */}
                    <div className="absolute left-6 md:left-1/2 top-4 w-12 h-12 -translate-x-1/2 rounded-full border border-theme-p-500/20 bg-background flex items-center justify-center z-20 group-hover:border-theme-p-500/50 group-hover:shadow-[0_0_15px_rgba(var(--theme-p-500),0.4)] transition-all duration-300">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-theme-p-400 to-theme-s-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </div>
                    </div>

                    {/* Timeline Box */}
                    <div className="w-full md:w-[calc(50%-2.5rem)] ml-14 md:ml-0 md:group-odd:mr-auto md:group-even:ml-auto md:group-odd:text-right md:group-even:text-left">
                      
                      <div className={`p-6 md:p-8 rounded-3xl bg-[#09090c]/80 border transition-all duration-500 relative overflow-hidden ${
                        isNodeExpanded 
                          ? 'border-theme-p-500/40 shadow-[0_0_40px_rgba(var(--theme-p-500),0.1)] bg-[#0c0c11]' 
                          : 'border-white/5 hover:border-theme-p-500/20 hover:bg-[#0b0b0f] shadow-lg'
                      }`}>
                        
                        {/* Interactive glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-theme-p-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        {/* Time & Company */}
                        <div className={`flex flex-wrap items-center gap-2 mb-3 text-xs font-mono font-bold tracking-wider uppercase justify-center ${
                          exp.id === 'e1' ? 'md:group-odd:justify-end md:group-even:justify-start' : 'md:group-odd:justify-end md:group-even:justify-start'
                        }`}>
                          <span className="text-theme-p-400 bg-theme-p-500/10 px-2.5 py-1 rounded-md">{exp.company}</span>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-1 text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                            <Calendar size={11} />
                            {exp.duration}
                          </span>
                        </div>

                        {/* Role Title */}
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 tracking-tight">
                          {exp.role}
                        </h3>

                        {/* Descriptions */}
                        <ul className="space-y-3 text-left">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2.5">
                              <span className="text-theme-s-500 font-bold shrink-0 mt-1">▹</span>
                              <span className="font-sans font-medium">{desc}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack */}
                        {exp.techStack && exp.techStack.length > 0 && (
                          <div className={`flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-white/5 justify-center ${
                            exp.id === 'e1' ? 'md:group-odd:justify-end md:group-even:justify-start' : 'md:group-odd:justify-end md:group-even:justify-start'
                          }`}>
                            {exp.techStack.map(tech => (
                              <span key={tech} className="text-[11px] font-mono font-semibold text-theme-p-400 bg-theme-p-500/10 px-2.5 py-1 rounded-md tracking-tight">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Interactive inspector expansion trigger */}
                        <div className="mt-8 flex justify-center">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggleNode(exp.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase cursor-pointer border transition-all ${
                              isNodeExpanded 
                                ? 'bg-theme-p-600/20 text-theme-p-300 border-theme-p-500/30 shadow-[0_0_15px_rgba(var(--theme-p-500),0.15)]' 
                                : 'bg-white/5 text-slate-300 border-white/5 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Cpu size={13} className={isNodeExpanded ? 'animate-spin' : ''} />
                            {isNodeExpanded ? 'Close Diagnostics' : 'Inspect Architecture'}
                          </motion.button>
                        </div>

                      </div>

                      {/* Expanded Section (Interactive System Architecture Console) */}
                      <AnimatePresence>
                        {isNodeExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden w-full text-left"
                          >
                            <div className="bg-[#07070a]/90 border border-theme-p-500/30 rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-xl relative">
                              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1 bg-theme-p-500/10 border border-theme-p-500/20 rounded-md text-[10px] font-mono text-theme-p-400 uppercase tracking-wider font-bold">
                                <Activity size={10} className="animate-pulse" />
                                <span>Diagnostics Active</span>
                              </div>

                              {/* Tabs inside Inspector */}
                              <div className="flex gap-2 border-b border-white/5 pb-4 mb-4">
                                <button
                                  onClick={() => setSubTab(exp.id, 'topology')}
                                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight uppercase cursor-pointer transition-colors ${
                                    nodeSubTab === 'topology' 
                                      ? 'bg-theme-p-500/15 text-theme-p-300 border border-theme-p-500/20' 
                                      : 'text-slate-400 hover:text-white border border-transparent'
                                  }`}
                                >
                                  <Network size={12} />
                                  Topology
                                </button>
                                <button
                                  onClick={() => setSubTab(exp.id, 'telemetry')}
                                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight uppercase cursor-pointer transition-colors ${
                                    nodeSubTab === 'telemetry' 
                                      ? 'bg-theme-p-500/15 text-theme-p-300 border border-theme-p-500/20' 
                                      : 'text-slate-400 hover:text-white border border-transparent'
                                  }`}
                                >
                                  <Sliders size={12} />
                                  Telemetry
                                </button>
                                <button
                                  onClick={() => setSubTab(exp.id, 'console')}
                                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight uppercase cursor-pointer transition-colors ${
                                    nodeSubTab === 'console' 
                                      ? 'bg-theme-p-500/15 text-theme-p-300 border border-theme-p-500/20' 
                                      : 'text-slate-400 hover:text-white border border-transparent'
                                  }`}
                                >
                                  <Terminal size={12} />
                                  Terminal
                                </button>
                              </div>

                              {/* Tab Content */}
                              <AnimatePresence mode="wait">
                                {nodeSubTab === 'topology' && (
                                  <motion.div
                                    key="topology-tab"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-4"
                                  >
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                      Interactive micro-schematic representation of the systems architected during this role.
                                    </p>
                                    
                                    {exp.id === 'e1' ? (
                                      /* Lead Architect Topology Diagram */
                                      <div className="border border-white/5 rounded-2xl bg-black/40 p-4 flex flex-col gap-4">
                                        <div className="flex justify-between items-center bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                          <span className="text-[11px] font-mono font-bold text-slate-300">PIPELINE: CLINICAL AI & B2B ERP FLOW</span>
                                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                        </div>
                                        <div className="h-44 relative w-full flex items-center justify-around">
                                          {/* Connecting glowing SVG wires */}
                                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                            <defs>
                                              <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="var(--theme-p-500)" stopOpacity="0.2" />
                                                <stop offset="50%" stopColor="var(--theme-s-500)" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="var(--theme-p-500)" stopOpacity="0.2" />
                                              </linearGradient>
                                            </defs>
                                            <path d="M 40,88 L 130,88" stroke="url(#line-grad-1)" strokeWidth="1.5" fill="none" />
                                            <path d="M 170,88 L 260,88" stroke="url(#line-grad-1)" strokeWidth="1.5" fill="none" />
                                            <path d="M 170,88 Q 200,40 230,40 L 260,40" stroke="url(#line-grad-1)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                                            <path d="M 170,88 Q 200,136 230,136 L 260,136" stroke="url(#line-grad-1)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                                          </svg>

                                          <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-10 h-10 rounded-xl bg-theme-p-500/10 border border-theme-p-500/30 flex items-center justify-center text-theme-p-400">
                                              <Sliders size={16} />
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-tight">Client Ingress</span>
                                          </div>

                                          <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-10 h-10 rounded-xl bg-theme-s-500/10 border border-theme-s-500/30 flex items-center justify-center text-theme-s-400 animate-pulse">
                                              <Cpu size={16} />
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-tight">API Gateway</span>
                                          </div>

                                          <div className="flex flex-col gap-2 relative z-10">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-mono text-slate-300 font-bold">
                                              <Server size={11} className="text-theme-p-400" />
                                              Microservices (Replicated)
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-theme-p-500/30 rounded-lg text-[9px] font-mono text-theme-p-300 font-bold">
                                              <Zap size={11} className="text-theme-s-400 animate-bounce" />
                                              PyTorch Diagnostic Node
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-mono text-slate-300 font-bold">
                                              <Database size={11} className="text-slate-400" />
                                              PostgreSQL Master DB
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      /* Senior Systems Engineer Topology Diagram */
                                      <div className="border border-white/5 rounded-2xl bg-black/40 p-4 flex flex-col gap-4">
                                        <div className="flex justify-between items-center bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                          <span className="text-[11px] font-mono font-bold text-slate-300">PIPELINE: REDIS MEMORY / SYNC FLOW</span>
                                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                        </div>
                                        <div className="h-44 relative w-full flex items-center justify-around">
                                          {/* Connecting glowing SVG wires */}
                                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                            <defs>
                                              <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="var(--theme-p-500)" stopOpacity="0.2" />
                                                <stop offset="50%" stopColor="var(--theme-s-500)" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="var(--theme-p-500)" stopOpacity="0.2" />
                                              </linearGradient>
                                            </defs>
                                            <path d="M 50,88 Q 110,40 170,40" stroke="url(#line-grad-2)" strokeWidth="1.5" fill="none" />
                                            <path d="M 50,88 Q 110,136 170,136" stroke="url(#line-grad-2)" strokeWidth="1.5" fill="none" />
                                            <path d="M 210,40 Q 240,88 270,88" stroke="url(#line-grad-2)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                                            <path d="M 210,136 Q 240,88 270,88" stroke="url(#line-grad-2)" strokeWidth="1.5" fill="none" />
                                          </svg>

                                          <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-10 h-10 rounded-xl bg-theme-p-500/10 border border-theme-p-500/30 flex items-center justify-center text-theme-p-400">
                                              <Sliders size={16} />
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-tight">API Request</span>
                                          </div>

                                          <div className="flex flex-col gap-6 relative z-10">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-theme-s-500/10 border border-theme-s-500/30 rounded-lg text-[9px] font-mono text-theme-s-300 font-bold">
                                              <Zap size={11} className="text-theme-s-400 animate-pulse" />
                                              Redis Store (Hit: 94.6%)
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[9px] font-mono text-slate-300 font-bold">
                                              <Database size={11} className="text-slate-400" />
                                              PostgreSQL Master (Miss: 5.4%)
                                            </div>
                                          </div>

                                          <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-10 h-10 rounded-xl bg-theme-p-500/10 border border-theme-p-500/30 flex items-center justify-center text-theme-p-400">
                                              <Server size={16} />
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-tight">Response Output</span>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </motion.div>
                                )}

                                {nodeSubTab === 'telemetry' && (
                                  <motion.div
                                    key="telemetry-tab"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-4"
                                  >
                                    <div className="flex justify-between items-center">
                                      <p className="text-xs text-slate-400">
                                        Observed metrics of production clusters during active engineering intervals.
                                      </p>
                                      <button 
                                        onClick={() => triggerSimulation(exp.id)}
                                        disabled={isSimulating[exp.id]}
                                        className="flex items-center gap-1 px-2 py-1 rounded bg-theme-p-500/15 text-theme-p-300 border border-theme-p-500/20 text-[10px] font-mono font-bold uppercase hover:bg-theme-p-500/25 transition-colors cursor-pointer disabled:opacity-50"
                                      >
                                        <RefreshCw size={10} className={isSimulating[exp.id] ? 'animate-spin' : ''} />
                                        {isSimulating[exp.id] ? 'Simulating...' : 'Run Stress Test'}
                                      </button>
                                    </div>

                                    {/* Stress Simulation Progress bar */}
                                    {isSimulating[exp.id] && (
                                      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                        <div className="flex justify-between text-[10px] font-mono font-bold mb-1 text-slate-400">
                                          <span>GENERATING CONCURRENT TRAFFIC: {simulatedLoad[exp.id]}%</span>
                                          <span className="text-theme-p-400">15,400 rps</span>
                                        </div>
                                        <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                          <motion.div 
                                            className="h-full bg-gradient-to-r from-theme-p-500 to-theme-s-500"
                                            style={{ width: `${simulatedLoad[exp.id]}%` }}
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {exp.id === 'e1' ? (
                                      /* Lead Architect Telemetry Stats */
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">DIAGNOSTIC LATENCY</span>
                                          <span className="text-2xl font-bold font-mono text-theme-p-300 mt-2">-65%</span>
                                          <span className="text-[9px] font-mono text-slate-500">From 120ms baseline down to 42ms</span>
                                        </div>
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">SYSTEM UPTIME</span>
                                          <span className="text-2xl font-bold font-mono text-emerald-400 mt-2">99.998%</span>
                                          <span className="text-[9px] font-mono text-slate-500">Multi-zone SLA deployment standard</span>
                                        </div>
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">PAGE RENDERING</span>
                                          <span className="text-2xl font-bold font-mono text-theme-p-300 mt-2">&lt;1.0s</span>
                                          <span className="text-[9px] font-mono text-slate-500">Server Side Rendering & static hydration</span>
                                        </div>
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">MODEL THROUGHPUT</span>
                                          <span className="text-2xl font-bold font-mono text-theme-s-300 mt-2">45 fps</span>
                                          <span className="text-[9px] font-mono text-slate-500">Optimized tensor execution loops</span>
                                        </div>
                                      </div>
                                    ) : (
                                      /* Senior Systems Engineer Telemetry Stats */
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">DATABASE LATENCY</span>
                                          <span className="text-2xl font-bold font-mono text-theme-p-300 mt-2">-45%</span>
                                          <span className="text-[9px] font-mono text-slate-500">Index rebalancing and schema tune</span>
                                        </div>
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">CACHE HIT RATIO</span>
                                          <span className="text-2xl font-bold font-mono text-emerald-400 mt-2">94.6%</span>
                                          <span className="text-[9px] font-mono text-slate-500">Optimal Redis key serialization structure</span>
                                        </div>
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">REPLICA SYNC DELAY</span>
                                          <span className="text-2xl font-bold font-mono text-theme-p-300 mt-2">12 ms</span>
                                          <span className="text-[9px] font-mono text-slate-500">Near-instant cross-datacenter backups</span>
                                        </div>
                                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">API ROUTING LATENCY</span>
                                          <span className="text-2xl font-bold font-mono text-theme-s-300 mt-2">4 ms</span>
                                          <span className="text-[9px] font-mono text-slate-500">FastAPI routers holding Redis cache</span>
                                        </div>
                                      </div>
                                    )}
                                  </motion.div>
                                )}

                                {nodeSubTab === 'console' && (
                                  <motion.div
                                    key="console-tab"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-4"
                                  >
                                    {/* Live Terminal screen */}
                                    <div className="bg-[#020204] rounded-2xl border border-white/5 p-4 font-mono text-[11px] h-48 overflow-y-auto space-y-1 text-emerald-400 relative">
                                      {logs.map((log, index) => (
                                        <div key={index} className={log.startsWith('>') ? 'text-white font-bold' : log.includes('SUCCESS') || log.includes('ONLINE') ? 'text-emerald-400' : 'text-slate-400'}>
                                          {log}
                                        </div>
                                      ))}
                                    </div>

                                    {/* Action Buttons to execute commands */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                      <button 
                                        onClick={() => runTerminalCommand(exp.id, 'sys_info')}
                                        className="px-3 py-1.5 rounded bg-white/5 border border-white/5 font-mono text-[10px] font-bold text-slate-300 uppercase hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                      >
                                        sys_info
                                      </button>
                                      <button 
                                        onClick={() => runTerminalCommand(exp.id, 'diagnose')}
                                        className="px-3 py-1.5 rounded bg-white/5 border border-white/5 font-mono text-[10px] font-bold text-slate-300 uppercase hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                      >
                                        diagnose
                                      </button>
                                      <button 
                                        onClick={() => runTerminalCommand(exp.id, 'deploy_log')}
                                        className="px-3 py-1.5 rounded bg-white/5 border border-white/5 font-mono text-[10px] font-bold text-slate-300 uppercase hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                      >
                                        deploy_log
                                      </button>
                                      <button 
                                        onClick={() => runTerminalCommand(exp.id, 'clear')}
                                        className="px-3 py-1.5 rounded bg-theme-p-500/10 border border-theme-p-500/20 font-mono text-[10px] font-bold text-theme-p-400 uppercase hover:bg-theme-p-500/20 transition-colors cursor-pointer"
                                      >
                                        clear_buffer
                                      </button>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'education' && hasEducation && (
            <motion.div
              key="education-timeline"
              initial="hidden"
              whileInView="show"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } },
                exit: { opacity: 0, y: -20, transition: { duration: 0.25 } }
              }}
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-16"
            >
              {education.map((edu) => {
                const isNodeExpanded = expandedNode === edu.id;
                const nodeSubTab = activeSubTab[edu.id] || 'academics';

                return (
                  <motion.div 
                    key={edu.id}
                    variants={{
                      hidden: { opacity: 0, y: 25, scale: 0.98 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="relative flex flex-col md:flex-row md:items-start group animate-fade-in"
                  >
                    {/* Glowing Node Point */}
                    <div className="absolute left-6 md:left-1/2 top-4 w-12 h-12 -translate-x-1/2 rounded-full border border-theme-p-500/20 bg-background flex items-center justify-center z-20 group-hover:border-theme-p-500/50 group-hover:shadow-[0_0_15px_rgba(var(--theme-p-500),0.4)] transition-all duration-300">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-theme-p-400 to-theme-s-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </div>
                    </div>

                    {/* Timeline Box */}
                    <div className="w-full md:w-[calc(50%-2.5rem)] ml-14 md:ml-0 md:group-odd:mr-auto md:group-even:ml-auto md:group-odd:text-right md:group-even:text-left">
                      
                      <div className={`p-6 md:p-8 rounded-3xl bg-[#09090c]/80 border transition-all duration-500 relative overflow-hidden ${
                        isNodeExpanded 
                          ? 'border-theme-p-500/40 shadow-[0_0_40px_rgba(var(--theme-p-500),0.1)] bg-[#0c0c11]' 
                          : 'border-white/5 hover:border-theme-p-500/20 hover:bg-[#0b0b0f] shadow-lg'
                      }`}>
                        
                        {/* Interactive glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-theme-p-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        {/* Time & Institution */}
                        <div className={`flex flex-wrap items-center gap-2 mb-3 text-xs font-mono font-bold tracking-wider uppercase justify-center ${
                          edu.id === 'edu1' ? 'md:group-odd:justify-end md:group-even:justify-start' : 'md:group-odd:justify-end md:group-even:justify-start'
                        }`}>
                          <span className="text-theme-p-400 bg-theme-p-500/10 px-2.5 py-1 rounded-md">{edu.institution}</span>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-1 text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                            <Calendar size={11} />
                            {edu.duration}
                          </span>
                        </div>

                        {/* Degree Title */}
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 tracking-tight">
                          {edu.degree}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-300 text-sm leading-relaxed font-sans font-medium mb-6">
                          {edu.description}
                        </p>

                        {/* Interactive inspector expansion trigger */}
                        <div className="flex justify-center">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggleNode(edu.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase cursor-pointer border transition-all ${
                              isNodeExpanded 
                                ? 'bg-theme-p-600/20 text-theme-p-300 border-theme-p-500/30 shadow-[0_0_15px_rgba(var(--theme-p-500),0.15)]' 
                                : 'bg-white/5 text-slate-300 border-white/5 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Cpu size={13} className={isNodeExpanded ? 'animate-spin' : ''} />
                            {isNodeExpanded ? 'Close Syllabus' : 'View Core Specialization'}
                          </motion.button>
                        </div>

                      </div>

                      {/* Expanded Section (Interactive Education Detail Console) */}
                      <AnimatePresence>
                        {isNodeExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden w-full text-left"
                          >
                            <div className="bg-[#07070a]/90 border border-theme-p-500/30 rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-xl relative">
                              
                              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-p-400 mb-4 flex items-center gap-1.5">
                                <Sliders size={12} />
                                Core Academic Capabilities & Modules
                              </h4>

                              {edu.id === 'edu1' ? (
                                /* B.Sc CSE Modules breakdown with visual gauges */
                                <div className="space-y-4">
                                  <p className="text-xs text-slate-400">
                                    Primary academic areas with intensive development and analytical research.
                                  </p>
                                  <div className="space-y-3 pt-2">
                                    <div>
                                      <div className="flex justify-between text-xs font-mono mb-1.5">
                                        <span className="text-slate-200">Distributed & Cloud Architectures</span>
                                        <span className="text-theme-p-300 font-bold">96% Proficiency</span>
                                      </div>
                                      <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-gradient-to-r from-theme-p-500 to-theme-s-500"
                                          initial={{ width: 0 }}
                                          animate={{ width: '96%' }}
                                          transition={{ duration: 0.8, delay: 0.1 }}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs font-mono mb-1.5">
                                        <span className="text-slate-200">Neural Networks & Deep Learning Topologies</span>
                                        <span className="text-theme-p-300 font-bold">92% Proficiency</span>
                                      </div>
                                      <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-gradient-to-r from-theme-p-500 to-theme-s-500"
                                          initial={{ width: 0 }}
                                          animate={{ width: '92%' }}
                                          transition={{ duration: 0.8, delay: 0.2 }}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs font-mono mb-1.5">
                                        <span className="text-slate-200">Advanced Algorithmic Structures</span>
                                        <span className="text-theme-p-300 font-bold">95% Proficiency</span>
                                      </div>
                                      <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-gradient-to-r from-theme-p-500 to-theme-s-500"
                                          initial={{ width: 0 }}
                                          animate={{ width: '95%' }}
                                          transition={{ duration: 0.8, delay: 0.3 }}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs font-mono mb-1.5">
                                        <span className="text-slate-200">Enterprise Security & Compliance</span>
                                        <span className="text-theme-p-300 font-bold">88% Proficiency</span>
                                      </div>
                                      <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-gradient-to-r from-theme-p-500 to-theme-s-500"
                                          initial={{ width: 0 }}
                                          animate={{ width: '88%' }}
                                          transition={{ duration: 0.8, delay: 0.4 }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                /* Notre Dame College breakdown */
                                <div className="space-y-4">
                                  <p className="text-xs text-slate-400">
                                    Rigorous logical preparation under Notre Dame College science framework.
                                  </p>
                                  <div className="space-y-3 pt-2">
                                    <div>
                                      <div className="flex justify-between text-xs font-mono mb-1.5">
                                        <span className="text-slate-200">Calculus & Higher Mathematics</span>
                                        <span className="text-theme-p-300 font-bold">94%</span>
                                      </div>
                                      <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-gradient-to-r from-theme-p-500 to-theme-s-500"
                                          initial={{ width: 0 }}
                                          animate={{ width: '94%' }}
                                          transition={{ duration: 0.8 }}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs font-mono mb-1.5">
                                        <span className="text-slate-200">Analytical & Modern Physics</span>
                                        <span className="text-theme-p-300 font-bold">92%</span>
                                      </div>
                                      <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                                        <motion.div 
                                          className="h-full bg-gradient-to-r from-theme-p-500 to-theme-s-500"
                                          initial={{ width: 0 }}
                                          animate={{ width: '92%' }}
                                          transition={{ duration: 0.8 }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
}
