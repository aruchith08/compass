
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Library, 
  Briefcase, 
  Compass,
  LogOut,
  Sun,
  Moon,
  Languages,
  Loader2,
  HardDrive,
  Cpu,
  Zap,
  ShieldCheck,
  Key,
  X,
  AlertCircle,
  CheckCircle2,
  Settings2,
  ChevronRight as ChevronRightIcon,
  User as UserIcon
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Tracker from './components/Tracker';
import Resources from './components/Resources';
import Outputs from './components/Outputs';
import Login from './components/Login';
import Linguahub from './components/Linguahub';
import SplashScreen from './components/SplashScreen';
import { RoadmapItem, Role, Status, User, DailyTask, HomeworkTask, RoadmapContextType, LinguaSession } from './types';
import { api } from './services/api';
import { RoadmapContext } from './RoadmapContext';
import { ensureKeySelected, getApiKey, saveManualKey, validateApiKey } from './services/ai';

const FIXED_DAILY_TASKS = [
  "Note down the topics discussed in class today",
  "Bus ride: Use AI to read topics & prepare PPT",
  "7:00 - 7:30 PM: Presentation",
  "Check roadmap tracker & complete skills",
  "Complete given homeworks"
];

const KeyModal = ({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (key: string) => void }) => {
  const [val, setVal] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [currentKeyHint, setCurrentKeyHint] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      getApiKey().then(key => {
        if (key && key.length > 8) {
          setCurrentKeyHint(`••••${key.slice(-4)}`);
        } else {
          setCurrentKeyHint(null);
        }
      });
      setVal("");
      setStatus('idle');
    }
  }, [isOpen]);

  const handleVerify = async () => {
    if (!val.trim()) return;
    setIsVerifying(true);
    setStatus('idle');
    const isValid = await validateApiKey(val.trim());
    if (isValid) {
      setStatus('success');
      setTimeout(() => {
        onSave(val.trim());
        onClose();
        setIsVerifying(false);
      }, 800);
    } else {
      setStatus('error');
      setIsVerifying(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-8 border border-white/10 shadow-2xl animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500"><Key size={20} /></div>
            <h3 className="text-lg font-bold">AI Configuration</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 transition-colors"><X size={20} /></button>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {currentKeyHint 
            ? `Update your Gemini API key (Current: ${currentKeyHint})` 
            : "Enter your Gemini API key to initialize AI tasks and evaluations."}
        </p>
        
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="password" 
              value={val} 
              onChange={e => { setVal(e.target.value); setStatus('idle'); }}
              placeholder="Paste New API Key here..."
              className={`w-full bg-slate-100 dark:bg-slate-800 border-2 rounded-2xl px-5 py-4 text-sm outline-none transition-all ${
                status === 'error' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/10' : 
                status === 'success' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-transparent focus:border-indigo-500'
              }`}
            />
            {status === 'error' && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500" size={18} />}
            {status === 'success' && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />}
          </div>

          {status === 'error' && (
            <div className="flex items-start gap-2 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl animate-shake">
              <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={14} />
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold leading-tight">
                Wrong API key entered. Enter valid API key to initialize tasks.
              </p>
            </div>
          )}

          <button 
            onClick={handleVerify}
            disabled={isVerifying || !val.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            {isVerifying ? <Loader2 className="animate-spin" size={20} /> : status === 'success' ? 'Validated!' : 'Update & Connect'}
          </button>
          
          <a href="https://aistudio.google.com/app/apikey" target="_blank" className="block text-center text-[10px] text-slate-400 hover:text-indigo-500 underline uppercase tracking-widest font-black">Get API Key from Google</a>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [aiConnected, setAiConnected] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [homeworkTasks, setHomeworkTasks] = useState<HomeworkTask[]>([]);
  const [linguaSession, setLinguaSession] = useState<LinguaSession | null>(null);
  
  const isInitialLoad = useRef(true);
  const hideTimeoutRef = useRef<number | null>(null);
  
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('roadmap_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const checkAi = async () => {
      const key = await getApiKey();
      setAiConnected(!!key);
    };
    checkAi();
    const interval = setInterval(checkAi, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleConnectAI = async () => {
    setShowKeyModal(true);
  };

  const handleSaveKey = (key: string) => {
    saveManualKey(key);
    setAiConnected(true);
    if (user) {
      localStorage.removeItem(`lingua_vocab_${user.username}_${new Date().toDateString()}`);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const savedUser = localStorage.getItem('roadmap_user_session');
      if (savedUser) {
        try {
          await handleLogin(savedUser);
        } catch (err) {
          console.error("Auto-login failed:", err);
        }
      }
      setTimeout(() => setIsAuthChecking(false), 500);
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const handleLogin = async (username: string) => {
    setIsLoading(true);
    try {
      const profile = await api.login(username);
      
      const fixedTasks: DailyTask[] = FIXED_DAILY_TASKS.map((text, idx) => ({
        id: `fixed_${idx}`,
        text,
        completed: false,
        isFixed: true
      }));

      let finalDaily = profile.dailyTasks;
      if (finalDaily.length === 0) {
        finalDaily = fixedTasks;
      } else {
        const existingTexts = new Set(finalDaily.map(t => t.text));
        FIXED_DAILY_TASKS.forEach((text, idx) => {
          if (!existingTexts.has(text)) {
            finalDaily.push({ id: `fixed_${idx}`, text, completed: false, isFixed: true });
          }
        });
      }

      setItems(profile.roadmap);
      setDailyTasks(finalDaily);
      setHomeworkTasks(profile.homeworkTasks);
      setLinguaSession(profile.linguaSession || null);
      setUser({ username });
      localStorage.setItem('roadmap_user_session', username);
      isInitialLoad.current = false;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setItems([]);
    setDailyTasks([]);
    setHomeworkTasks([]);
    setLinguaSession(null);
    localStorage.removeItem('roadmap_user_session');
    setActiveTab('dashboard');
  };

  useEffect(() => {
    if (user && !isInitialLoad.current) {
      const timeout = setTimeout(() => {
        api.saveProfile(user.username, {
          roadmap: items,
          dailyTasks: dailyTasks,
          homeworkTasks: homeworkTasks,
          linguaSession: linguaSession || undefined
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [items, dailyTasks, homeworkTasks, linguaSession, user]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('roadmap_theme', newTheme);
      return newTheme;
    });
  };

  const toggleStatus = (id: string, newStatus: Status) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const getCompletionPercentage = (role?: Role) => {
    let filteredItems = items;
    if (role && role !== "All Roles") {
      filteredItems = items.filter(item => 
        item.role_alignment.includes(role) || item.role_alignment.includes("All Roles")
      );
    }
    const completed = filteredItems.filter(i => i.status === 'Completed').length;
    return filteredItems.length > 0 ? Math.round((completed / filteredItems.length) * 100) : 0;
  };

  const toggleDailyTask = (id: string) => {
    setDailyTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addDailyTask = (text: string) => {
    const newTask: DailyTask = { id: `custom_${Date.now()}`, text, completed: false, isFixed: false };
    setDailyTasks(prev => [...prev, newTask]);
  };

  const deleteDailyTask = (id: string) => {
    setDailyTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleHomeworkTask = (id: string) => {
    setHomeworkTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addHomeworkTask = (text: string) => {
    const newTask: HomeworkTask = { id: `hw_${Date.now()}`, text, completed: false };
    setHomeworkTasks(prev => [...prev, newTask]);
  };

  const deleteHomeworkTask = (id: string) => {
    setHomeworkTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateLinguaSession = (session: LinguaSession) => {
    setLinguaSession(session);
  };

  const showSidebar = () => {
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsSidebarVisible(true);
  };

  const hideSidebar = () => {
    if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsSidebarVisible(false);
      hideTimeoutRef.current = null;
    }, 400); 
  };

  const contextValue: RoadmapContextType = useMemo(() => ({
    items, user, theme, isAiConnected: aiConnected, login: handleLogin, logout: handleLogout,
    toggleTheme, toggleStatus, getCompletionPercentage,
    dailyTasks, homeworkTasks, toggleDailyTask, addDailyTask, deleteDailyTask,
    toggleHomeworkTask, addHomeworkTask, deleteHomeworkTask,
    linguaSession, updateLinguaSession
  }), [items, user, theme, aiConnected, dailyTasks, homeworkTasks, linguaSession]);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'tracker', label: 'Roadmap', icon: CheckSquare },
    { id: 'resources', label: 'Learn', icon: Library },
    { id: 'outputs', label: 'Portfolio', icon: Briefcase },
    { id: 'linguahub', label: 'Linguahub', icon: Languages },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tracker': return <Tracker />;
      case 'resources': return <Resources />;
      case 'outputs': return <Outputs />;
      case 'linguahub': return <Linguahub user={user} />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      {isAuthChecking && !showSplash ? (
        <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center z-[50]">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide animate-pulse">Initializing Environment...</p>
        </div>
      ) : !user ? (
        !isAuthChecking && <Login onLogin={handleLogin} isLoading={isLoading} />
      ) : (
        <RoadmapContext.Provider value={contextValue}>
          <div className="flex h-[100dvh] bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300 relative selection:bg-emerald-500/30">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50/40 via-white to-emerald-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-black dark:opacity-100 pointer-events-none transition-colors duration-700"></div>
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
               <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/30 dark:bg-emerald-500/10 rounded-full blur-[120px] opacity-70 dark:opacity-40 animate-pulse-slow"></div>
               <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-400/30 dark:bg-teal-500/10 rounded-full blur-[120px] opacity-70 dark:opacity-40 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/40 backdrop-blur-2xl border-b border-white/20 dark:border-white/5 z-[60] flex items-center justify-between px-4">
               <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm">
                    <Compass className="text-white" size={18} />
                 </div>
                 <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Compass</span>
               </div>
               <div className="flex items-center gap-1 sm:gap-2">
                  <button 
                    onClick={handleConnectAI} 
                    className={`p-2 rounded-full transition-colors ${aiConnected ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`}
                    title={aiConnected ? "Change API Key" : "Connect AI"}
                  >
                    <Cpu size={20} />
                  </button>
                  <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300">
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  {/* Mobile-only Extreme Right Logout */}
                  <button onClick={handleLogout} className="p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-500 transition-colors" title="Logout">
                    <LogOut size={20} />
                  </button>
               </div>
            </header>

            <div 
              onMouseEnter={showSidebar}
              className="hidden lg:block fixed left-0 top-0 bottom-0 w-3 z-[90]"
            ></div>

            <aside 
              onMouseEnter={showSidebar}
              onMouseLeave={hideSidebar}
              className={`hidden lg:flex fixed left-0 top-0 bottom-0 z-[110] h-full w-72 bg-white/80 dark:bg-slate-900/60 backdrop-blur-3xl border-r border-white/40 dark:border-white/5 flex-col shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full opacity-0'}`}
            >
              <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg">
                  <Compass className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="font-bold text-lg tracking-wide">Compass</h1>
                  <p className="text-[10px] text-slate-500">By Ruchith Alokam</p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                 <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1">
                      <HardDrive size={10} /> Local Session Active
                    </span>
                    <span className="text-sm font-semibold truncate text-slate-800 dark:text-white">{user?.username}</span>
                 </div>
                 <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                 </button>
              </div>

              <div className="px-4 py-3 mx-4 mt-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-white/5 group/ai relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">AI Status</span>
                  <div className={`w-2 h-2 rounded-full ${aiConnected ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 animate-pulse'}`}></div>
                </div>
                {aiConnected ? (
                  <button 
                    onClick={handleConnectAI}
                    className="w-full flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/5 p-1 rounded transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} /> Synchronized
                    </div>
                    <Settings2 size={12} className="opacity-0 group-hover/ai:opacity-100 transition-opacity" />
                  </button>
                ) : (
                  <button 
                    onClick={handleConnectAI}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <Zap size={12} fill="currentColor" /> Connect AI
                  </button>
                )}
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarVisible(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-slate-700'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-100 dark:border-white/5">
                 <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border border-rose-100 dark:border-red-900/30 text-rose-600 dark:text-red-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-sm font-medium">
                    <LogOut size={16} />
                    <span>Switch User</span>
                 </button>
              </div>
            </aside>

            <div 
               className={`hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-[85] bg-emerald-500 text-white p-1 rounded-r-lg shadow-lg cursor-pointer transition-transform duration-500 ${isSidebarVisible ? '-translate-x-full' : 'translate-x-0'}`}
               onMouseEnter={showSidebar}
            >
               <ChevronRightIcon size={16} className="animate-pulse" />
            </div>

            <main className="flex-1 h-full overflow-y-auto relative scroll-smooth z-10 pt-16 pb-24 lg:pt-0 lg:pb-0 scrollbar-hide">
              <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 min-h-full">
                {renderContent()}
              </div>
            </main>

            <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl border-t border-slate-200/50 dark:border-white/5 z-[60] flex items-center justify-around pb-safe">
               {navItems.map(item => (
                 <button
                   key={item.id}
                   onClick={() => setActiveTab(item.id)}
                   className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === item.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}
                 >
                   <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                   <span className="text-[10px] font-medium">{item.label}</span>
                 </button>
               ))}
            </nav>
            <KeyModal isOpen={showKeyModal} onClose={() => setShowKeyModal(false)} onSave={handleSaveKey} />
          </div>
        </RoadmapContext.Provider>
      )}
    </>
  );
};

export default App;
