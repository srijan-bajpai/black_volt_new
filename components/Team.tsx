import React from 'react';
import { Cpu, Rocket, Linkedin, Twitter, Github } from 'lucide-react';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 anim-element anim-zoom-in">
          <h2 className="font-display text-4xl font-bold mb-4 text-white uppercase tracking-tight">Our Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the engineers behind BLACKVOLT Technologies — united by curiosity, technical rigor, and a shared commitment to advancing India's autonomous underwater capability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Garv Pathak */}
          <div className="bg-[#111111]/50 border border-white/10 rounded-2xl p-8 text-center hover:border-primary/30 transition-colors anim-element anim-team-entry">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border border-primary/20 mb-6">
              <img src="/assets/garv.png" alt="Garv Pathak" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-white">Mr. Garv Pathak</h3>
            <p className="text-primary text-xs uppercase tracking-wider mb-4">Co-Founder & CEO — AI Systems</p>
            <p className="text-sm text-gray-400 mb-6">Leads overall system architecture, AI integration, and long-term technical direction.</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.linkedin.com/in/garv-pathak/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Sarthak Varchaswi */}
          <div className="bg-[#111111]/50 border border-white/10 rounded-2xl p-8 text-center hover:border-primary/30 transition-colors anim-element anim-team-entry" style={{ transitionDelay: '100ms' }}>
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border border-primary/20 mb-6">
              <img src="/assets/sarthak.png" alt="Sarthak Varchaswi" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-white">Mr. Sarthak Varchaswi</h3>
            <p className="text-primary text-xs uppercase tracking-wider mb-4">Co-Founder & CTO — Robotics</p>
            <p className="text-sm text-gray-400 mb-6">Heads mechanical design, embedded systems, and autonomy integration.</p>
            <div className="flex justify-center gap-4">
                <a href="https://www.linkedin.com/in/sarthakvarchasvi/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;