import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff } from 'lucide-react';

export function OfflineWarning() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check initial state
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-[#0A0A0C]/98 border border-red-500/50 rounded-2xl shadow-[0_10px_40px_rgba(239,68,68,0.2)] backdrop-blur-xl flex items-center gap-3 text-slate-200 text-sm font-medium whitespace-nowrap"
        >
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <WifiOff size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-red-400 font-bold uppercase tracking-wider text-[10px]">No Connection</span>
            <span>You are browsing in offline mode.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
