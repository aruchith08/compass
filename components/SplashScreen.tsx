
import React, { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Start fade out animation before unmounting
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // Fade out at 2.5s

    // Unmount component
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3000); // Finish at 3s

    return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="w-48 h-48 mb-8 relative flex items-center justify-center animate-scale-in">
           {!imgError ? (
             <img 
               src="/logo.png" 
               alt="Compass Logo" 
               className="w-full h-full object-contain drop-shadow-2xl"
               onError={() => setImgError(true)}
             />
           ) : (
             <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full"></div>
                <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl ring-1 ring-white/10">
                    <Compass size={80} className="text-cyan-500" strokeWidth={1.5} />
                </div>
             </div>
           )}
        </div>

        {/* Text Branding */}
        <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-[0.2em] uppercase animate-slide-up font-sans drop-shadow-lg" style={{animationDelay: '100ms'}}>
            Compass
            </h1>
            <p className="text-slate-400 text-sm md:text-base tracking-widest uppercase animate-slide-up font-medium" style={{animationDelay: '300ms'}}>
            Navigate Your Future
            </p>
        </div>
      </div>
      
      {/* Loading Indicator */}
      <div className="absolute bottom-24 w-64 h-1 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 w-full animate-loading-bar origin-left"></div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
