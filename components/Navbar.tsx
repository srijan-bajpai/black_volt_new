import React from 'react';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center border border-primary/40">
            <span className="font-display font-bold text-primary text-xl">B</span>
          </div>
          <span className="font-display font-bold text-lg tracking-wider hidden sm:block text-white">
            BLACKVOLT
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#mission" className="hover:text-primary transition-colors">Mission</a>
          <a href="#platform" className="hover:text-primary transition-colors">Our Platforms</a>
          <a href="#roadmap" className="hover:text-primary transition-colors">Timeline</a>
          <a href="#team" className="hover:text-primary transition-colors">Team</a>
          <button onClick={onOpenModal} className="hover:text-primary transition-colors">
            Recruitments
          </button>
        </div>
        <a
          href="#contact"
          className="px-5 py-2 text-xs font-bold uppercase tracking-widest border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300 rounded"
        >
          Get Access
        </a>
      </div>
    </nav>
  );
};

export default Navbar;