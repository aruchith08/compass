
import React, { useState } from 'react';
import { useRoadmap } from '../RoadmapContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Target, Trophy, Flame, ListTodo, BookOpen, Plus, Trash2, CheckCircle, Presentation, Search, ExternalLink, Quote } from 'lucide-react';
import { Role } from '../types';

const Dashboard: React.FC = () => {
  const { 
    items, getCompletionPercentage, user, 
    dailyTasks, homeworkTasks, 
    toggleDailyTask, addDailyTask, deleteDailyTask,
    toggleHomeworkTask, addHomeworkTask, deleteHomeworkTask,
  } = useRoadmap();
  
  // Dashboard now defaults to All Roles view
  const [newDaily, setNewDaily] = useState('');
  const [newHomework, setNewHomework] = useState('');

  // Daily Tasks Logic
  const handleAddDaily = (e: React.FormEvent) => {
    e.preventDefault();
    if(newDaily.trim()) {
      addDailyTask(newDaily);
      setNewDaily('');
    }
  };

  const handleAddHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if(newHomework.trim()) {
      addHomeworkTask(newHomework);
      setNewHomework('');
    }
  };

  // Smart Link Handler for Perplexity
  const handlePerplexityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android/.test(userAgent);

    if (isMobile) {
      window.location.href = "https://perplexity.sng.link/A6awk/ppas?_smtype=3&pvid=83882534-5238-4282-8b29-06f008299556&_ios_dl=perplexity-app%3A%2F%2F&_android_dl=perplexity-app%3A%2F%2F&_web_params=utm_source%3Demail%26utm_campaign%3DGA_launch&_dl=perplexity-app%3A%2F%2F&_p=origin%3Dmobile-header%26pvid%3D83882534-5238-4282-8b29-06f008299556%26pathname%3D%252F&_ddl=perplexity-app%3A%2F%2F";
    } else {
      window.open("https://www.perplexity.ai/", "_blank");
    }
  };

  // Role Readiness Data
  const roles: Role[] = ["AI/ML Engineer", "Data Scientist", "Data Analyst", "AI Security Officer", "Full Stack Developer"];
  const roleData = roles.map(role => ({
    name: role.replace("Officer", "").replace("Engineer", "Eng").replace("Developer", "Dev"),
    score: getCompletionPercentage(role),
    fill: '#06b6d4'
  }));

  // Overall Progress (Aggregate)
  const totalProgress = getCompletionPercentage("All Roles");
  const overallData = [
    { name: 'Completed', value: totalProgress, fill: '#06b6d4' },
    { name: 'Remaining', value: 100 - totalProgress, fill: '#1e293b' }
  ];

  // Next Focus Items (Global High Priority)
  const nextFocusItems = items
    .filter(i => {
      // Show high priority items for any role
      const isPending = (i.status === 'To Do' || i.status === 'In Progress');
      const isHighPriority = i.priority === 'High';
      return isPending && isHighPriority;
    })
    .slice(0, 3);

  const completedCount = items.filter(i => i.status === 'Completed').length;
  
  return (
    <div className="space-y-8 pb-12 w-full max-w-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, <span className="text-cyan-600 dark:text-cyan-400">{user?.username}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Track your journey to a powerful hybrid profile.</p>
        </div>
        
        {/* Dashboard Controls */}
        <div className="flex flex-wrap items-center gap-3">
           {/* External Tools Icons */}
           <div className="flex gap-2">
              <a 
                 href="https://gamma.app/create" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all hover:-translate-y-0.5 shadow-sm"
                 title="PPT Maker (Gamma)"
              >
                 <Presentation size={20} />
              </a>
              <a 
                 href="https://www.perplexity.ai/" 
                 onClick={handlePerplexityClick}
                 className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all hover:-translate-y-0.5 shadow-sm"
                 title="Perplexity AI"
              >
                 <Search size={20} />
              </a>
           </div>
        </div>
      </div>

      {/* === DAILY FOCUS SECTION === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
        
        {/* Daily Routine */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full min-h-[300px] min-w-0 transition-transform duration-300 hover:shadow-md hover:border-indigo-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
              <ListTodo className="mr-2 text-indigo-500" size={20} /> Daily Routine
            </h3>
            <span className="text-xs text-slate-400">Resets Daily</span>
          </div>
          
          <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-[200px] custom-scrollbar">
             {dailyTasks.map(task => (
               <div key={task.id} className="flex items-start group">
                 <button 
                   onClick={() => toggleDailyTask(task.id)}
                   className={`mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                     task.completed ? 'bg-indigo-500 border-indigo-500 text-white scale-110' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
                   }`}
                 >
                   {task.completed && <CheckCircle size={14} />}
                 </button>
                 <span className={`text-sm flex-1 break-words transition-colors duration-300 ${task.completed ? 'text-slate-400 line-through decoration-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                   {task.text}
                 </span>
                 {!task.isFixed && (
                   <button 
                      onClick={() => deleteDailyTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"
                   >
                     <Trash2 size={14} />
                   </button>
                 )}
               </div>
             ))}
          </div>
          
          <form onSubmit={handleAddDaily} className="relative mt-auto">
             <input 
               type="text" 
               value={newDaily}
               onChange={(e) => setNewDaily(e.target.value)}
               placeholder="Add routine task..."
               className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-indigo-500 transition-colors dark:text-white"
             />
             <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition-colors">
               <Plus size={14} />
             </button>
          </form>
        </div>

        {/* Today's Homework */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full min-h-[300px] min-w-0 transition-transform duration-300 hover:shadow-md hover:border-rose-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
              <BookOpen className="mr-2 text-rose-500" size={20} /> Today's Homework
            </h3>
            <span className="text-xs text-slate-400">Clears Tomorrow</span>
          </div>

          <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-[200px] custom-scrollbar">
             {homeworkTasks.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm min-h-[100px]">
                   <p>No homework added yet.</p>
                </div>
             )}
             {homeworkTasks.map(task => (
               <div key={task.id} className="flex items-start group">
                 <button 
                   onClick={() => toggleHomeworkTask(task.id)}
                   className={`mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                     task.completed ? 'bg-rose-500 border-rose-500 text-white scale-110' : 'border-slate-300 dark:border-slate-600 hover:border-rose-400'
                   }`}
                 >
                   {task.completed && <CheckCircle size={14} />}
                 </button>
                 <span className={`text-sm flex-1 break-words transition-colors duration-300 ${task.completed ? 'text-slate-400 line-through decoration-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                   {task.text}
                 </span>
                 <button 
                    onClick={() => deleteHomeworkTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"
                 >
                   <Trash2 size={14} />
                 </button>
               </div>
             ))}
          </div>

          <form onSubmit={handleAddHomework} className="relative mt-auto">
             <input 
               type="text" 
               value={newHomework}
               onChange={(e) => setNewHomework(e.target.value)}
               placeholder="Add homework assignment..."
               className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-rose-500 transition-colors dark:text-white"
             />
             <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-md transition-colors">
               <Plus size={14} />
             </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full animate-slide-up" style={{ animationDelay: '200ms' }}>
        {/* Overall Progress Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-sm transition-colors duration-300 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Target className="mr-2 text-cyan-500" size={20} /> 
            Total Progress
          </h3>
          <div className="w-full relative z-10 flex items-center justify-center" style={{ height: '250px', minHeight: '250px' }}>
            <ResponsiveContainer width="99%" height="100%">
              <PieChart>
                <Pie
                  data={overallData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {overallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                   itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Centered Percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-bold text-slate-900 dark:text-white animate-scale-in">{totalProgress}%</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Complete</span>
            </div>
          </div>
        </div>

        {/* Role Readiness Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Trophy className="mr-2 text-amber-500" size={20} /> Role Readiness
          </h3>
          <div className="w-full" style={{ height: '250px', minHeight: '250px' }}>
            <ResponsiveContainer width="99%" height="100%">
              <BarChart data={roleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#64748b', fontSize: 10 }} 
                   interval={0}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#10b981' : entry.score >= 50 ? '#06b6d4' : '#64748b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next Focus Actions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col min-w-0">
           <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Flame className="mr-2 text-rose-500" size={20} /> Next Priorities
          </h3>
          
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[220px] custom-scrollbar">
             {nextFocusItems.length > 0 ? (
               nextFocusItems.map((item, idx) => (
                 <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-cyan-500/30 transition-all hover:translate-x-1 animate-slide-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                    <div className="flex justify-between items-start mb-1">
                       <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider bg-cyan-50 dark:bg-cyan-900/20 px-1.5 py-0.5 rounded">
                         Year {item.year}
                       </span>
                       <span className="text-[10px] text-slate-400">{item.category}</span>
                    </div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-200 text-sm line-clamp-2">{item.name}</h4>
                 </div>
               ))
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center py-6">
                 <p className="text-sm">You're all caught up on high priority tasks!</p>
               </div>
             )}
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
             <span className="text-slate-500">Total Completed</span>
             <span className="font-bold text-slate-900 dark:text-white">{completedCount} Tasks</span>
          </div>
        </div>
      </div>
      
      {/* Motivation Quote */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none animate-pulse-slow"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex-1">
              <Quote className="text-white/30 mb-2" size={32} />
              <p className="text-lg md:text-xl font-medium italic opacity-95">
                "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
              </p>
              <p className="mt-2 text-sm text-indigo-200 font-bold tracking-wide uppercase">— Brian Herbert</p>
           </div>
           
           <div className="hidden md:flex gap-4">
              <button 
                onClick={handlePerplexityClick}
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all hover:scale-105 shadow-lg flex items-center gap-2 group"
              >
                <Search size={18} />
                <span>Deep Search Topic</span>
                <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
           </div>
        </div>
      </div>

      {/* Real Advice & Verdict Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 animate-slide-up" style={{ animationDelay: '400ms' }}>
         <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm transition-colors duration-300">
            <div className="flex items-center space-x-2 mb-4">
               <Quote className="text-cyan-600 dark:text-cyan-500" size={20} />
               <h3 className="font-bold text-lg text-slate-900 dark:text-white">Real Advice</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
               <li className="flex items-start">
                  <span className="mr-2 text-cyan-600 dark:text-cyan-500">•</span>
                  You don't need 50 courses. You need deeper execution.
               </li>
               <li className="flex items-start">
                  <span className="mr-2 text-cyan-600 dark:text-cyan-500">•</span>
                  Consistency &gt; Intelligence. Study 1-2 hours daily.
               </li>
               <li className="flex items-start">
                  <span className="mr-2 text-cyan-600 dark:text-cyan-500">•</span>
                  Communication skills are mandatory. Explain your projects clearly.
               </li>
            </ul>
         </div>

         <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm transition-colors duration-300">
            <div className="flex items-center space-x-2 mb-4">
               <Flame className="text-rose-500" size={20} />
               <h3 className="font-bold text-lg text-slate-900 dark:text-white">Final Verdict</h3>
            </div>
            <div className="space-y-2 text-sm">
               <p className="text-slate-600 dark:text-slate-400">You <span className="text-rose-500 dark:text-rose-400 font-bold">DON'T</span> need more degrees or PDFs.</p>
               <p className="text-slate-600 dark:text-slate-300">You <span className="text-emerald-600 dark:text-emerald-400 font-bold">NEED</span>: Discipline, Real Projects, Practice, and Time.</p>
               <p className="mt-4 text-xs text-slate-500 italic">"If you do this seriously for 3-4 years, you will be ahead of 90% of students."</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
