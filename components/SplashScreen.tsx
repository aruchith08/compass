
import React, { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrambleText, setScrambleText] = useState("LOADING");
  const [showSubtitle, setShowSubtitle] = useState(false);
  
  const TARGET_TEXT = "COMPASS";
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

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
          setShowSubtitle(true); // Trigger subtitle after text finishes
        }
      
        iteration += 1 / 4; // Slower iteration for smoother effect
      }, 40);
    };

    // Slight delay before text starts decoding
    const delayStart = setTimeout(startScramble, 800);

    return () => {
        clearInterval(interval);
        clearTimeout(delayStart);
    };
  }, []);

  // Exit Logic (Extended Duration)
  useEffect(() => {
    // Start fade out at 4.5s
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    // Unmount at 5.5s
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 5500);

    return () => {
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050b14] overflow-hidden transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
    >
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-900/10 to-slate-950/90 z-0"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050b14_90%)]"></div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo Container with Radar Animation */}
        <div className="relative mb-12 flex items-center justify-center animate-scale-in duration-1000">
            {/* Container constraints: strict circular clipping */}
            <div className="relative w-36 h-36 flex items-center justify-center rounded-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20 bg-slate-900/80 backdrop-blur-xl">
                
                {/* Main Compass Icon (Default) */}
                <Compass size={72} className="text-cyan-400 relative z-10" strokeWidth={1.5} />
                
                {/* RADAR SWEEP ANIMATION */}
                {/* 
                   We use inset-0 to match the exact size of the container. 
                   The conic-gradient creates a circular sweep effect.
                   The rotation strictly spins this gradient layer within the rounded bounds.
                */}
                <div className="absolute inset-0 z-0 animate-radar-spin opacity-80">
                   <div className="w-full h-full" style={{ background: 'conic-gradient(from 0deg, transparent 90deg, rgba(6,182,212,0.1) 180deg, rgba(6,182,212,0.8) 360deg)' }}></div>
                </div>

                {/* Inner Radial Shadow to soften the center (prevents harsh lines near icon) */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.5)_0%,transparent_70%)]"></div>
                
                {/* Glass Shine effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent z-30 rounded-t-full opacity-50"></div>
            </div>
            
            {/* Subtle Outer Pulse */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl -z-10 animate-pulse-slow"></div>
        </div>

        {/* Text Decoding Effect */}
        <div className="text-center z-20 flex flex-col items-center">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-400 tracking-[0.2em] font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] min-h-[80px]">
                {scrambleText}
            </h1>
            
            {/* Subtitle with Typewriter/Reveal effect */}
            <div className={`mt-4 flex items-center justify-center gap-3 transition-all duration-1000 ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                <p className="text-cyan-400/90 text-sm md:text-base tracking-[0.4em] uppercase font-medium font-mono">
                    Navigate Your Future
                </p>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50"></div>
            </div>
        </div>
      </div>

      {/* Custom Keyframes for Radar Spin */}
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
