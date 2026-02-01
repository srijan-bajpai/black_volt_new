import React from 'react';
import { ASSETS } from '../constants/assets';

const Platform: React.FC = () => {
  return (
    <section id="platform" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('${ASSETS.platform.noiseTexture}')` }}></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Antarleen Section */}
        <div className="mb-16 anim-element anim-reveal-text">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-none uppercase">
            THE UUV <br />
            <span className="text-primary text-glow">PLATFORM</span>
          </h2>
          <div className="h-1 w-32 bg-primary rounded-full mb-8 shadow-[0_0_20px_rgba(0,229,255,0.6)]"></div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Project ANTARLEEN
              </h3>
              <p className="text-gray-400 max-w-xl font-light">
                A high-autonomy, deep-sea endurance vehicle designed for persistent surveillance and high-fidelity data acquisition in contested environments.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-primary text-xs tracking-widest uppercase border border-primary/30 px-3 py-1 rounded bg-primary/5 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                Flagship Model
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-24">
          <div className="w-full lg:w-5/12 anim-element anim-scale-subtle">
            <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden bg-[#0e0e0e] border border-primary/20 group shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${ASSETS.platform.antarleenBackground}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                <div className="backdrop-blur-xl bg-black/30 border border-primary/20 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.8)]"></div>
                  <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-wide text-glow">UNIT: ANTARLEEN-X</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                    <p className="text-primary font-mono text-sm uppercase tracking-widest font-bold text-glow">Status: Operational</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-7/12 anim-element anim-slide-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {[
                { label: 'Depth Rating', value: '6000', unit: 'm' },
                { label: 'Battery Life', value: '72', unit: 'Hrs' },
                { label: 'Payload Capacity', value: '50', unit: 'kg' },
                { label: 'Top Speed', value: '12', unit: 'Knots' },
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-[#0e0e0e] border border-white/10 rounded-2xl hover:border-primary/50 hover:bg-[#141414] transition-all duration-300 group flex flex-col justify-center">
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-hover:text-primary">{item.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-5xl font-mono text-white font-bold tracking-tighter group-hover:text-glow">{item.value}</h4>
                    <span className="text-sm text-gray-400 font-mono">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cygnus Section */}
        <div className="mb-16 anim-element anim-reveal-text">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-none uppercase">
            MISSION <br />
            <span className="text-secondary text-glow-secondary">HORIZONS</span>
          </h2>
          <div className="h-1 w-32 bg-secondary rounded-full mb-8 shadow-[0_0_20px_rgba(0,255,255,0.6)]"></div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Project CYGNUS
              </h3>
              <p className="text-gray-400 max-w-xl font-light">
                Expanding autonomous intelligence beyond the deep sea. A next-generation CubeSat platform designed for low-latency earth observation.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-secondary text-xs tracking-widest uppercase border border-secondary/30 px-3 py-1 rounded bg-secondary/5 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                Space Tech
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-5/12 anim-element anim-scale-subtle">
            <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden bg-[#0e0e0e] border border-secondary/20 group shadow-[0_0_30px_rgba(0,255,255,0.1)]">
              <div className="absolute inset-0 flex items-center justify-center opacity-60" style={{ backgroundImage: "radial-gradient(circle at center, #004d40 0%, #000000 70%)" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border border-secondary/30 rounded-lg animate-pulse flex items-center justify-center bg-secondary/5">
                  <span className="text-secondary/50 font-mono text-xs">CYGNUS RENDER</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                <div className="backdrop-blur-xl bg-black/30 border border-secondary/20 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]"></div>
                  <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-wide text-glow-secondary">UNIT: CYGNUS-1</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                    </span>
                    <p className="text-secondary font-mono text-sm uppercase tracking-widest font-bold text-glow-secondary">Status: In Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-7/12 anim-element anim-slide-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {[
                { label: 'Orbit', value: 'LEO', unit: '(550km)' },
                { label: 'Endurance', value: '5+', unit: 'Years' },
                { label: 'Payload', value: 'Multispectral Cam', unit: '', isText: true },
                { label: 'Orbital Speed', value: '7.8', unit: 'km/s' },
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-[#0e0e0e] border border-white/10 rounded-2xl hover:border-secondary/50 hover:bg-[#141414] transition-all duration-300 group flex flex-col justify-center">
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-hover:text-secondary">{item.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h4 className={`${item.isText ? 'text-xl' : 'text-5xl'} font-mono text-white font-bold tracking-tighter group-hover:text-glow-secondary`}>{item.value}</h4>
                    {item.unit && <span className="text-sm text-gray-400 font-mono">{item.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;