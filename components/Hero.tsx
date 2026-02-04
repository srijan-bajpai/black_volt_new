import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../constants/assets';
import '@google/model-viewer';

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0a0a0a]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#0a0a0a] -z-20"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 z-10 anim-element anim-zoom-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Inducted with VNEST
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            ENGINEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">AUTONOMOUS</span> <br />
            <span className="text-primary text-glow">UNDERWATER</span> <br />
            SYSTEMS
          </h1>
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed border-l-2 border-primary/30 pl-6">
            Blackvolt Technologies is a deep-tech startup focused on the design, development, and validation of autonomous unmanned underwater vehicles (UUVs) for extreme environments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Get In Touch <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#platform"
              className="px-8 py-4 border border-gray-700 hover:border-primary text-white font-bold uppercase tracking-wider hover:bg-primary/5 transition-all duration-300 text-center"
            >
              Explore Platform
            </a>
          </div>
        </div>

        {/* Right Content - 3D Model */}
        <div className="relative h-[500px] w-full lg:h-[700px] flex items-center justify-center anim-element anim-slide-in-right" style={{ transitionDelay: '200ms' }}>
          <div className="absolute inset-0 border border-primary/20 rounded-2xl canvas-grid mask-image-gradient bg-[#0a0a0a]"></div>
          
          {/* 3D Model Container with NEON GLOW Background */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center group"
               style={{ 
                 background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.1) 0%, #0a0a0a 70%)',
                 boxShadow: 'inset 0 0 50px rgba(0, 229, 255, 0.05)'
               }}>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <model-viewer
                src={ASSETS.uuvModel}
                poster={ASSETS.modelPoster}
                alt="UUV 3D Model"
                camera-controls
                auto-rotate
                autoplay
                ar
                shadow-intensity="1"
                exposure="1.2"
                class="absolute inset-0 w-full h-full"
                // This removes the default gray background of the viewer itself
                style={{ backgroundColor: 'transparent' }} 
              ></model-viewer>
              
              {/* Subtle Scanline Overlay for "Tech" feel */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
            </div>

            {/* HUD Elements */}
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
              <div className="h-1 w-12 bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)]"></div>
              <div className="h-1 w-6 bg-primary/50"></div>
            </div>
            <div className="absolute bottom-6 right-6 font-mono text-primary/80 text-xs z-20 text-right pointer-events-none">
              SYS.STATUS: ONLINE<br />
              DEPTH: 0.0M
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;