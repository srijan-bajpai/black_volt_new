import React, { useState } from 'react';

interface NavbarProps {
  onOpenModal?: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal, onNavigate, currentPath = '/' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isRecruitmentPage = currentPath === '/recurtment' || currentPath === '/recruitment';

  const navigateTo = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleNavAnchor = (hash: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isRecruitmentPage) {
      // First go home, then scroll to section
      if (onNavigate) {
        onNavigate('/' + hash);
      } else {
        window.history.pushState({}, '', '/' + hash);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.replaceState(null, '', hash);
    }
  };

  const handleRecruitmentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('/recurtment');
    if (onOpenModal) {
      // optional modal callback support
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a 
          href="/" 
          onClick={(e) => navigateTo('/', e)} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img src="/assets/logo.png" alt="Blackvolt Logo" className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <span className="font-display font-bold text-lg tracking-wider hidden sm:block text-white group-hover:text-primary transition-colors">
            BLACKVOLT
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a 
            href="#mission" 
            onClick={(e) => handleNavAnchor('#mission', e)} 
            className="hover:text-primary transition-colors"
          >
            Mission
          </a>
          <a 
            href="#platform" 
            onClick={(e) => handleNavAnchor('#platform', e)} 
            className="hover:text-primary transition-colors"
          >
            Our Platforms
          </a>
          <a 
            href="#roadmap" 
            onClick={(e) => handleNavAnchor('#roadmap', e)} 
            className="hover:text-primary transition-colors"
          >
            Timeline
          </a>
          <a 
            href="#team" 
            onClick={(e) => handleNavAnchor('#team', e)} 
            className="hover:text-primary transition-colors"
          >
            Team
          </a>
          <button 
            onClick={handleRecruitmentClick} 
            className={`hover:text-primary transition-all relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${
              isRecruitmentPage 
                ? 'border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'border-primary/30 bg-primary/5 hover:bg-primary/10 text-gray-200'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-semibold">Recruitments</span>
          </button>
          <a 
            href="#contact" 
            onClick={(e) => handleNavAnchor('#contact', e)} 
            className="hover:text-primary transition-colors"
          >
            Contact Us
          </a>
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
              href="/" 
              onClick={(e) => navigateTo('/', e)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Home
            </a>
            <a 
              href="#mission" 
              onClick={(e) => handleNavAnchor('#mission', e)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Mission
            </a>
            <a 
              href="#platform" 
              onClick={(e) => handleNavAnchor('#platform', e)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Our Platforms
            </a>
            <a 
              href="#roadmap" 
              onClick={(e) => handleNavAnchor('#roadmap', e)} 
              className="hover:text-primary py-2 border-b border-white/5 transition-colors"
            >
              Timeline
            </a>
            <a 
              href="#team" 
              onClick={(e) => handleNavAnchor('#team', e)} 
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
              onClick={(e) => handleNavAnchor('#contact', e)} 
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