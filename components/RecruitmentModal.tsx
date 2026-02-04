import React, { useEffect, useState } from 'react';

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecruitmentModal: React.FC<RecruitmentModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 100); // Add a slight delay for smooth transition
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden" id="recruitment-modal">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[32px] animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-[85vw] bg-[#0a0a0a]/90 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300" id="modal-content">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
        <button className="absolute top-8 right-8 text-secondary hover:text-white transition-all duration-300 z-50 group" onClick={onClose}>
          <span className="material-symbols-outlined text-4xl group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">close</span>
        </button>
        <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar flex items-center justify-center h-full">
          <div className={`text-center max-w-3xl transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-[10px] tracking-widest uppercase mb-6 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Announcement
            </div>
            <h2 className="font-mono text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Starting soon...!!
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Stay tuned for something exciting!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentModal;