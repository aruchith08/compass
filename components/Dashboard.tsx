
import React, { useState, useEffect, useRef } from 'react';
import { useRoadmap } from '../RoadmapContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, Cell } from 'recharts';
import { Target, Trophy, Flame, ListTodo, BookOpen, Plus, Trash2, CheckCircle, Presentation, Search, ExternalLink, Quote, GraduationCap, CalendarClock, PartyPopper, Sparkles, Milestone, LogOut, CircleDot, Star, Coffee, Sunrise, Zap, BrainCircuit, FileText, ShoppingBag, TrendingUp, RefreshCw } from 'lucide-react';
import { Role } from '../types';
import SyllabusViewer from './SyllabusViewer';
import TimetableModal from './TimetableModal';
import ResumeArchitectModal from './ResumeArchitect';
import StarShopModal from './StarShop';
import { runGenAI } from '../services/ai';

// --- Custom Brand Icon for Roadmap.sh ---
const RoadmapShIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M9 23V13.5C9 11.567 10.567 10 12.5 10H15" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round"
    />
    <circle cx="23" cy="21" r="3.5" fill="currentColor" />
  </svg>
);

// --- Custom Plain Closed Book Icon for Goalkicker ---
const GoalKickerIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M11 7h3" opacity="0.4" strokeWidth="1.5" />
  </svg>
);

// --- Confetti Component: "Fountain Burst" from Bottom ---
const ConfettiEffect: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    if (active) {
      const colors = ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6', '#ef4444', '#facc15'];
      const count = 200;
      const newParticles = Array.from({ length: count }).map((_, i) => {
        const xMid = (Math.random() - 0.5) * 500;
        const yMid = - (Math.random() * 400 + 150);
        const xEnd = xMid + (Math.random() - 0.5) * 200;
        return {
          id: i, color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 8 + 4, isCircle: Math.random() > 0.4, delay: Math.random() * 0.4,
          vars: { '--x-mid': `${xMid}px`, '--y-mid': `${yMid}px`, '--x-end': `${xEnd}px`, '--rotation': `${Math.random() * 1440}deg`, }
        };
      });
      setParticles(newParticles);
      const timer = setTimeout(() => setParticles([]), 5500);
      return () => clearTimeout(timer);
    }
  }, [active]);
  if (!active || particles.length === 0) return null;
  return (
    <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div key={p.id} className="absolute left-1/2 bottom-0 animate-confetti-burst" style={{ backgroundColor: p.color, width: p.isCircle ? `${p.size}px` : `${p.size * 1.8}px`, height: `${p.size}px`, animationDelay: `${p.delay}s`, borderRadius: p.isCircle ? '50%' : '1px', ...p.vars } as React.CSSProperties} />
      ))}
    </div>
  );
};

