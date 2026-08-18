import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Platform from './components/Platform';
import Roadmap from './components/Roadmap';
import Team from './components/Team';
import Footer from './components/Footer';
import Recruitment from './components/Recruitment';
import LoadingScreen from './components/LoadingScreen';
import DisclaimerModal from './components/DisclaimerModal';

function App() {
  const [showDisclaimerModal, setShowDisclaimerModal] = useState<boolean>(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path.includes('recruitment') || path.includes('recruitment') || hash.includes('recruitment') || hash.includes('recruitment');
  });

  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isLoadingRecruitment, setIsLoadingRecruitment] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleProceedToRecruitment = useCallback(() => {
    setShowDisclaimerModal(false);
    window.history.pushState({}, '', '/recruitment');
    setCurrentPath('/recruitment');
    setIsLoadingRecruitment(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoHome = useCallback(() => {
    setShowDisclaimerModal(false);
    setIsLoadingRecruitment(false);
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Client-side router navigation handler with loading screen trigger
  const navigate = useCallback((targetPath: string) => {
    let cleanPath = targetPath;
    let targetHash = '';

    if (cleanPath.includes('#')) {
      const parts = cleanPath.split('#');
      cleanPath = parts[0] || '/';
      targetHash = '#' + parts[1];
    }

    const isTargetingRecruitment = cleanPath.toLowerCase().includes('recruitment') || cleanPath.toLowerCase().includes('recruitment');

    if (isTargetingRecruitment) {
      setShowDisclaimerModal(true);
      return;
    }

    setShowDisclaimerModal(false);
    setIsLoadingRecruitment(false);
    cleanPath = cleanPath === '' ? '/' : cleanPath;

    window.history.pushState({}, '', cleanPath + targetHash);
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetHash) {
      setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('recruitment') || path.includes('recruitment') || hash.includes('recruitment') || hash.includes('recruitment')) {
        setShowDisclaimerModal(true);
      } else {
        setShowDisclaimerModal(false);
        setCurrentPath('/');
        setIsLoadingRecruitment(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

    // Show recruitment popup after 1.5 seconds if on home page and not viewing modal
    const timer = setTimeout(() => {
      if (currentPath === '/' && !isLoadingRecruitment && !showDisclaimerModal) {
        setShowPopup(true);
      }
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [currentPath, isLoadingRecruitment, showDisclaimerModal]);

  const isRecruitmentRoute = currentPath === '/recruitment' || currentPath === '/recruitment';

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-gray-100 selection:bg-primary/30">
      {/* Disclaimer Modal Before Loading Screen & Recruitment */}
      <DisclaimerModal
        isOpen={showDisclaimerModal}
        onProceed={handleProceedToRecruitment}
        onGoHome={handleGoHome}
      />

      {/* High-Tech Loading Screen when entering recruitment after accepting disclaimer */}
      {isLoadingRecruitment && (
        <LoadingScreen 
          onFinish={() => setIsLoadingRecruitment(false)} 
          message="INITIALIZING BLACKVOLT RECRUITMENT PORTAL..."
          duration={900}
        />
      )}

      <Navbar 
        currentPath={currentPath}
        onNavigate={navigate} 
        onOpenModal={() => navigate('/recruitment')} 
      />
      
      <main>
        {isRecruitmentRoute ? (
          <Recruitment onNavigate={navigate} />
        ) : (
          <>
            <Hero />
            <Mission />
            <Platform />
            <Roadmap />
            <Team />
            <Footer onOpenModal={() => navigate('/recruitment')} />
          </>
        )}
      </main>

      {/* Floating Recruitment Alert Popup (shown only on landing page) */}
      {showPopup && !isRecruitmentRoute && !isLoadingRecruitment && !showDisclaimerModal && (
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
                    navigate('/recruitment');
                    setShowPopup(false);
                  }}
                  className="px-4 py-2 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
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