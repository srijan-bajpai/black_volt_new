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

    return () => {
      observer.disconnect();
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
    </div>
  );
}

export default App;