import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Platform from './components/Platform';
import Roadmap from './components/Roadmap';
import Team from './components/Team';
import Footer from './components/Footer';
import RecruitmentModal from './components/RecruitmentModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Scroll Animation Observer Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.anim-element, .reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Show recruitment popup after 1.5 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []); // Run once on mount

  const toggleModal = (show: boolean) => {
    setIsModalOpen(show);
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-gray-100 selection:bg-primary/30">
      <Navbar onOpenModal={() => toggleModal(true)} />
      
      <main>
        <Hero />
        <Mission />
        <Platform />
        <Roadmap />
        <Team />
      </main>

      <Footer onOpenModal={() => toggleModal(true)} />
      
      <RecruitmentModal isOpen={isModalOpen} onClose={() => toggleModal(false)} />

      {/* Floating Recruitment Alert Popup */}
      {showPopup && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm w-[calc(100vw-3rem)] bg-[#0a0a0a]/90 backdrop-blur-md border border-primary/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(0,229,255,0.15)] animate-in slide-in-from-bottom-5 duration-300">
          <button 
            onClick={() => setShowPopup(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close alert"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
          <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl animate-pulse">campaign</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide uppercase font-display">Recruitments Are Live!</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Join the team at BlackVolt Technologies and build the future of defence-tech.
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    toggleModal(true);
                    setShowPopup(false);
                  }}
                  className="px-4 py-2 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-colors duration-300"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-white/5 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;