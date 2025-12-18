
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
  Languages
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Tracker from './components/Tracker';
import Resources from './components/Resources';
import Outputs from './components/Outputs';
import Login from './components/Login';
import Linguahub from './components/Linguahub';
import SplashScreen from './components/SplashScreen';
import { RoadmapItem, Role, Status, User, DailyTask, HomeworkTask, RoadmapContextType } from './types';
import { api } from './services/api';
import { RoadmapContext } from './RoadmapContext';

// Fixed Daily Tasks Definition
const FIXED_DAILY_TASKS = [
  "Note down the topics discussed in class today",
  "Bus ride: Use AI to read topics & prepare PPT",
  "7:00 - 7:30 PM: Presentation",
  "Check roadmap tracker & complete skills",
  "Complete given homeworks"
];

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  
  // Daily & Homework State
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [homeworkTasks, setHomeworkTasks] = useState<HomeworkTask[]>([]);
  
  // Track date for midnight reset
  const dateRef = useRef(new Date().toDateString());
  
  // Theme State - Initialize based on LocalStorage or System Preference
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('roadmap_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Load User from LocalStorage on mount (Persistent Session)
  useEffect(() => {
    const savedUser = localStorage.getItem('roadmap_user_session');
    if (savedUser) {
      handleLogin(savedUser);
    }
  }, []);

  // Initialize Daily & Homework Logic with Reset
  useEffect(() => {
    if (!user) return;

    const storageKey = `roadmap_daily_data_${user.username}`;
    const storedData = localStorage.getItem(storageKey);
    const todayStr = new Date().toDateString();

    let initialDaily: DailyTask[] = [];
    let initialHomework: HomeworkTask[] = [];

    // Initialize Fixed Tasks structure
    const fixedTasks: DailyTask[] = FIXED_DAILY_TASKS.map((text, idx) => ({
      id: `fixed_${idx}`,
      text,
      completed: false,
      isFixed: true
    }));

    if (storedData) {
      const parsed = JSON.parse(storedData);
      const lastDate = parsed.date;

      if (lastDate !== todayStr) {
        // === NEW DAY: RESET LOGIC ===
        const prevDaily = parsed.daily || [];
        const userDefinedDaily = prevDaily
          .filter((t: DailyTask) => !t.isFixed)
          .map((t: DailyTask) => ({ ...t, completed: false }));
        
        initialDaily = [...fixedTasks, ...userDefinedDaily];
        initialHomework = []; // Clear homework for new day
      } else {
        // === SAME DAY: LOAD STATE ===
        initialDaily = parsed.daily || fixedTasks;
        initialHomework = parsed.homework || [];
        if (initialDaily.length === 0) initialDaily = fixedTasks;
      }
    } else {
      // First time initialization
      initialDaily = fixedTasks;
      initialHomework = [];
    }

    setDailyTasks(initialDaily);
    setHomeworkTasks(initialHomework);
  }, [user]);

  // Persist Daily Data whenever it changes
  useEffect(() => {
    if (!user) return;
    const storageKey = `roadmap_daily_data_${user.username}`;
    const data = {
      date: new Date().toDateString(),
      daily: dailyTasks,
      homework: homeworkTasks
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [dailyTasks, homeworkTasks, user]);

  // Sync Theme with DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Midnight Check Logic: Ensure tasks reset at midnight if app is open
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nowStr = new Date().toDateString();
      
      // Check if day has changed while app is running
      if (nowStr !== dateRef.current) {
         dateRef.current = nowStr;
         
         // Uncheck all daily tasks (keep structure)
         setDailyTasks(prev => prev.map(t => ({ ...t, completed: false })));
         
         // Clear homework tasks
         setHomeworkTasks([]);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = async (username: string) => {
    setIsLoading(true);
    try {
      const data = await api.login(username);
      setItems(data);
      setUser({ username });
      localStorage.setItem('roadmap_user_session', username);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setItems([]);
    localStorage.removeItem('roadmap_user_session');
    setActiveTab('dashboard');
  };

  // Auto-save roadmap items
  useEffect(() => {
    if (user && items.length > 0) {
      const timeout = setTimeout(() => {
        api.saveProgress(user.username, items);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [items, user]);

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

  // Daily Task Handlers
  const toggleDailyTask = (id: string) => {
    setDailyTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addDailyTask = (text: string) => {
    const newTask: DailyTask = {
      id: `custom_${Date.now()}`,
      text,
      completed: false,
      isFixed: false
    };
    setDailyTasks(prev => [...prev, newTask]);
  };

  const deleteDailyTask = (id: string) => {
    setDailyTasks(prev => prev.filter(t => t.id !== id));
  };

  // Homework Handlers
  const toggleHomeworkTask = (id: string) => {
    setHomeworkTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addHomeworkTask = (text: string) => {
    const newTask: HomeworkTask = {
      id: `hw_${Date.now()}`,
      text,
      completed: false
    };
    setHomeworkTasks(prev => [...prev, newTask]);
  };

  const deleteHomeworkTask = (id: string) => {
    setHomeworkTasks(prev => prev.filter(t => t.id !== id));
  };

  const contextValue: RoadmapContextType = useMemo(() => ({
    items,
    user,
    theme,
    login: handleLogin,
    logout: handleLogout,
    toggleTheme,
    toggleStatus,
    getCompletionPercentage,
    dailyTasks,
    homeworkTasks,
    toggleDailyTask,
    addDailyTask,
    deleteDailyTask,
    toggleHomeworkTask,
    addHomeworkTask,
    deleteHomeworkTask,
  }), [items, user, theme, dailyTasks, homeworkTasks]);

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
      {/* Splash Screen Overlay - Renders on top but allows App to load behind */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      {/* Main App Container */}
      {!user ? (
        <Login onLogin={handleLogin} isLoading={isLoading} />
      ) : (
        <RoadmapContext.Provider value={contextValue}>
          <div className="flex h-[100dvh] bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300 relative selection:bg-emerald-500/30">
            
            {/* Global Light Mode Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50/40 via-white to-emerald-50/40 dark:opacity-0 pointer-events-none"></div>

            {/* Background Gradients for Glassmorphism (Enhanced for Light Mode) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
               <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full blur-[120px] opacity-70 dark:opacity-20 animate-pulse-slow"></div>
               <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-400/30 dark:bg-teal-500/20 rounded-full blur-[120px] opacity-70 dark:opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
               <div className="absolute top-[40%] left-[40%] w-[600px] h-[600px] bg-blue-400/30 dark:bg-blue-500/10 rounded-full blur-[120px] opacity-60 dark:opacity-10 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* === MOBILE: TOP HEADER === */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10 z-[60] flex items-center justify-between px-4 shadow-sm shadow-emerald-100/20 dark:shadow-none">
               <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm">
                    <Compass className="text-white" size={18} />
                 </div>
                 <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Compass</span>
               </div>
               <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-slate-300"
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-full text-rose-500 hover:bg-rose-50/50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
               </div>
            </header>

            {/* === DESKTOP: SIDEBAR === */}
            <aside className="hidden lg:flex relative z-[40] h-full w-72 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border-r border-white/40 dark:border-white/10 flex-col shadow-xl shadow-emerald-100/30 dark:shadow-black/20">
              <div className="p-6 border-b border-slate-100 dark:border-white/10 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg shadow-emerald-500/20">
                  <Compass className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="font-bold text-lg tracking-wide text-slate-900 dark:text-slate-100">Compass</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Hybrid Profile Tracker</p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-white/10">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Logged in as</span>
                    <span className="text-sm font-semibold truncate max-w-[120px] text-slate-800 dark:text-white" title={user.username}>{user.username}</span>
                 </div>
                 <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-slate-100/80 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                 >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                 </button>
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/50 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-white/10 shadow-sm shadow-emerald-100/50 dark:shadow-none' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    <item.icon size={20} className={activeTab === item.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-100 dark:border-white/10">
                 <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border border-rose-100 dark:border-red-900/30 text-rose-600 dark:text-red-400 hover:bg-rose-50 dark:hover:bg-red-900/10 transition-colors text-sm font-medium"
                 >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                 </button>
              </div>
            </aside>

            {/* === MAIN CONTENT === */}
            <main className="flex-1 h-full overflow-y-auto relative scroll-smooth z-10 pt-16 pb-24 lg:pt-0 lg:pb-0 scrollbar-hide">
              <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 lg:pt-10 min-h-full">
                {renderContent()}
              </div>
            </main>

            {/* === MOBILE: BOTTOM NAVIGATION === */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-white/10 z-[60] flex items-center justify-around px-2 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)] dark:shadow-none">
               {navItems.map(item => (
                 <button
                   key={item.id}
                   onClick={() => setActiveTab(item.id)}
                   className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                     activeTab === item.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'
                   }`}
                 >
                   <div className={`p-1 rounded-full transition-all ${activeTab === item.id ? 'bg-emerald-100/50 dark:bg-emerald-500/20 scale-110' : ''}`}>
                     <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                   </div>
                   <span className="text-[10px] font-medium">{item.label}</span>
                 </button>
               ))}
            </nav>

          </div>
        </RoadmapContext.Provider>
      )}
    </>
  );
};

export default App;