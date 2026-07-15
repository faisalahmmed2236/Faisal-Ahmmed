import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, QrCode, Shield, Cpu, RefreshCw, Layers, CheckCircle2, Sliders, Activity, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

export function Achievements() {
  const { portfolioData } = useLanguage();
  const { achievements } = portfolioData;

  // Widget 1: EU DPP Circularity Protocol State
  const [dppAuditStatus, setDppAuditStatus] = useState<'idle' | 'auditing' | 'completed'>('idle');
  const [dppProgress, setDppProgress] = useState(0);

  // Widget 2: Pathology AI State
  const [aiFilter, setAiFilter] = useState<'visible' | 'activation' | 'gradcam'>('visible');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.85);

  // Widget 3: Enterprise Orchestration State
  const [agentStep, setAgentStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [agentLog, setAgentLog] = useState<string[]>(['Cognitive engine sleeping. Press run to dispatch.']);

  // Widget 1: Run DPP Ledger Audit
  const triggerDppAudit = () => {
    if (dppAuditStatus === 'auditing') return;
    triggerVibration(hapticPatterns.medium);
    setDppAuditStatus('auditing');
    setDppProgress(0);

    const interval = setInterval(() => {
      setDppProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDppAuditStatus('completed');
          triggerVibration(hapticPatterns.success);
          return 100;
        }
        return prev + 8;
      });
    }, 100);
  };

  const resetDppAudit = () => {
    triggerVibration(hapticPatterns.light);
    setDppAuditStatus('idle');
    setDppProgress(0);
  };

  // Widget 3: Dispatch Agent Simulation
  const triggerAgentPipeline = () => {
    if (agentStep > 0 && agentStep < 4) return;
    triggerVibration(hapticPatterns.medium);
    setAgentStep(1);
    setAgentLog(['[INIT]: Natural Language Request received.', 'Routing to Language Router...']);

    setTimeout(() => {
      setAgentStep(2);
      triggerVibration(hapticPatterns.light);
      setAgentLog(prev => [
        ...prev, 
        '[ROUTER]: Intent parsed: "Audit B2B inventory provenance".', 
        'Querying RAG Vector Indexer...'
      ]);
    }, 1500);

    setTimeout(() => {
      setAgentStep(3);
      triggerVibration(hapticPatterns.light);
      setAgentLog(prev => [
        ...prev, 
        '[RAG]: Top 3 vector records loaded. High similarity matches confirmed.', 
        'Executing secure python code environment...'
      ]);
    }, 3000);

    setTimeout(() => {
      setAgentStep(4);
      triggerVibration(hapticPatterns.success);
      setAgentLog(prev => [
        ...prev, 
        '[SELF-HEALER]: Verified output formatting against JSON Schema.', 
        '[SUCCESS]: SLA satisfied. Output returned in 480ms.'
      ]);
    }, 4500);
  };

  const resetAgentPipeline = () => {
    triggerVibration(hapticPatterns.light);
    setAgentStep(0);
    setAgentLog(['Cognitive engine sleeping. Press run to dispatch.']);
  };

  const ui = portfolioData.ui || {};

  return (
    <motion.section 
      id="achievements" 
      className="py-12 md:py-20 relative bg-black/30 overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
    >
      {/* Visual background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-theme-p-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title={ui.achievementsTitle || "Career Milestones"} 
          subtitle={ui.achievementsSubtitle || "Key Elite Accomplishments & Verifiable Protocols"} 
          readTime={`2 ${ui.readTime || 'min read'}`} 
        />
        
        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch relative z-10">
          
          {/* Card 1: EU DPP Circularity Protocol */}
          {achievements[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between p-6 md:p-8 bg-[#09090c]/80 border border-white/5 rounded-3xl hover:border-theme-p-500/20 hover:bg-[#0b0b0f] transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-p-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-theme-p-500/10 border border-theme-p-500/20 flex items-center justify-center text-theme-p-400 group-hover:shadow-[0_0_15px_rgba(var(--theme-p-500),0.3)] transition-all duration-300">
                    <QrCode size={22} />
                  </div>
                  <time className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono font-bold text-theme-p-400">{achievements[0].year}</time>
                </div>

                <h4 className="font-display font-bold text-xl md:text-2xl text-white mb-3 tracking-tight">
                  {achievements[0].title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-sans font-medium mb-6">
                  {achievements[0].description}
                </p>
              </div>

              {/* Interactive Widget 1: DPP Audit Simulator */}
              <div className="mt-4 pt-6 border-t border-white/5 bg-black/30 rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5 uppercase">
                    <Shield size={12} className="text-emerald-400 animate-pulse" />
                    Ledger Auditor
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">CIRC_V2.1</span>
                </div>

                {dppAuditStatus === 'idle' && (
                  <div className="h-28 flex flex-col items-center justify-center gap-3 text-center">
                    <div className="relative w-12 h-12 border border-white/10 rounded-xl flex items-center justify-center bg-[#09090c] overflow-hidden group/qr">
                      <QrCode size={24} className="text-slate-500 group-hover/qr:text-theme-p-400 transition-colors" />
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-theme-p-500 opacity-40 animate-[bounce_2s_infinite]" />
                    </div>
                    <button
                      onClick={triggerDppAudit}
                      className="px-4 py-1.5 rounded-lg bg-theme-p-500/10 border border-theme-p-500/20 hover:bg-theme-p-500/20 text-theme-p-300 font-mono text-[10px] font-bold tracking-wider uppercase cursor-pointer transition-all"
                    >
                      Audit Circularity QR
                    </button>
                  </div>
                )}

                {dppAuditStatus === 'auditing' && (
                  <div className="h-28 flex flex-col justify-center gap-2">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 uppercase">
                      <span>Syncing Ledger Proofs</span>
                      <span className="text-theme-p-400">{dppProgress}%</span>
                    </div>
                    <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-theme-p-500 to-theme-s-500" style={{ width: `${dppProgress}%` }} />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 animate-pulse mt-1">Verifying SHA-256 blocks...</span>
                  </div>
                )}

                {dppAuditStatus === 'completed' && (
                  <div className="h-28 flex flex-col justify-between text-xs font-mono bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] uppercase">
                      <CheckCircle2 size={12} />
                      Ledger Signature Verified
                    </div>
                    <div className="space-y-1 text-[9px] text-slate-400 pt-1">
                      <div><span className="text-slate-500">ORIGIN:</span> GERMANY INDUSTRIAL CENTRAL (ESG AAA)</div>
                      <div><span className="text-slate-500">CARBON:</span> -34.8% NET OFFSET (VERIFIED)</div>
                      <div><span className="text-slate-500">RECYCLED:</span> 84.2% CERTIFIED SHIELDS</div>
                      <div><span className="text-slate-500">RE-USE RATE:</span> 98.2% CIRCULAR DESIGN APPROVED</div>
                    </div>
                    <button
                      onClick={resetDppAudit}
                      className="mt-2 text-slate-500 hover:text-white hover:underline text-[9px] uppercase font-bold text-left cursor-pointer transition-colors"
                    >
                      Reset Ledger Key
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Card 2: Pathology AI Diagnostic Pipeline */}
          {achievements[1] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between p-6 md:p-8 bg-[#09090c]/80 border border-white/5 rounded-3xl hover:border-theme-p-500/20 hover:bg-[#0b0b0f] transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-p-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-theme-p-500/10 border border-theme-p-500/20 flex items-center justify-center text-theme-p-400 group-hover:shadow-[0_0_15px_rgba(var(--theme-p-500),0.3)] transition-all duration-300">
                    <Activity size={22} />
                  </div>
                  <time className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono font-bold text-theme-p-400">{achievements[1].year}</time>
                </div>

                <h4 className="font-display font-bold text-xl md:text-2xl text-white mb-3 tracking-tight">
                  {achievements[1].title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-sans font-medium mb-6">
                  {achievements[1].description}
                </p>
              </div>

              {/* Interactive Widget 2: Explainable AI heatmap */}
              <div className="mt-4 pt-6 border-t border-white/5 bg-black/30 rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5 uppercase">
                    <Layers size={12} className="text-theme-p-400 animate-pulse" />
                    Grad-CAM XAI Visualizer
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">ROC_AUC: 0.994</span>
                </div>

                {/* Filter Swaps */}
                <div className="flex gap-1 bg-black/50 p-1 rounded-lg border border-white/5">
                  {(['visible', 'activation', 'gradcam'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => { triggerVibration(hapticPatterns.light); setAiFilter(filter); }}
                      className={`flex-1 text-[9px] font-mono font-bold uppercase py-1 rounded cursor-pointer transition-all ${
                        aiFilter === filter 
                          ? 'bg-theme-p-500/15 text-theme-p-300 border border-theme-p-500/20' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Simulated cell sample viewport */}
                <div className="h-20 bg-black/60 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5">
                  {/* Mock cells with styled circles */}
                  <div className="flex gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 relative flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    </div>
                    
                    {/* The diagnostic anomaly cell */}
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 relative flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      {/* Gradcam visual effects */}
                      {aiFilter === 'activation' && (
                        <div className="absolute inset-0 bg-gradient-to-radial from-amber-500/75 to-transparent blur-[4px] rounded-full" />
                      )}
                      {aiFilter === 'gradcam' && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-radial from-red-600/70 to-transparent blur-[4px] rounded-full" />
                          {confidenceThreshold < 0.92 && (
                            <div className="absolute -inset-1 border border-red-500 rounded-lg animate-[ping_2s_infinite]" />
                          )}
                        </>
                      )}
                    </div>

                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 relative flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    </div>
                  </div>

                  <div className="absolute bottom-1 right-2 text-[8px] font-mono text-slate-500">
                    {aiFilter === 'visible' && 'VISIBLE_SPECTRUM'}
                    {aiFilter === 'activation' && 'NEURAL_HEATMAP'}
                    {aiFilter === 'gradcam' && (confidenceThreshold < 0.92 ? 'ANOMALY_CONFIRMED' : 'HIGH_THRESHOLD_IDLE')}
                  </div>
                </div>

                {/* Adjust Confidence Threshold */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase">
                    <span>Model Confidence Filter</span>
                    <span className="text-theme-p-400 font-bold">{(confidenceThreshold * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.50"
                    max="0.99"
                    step="0.01"
                    value={confidenceThreshold}
                    onChange={(e) => {
                      triggerVibration(hapticPatterns.light);
                      setConfidenceThreshold(parseFloat(e.target.value));
                    }}
                    className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-theme-p-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Card 3: Enterprise Orchestration Engine */}
          {achievements[2] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between p-6 md:p-8 bg-[#09090c]/80 border border-white/5 rounded-3xl hover:border-theme-p-500/20 hover:bg-[#0b0b0f] transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-theme-p-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-theme-p-500/10 border border-theme-p-500/20 flex items-center justify-center text-theme-p-400 group-hover:shadow-[0_0_15px_rgba(var(--theme-p-500),0.3)] transition-all duration-300">
                    <Cpu size={22} />
                  </div>
                  <time className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono font-bold text-theme-p-400">{achievements[2].year}</time>
                </div>

                <h4 className="font-display font-bold text-xl md:text-2xl text-white mb-3 tracking-tight">
                  {achievements[2].title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed font-sans font-medium mb-6">
                  {achievements[2].description}
                </p>
              </div>

              {/* Interactive Widget 3: Multi-Agent Orchestrator */}
              <div className="mt-4 pt-6 border-t border-white/5 bg-black/30 rounded-2xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5 uppercase">
                    <Terminal size={12} className="text-theme-s-400 animate-pulse" />
                    Cognitive Engine
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">RAG_ORCHESTRATOR</span>
                </div>

                {/* Flow Indicators */}
                <div className="flex items-center justify-around py-1.5 border border-white/5 rounded-xl bg-black/50">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full border ${
                      agentStep === 1 ? 'bg-theme-p-500 border-theme-p-400 animate-pulse' : agentStep > 1 ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-800 border-slate-700'
                    }`} />
                    <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase font-bold">Router</span>
                  </div>
                  <div className="w-6 h-[1px] bg-white/10" />
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full border ${
                      agentStep === 2 ? 'bg-theme-p-500 border-theme-p-400 animate-pulse' : agentStep > 2 ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-800 border-slate-700'
                    }`} />
                    <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase font-bold">RAG db</span>
                  </div>
                  <div className="w-6 h-[1px] bg-white/10" />
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full border ${
                      agentStep === 3 ? 'bg-theme-p-500 border-theme-p-400 animate-pulse' : agentStep > 3 ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-800 border-slate-700'
                    }`} />
                    <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase font-bold">Runtime</span>
                  </div>
                  <div className="w-6 h-[1px] bg-white/10" />
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full border ${
                      agentStep === 4 ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-800 border-slate-700'
                    }`} />
                    <span className="text-[8px] font-mono text-slate-500 mt-1 uppercase font-bold">Secure</span>
                  </div>
                </div>

                {/* Scrolling Logs */}
                <div className="bg-[#020204] rounded-xl p-3 border border-white/5 font-mono text-[9px] h-16 overflow-y-auto text-theme-s-400 space-y-0.5 select-none">
                  {agentLog.map((log, i) => (
                    <div key={i} className={log.startsWith('[SUCCESS]') ? 'text-emerald-400 font-bold' : log.startsWith('[INIT]') ? 'text-white' : 'text-slate-400'}>
                      {log}
                    </div>
                  ))}
                </div>

                {/* Interactive buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={triggerAgentPipeline}
                    disabled={agentStep > 0 && agentStep < 4}
                    className="flex-1 px-3 py-1.5 bg-theme-p-500/10 border border-theme-p-500/20 hover:bg-theme-p-500/20 disabled:opacity-50 text-theme-p-300 font-mono text-[9px] font-bold tracking-wider uppercase cursor-pointer rounded-lg transition-colors text-center"
                  >
                    {agentStep > 0 && agentStep < 4 ? 'Processing...' : 'Dispatch Agent Pipeline'}
                  </button>
                  {agentStep === 4 && (
                    <button
                      onClick={resetAgentPipeline}
                      className="px-2 py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 font-mono text-[9px] font-bold uppercase cursor-pointer rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </motion.section>
  );
}
