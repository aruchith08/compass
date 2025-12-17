
import React, { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  
  const TARGET_TEXT = "COMPASS";
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

  // Initialize with random characters immediately
  const [scrambleText, setScrambleText] = useState(() => 
    TARGET_TEXT.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
  );

  // Scramble Text Effect
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;

    const startScramble = () => {
      interval = setInterval(() => {
        setScrambleText(prev => 
          TARGET_TEXT
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return TARGET_TEXT[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
      
        if (iteration >= TARGET_TEXT.length) {
          clearInterval(interval);
          setShowSubtitle(true);
        }
      
        iteration += 1 / 4;
      }, 30);
    };

    startScramble();

    return () => {
        clearInterval(interval);
    };
  }, []);

  // Exit Logic
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050b14] overflow-hidden transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
    >
      {/* Vibrant Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/20 dark:bg-emerald-600/20 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '4s' }}></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#f8fafc_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#050b14_90%)]"></div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo Container */}
        <div className="relative mb-12 flex items-center justify-center animate-scale-in duration-1000">
            <div className="relative w-36 h-36 flex items-center justify-center rounded-full overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.2)] ring-1 ring-white/50 dark:ring-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl">
                
                {/* Main Compass Icon with Gradient Color */}
                <div className="relative z-10 p-4">
                   <Compass size={72} className="text-transparent stroke-[1.5px] stroke-emerald-600 dark:stroke-emerald-400 drop-shadow-lg" />
                   {/* Gradient Overlay for Icon */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-emerald-500 to-teal-400 opacity-20 dark:opacity-40 mix-blend-overlay rounded-full"></div>
                </div>
                
                {/* Radar Sweep Animation */}
                <div className="absolute inset-0 z-0 animate-radar-spin opacity-60 dark:opacity-40">
                   <div className="w-full h-full" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16,185,129,0.1) 300deg, rgba(56,189,248,0.4) 360deg)' }}></div>
                </div>

                {/* Glass Shine */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent dark:from-white/20 dark:to-transparent z-30 rounded-t-full opacity-60"></div>
            </div>
            
            {/* Outer Glows */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl -z-10 animate-pulse-slow"></div>
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Text Decoding Effect */}
        <div className="text-center z-20 flex flex-col items-center">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-emerald-600 to-teal-500 dark:from-indigo-400 dark:via-emerald-400 dark:to-teal-300 tracking-[0.2em] font-sans drop-shadow-sm min-h-[80px]">
                {scrambleText}
            </h1>
            
            {/* Subtitle */}
            <div className={`mt-6 flex items-center justify-center gap-3 transition-all duration-1000 ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="w-8 h-[2px] bg-indigo-500/50 rounded-full"></div>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base tracking-[0.3em] uppercase font-bold">
                    Navigate Your Future
                </p>
                <div className="w-8 h-[2px] bg-emerald-500/50 rounded-full"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
