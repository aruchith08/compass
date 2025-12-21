
import React, { useState } from 'react';
import { ChevronRight, Cloud, ShieldCheck, Cpu, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
  isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading }) => {
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (username.trim()) {
      try {
        await onLogin(username);
      } catch (err: any) {
        if (err.message.includes("PERMISSION_DENIED")) {
          setErrorMsg("Access Denied: Please set your Firestore rules to 'Test Mode' in the Firebase Console.");
        } else {
          setErrorMsg("Login failed. Please check your internet connection.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-8 transform transition-all hover:border-slate-300 dark:hover:border-slate-700 animate-scale-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mb-4 shadow-lg shadow-emerald-900/20">
              <Cpu className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Access Roadmap</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Professional AI Career OS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Username / Cloud Identity
              </label>
              <div className="relative group">
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. ruchith_alokam"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg mt-2 animate-slide-down">
                  <AlertCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-700 dark:text-rose-300 font-medium leading-relaxed">
                    {errorMsg}
                  </p>
                </div>
              )}

              <p className="text-xs text-slate-500 flex items-center gap-1 mt-3">
                <Cloud size={12} className="text-emerald-500" />
                <span>Cloud Synced. Access your data from anywhere.</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-200
                ${isLoading || !username.trim() 
                  ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 active:scale-[0.98]'
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

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
             <div className="flex items-center justify-center space-x-6 text-slate-400 dark:text-slate-500">
                <div className="flex flex-col items-center">
                   <Cloud size={16} className="mb-1" />
                   <span className="text-[10px]">Firestore DB</span>
                </div>
                <div className="flex flex-col items-center">
                   <ShieldCheck size={16} className="mb-1" />
                   <span className="text-[10px]">End-to-End</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
