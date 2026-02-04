import React from 'react';
import { Crosshair, Anchor, Quote } from 'lucide-react';

const Mission: React.FC = () => {
  return (
    <section id="mission" className="py-24 bg-[#0a0a0a] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="max-w-4xl mx-auto px-6 text-center mb-20 anim-element anim-zoom-in">
        <h2 className="font-display text-4xl font-bold mb-6 bg-clip-text-metallic uppercase tracking-tight">Why We Exist</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Underwater environments represent one of the most challenging operational domains for autonomous systems.
          Severe signal attenuation, unreliable localization, and limited sensing make traditional robotic approaches insufficient.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group relative p-8 rounded-2xl bg-[#111111] border border-white/10 hover:border-primary/50 transition-all duration-300 anim-element anim-slide-left">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
            <Crosshair className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-bold font-display text-white mb-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Our Vision
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            To contribute to India's long-term maritime and strategic autonomy by developing indigenous unmanned underwater systems capable of intelligent, sustained, and cooperative operation without continuous external support.
          </p>
        </div>
        
        <div className="group relative p-8 rounded-2xl bg-[#111111] border border-white/10 hover:border-primary/50 transition-all duration-300 anim-element anim-slide-right" style={{ transitionDelay: '100ms' }}>
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
            <Anchor className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-bold font-display text-white mb-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Our Mission
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            To design, prototype, and validate a mission-grade autonomous UUV platform that integrates robust underwater perception, intelligent navigation, resilient communication, and cooperative multi-agent behavior.
          </p>
        </div>
        
        <div className="md:col-span-2 mt-8 anim-element anim-bento-zoom">
          <div className="relative p-12 rounded-2xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="w-8 h-8 text-primary/30 mx-auto mb-6">
                <Quote />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-light text-white italic mb-6">
              "We approach this challenge with humility, recognizing the complexity of real-world deployment and the importance of rigorous feedback."
            </h3>
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Blackvolt Philosophy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;