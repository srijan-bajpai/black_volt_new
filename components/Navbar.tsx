import React from 'react';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Blackvolt Logo" className="w-10 h-10" />
          <span className="font-display font-bold text-lg tracking-wider hidden sm:block text-white">
            BLACKVOLT
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#mission" className="hover:text-primary transition-colors">Mission</a>
          <a href="#platform" className="hover:text-primary transition-colors">Our Platforms</a>
          <a href="#roadmap" className="hover:text-primary transition-colors">Timeline</a>
          <a href="#team" className="hover:text-primary transition-colors">Team</a>
          <button onClick={onOpenModal} className="hover:text-primary transition-colors">
            Recruitments
          </button>
          <a href="#contact" className="hover:text-primary transition-colors">Contact Us</a>
        </div>
        <a
          href="mailto:blackvolt.tech@gmail.com"
          target = "_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 text-xs font-bold uppercase tracking-widest border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300 rounded"
        >
          Get Access
        </a>
      </div>
    </nav>
  );
};

export default Navbar;