
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Cloud, ShieldCheck, Cpu, AlertCircle, Sparkles, Zap, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
  isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading }) => {
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate unique snow particles once to avoid re-renders
  const snowParticles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${8 + Math.random() * 12}s`,
      size: `${1 + Math.random() * 3}px`,
      opacity: 0.1 + Math.random() * 0.5,
      driftDelay: `${Math.random() * 5}s`
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (username.trim()) {
      try {
        await onLogin(username);
      } catch (err: any) {
        if (err.message?.includes("PERMISSION_DENIED")) {
          setErrorMsg("Access Denied: Please set your Firestore rules to 'Test Mode' in the Firebase Console.");
        } else {
          setErrorMsg("Login failed. Please check your internet connection.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#050b14] relative overflow-hidden transition-colors duration-700">
      {/* Enhanced Dynamic Animated Background (Neural Mesh + Digital Snow) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-600/5 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-teal-400/10 dark:bg-teal-500/5 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '6s' }}></div>
        
        {/* Digital Snow Layer */}
        <div className="absolute inset-0 z-0">
           {snowParticles.map((particle) => (
             <div 
               key={particle.id}
               className="absolute rounded-full bg-white dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)] animate-snowfall"
               style={{
                 left: particle.left,
                 width: particle.size,
                 height: particle.size,
                 opacity: particle.opacity,
                 animationDuration: particle.duration,
                 animationDelay: particle.delay,
                 top: '-20px'
               }}
             >
                {/* Internal Drift Motion */}
                <div className="w-full h-full animate-drift" style={{ animationDelay: particle.driftDelay }}></div>
             </div>
           ))}
        </div>

        {/* Neural Network Pulse Overlay */}
        <div className="absolute inset-0 opacity-20 dark:opacity-40">
           {[...Array(15)].map((_, i) => (
             <div 
               key={i}
               className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
               style={{
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 5}s`,
                 animationDuration: `${3 + Math.random() * 4}s`
               }}
             />
           ))}
        </div>
      </div>

      <div className={`relative z-10 w-full max-w-md p-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/40 dark:border-white/5 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] dark:shadow-2xl p-10 relative overflow-hidden group">
          
          {/* Subtle Glow Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="text-center mb-10">
            {/* Logo with Outer Ring Animation and BOUNCING effect */}
            <div className="relative inline-flex items-center justify-center mb-6 animate-float">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl shadow-emerald-500/30 transform transition-transform group-hover:scale-110 duration-500">
                <Cpu className="text-white" size={32} />
              </div>
            </div>
            
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
              Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Compass</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium tracking-wide flex items-center justify-center gap-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Zap size={14} className="text-amber-500" /> Professional AI Career OS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative">
            <div className="space-y-3 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <label htmlFor="username" className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
                Enter your name
              </label>
              <div className="relative group/input">
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Ruchith Alokam"
                  className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-600 shadow-inner"
                />
              </div>

              {errorMsg && (
                <div className="flex items-start gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl mt-4 animate-scale-in">
                  <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-700 dark:text-rose-300 font-bold leading-relaxed">
                    {errorMsg}
                  </p>
                </div>
              )}
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <button
                type="submit"
                disabled={isLoading || !username.trim()}
                className={`group relative w-full flex items-center justify-center py-4 px-6 rounded-2xl text-white font-bold transition-all duration-500 overflow-hidden
                  ${isLoading || !username.trim() 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                    : 'bg-slate-900 dark:bg-white dark:text-slate-950 shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
                  }
                `}
              >
                {/* Button Shimmer Effect */}
                {!isLoading && username.trim() && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                )}

                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="animate-pulse">Syncing...</span>
                  </div>
                ) : (
                  <>
                    <span className="tracking-wide">Establish Session</span>
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
                <Cloud size={12} className="text-emerald-500" />
                <span>Encrypted Cloud Architecture</span>
              </div>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 animate-slide-up" style={{ animationDelay: '500ms' }}>
             <div className="flex items-center justify-center space-x-10 opacity-60">
                <div className="flex flex-col items-center group/icon cursor-default">
                   <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 group-hover/icon:bg-emerald-50 dark:group-hover/icon:bg-emerald-500/10 transition-colors">
                     <ShieldCheck size={18} className="group-hover/icon:text-emerald-500 transition-colors" />
                   </div>
                   <span className="text-[9px] font-bold mt-2">SECURE</span>
                </div>
                <div className="flex flex-col items-center group/icon cursor-default">
                   <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 group-hover/icon:bg-emerald-50 dark:group-hover/icon:bg-emerald-500/10 transition-colors">
                     <Sparkles size={18} className="group-hover/icon:text-emerald-500 transition-colors" />
                   </div>
                   <span className="text-[9px] font-bold mt-2">ADAPTIVE</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Login;
