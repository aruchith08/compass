
import React, { useState, useEffect, useRef } from 'react';
import { useRoadmap } from '../RoadmapContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, Cell } from 'recharts';
import { Target, Trophy, Flame, ListTodo, BookOpen, Plus, Trash2, CheckCircle, Presentation, Search, ExternalLink, Quote, GraduationCap, CalendarClock, PartyPopper, Sparkles, Milestone } from 'lucide-react';
import { Role } from '../types';
import SyllabusViewer from './SyllabusViewer';
import TimetableModal from './TimetableModal';

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

const Dashboard: React.FC = () => {
  const { items, getCompletionPercentage, user, dailyTasks, homeworkTasks, toggleDailyTask, addDailyTask, deleteDailyTask, toggleHomeworkTask, addHomeworkTask, deleteHomeworkTask, } = useRoadmap();
  const [newDaily, setNewDaily] = useState('');
  const [newHomework, setNewHomework] = useState('');
  const [showTimetable, setShowTimetable] = useState(false);
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
  const nextFocusItems = items.filter(i => (i.status === 'To Do' || i.status === 'In Progress') && i.priority === 'High').slice(0, 3);
  const completedCount = items.filter(i => i.status === 'Completed').length;
  const glassCardClass = "bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-lg dark:shadow-2xl dark:shadow-emerald-500/5 rounded-3xl p-5 sm:p-6 transition-all duration-300 min-w-0";

  return (
    <div className="space-y-8 pb-12 w-full max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">System <span className="text-emerald-600 dark:text-emerald-400">Initialized</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring career trajectory for {user?.username}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <div className="flex gap-2">
              <button onClick={scrollToSyllabus} className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all shadow-sm" title="Academic Syllabus"><GraduationCap size={20} /></button>
              <a href="https://gamma.app/create" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm" title="Presentation Builder"><Presentation size={20} /></a>
              <a href="https://www.perplexity.ai/" onClick={handlePerplexityClick} className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all shadow-sm" title="Deep Search AI"><Search size={20} /></a>
              <button onClick={() => setShowTimetable(true)} className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all shadow-sm" title="Class Timetable"><CalendarClock size={20} /></button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-slide-up" style={{ animationDelay: '200ms' }}>
        {/* Progress Radar/Milestone Visual */}
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

        {/* Next Focus Card */}
        <div className={`${glassCardClass} flex flex-col`}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="p-2 bg-rose-100/50 dark:bg-rose-500/10 rounded-xl"><Flame className="text-rose-600 dark:text-rose-400" size={18} /></span>
            High Priority Queue
          </h3>
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar pr-1">
            {nextFocusItems.length > 0 ? nextFocusItems.map((item, idx) => (
              <div key={item.id} className="p-4 bg-slate-50/80 dark:bg-slate-800/20 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all hover:translate-x-1 animate-slide-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">Level {item.year}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{item.category}</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug line-clamp-2">{item.name}</h4>
              </div>
            )) : <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center py-10 font-medium"><p className="text-sm">Queue empty. Synchronization optimal.</p></div>}
          </div>
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span className="text-slate-500">Nodes Completed</span>
            <span className="text-emerald-600 dark:text-emerald-400">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Quote Section - Vibrant in both Light and Dark mode */}
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
    </div>
  );
};

export default Dashboard;
