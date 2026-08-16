import React, { useState } from 'react';

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRecruitmentClick = () => {
    onOpenModal();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Blackvolt Logo" className="w-10 h-10" />
          <span className="font-display font-bold text-lg tracking-wider hidden sm:block text-white">
            BLACKVOLT
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#mission" className="hover:text-primary transition-colors">Mission</a>
          <a href="#platform" className="hover:text-primary transition-colors">Our Platforms</a>
          <a href="#roadmap" className="hover:text-primary transition-colors">Timeline</a>
          <a href="#team" className="hover:text-primary transition-colors">Team</a>
          <button 
            onClick={onOpenModal} 
            className="hover:text-primary transition-colors relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Recruitments</span>
          </button>
          <a href="#contact" className="hover:text-primary transition-colors">Contact Us</a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:blackvolt.tech@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-5 py-2 text-xs font-bold uppercase tracking-widest border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300 rounded"
          >
            Get In Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-lg animate-in slide-in-from-top duration-300">
          <div className="px-6 py-6 flex flex-col gap-5 text-base font-medium text-gray-300">
            <a 
              href="#mission" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Mission
            </a>
            <a 
              href="#platform" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Our Platforms
            </a>
            <a 
              href="#roadmap" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Timeline
            </a>
            <a 
              href="#team" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Team
            </a>
            <button 
              onClick={handleRecruitmentClick} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors text-left flex items-center justify-between text-[#00E5FF] font-semibold"
            >
              <span>Recruitments Portal</span>
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </button>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:blackvolt.tech@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full text-center py-3 text-xs font-bold uppercase tracking-widest border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300 rounded"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;