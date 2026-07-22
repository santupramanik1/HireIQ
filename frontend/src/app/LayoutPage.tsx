import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import CTASection from '../components/ui/CTASection';
import FeaturesSection from '../components/ui/FeaturesSection';
import Footer from '../components/ui/Footer';
import GlobalStyles from '../components/ui/GlobalStyles';
import HeroSection from '../components/ui/HeroSection';
import HowItWorks from '../components/ui/HowItWorks';
import Navbar from '../components/ui/Navbar';
import StatsBar from '../components/ui/StatsBar';

export default function LayoutPage() {
  const [loginModelOpen, setLoginModelOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.05,
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-[#05070f] min-h-screen font-class selection:bg-[#6c63ff]/30 selection:text-white relative">
      <Navbar loginModelOpen={loginModelOpen} setLoginModelOpen={setLoginModelOpen} />
      <main className="page-reveal">
        <GlobalStyles />
        
        <div className="reveal">
          <HeroSection setLoginModelOpen={setLoginModelOpen} onWatchDemo={() => setIsVideoOpen(true)} />
        </div>
        
        <div className="reveal">
          <StatsBar />
        </div>
        
        <div className="reveal">
          <FeaturesSection />
        </div>
        
        <div className="reveal">
          <HowItWorks />
        </div>
        
        <div className="reveal">
          <CTASection setLoginModelOpen={setLoginModelOpen} />
        </div>
        
        <div className="reveal">
          <Footer />
        </div>
      </main>

      {isVideoOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn">
          <div className="relative w-full max-w-4xl mx-4 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-scaleUp">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full bg-black">
              <video
                src="/Use_this_prompt_in_Gemini_Veo.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
