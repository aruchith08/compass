
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target, Zap, X, Minimize2, PictureInPicture2, BellRing, AlertCircle, Volume2, VolumeX } from 'lucide-react';

type TimerMode = 'focus' | 'short' | 'long';

const MODES: Record<TimerMode, { label: string; minutes: number; color: string; hex: string; icon: any }> = {
  focus: { label: 'Focus', minutes: 25, color: 'emerald', hex: '#10b981', icon: Target },
  short: { label: 'Short Break', minutes: 5, color: 'indigo', hex: '#6366f1', icon: Coffee },
  long: { label: 'Long Break', minutes: 15, color: 'purple', hex: '#a855f7', icon: Zap },
};

class WhiteNoise {
  ctx: AudioContext | null = null;
  node: ScriptProcessorNode | null = null;
  gain: GainNode | null = null;

  start() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const bufferSize = 4096;
    this.node = this.ctx.createScriptProcessor(bufferSize, 1, 1);
    this.node.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Brownian noise approximation
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; 
      }
    };
    let lastOut = 0;
    
    this.gain = this.ctx.createGain();
    this.gain.gain.value = 0.05; // Low volume
    
    this.node.connect(this.gain);
    this.gain.connect(this.ctx.destination);
  }

  stop() {
    if (this.node) {
      this.node.disconnect();
      this.node = null;
    }
    if (this.gain) {
      this.gain.disconnect();
      this.gain = null;
    }
    if (this.ctx) {
       this.ctx.close();
       this.ctx = null;
    }
  }
}

const PomodoroTimer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [zenMode, setZenMode] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  const noiseRef = useRef<WhiteNoise | null>(null);
  
  // Canvas & Video Refs for Native PiP
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- Timer Logic ---
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + timeLeft * 1000;
      }

      timerRef.current = window.setInterval(() => {
        if (!endTimeRef.current) return;
        const now = Date.now();
        const diff = endTimeRef.current - now;
        
        if (diff <= 0) {
          setTimeLeft(0);
          endTimeRef.current = null;
          if (timerRef.current) clearInterval(timerRef.current);
        } else {
          const secondsRemaining = Math.ceil(diff / 1000);
          setTimeLeft(prev => prev !== secondsRemaining ? secondsRemaining : prev);
        }
      }, 200);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      endTimeRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      handleTimerComplete();
    }
  }, [timeLeft, isActive]);

  // --- Zen Mode Audio ---
  useEffect(() => {
    if (zenMode && isActive) {
      if (!noiseRef.current) {
        noiseRef.current = new WhiteNoise();
        noiseRef.current.start();
      }
    } else {
      if (noiseRef.current) {
        noiseRef.current.stop();
        noiseRef.current = null;
      }
    }
    return () => {
      if (noiseRef.current) {
        noiseRef.current.stop();
        noiseRef.current = null;
      }
    };
  }, [zenMode, isActive]);

  // --- Canvas Rendering for PiP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas for crisp text
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    
    const center = size / 2;
    const radius = 200;
    const lineWidth = 40;

    // Background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, size, size);

    // Track Ring
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#1e293b'; // slate-800
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Progress Ring
    const totalSeconds = MODES[mode].minutes * 60;
    const progress = 1 - (timeLeft / totalSeconds);
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (progress * 2 * Math.PI);

    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.strokeStyle = MODES[mode].hex;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Time Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatTime(timeLeft), center, center - 20);

    // Status Text
    ctx.fillStyle = '#94a3b8'; // slate-400
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(isActive ? MODES[mode].label.toUpperCase() : "PAUSED", center, center + 80);

  }, [timeLeft, mode, isActive]);

  const handleTimerComplete = () => {
    setIsActive(false);
    endTimeRef.current = null;
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
    endTimeRef.current = null;
    setMode(targetMode);
    setTimeLeft(MODES[targetMode].minutes * 60);
    setErrorMsg(null);
  };

  const toggleNativePip = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiPActive(false);
      } else {
        // Capture stream if not already active
        if (video.srcObject === null) {
            const stream = canvas.captureStream(30); // 30 FPS
            video.srcObject = stream;
        }
        
        await video.play();
        await video.requestPictureInPicture();
        setIsPiPActive(true);
      }
    } catch (err) {
      console.error("PiP failed", err);
      setErrorMsg("Browser blocked PiP.");
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  // Listen for PiP close
  useEffect(() => {
      const video = videoRef.current;
      const onLeave = () => setIsPiPActive(false);
      
      if (video) {
          video.addEventListener('leavepictureinpicture', onLeave);
      }
      return () => {
          if (video) video.removeEventListener('leavepictureinpicture', onLeave);
      };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalSeconds = MODES[mode].minutes * 60;
  const progress = (timeLeft / totalSeconds) * 100;
  const CurrentIcon = MODES[mode].icon;

  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-6 left-6 z-[120] transition-all duration-300 ease-out ${isMinimized ? 'w-16 h-16' : 'w-80'}`}>
      
      {/* Hidden Elements for PiP */}
      <canvas ref={canvasRef} className="hidden" />
      <video ref={videoRef} className="hidden" muted playsInline />

      <div className={`relative bg-white dark:bg-[#050b14] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 overflow-hidden backdrop-blur-2xl flex flex-col ${isMinimized ? 'w-16 h-16 p-0' : 'w-80 max-h-[calc(100vh-8rem)]'}`}>
      
      {isMinimized ? (
        <button 
          onClick={() => setIsMinimized(false)}
          className={`w-full h-full flex items-center justify-center bg-emerald-500 text-white rounded-full animate-pulse shadow-lg`}
        >
          <span className="text-[10px] font-black">{formatTime(timeLeft)}</span>
        </button>
      ) : (
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
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
                onClick={toggleNativePip} 
                className={`p-2 transition-colors ${isPiPActive ? 'text-emerald-500 bg-emerald-500/10 rounded-lg' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-500'}`}
                title="Pop out floating timer"
              >
                <PictureInPicture2 size={16} />
              </button>
              <button onClick={() => setIsMinimized(true)} className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><Minimize2 size={16} /></button>
              <button onClick={onClose} className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-colors"><X size={18} /></button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-3 bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 rounded-xl flex items-center justify-center gap-2 animate-fade-in shrink-0">
               <AlertCircle size={14} className="text-rose-500" />
               <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">{errorMsg}</span>
            </div>
          )}

          {/* Timer Visual */}
          <div className="relative flex flex-col items-center justify-center mb-10 shrink-0">
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
                className={`transition-all duration-1000 ease-linear ${
                    mode === 'focus' ? 'text-emerald-500' : mode === 'short' ? 'text-indigo-500' : 'text-purple-500'
                }`}
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
          <div className="flex items-center justify-center gap-4 mb-8 shrink-0">
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
          <div className="grid grid-cols-3 gap-3 shrink-0 mb-4">
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

          {/* Zen Mode Toggle */}
          <button 
            onClick={() => setZenMode(!zenMode)} 
            className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${zenMode ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'}`}
          >
             {zenMode ? <Volume2 size={16} /> : <VolumeX size={16} />}
             Zen Mode (White Noise)
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
