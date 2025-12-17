
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
  Globe
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Tracker from './components/Tracker';
import Resources from './components/Resources';
import Outputs from './components/Outputs';
import Login from './components/Login';
import Linguahub from './components/Linguahub';
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
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  
  // Daily & Homework State
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [homeworkTasks, setHomeworkTasks] = useState<HomeworkTask[]>([]);
  
  // Track date for midnight reset
  const dateRef = useRef(new Date().toDateString());
  
  // Theme State - Default to dark
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load User from LocalStorage on mount (Persistent Session)
  useEffect(() => {
    const savedUser = localStorage.getItem('roadmap_user_session');
    if (savedUser) {
      handleLogin(savedUser);
    }
    // Initialize theme
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
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
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
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
    { id: 'linguahub', label: 'Linguahub', icon: Globe },
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

  if (!user) {
    return <Login onLogin={handleLogin} isLoading={isLoading} />;
  }

  return (
    <RoadmapContext.Provider value={contextValue}>
      <div className="flex h-[100dvh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
        
        {/* === MOBILE: TOP HEADER === */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-[60] flex items-center justify-between px-4">
           <div className="flex items-center gap-2">
             <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-sm">
                <Compass className="text-white" size={18} />
             </div>
             <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Compass</span>
           </div>
           <div className="flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={20} />
              </button>
           </div>
        </header>

        {/* === DESKTOP: SIDEBAR === */}
        <aside className="hidden lg:flex relative z-[40] h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shadow-xl">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
              <Compass className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide text-slate-900 dark:text-slate-100">Compass</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hybrid Profile Tracker</p>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
             <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Logged in as</span>
                <span className="text-sm font-semibold truncate max-w-[120px]" title={user.username}>{user.username}</span>
             </div>
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
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
                    ? 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
             <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm font-medium"
             >
                <LogOut size={16} />
                <span>Sign Out</span>
             </button>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-16 pb-24 lg:pt-0 lg:pb-0 z-0">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 lg:pt-10 min-h-full">
            {renderContent()}
          </div>
        </main>

        {/* === MOBILE: BOTTOM NAVIGATION === */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-[60] flex items-center justify-around px-2 pb-safe">
           {navItems.map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                 activeTab === item.id ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'
               }`}
             >
               <div className={`p-1 rounded-full transition-all ${activeTab === item.id ? 'bg-cyan-100 dark:bg-cyan-500/10 scale-110' : ''}`}>
                 <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
               </div>
               <span className="text-[10px] font-medium">{item.label}</span>
             </button>
           ))}
        </nav>

      </div>
    </RoadmapContext.Provider>
  );
};

export default App;
