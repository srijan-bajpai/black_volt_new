import React, { useEffect } from 'react';
import { ShieldAlert, ArrowRight, Home, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onProceed: () => void;
  onGoHome: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onProceed,
  onGoHome,
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      {/* Background Cyber Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] text-gray-200 animate-in zoom-in-95 duration-200">
        
        {/* Close Button -> Goes back to Home */}
        <button
          onClick={onGoHome}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close and return to home"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                BlackVolt Directives
              </span>
            </div>
            <h3 id="disclaimer-title" className="text-xl font-bold font-display text-white tracking-wide">
              Candidate Notice
            </h3>
          </div>
        </div>

        {/* Primary Disclaimer Box */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 mb-6 shadow-inner">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-300 uppercase tracking-wide mb-1">
                Important Disclaimer
              </p>
              <p className="text-sm text-gray-200 font-medium leading-relaxed">
                Only apply if you&apos;re serious and willing to give your best.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Context Note */}
        <div className="space-y-2.5 text-xs text-gray-400 mb-8 leading-relaxed border-l-2 border-primary/30 pl-3.5 py-0.5">
          <div className="flex items-center gap-2 text-gray-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>High-impact autonomous underwater & defence-tech systems.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Requires continuous learning, technical discipline, and ownership.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <button
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider"
          >
            <Home className="w-4 h-4 text-gray-400" />
            <span>Go to Home Page</span>
          </button>

          <button
            onClick={onProceed}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-black hover:bg-white transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.35)]"
          >
            <span>Proceed to Recruitment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default DisclaimerModal;
