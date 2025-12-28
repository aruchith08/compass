
import React, { useState, useEffect, useRef } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
  isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading }) => {
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const cardRef = useRef<HTMLDivElement>(null);

  // Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ":" + 
                      now.getMinutes().toString().padStart(2, '0') + ":" + 
                      now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(timeStr);
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
      cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (username.trim()) {
      try {
        await onLogin(username);
      } catch (err: any) {
        if (err.message?.includes("PERMISSION_DENIED")) {
          setErrorMsg("ACCESS DENIED: FIREBASE RULES RESTRICTED");
        } else {
          setErrorMsg("CONNECTION FAILED: CHECK NETWORK");
        }
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030508] text-white font-sans overflow-hidden relative selection:bg-[#ff0080] selection:text-white">
      <style>{`
        :root {
          --crystal-1: rgba(255, 0, 128, 0.4);
          --crystal-2: rgba(0, 255, 255, 0.4);
          --glass: rgba(255, 255, 255, 0.03);
          --border: rgba(255, 255, 255, 0.15);
        }

        /* Prismatic Backdrop Shards */
        @keyframes drift {
          from { transform: translate(-10%, -10%) rotate(0deg); }
          to { transform: translate(10%, 10%) rotate(15deg); }
        }

        .shard {
          position: absolute;
          background: linear-gradient(135deg, var(--crystal-1), transparent, var(--crystal-2));
          filter: blur(60px);
          opacity: 0.3;
          animation: drift 20s infinite alternate ease-in-out;
        }

        /* Chromatic Title Effect */
        @keyframes shift {
          0%, 100% { transform: translate(0); }
          50% { transform: translate(-1px, 1px); }
        }

        .prism-title {
          mix-blend-mode: screen;
        }
        .prism-title::before, .prism-title::after {
          content: "ACCESS";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: -1;
        }
        .prism-title::before {
          color: #ff00ff;
          left: -2px;
          animation: shift 3s infinite;
        }
        .prism-title::after {
          color: #00ffff;
          left: 2px;
          animation: shift 3s infinite reverse;
        }

        /* Light Sweep Animation */
        @keyframes sweep {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
        .light-sweep {
          background: linear-gradient(105deg, 
            transparent 40%, 
            rgba(255,255,255,0.05) 45%, 
            rgba(255,255,255,0.15) 50%, 
            rgba(255,255,255,0.05) 55%, 
            transparent 60%
          );
          background-size: 200% 100%;
          animation: sweep 8s infinite linear;
        }

        /* Input Focus Glow */
        .prism-input:focus {
          box-shadow: -4px 0 0 var(--crystal-1), 4px 0 0 var(--crystal-2);
        }

        /* Button Hover */
        .prism-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          transition: 0.5s;
        }
        .prism-btn:hover::after {
          left: 100%;
        }

        @keyframes reveal {
           from { opacity: 0; transform: translateY(30px) scale(0.98); }
           to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-reveal {
           animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Background Environment */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 z-[-1]" 
          style={{ background: 'radial-gradient(circle at 20% 30%, #1a1033 0%, transparent 40%), radial-gradient(circle at 80% 70%, #0a2222 0%, transparent 40%)' }}
        ></div>
        <div className="shard w-[40vw] h-[40vw] top-[-10%] left-[-10%]"></div>
        <div className="shard w-[30vw] h-[30vw] bottom-[-5%] right-[-5%] delay-[-5s]"></div>
      </div>

      {/* Login Container */}
      <div className="relative w-[480px] p-[60px] perspective-[1000px] z-10">
        <div 
          ref={cardRef}
          className="relative bg-[rgba(255,255,255,0.03)] backdrop-blur-[25px] border border-[rgba(255,255,255,0.15)] p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-reveal"
          style={{
            clipPath: 'polygon(0% 0%, 90% 0%, 100% 10%, 100% 100%, 10% 100%, 0% 90%)',
            backdropFilter: 'blur(25px) saturate(180%)',
            WebkitBackdropFilter: 'blur(25px) saturate(180%)',
          }}
        >
          {/* Decorative Overlays */}
          <div className="light-sweep absolute top-0 left-0 w-full h-full pointer-events-none"></div>
          <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-bl from-transparent via-transparent to-[rgba(255,255,255,0.1)] pointer-events-none"></div>

          {/* Header */}
          <h1 className="prism-title text-[2.5rem] font-extrabold text-white uppercase tracking-tighter mb-2 relative">
            Access
          </h1>
          <span className="block font-mono text-xs text-white/50 uppercase tracking-[2px] mb-10">
            Neural Link Established // ID: 882-X
          </span>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <label htmlFor="username" className="block font-mono text-[0.65rem] text-white/50 mb-2 uppercase">
                CRYPTOGRAPHIC_IDENTITY
              </label>
              <input 
                id="username"
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="USER_NAME"
                autoComplete="off"
                spellCheck={false}
                className="prism-input w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.15)] p-4 text-white font-sans text-base transition-all duration-300 outline-none focus:border-white focus:bg-[rgba(255,255,255,0.07)] placeholder:text-white/20"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 flex items-center gap-2 text-red-400 font-mono text-[0.65rem] tracking-wider animate-pulse">
                <AlertCircle size={14} />
                {errorMsg}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading || !username.trim()}
              className="prism-btn w-full mt-2 p-4 bg-white text-black border-none font-extrabold font-sans uppercase tracking-[1px] relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Initializing...
                </>
              ) : (
                "Initialize Connection"
              )}
            </button>
          </form>

          {/* Metadata Footer */}
          <div className="mt-8 pt-5 border-t border-[rgba(255,255,255,0.15)] flex justify-between font-mono text-[0.6rem] text-white/50 uppercase">
            <span>LVL: ALPHA-9</span>
            <span>SECURE REFRACTION ACTIVE</span>
            <span>UTC: {currentTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