// --- Morning Briefing AI Component ---
const MorningBriefing: React.FC = () => {
  const { user, starPoints, dailyTasks, items, isAiConnected } = useRoadmap();
  const [briefing, setBriefing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkBriefing = async () => {
      if (!user || !isAiConnected) return;

      const today = new Date().toDateString();
      const storageKey = `compass_briefing_${user.username}_${today}`;
      const savedBriefing = localStorage.getItem(storageKey);

      if (savedBriefing) {
        setBriefing(savedBriefing);
        return;
      }

      // Generate new briefing
      setLoading(true);
      try {
        const pendingCount = dailyTasks.filter(t => !t.completed).length;
        const inProgressRoadmap = items.filter(i => i.status === 'In Progress').map(i => i.name).slice(0, 2).join(", ");
        
        const prompt = `
          You are a tactical military-style AI career OS named "Compass".
          User: ${user.username}
          XP: ${starPoints}
          Pending Routine Tasks: ${pendingCount}
          Current Focus: ${inProgressRoadmap || "General Foundations"}
          
          Generate a short, high-energy, stoic morning briefing (max 40 words).
          Focus on discipline, momentum, and executing the mission today.
          Do not say "Good morning". Start directly with the tactical advice.
        `;

        await runGenAI(async (ai) => {
          const result = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
          });
          const text = result.text?.trim() || "Systems online. Execute your objectives.";
          setBriefing(text);
          localStorage.setItem(storageKey, text);
        });
      } catch (e) {
        console.error("Briefing Gen Error", e);
      } finally {
        setLoading(false);
      }
    };

    checkBriefing();
  }, [user, isAiConnected, dailyTasks, items, starPoints]);

  if (dismissed || (!briefing && !loading)) return null;

  return (
    <div className="w-full mb-6 animate-slide-down">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-indigo-950 dark:to-slate-900 text-white shadow-xl shadow-indigo-500/10 border border-indigo-500/20">
        <div className="absolute top-0 right-0 p-24 bg-indigo-500/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
        <div className="relative z-10 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md shrink-0">
             {loading ? <Zap className="animate-pulse text-yellow-400" size={24} /> : <Sunrise className="text-amber-400" size={24} />}
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">
              Daily Tactical Briefing
            </h4>
            {loading ? (
              <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
            ) : (
              <p className="text-sm md:text-base font-medium leading-relaxed font-mono opacity-90">
                "{briefing}"
              </p>
            )}
          </div>
          <button 
            onClick={() => setDismissed(true)}
            className="self-start md:self-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Memory Anchor (Flashcards) ---
const MemoryAnchor: React.FC = () => {
    const { items, isAiConnected } = useRoadmap();
    const [question, setQuestion] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    
    // Pick a completed task
    const completedTasks = items.filter(i => i.status === 'Completed');
    
    const generateFlashcard = async () => {
        if (!isAiConnected || completedTasks.length === 0) return;
        setLoading(true);
        setShowAnswer(false);
        const randomTask = completedTasks[Math.floor(Math.random() * completedTasks.length)];
        
        try {
            await runGenAI(async (ai) => {
                const prompt = `Generate a single conceptual flashcard question for the topic: "${randomTask.name}". Do NOT provide the answer yet. Just the question. Keep it challenging.`;
                const result = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: prompt
                });
                setQuestion(result.text || "Explain this concept.");
            });
        } catch(e) { console.error(e); } 
        finally { setLoading(false); }
    };

    if (completedTasks.length === 0) return null;

    return (
        <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm relative group overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200"><BrainCircuit size={16} className="text-indigo-500" /> Memory Anchor</h3>
                <button onClick={generateFlashcard} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"><RefreshCw size={14} className={loading ? 'animate-spin' : ''} /></button>
            </div>
            <div className="min-h-[100px] flex items-center justify-center text-center">
                {!question && !loading && (
                    <button onClick={generateFlashcard} className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl">Start Recall Session</button>
                )}
                {loading && <Zap className="animate-pulse text-indigo-400" />}
                {question && !loading && (
                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">{question}</p>
                        <button onClick={() => setShowAnswer(true)} className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors ${showAnswer ? 'hidden' : 'block'}`}>Reveal Answer (Mental Check)</button>
                         {showAnswer && <p className="text-xs text-emerald-500 font-bold animate-fade-in">Did you recall correctly?</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Market Pulse (Trending) ---
const MarketPulse: React.FC<{ className?: string }> = ({ className }) => {
    const { isAiConnected } = useRoadmap();
    const [trends, setTrends] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTrends = async () => {
            if(!isAiConnected) return;
            const cached = localStorage.getItem('market_pulse_trends');
            if(cached) { setTrends(JSON.parse(cached)); return; }

            setLoading(true);
            try {
                await runGenAI(async (ai) => {
                    const prompt = "List 3 top trending technical skills for AI Engineers right now. Just the names, comma separated.";
                    const result = await ai.models.generateContent({
                        model: "gemini-3-flash-preview",
                        contents: prompt,
                        config: { tools: [{ googleSearch: {} }] }
                    });
                    const text = result.text || "RAG, LLMOps, Agents";
                    const list = text.split(',').map(s => s.trim()).slice(0, 3);
                    setTrends(list);
                    localStorage.setItem('market_pulse_trends', JSON.stringify(list));
                });
            } catch(e) { 
                 // Fallback if search fails
                 setTrends(["Generative AI", "MLOps", "Edge AI"]);
            } finally { setLoading(false); }
        };
        fetchTrends();
    }, [isAiConnected]);

    if (!isAiConnected) return null;

    return (
        <div className={`bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-lg relative overflow-hidden border border-slate-700/50 ${className}`}>
            <div className="absolute top-0 right-0 p-16 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <h3 className="text-xs font-bold flex items-center gap-2 mb-3 relative z-10 uppercase tracking-wider text-blue-300"><TrendingUp size={14} className="text-blue-400" /> Market Pulse</h3>
            {loading ? <div className="h-8 animate-pulse bg-white/10 rounded-xl" /> : (
                <div className="flex flex-wrap gap-2 relative z-10">
                    {trends.map((t, i) => (
                        <span key={i} className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-lg border border-white/5 whitespace-nowrap">{t}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

const Dashboard: React.FC = () => {
  const { items, getCompletionPercentage, user, starPoints, dailyTasks, homeworkTasks, toggleDailyTask, addDailyTask, deleteDailyTask, toggleHomeworkTask, addHomeworkTask, deleteHomeworkTask, isAiConnected } = useRoadmap();
  const [newDaily, setNewDaily] = useState('');
  const [newHomework, setNewHomework] = useState('');
  const [showTimetable, setShowTimetable] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [celebrateDaily, setCelebrateDaily] = useState(false);
  const [celebrateHomework, setCelebrateHomework] = useState(false);
  const allDailyDone = dailyTasks.length > 0 && dailyTasks.every(t => t.completed);
  const allHomeworkDone = homeworkTasks.length > 0 && homeworkTasks.every(t => t.completed);
  const dailyWasDoneRef = useRef(allDailyDone);
  const hwWasDoneRef = useRef(allHomeworkDone);

  useEffect(() => {
    if (allDailyDone && !dailyWasDoneRef.current) { setCelebrateDaily(true); const t = setTimeout(() => setCelebrateDaily(false), 5000); dailyWasDoneRef.current = true; return () => clearTimeout(t); }
    if (!allDailyDone) dailyWasDoneRef.current = false;
  }, [allDailyDone]);

  useEffect(() => {
    if (allHomeworkDone && !hwWasDoneRef.current) { setCelebrateHomework(true); const t = setTimeout(() => setCelebrateHomework(false), 5000); hwWasDoneRef.current = true; return () => clearTimeout(t); }
    if (!allHomeworkDone) hwWasDoneRef.current = false;
  }, [allHomeworkDone]);

  const handleAddDaily = (e: React.FormEvent) => { e.preventDefault(); if(newDaily.trim()) { addDailyTask(newDaily); setNewDaily(''); } };
  const handleAddHomework = (e: React.FormEvent) => { e.preventDefault(); if(newHomework.trim()) { addHomeworkTask(newHomework); setNewHomework(''); } };
  const scrollToSyllabus = () => { const section = document.getElementById('syllabus-section'); if (section) section.scrollIntoView({ behavior: 'smooth' }); };
  const handlePerplexityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://www.perplexity.ai/", "_blank");
  };

  const roles: Role[] = ["AI/ML Engineer", "Data Scientist", "Data Analyst", "AI Security Officer", "Full Stack Developer"];
  const roleData = roles.map(role => ({ 
    name: role.replace("Officer", "Sec").replace("Engineer", "Eng").replace("Developer", "Dev").replace("Scientist", "Sci").replace("Analyst", "Anlyst"), 
    fullName: role, 
    score: getCompletionPercentage(role), 
    fill: '#10b981' 
  }));
  const totalProgress = getCompletionPercentage("All Roles");
  
  // High Priority Queue: Take top 2 items, then allow space for Market Pulse
  const nextFocusItems = items.filter(i => (i.status === 'To Do' || i.status === 'In Progress') && i.priority === 'High').slice(0, 2);
  const completedCount = items.filter(i => i.status === 'Completed').length;
  const glassCardClass = "bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-lg dark:shadow-2xl dark:shadow-emerald-500/5 rounded-3xl p-5 sm:p-6 transition-all duration-300 min-w-0";

  return (
    <div className="space-y-8 pb-12 w-full max-w-full overflow-hidden">
      
      {/* Morning Briefing Insertion */}
      {isAiConnected && <MorningBriefing />}

      {/* COMPACT RESPONSIVE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 animate-slide-up mb-2" style={{ animationDelay: '50ms' }}>
        <div className="shrink-0">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">System <span className="text-emerald-600 dark:text-emerald-400">Initialized</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Strategic overview for your professional development.</p>
        </div>
        
        {/* ACTION BAR - Horizontally scrollable on mobile to prevent vertical stacking issues */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
           {/* Internal App Tools */}
           <div className="flex shrink-0 gap-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <button onClick={scrollToSyllabus} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" title="Academic Syllabus"><GraduationCap size={20} /></button>
              <button onClick={() => setShowResume(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Resume Architect"><FileText size={20} /></button>
              <button onClick={() => setShowShop(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors" title="Star Shop"><ShoppingBag size={20} /></button>
              <button onClick={() => setShowTimetable(true)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" title="Class Timetable"><CalendarClock size={20} /></button>
           </div>

           {/* External Resources */}
           <div className="flex shrink-0 gap-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors" title="Roadmap.sh"><RoadmapShIcon size={20} /></a>
              <a href="https://goalkicker.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors" title="GoalKicker Books"><GoalKickerIcon size={20} /></a>
              <a href="https://gamma.app" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-purple-500 transition-colors" title="Gamma Presentations"><Presentation size={20} /></a>
              <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors" title="Perplexity AI"><Search size={20} /></a>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
        {/* Daily Routine Card */}
        <div className={`${glassCardClass} flex flex-col h-full min-h-[300px] relative transition-all duration-500 overflow-hidden ${allDailyDone ? 'border-amber-400/50 shadow-amber-200/40' : 'hover:shadow-xl dark:hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/20'}`}>
          <ConfettiEffect active={celebrateDaily} />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className={`p-2 rounded-xl transition-colors ${allDailyDone ? 'bg-amber-100 dark:bg-amber-500/20' : 'bg-indigo-100/50 dark:bg-indigo-500/10'}`}>
                {allDailyDone ? <PartyPopper className="text-amber-600 dark:text-amber-400" size={18} /> : <ListTodo className="text-indigo-600 dark:text-indigo-400" size={18} />}
              </span>
              Daily Routine
              <div className="flex items-center gap-1.5 ml-2 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 group cursor-pointer" onClick={() => setShowShop(true)}>
                <Star size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
                <span className={`text-sm font-black ${starPoints >= 0 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-500'}`}>
                  {starPoints}
                </span>
              </div>
            </h3>
            {allDailyDone ? ( <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-full animate-bounce flex items-center gap-1"><Sparkles size={10} /> CLEAR <Sparkles size={10} /></span> ) : ( <span className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest px-2 sm:px-3 py-1 bg-slate-100 dark:bg-slate-800/40 rounded-full whitespace-nowrap">Auto-Reset</span> )}
          </div>
          <div className="flex-1 space-y-1 mb-4 overflow-y-auto max-h-[220px] custom-scrollbar relative z-10 pr-2">
            {dailyTasks.map(task => ( 
              <div key={task.id} className="flex items-start group p-1.5 sm:p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <button 
                  onClick={() => toggleDailyTask(task.id)} 
                  className={`mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${ task.completed ? 'bg-indigo-500 border-indigo-500 text-white scale-105 shadow-md shadow-indigo-500/30' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400' }`}
                >
                  {task.completed && <CheckCircle size={18} strokeWidth={3} />}
                </button>
                <span className={`text-sm flex-1 leading-relaxed transition-colors duration-300 font-medium py-0.5 ${task.completed ? 'text-slate-400 line-through decoration-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                  {task.text}
                </span>
                {!task.isFixed && ( 
                  <button onClick={() => deleteDailyTask(task.id)} className="sm:opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 transition-opacity">
                    <Trash2 size={16} />
                  </button> 
                )}
              </div> 
            ))}
          </div>
          <form onSubmit={handleAddDaily} className="relative mt-auto z-10"><input type="text" value={newDaily} onChange={(e) => setNewDaily(e.target.value)} placeholder="Add routine item..." className="w-full bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white placeholder-slate-400 shadow-inner" /><button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-all active:scale-90 shadow-lg shadow-indigo-500/20"><Plus size={18} /></button></form>
          {allDailyDone && ( <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none animate-sparkle"><Sparkles size={120} className="text-amber-500" /></div> )}
        </div>

        {/* Homework Card */}
        <div className={`${glassCardClass} flex flex-col h-full min-h-[300px] relative transition-all duration-500 overflow-hidden ${allHomeworkDone ? 'border-emerald-400/50 shadow-emerald-200/40' : 'hover:shadow-xl dark:hover:shadow-rose-500/10 hover:border-rose-200 dark:hover:border-rose-500/20'}`}>
          <ConfettiEffect active={celebrateHomework} />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className={`p-2 rounded-xl transition-colors ${allHomeworkDone ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-rose-100/50 dark:bg-rose-500/10'}`}>
                {allHomeworkDone ? <PartyPopper className="text-emerald-600 dark:text-emerald-400" size={18} /> : <BookOpen className="text-rose-600 dark:text-rose-400" size={18} />}
              </span>
              Homework Tasks
            </h3>
            {allHomeworkDone ? ( <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full animate-bounce flex items-center gap-1"><Sparkles size={10} /> SATISFIED <Sparkles size={10} /></span> ) : ( <span className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest px-2 sm:px-3 py-1 bg-slate-100 dark:bg-slate-800/40 rounded-full whitespace-nowrap">Active Task</span> )}
          </div>
          <div className="flex-1 space-y-1 mb-4 overflow-y-auto max-h-[220px] custom-scrollbar relative z-10 pr-2">
            {homeworkTasks.length === 0 && ( <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm min-h-[100px] font-medium opacity-50"><p>No academic tasks pending.</p></div> )}
            {homeworkTasks.map(task => ( 
              <div key={task.id} className="flex items-start group p-1.5 sm:p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <button 
                  onClick={() => toggleHomeworkTask(task.id)} 
                  className={`mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${ task.completed ? 'bg-rose-500 border-rose-500 text-white scale-105 shadow-md shadow-rose-500/30' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:bg-white' }`}
                >
                  {task.completed && <CheckCircle size={18} strokeWidth={3} />}
                </button>
                <span className={`text-sm flex-1 leading-relaxed transition-colors duration-300 font-medium py-0.5 ${task.completed ? 'text-slate-400 line-through decoration-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                  {task.text}
                </span>
                <button onClick={() => deleteHomeworkTask(task.id)} className="sm:opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 transition-opacity">
                  <Trash2 size={16} />
                </button>
              </div> 
            ))}
          </div>
          <form onSubmit={handleAddHomework} className="relative mt-auto z-10"><input type="text" value={newHomework} onChange={(e) => setNewHomework(e.target.value)} placeholder="Add homework task..." className="w-full bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:text-white placeholder-slate-400 shadow-inner" /><button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all active:scale-90 shadow-lg shadow-rose-500/20"><Plus size={18} /></button></form>
          {allHomeworkDone && ( <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none animate-sparkle"><Sparkles size={120} className="text-emerald-500" /></div> )}
        </div>
      </div>
      
      {/* Memory Anchor Row (Now Full Width) */}
      <div className="w-full animate-slide-up" style={{ animationDelay: '150ms' }}>
         <MemoryAnchor />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className={`${glassCardClass} relative overflow-hidden flex flex-col`}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="p-2 bg-emerald-100/50 dark:bg-emerald-500/10 rounded-xl"><Milestone className="text-emerald-600 dark:text-emerald-400" size={18} /></span>
            Milestone Radar
          </h3>
          <div className="w-full flex-1 relative z-10 flex items-center justify-center min-h-[300px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={roleData}>
                <PolarGrid stroke="#64748b" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Radar name="Readiness" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} dot={{ r: 4, fill: "#10b981" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 pt-4 border-t border-slate-100 dark:border-white/5 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate Readiness: {totalProgress}%</span>
          </div>
        </div>

        <div className={`${glassCardClass} flex flex-col`}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="p-2 bg-rose-100/50 dark:bg-rose-500/10 rounded-xl"><Flame className="text-rose-600 dark:text-rose-400" size={18} /></span>
            High Priority Queue
          </h3>
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar pr-1">
            {nextFocusItems.length > 0 || isAiConnected ? (
              <>
                {nextFocusItems.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-slate-50/80 dark:bg-slate-800/20 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all hover:translate-x-1 animate-slide-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">Level {item.year}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{item.category}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug line-clamp-2">{item.name}</h4>
                  </div>
                ))}
                <MarketPulse className="animate-slide-up" />
              </>
            ) : <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center py-10 font-medium"><p className="text-sm">Queue empty. Synchronization optimal.</p></div>}
          </div>
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-500">Nodes Completed</span>
            <span className="text-emerald-600 dark:text-emerald-400">{completedCount}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-100/80 via-white/90 to-teal-50/80 dark:from-emerald-950/80 dark:via-slate-900/95 dark:to-teal-950/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-xl shadow-emerald-200/40 dark:shadow-2xl dark:shadow-emerald-900/40 animate-slide-up border border-emerald-200/60 dark:border-emerald-500/20" style={{ animationDelay: '300ms' }}>
        <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 dark:bg-emerald-400/15 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 p-32 bg-teal-500/5 dark:bg-teal-400/10 rounded-full blur-[100px] -ml-16 -mb-16 pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <Quote className="text-emerald-600/20 dark:text-emerald-400/30 mb-4" size={56} />
            <p className="text-xl md:text-3xl font-serif italic leading-relaxed text-slate-800 dark:text-slate-50">
              "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="h-0.5 w-10 bg-emerald-500/50 dark:bg-emerald-400/50"></div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-black uppercase tracking-[0.4em]">
                Brian Herbert
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <button onClick={handlePerplexityClick} className="bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 dark:hover:bg-emerald-400 hover:scale-105 transition-all shadow-xl shadow-emerald-600/30 dark:shadow-emerald-500/40 flex items-center gap-3 active:scale-95 group">
              <Search size={18} /> Deep Context Search <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      <SyllabusViewer />
      {showTimetable && <TimetableModal user={user} onClose={() => setShowTimetable(false)} />}
      {showResume && <ResumeArchitectModal onClose={() => setShowResume(false)} />}
      {showShop && <StarShopModal onClose={() => setShowShop(false)} />}
    </div>
  );
};

export default Dashboard;
