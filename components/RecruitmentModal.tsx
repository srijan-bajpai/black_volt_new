import React from 'react';

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecruitmentModal: React.FC<RecruitmentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden" id="recruitment-modal">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[32px] animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-[85vw] bg-[#0a0a0a]/90 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300" id="modal-content">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
        <button className="absolute top-8 right-8 text-secondary hover:text-white transition-all duration-300 z-50 group" onClick={onClose}>
          <span className="material-symbols-outlined text-4xl group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">close</span>
        </button>
        <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-[10px] tracking-widest uppercase mb-6 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Career Gateway
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Seeking driven <br /><span className="text-secondary text-glow-secondary">builders.</span>
              </h2>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-sm text-secondary">location_on</span> Location: Hybrid / Chennai, India
                </span>
                <span className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-sm text-secondary">schedule</span> Timeline: 2-3 weeks total
                </span>
              </div>
            </div>
            <div className="lg:w-1/3 w-full bg-secondary/5 border border-secondary/10 p-6 rounded-2xl">
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Help us shape next-gen autonomous systems. We value engineering discipline, rapid prototyping, and a commitment to deep-tech excellence.
              </p>
              <a href="#" className="block w-full text-center py-4 bg-secondary text-black font-bold uppercase tracking-widest rounded text-sm hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,255,255,0.3)]">
                Apply via Google Form
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-secondary"></span>
                Perks & Culture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  { title: "Cutting-Edge Tech Stack", desc: "Working with ROS2, Python, C++, and advanced AI models." },
                  { title: "Autonomous Ownership", desc: "Full control over your modules from design to deployment." },
                  { title: "Research-First Approach", desc: "Publication support and focus on novel engineering solves." },
                  { title: "Competitive Equity", desc: "Early-stage participation in our growth and success." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-secondary"></span>
                What to expect
              </h3>
              <div className="space-y-4">
                {[
                  { id: "01", title: "Quick application", desc: "Initial review of your portfolio & background." },
                  { id: "02", title: "Screening call", desc: "30-min technical/cultural alignment call." },
                  { id: "03", title: "Task / Discussion", desc: "Deep-dive technical challenge or session." },
                  { id: "04", title: "Final decision", desc: "Offer and onboarding roadmap discussed." }
                ].map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <span className="w-8 h-8 rounded bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold border border-secondary/30 shrink-0">{item.id}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-secondary"></span>
                Open roles
              </h3>
              <div className="space-y-3">
                {[
                  "Autonomy / CV",
                  "Embedded Systems",
                  "Mechanical Engineering",
                  "Full-stack Software",
                  "Ops / Hardware"
                ].map((role, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 group hover:border-secondary transition-colors cursor-default">
                    <span className="text-sm font-medium text-white">{role}</span>
                    <span className="material-symbols-outlined text-sm text-gray-600 group-hover:text-secondary">arrow_forward_ios</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentModal;