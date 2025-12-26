
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, RotateCcw, Coffee, Target, Zap, X, Minimize2, PictureInPicture2, BellRing } from 'lucide-react';

type TimerMode = 'focus' | 'short' | 'long';

const MODES: Record<TimerMode, { label: string; minutes: number; color: string; icon: any }> = {
  focus: { label: 'Focus', minutes: 25, color: 'emerald', icon: Target },
  short: { label: 'Short Break', minutes: 5, color: 'indigo', icon: Coffee },
  long: { label: 'Long Break', minutes: 15, color: 'purple', icon: Zap },
};

const PomodoroTimer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [pipWindow, setPipWindow] = useState<any>(null);
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    playBell();
  };

  const playBell = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1);
    } catch (e) {
      console.warn("Audio feedback failed");
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (newMode?: TimerMode) => {
    const targetMode = newMode || mode;
    setIsActive(false);
    setMode(targetMode);
    setTimeLeft(MODES[targetMode].minutes * 60);
  };

  const togglePip = async () => {
    if (pipWindow) {
      pipWindow.close();
      return;
    }

    if (!('documentPictureInPicture' in window)) {
      alert("Interactive Picture-in-Picture is currently only supported in Chromium-based browsers (Chrome, Edge).");
      return;
    }

    try {
      const pipW = await (window as any).documentPictureInPicture.requestWindow({
        width: 320,
        height: 480,
      });

      // Copy all styles to the new window
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
          const style = document.createElement('style');
          style.textContent = cssRules;
          pipW.document.head.appendChild(style);
        } catch (e) {
          const link = document.createElement('link');
          if (styleSheet.href) {
            link.rel = 'stylesheet';
            link.href = styleSheet.href;
            pipW.document.head.appendChild(link);
          }
        }
      });

      // Inject Tailwind CDN if not found in rules
      if (!pipW.document.head.querySelector('style')) {
        const script = document.createElement('script');
        script.src = "https://cdn.tailwindcss.com";
        pipW.document.head.appendChild(script);
      }

      // Sync theme and basic body styles
      pipW.document.documentElement.className = document.documentElement.className;
      pipW.document.body.className = "bg-white dark:bg-[#050b14] overflow-hidden p-0 m-0 h-full flex items-center justify-center";

      setPipWindow(pipW);
      setIsMinimized(false);

      pipW.addEventListener("pagehide", () => {
        setPipWindow(null);
      });
    } catch (err) {
      console.error("PiP activation failed:", err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalSeconds = MODES[mode].minutes * 60;
  const progress = (timeLeft / totalSeconds) * 100;
  const CurrentIcon = MODES[mode].icon;

  // SVG Constants
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  if (!isOpen) return null;

  const timerContent = (
    <div className={`relative bg-white dark:bg-[#050b14] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 overflow-hidden backdrop-blur-2xl ${isMinimized ? 'w-16 h-16 p-0' : 'w-80 p-8'} ${pipWindow ? 'scale-90' : ''}`}>
      {isMinimized ? (
        <button 
          onClick={() => setIsMinimized(false)}
          className={`w-full h-full flex items-center justify-center bg-emerald-500 text-white rounded-full animate-pulse shadow-lg`}
        >
          <span className="text-[10px] font-black">{formatTime(timeLeft)}</span>
        </button>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 ring-1 ring-emerald-500/20">
                <CurrentIcon size={18} />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{MODES[mode].label}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={togglePip} 
                className={`p-2 transition-colors ${pipWindow ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-500'}`}
                title="Picture in Picture"
              >
                <PictureInPicture2 size={16} />
              </button>
              <button onClick={() => setIsMinimized(true)} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><Minimize2 size={16} /></button>
              <button onClick={onClose} className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-colors"><X size={18} /></button>
            </div>
          </div>

          {/* Timer Visual */}
          <div className="relative flex flex-col items-center justify-center mb-10">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <circle 
                cx={size / 2} 
                cy={size / 2} 
                r={radius} 
                stroke="currentColor" 
                strokeWidth={strokeWidth} 
                fill="transparent" 
                className="text-slate-100 dark:text-white/5" 
              />
              <circle 
                cx={size / 2} 
                cy={size / 2} 
                r={radius} 
                stroke="currentColor" 
                strokeWidth={strokeWidth} 
                fill="transparent" 
                strokeDasharray={circumference} 
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={`transition-all duration-1000 ease-linear text-emerald-500`}
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-2">minutes left</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => resetTimer()} 
              className="p-5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-[1.5rem] hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 border border-slate-200 dark:border-white/5"
            >
              <RotateCcw size={22} />
            </button>
            
            <button 
              onClick={toggleTimer}
              className={`p-7 rounded-[2rem] text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all active:scale-90 bg-emerald-500 hover:bg-emerald-400 group`}
            >
              {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} className="ml-1" fill="currentColor" />}
            </button>
            
            <button 
              onClick={() => playBell()} 
              className="p-5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-[1.5rem] hover:bg-slate-200 dark:hover:bg-white/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all active:scale-95 border border-slate-200 dark:border-white/5"
            >
              <BellRing size={22} />
            </button>
          </div>

          {/* Modes */}
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(MODES) as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => resetTimer(m)}
                className={`py-3.5 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${
                  mode === m 
                    ? `bg-emerald-500 text-white shadow-lg shadow-emerald-500/20` 
                    : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-200 dark:border-white/5'
                }`}
              >
                {m === 'focus' ? 'WORK' : m === 'short' ? 'REST' : 'DEEP'}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={`fixed bottom-24 lg:bottom-10 left-6 z-[150] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isMinimized ? 'w-16 h-16' : 'w-80'}`}>
      {pipWindow 
        ? createPortal(timerContent, pipWindow.document.body)
        : timerContent
      }
    </div>
  );
};

export default PomodoroTimer;
