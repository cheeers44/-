import React, { useEffect, useState, useRef } from 'react';

const IntroOverlay: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';

    // Sequence timing
    const newTimers = [
      setTimeout(() => setStage(1), 500),   // Text 1: Context
      setTimeout(() => setStage(2), 2500),  // Text 2: Theme
      setTimeout(() => setStage(3), 4500),  // Text 3: Motivation
      setTimeout(() => setStage(4), 6500),  // Title Drop (Stops here now)
    ];

    timersRef.current = newTimers;

    return () => {
      timersRef.current.forEach(clearTimeout);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const startExit = () => {
    setStage(5);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 1500);
  };

  const handleInteraction = () => {
    if (stage < 4) {
      // If clicked during animation, skip to the final title screen
      timersRef.current.forEach(clearTimeout);
      setStage(4);
    } else {
      // If clicked at the title screen, enter the site
      startExit();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out cursor-pointer ${
        stage >= 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={handleInteraction}
    >
      {/* Background Image with Ken Burns Effect */}
      <div className={`absolute inset-0 z-0 transform transition-transform duration-[10000ms] ease-linear ${stage >= 5 ? 'scale-110' : 'scale-100'}`}>
        <img 
            src="https://i.postimg.cc/gkr44dxT/siwi.jpg" 
            alt="Atmosphere" 
            className="w-full h-full object-cover object-top opacity-30 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
      </div>

      {/* Old Film Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]"></div>

      {/* Action Hint (Skip vs Enter) */}
      <div className="absolute bottom-8 z-50 w-full text-center">
        <button className="text-slate-500 text-xs tracking-[0.3em] uppercase hover:text-slate-300 transition-colors animate-pulse">
            {stage < 4 ? "Click to Skip" : "Click to Enter"}
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-20 text-center px-6 w-full max-w-4xl h-full flex flex-col justify-center items-center">
        
        {/* Sequence 1: Context */}
        <div className={`absolute transition-all duration-1000 transform ${stage === 1 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
          <p className="font-myeongjo text-slate-400 text-xl md:text-2xl italic tracking-wider">
            "1905년, 제국은 불타고 있었다."
          </p>
          <div className="w-12 h-[1px] bg-red-900/50 mx-auto mt-4"></div>
        </div>

        {/* Sequence 2: Theme */}
        <div className={`absolute transition-all duration-1000 transform ${stage === 2 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
           <h3 className="font-display text-slate-200 text-2xl md:text-4xl font-bold uppercase tracking-widest drop-shadow-lg">
            가장 차가운 충성심
          </h3>
        </div>

        {/* Sequence 3: Motivation */}
        <div className={`absolute transition-all duration-1000 transform ${stage === 3 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
          <p className="font-myeongjo text-slate-300 text-lg md:text-xl leading-relaxed">
            누군가는 손에 <span className="text-blood font-bold">피</span>를 묻혀야 했기에
          </p>
        </div>

        {/* Sequence 4: Main Title */}
        <div className={`absolute transition-all duration-1000 transform ${stage === 4 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-md'}`}>
            <div className="border-t border-b border-blood/30 py-6 px-4 md:px-12 bg-black/50 backdrop-blur-sm">
                <p className="text-gold text-xs md:text-sm tracking-[0.5em] uppercase mb-4">Nikolai Volkonsky</p>
                <h1 className="font-display text-5xl md:text-7xl font-black text-slate-100 tracking-wider mb-2 drop-shadow-[0_4px_10px_rgba(74,4,4,0.9)]">
                    차르의 <span className="text-blood inline-block transform hover:scale-105 transition-transform duration-500">사냥개</span>
                </h1>
                <p className="text-slate-600 text-xs tracking-widest mt-4">THE TSAR'S HOUND</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default IntroOverlay;