import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

interface LoadingScreenProps {
  onFinish?: () => void;
  message?: string;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onFinish, 
  message = "INITIALIZING BLACKVOLT RECRUITMENT PORTAL...",
  duration = 1000
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Authenticating session...");

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress < 30) {
        setStatusText("Authenticating session...");
      } else if (currentProgress < 70) {
        setStatusText("Loading domain frameworks & positions...");
      } else if (currentProgress < 95) {
        setStatusText("Synchronizing gateway...");
      } else {
        setStatusText("Ready");
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        if (onFinish) {
          setTimeout(onFinish, 150);
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [duration, onFinish]);

  return (
    <div className="fixed inset-0 z-[999] bg-[#0a0a0a] flex flex-col items-center justify-center p-6 select-none animate-in fade-in duration-200">
      {/* Background Ambience / Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0%,#0a0a0a_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center space-y-8">
        
        {/* Animated Radar / Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Rings */}
          <div className="absolute w-36 h-36 rounded-full border border-primary/20 animate-ping opacity-30"></div>
          <div className="absolute w-28 h-28 rounded-full border border-primary/40 animate-pulse"></div>
          <div className="w-20 h-20 rounded-2xl bg-black/80 border border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.3)] relative">
            <img src="/assets/logo.png" alt="BlackVolt" className="w-12 h-12 object-contain animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Title & Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-xs tracking-widest text-primary font-bold uppercase">
              BlackVolt Terminal
            </span>
          </div>
          <h2 className="font-display text-lg md:text-xl font-bold tracking-wider text-white">
            {message}
          </h2>
          <p className="font-mono text-xs text-gray-400">
            {statusText} <span className="text-primary font-bold">{progress}%</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs space-y-1.5">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-primary/60 via-primary to-cyan-300 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(0,229,255,0.8)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Prominent Disclaimer Banner in Loading Screen */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-md flex items-center gap-3 text-amber-300 max-w-sm text-left shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-in slide-in-from-bottom-2 duration-300">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs font-semibold leading-relaxed">
            <span className="uppercase text-amber-400 font-bold mr-1">Disclaimer:</span>
            Only apply if you&apos;re serious and willing to give your best.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
