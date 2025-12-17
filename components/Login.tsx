
import React, { useState } from 'react';
import { ChevronRight, Database, ShieldCheck, Cpu } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
  isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 transform transition-all hover:border-slate-700 animate-scale-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mb-4 shadow-lg shadow-emerald-900/20 animate-bounce" style={{ animationDuration: '3s' }}>
              <Cpu className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Access Roadmap</h1>
            <p className="text-slate-400 mt-2 text-sm">AIML • Data Science • Security • Full Stack</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                Username / Identity
              </label>
              <div className="relative group">
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600 group-hover:border-slate-700"
                />
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Database size={12} />
                <span>Local Storage Enabled. Data saves to this browser.</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-200
                ${isLoading || !username.trim() 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 active:scale-[0.98]'
                }
              `}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Initialize Session</span>
                  <ChevronRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
             <div className="flex items-center justify-center space-x-6 text-slate-500">
                <div className="flex flex-col items-center">
                   <Database size={16} className="mb-1" />
                   <span className="text-[10px]">Browser Save</span>
                </div>
                <div className="flex flex-col items-center">
                   <ShieldCheck size={16} className="mb-1" />
                   <span className="text-[10px]">Private</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
