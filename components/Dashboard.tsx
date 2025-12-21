
import React, { useState, useEffect, useRef } from 'react';
import { useRoadmap } from '../RoadmapContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Target, Trophy, Flame, ListTodo, BookOpen, Plus, Trash2, CheckCircle, Presentation, Search, ExternalLink, Quote, GraduationCap, CalendarClock, PartyPopper, Sparkles, SpellCheck } from 'lucide-react';
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
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android/.test(userAgent);
    if (isMobile) { window.location.href = "https://perplexity.sng.link/A6awk/ppas?_smtype=3&pvid=83882534-5238-4282-8b29-06f008299556&_ios_dl=perplexity-app%3A%2F%2F&_android_dl=perplexity-app%3A%2F%2F&_web_params=utm_source%3Demail%26utm_campaign%3DGA_launch&_dl=perplexity-app%3A%2F%2F&_p=origin%3Dmobile-header%26pvid%3D83882534-5238-4282-8b29-06f008299556%26pathname%3D%252F&_ddl=perplexity-app%3A%2F%2F"; } 
    else { window.open("https://www.perplexity.ai/", "_blank"); }
  };

  const roles: Role[] = ["AI/ML Engineer", "Data Scientist", "Data Analyst", "AI Security Officer", "Full Stack Developer"];
  const roleData = roles.map(role => ({ name: role.replace("Officer", "").replace("Engineer", "Eng").replace("Developer", "Dev").replace("Scientist", "Sci"), fullName: role, score: getCompletionPercentage(role), fill: '#10b981' }));
  const totalProgress = getCompletionPercentage("All Roles");
  const overallData = [{ name: 'Completed', value: totalProgress, fill: '#10b981' }, { name: 'Remaining', value: 100 - totalProgress, fill: '#1e293b' }];
  const nextFocusItems = items.filter(i => (i.status === 'To Do' || i.status === 'In Progress') && i.priority === 'High').slice(0, 3);
  const completedCount = items.filter(i => i.status === 'Completed').length;
  const glassCardClass = "bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-lg dark:shadow-2xl dark:shadow-emerald-500/5 rounded-2xl p-6 transition-all duration-300 min-w-0";

  return (
    <div className="space-y-8 pb-12 w-full max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back, <span className="text-emerald-600 dark:text-emerald-400">{user?.username}</span></h2>
          <p className="text-slate-500 dark:text-slate-400">Track your journey to a powerful hybrid profile.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <div className="flex gap-2">
              <button onClick={scrollToSyllabus} className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all shadow-sm"><GraduationCap size={20} /></button>
              <a href="https://gamma.app/create" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm"><Presentation size={20} /></a>
              <a href="https://www.perplexity.ai/" onClick={handlePerplexityClick} className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all shadow-sm"><Search size={20} /></a>
              <a href="https://www.merriam-webster.com/games/spell-it" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all shadow-sm" title="Spelling Mastery Game"><SpellCheck size={20} /></a>
              <button onClick={() => setShowTimetable(true)} className="p-2.5 bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all shadow-sm"><CalendarClock size={20} /></button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className={`${glassCardClass} flex flex-col h-full min-h-[300px] relative transition-all duration-500 overflow-hidden ${allDailyDone ? 'border-amber-400 shadow-amber-200/40' : 'hover:shadow-xl dark:hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/20'}`}>
          <ConfettiEffect active={celebrateDaily} />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
              <span className={`p-1.5 rounded-lg mr-2 transition-colors ${allDailyDone ? 'bg-amber-100 dark:bg-amber-500/20' : 'bg-indigo-100/50 dark:bg-indigo-500/10'}`}>
                {allDailyDone ? <PartyPopper className="text-amber-600 dark:text-amber-400" size={18} /> : <ListTodo className="text-indigo-600 dark:text-indigo-400" size={18} />}
              </span>
              Daily Routine
            </h3>
            {allDailyDone ? ( <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full animate-bounce flex items-center gap-1"><Sparkles size={10} /> DAY CLEAR <Sparkles size={10} /></span> ) : ( <span className="text-xs text-slate-400 font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800/40 rounded-full">Resets Daily</span> )}
          </div>
          <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-[200px] custom-scrollbar relative z-10">{dailyTasks.map(task => ( <div key={task.id} className="flex items-start group"><button onClick={() => toggleDailyTask(task.id)} className={`mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 cursor-pointer ${ task.completed ? 'bg-indigo-500 border-indigo-500 text-white scale-105 shadow-sm shadow-indigo-500/30' : 'bg-slate-100/50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-white' }`}>{task.completed && <CheckCircle size={14} strokeWidth={3} />}</button><span className={`text-sm flex-1 break-words transition-colors duration-300 ${task.completed ? 'text-slate-400 line-through decoration-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>{task.text}</span>{!task.isFixed && ( <button onClick={() => deleteDailyTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"><Trash2 size={14} /></button> )}</div> ))}</div>
          <form onSubmit={handleAddDaily} className="relative mt-auto z-10"><input type="text" value={newDaily} onChange={(e) => setNewDaily(e.target.value)} placeholder="Add routine task..." className="w-full bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-indigo-500 dark:text-white placeholder-slate-400" /><button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition-colors"><Plus size={14} /></button></form>
          {allDailyDone && ( <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none animate-sparkle"><Sparkles size={120} className="text-amber-500" /></div> )}
        </div>

        <div className={`${glassCardClass} flex flex-col h-full min-h-[300px] relative transition-all duration-500 overflow-hidden ${allHomeworkDone ? 'border-emerald-400 shadow-emerald-200/40' : 'hover:shadow-xl dark:hover:shadow-rose-500/10 hover:border-rose-200 dark:hover:border-rose-500/20'}`}>
          <ConfettiEffect active={celebrateHomework} />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
              <span className={`p-1.5 rounded-lg mr-2 transition-colors ${allHomeworkDone ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-rose-100/50 dark:bg-rose-500/10'}`}>
                {allHomeworkDone ? <PartyPopper className="text-emerald-600 dark:text-emerald-400" size={18} /> : <BookOpen className="text-rose-600 dark:text-rose-400" size={18} />}
              </span>
              Today's Homework
            </h3>
            {allHomeworkDone ? ( <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full animate-bounce flex items-center gap-1"><Sparkles size={10} /> MISSION COMPLETE <Sparkles size={10} /></span> ) : ( <span className="text-xs text-slate-400 font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800/40 rounded-full">Clears Tomorrow</span> )}
          </div>
          <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-[200px] custom-scrollbar relative z-10">{homeworkTasks.length === 0 && ( <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm min-h-[100px]"><p>No homework added yet.</p></div> )}{homeworkTasks.map(task => ( <div key={task.id} className="flex items-start group"><button onClick={() => toggleHomeworkTask(task.id)} className={`mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 cursor-pointer ${ task.completed ? 'bg-rose-500 border-rose-500 text-white scale-105 shadow-sm shadow-rose-500/30' : 'bg-slate-100/50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 hover:border-rose-400 hover:bg-white' }`}>{task.completed && <CheckCircle size={14} strokeWidth={3} />}</button><span className={`text-sm flex-1 break-words transition-colors duration-300 ${task.completed ? 'text-slate-400 line-through decoration-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>{task.text}</span><button onClick={() => deleteHomeworkTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"><Trash2 size={14} /></button></div> ))}</div>
          <form onSubmit={handleAddHomework} className="relative mt-auto z-10"><input type="text" value={newHomework} onChange={(e) => setNewHomework(e.target.value)} placeholder="Add homework assignment..." className="w-full bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-rose-500 dark:text-white placeholder-slate-400" /><button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition-colors"><Plus size={14} /></button></form>
          {allHomeworkDone && ( <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none animate-sparkle"><Sparkles size={120} className="text-emerald-500" /></div> )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className={`${glassCardClass} relative overflow-hidden`}>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <span className="p-1.5 bg-emerald-100/50 dark:bg-emerald-500/10 rounded-lg mr-2"><Target className="text-emerald-600 dark:text-emerald-400" size={18} /></span>
            Total Progress
          </h3>
          <div className="w-full relative z-10 flex items-center justify-center" style={{ height: '250px', minHeight: '250px' }}>
            <ResponsiveContainer width="99%" height="100%">
              <PieChart>
                <Pie data={overallData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                  {overallData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }} itemStyle={{ color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-bold text-slate-900 dark:text-white animate-scale-in">{totalProgress}%</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Complete</span>
            </div>
          </div>
        </div>

        <div className={`${glassCardClass}`}>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <span className="p-1.5 bg-amber-100/50 dark:bg-amber-500/10 rounded-lg mr-2"><Trophy className="text-amber-600 dark:text-amber-400" size={18} /></span>
            Role Readiness
          </h3>
          <div className="block md:hidden space-y-4 pt-2">
            {roleData.map((role) => (
              <div key={role.name} className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{role.fullName}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{role.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${role.score}%`, backgroundColor: role.score >= 80 ? '#10b981' : role.score >= 50 ? '#059669' : '#64748b' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block w-full" style={{ height: '250px', minHeight: '250px' }}>
            <ResponsiveContainer width="99%" height="100%">
              <BarChart data={roleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} interval={0}/>
                <YAxis hide domain={[0, 100]} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {roleData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#10b981' : entry.score >= 50 ? '#059669' : '#64748b'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${glassCardClass} flex flex-col`}>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <span className="p-1.5 bg-rose-100/50 dark:bg-rose-500/10 rounded-lg mr-2"><Flame className="text-rose-600 dark:text-rose-400" size={18} /></span>
            Next Priorities
          </h3>
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[220px] custom-scrollbar">
            {nextFocusItems.length > 0 ? nextFocusItems.map((item, idx) => (
              <div key={item.id} className="p-3 bg-slate-50/80 dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all hover:translate-x-1 animate-slide-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">Year {item.year}</span>
                  <span className="text-[10px] text-slate-400">{item.category}</span>
                </div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 text-sm line-clamp-2">{item.name}</h4>
              </div>
            )) : <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center py-6"><p className="text-sm">You're all caught up!</p></div>}
          </div>
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-sm">
            <span className="text-slate-500">Total Completed</span>
            <span className="font-bold text-slate-900 dark:text-white">{completedCount} Tasks</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-800 backdrop-blur-md rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg shadow-emerald-200/50 animate-slide-up border border-white/10" style={{ animationDelay: '300ms' }}>
        <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none animate-pulse-slow"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <Quote className="text-white/30 mb-2" size={32} />
            <p className="text-lg md:text-xl font-medium italic opacity-95">"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."</p>
            <p className="mt-2 text-sm text-emerald-200 font-bold tracking-wide uppercase">— Brian Herbert</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button onClick={handlePerplexityClick} className="bg-white/90 text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-white transition-all hover:scale-105 shadow-lg flex items-center gap-2 group backdrop-blur-sm">
              <Search size={18} /><span>Deep Search Topic</span><ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
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
