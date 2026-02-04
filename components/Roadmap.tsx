import React from 'react';

const Roadmap: React.FC = () => {
  const milestones = [
    {
      time: "Early 2025",
      title: "Registration",
      desc: "Official incorporation of Blackvolt Technologies and legal framework establishment.",
      delay: "0ms",
      colStart: 1,
      rowStart: 1,
      self: "md:self-end md:pb-12",
      dotPos: "bottom"
    },
    {
      time: "Mid 2025",
      title: "Project Initiation",
      desc: "Commencement of core research, team assembly, and initial funding validation.",
      delay: "150ms",
      colStart: 2,
      rowStart: 2,
      self: "md:self-start md:pt-12",
      dotPos: "top"
    },
    {
      time: "Late 2025",
      title: "Tech Development",
      desc: "Deep dive into sensor fusion algorithms and hydrodynamic hull simulations.",
      delay: "300ms",
      colStart: 3,
      rowStart: 1,
      self: "md:self-end md:pb-12",
      dotPos: "bottom"
    },
    {
      time: "Early to Mid 2026",
      title: "1st Prototype",
      desc: "Field trials of the first integrated autonomous underwater vehicle.",
      delay: "450ms",
      colStart: 4,
      rowStart: 2,
      self: "md:self-start md:pt-12",
      dotPos: "top"
    }
  ];

  return (
    <section id="roadmap" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 anim-element anim-zoom-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-clip-text-metallic uppercase tracking-tight">Development Roadmap</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Strategic milestones defining our path to autonomous capability.</p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(0,229,255,0.4)]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-12 md:gap-4">
            {milestones.map((m, idx) => (
              <div 
                key={idx}
                className={`relative flex flex-col md:col-start-${m.colStart} md:row-start-${m.rowStart} ${m.self} group anim-element anim-slide-right`}
                style={{ transitionDelay: m.delay }}
              >
                <div className={`hidden md:block absolute ${m.dotPos === 'bottom' ? 'bottom-[-6px]' : 'top-[-6px]'} left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border-2 border-primary rounded-full z-10 shadow-[0_0_15px_rgba(0,229,255,0.8)] group-hover:bg-primary group-hover:scale-125 transition-all duration-300`}></div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-primary/40 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                  <span className="text-primary font-mono text-xs font-bold tracking-widest uppercase mb-1 block">{m.time}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;