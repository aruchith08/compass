
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target, Zap, X, Minimize2, Maximize2, BellRing } from 'lucide-react';

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalSeconds = MODES[mode].minutes * 60;
  const progress = (timeLeft / totalSeconds) * 100;
  const colorClass = mode === 'focus' ? 'emerald' : mode === 'short' ? 'indigo' : 'purple';
  const CurrentIcon = MODES[mode].icon;

  // SVG Constants
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-24 lg:bottom-10 left-6 z-[150] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isMinimized ? 'w-16 h-16' : 'w-80'}`}>
      <div className={`relative bg-white dark:bg-[#050b14] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 overflow-hidden backdrop-blur-2xl ${isMinimized ? 'p-0' : 'p-8'}`}>
        
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
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(true)} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><Minimize2 size={16} /></button>
                <button onClick={onClose} className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-colors"><X size={18} /></button>
              </div>
            </div>

            {/* Timer Visual */}
            <div className="relative flex flex-col items-center justify-center mb-10">
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                {/* Background Ring */}
                <circle 
                  cx={size / 2} 
                  cy={size / 2} 
                  r={radius} 
                  stroke="currentColor" 
                  strokeWidth={strokeWidth} 
                  fill="transparent" 
                  className="text-slate-100 dark:text-white/5" 
                />
                {/* Progress Ring */}
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
    </div>
  );
};

export default PomodoroTimer;
