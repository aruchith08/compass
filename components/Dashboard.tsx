
import React, { useState } from 'react';
import { useRoadmap } from '../RoadmapContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ArrowRight, Target, Trophy, AlertCircle, Quote, Flame, Filter, ListTodo, BookOpen, Plus, Trash2, CheckCircle, Presentation, Search, ExternalLink } from 'lucide-react';
import { Role } from '../types';

const Dashboard: React.FC = () => {
  const { 
    items, getCompletionPercentage, user, 
    dailyTasks, homeworkTasks, 
    toggleDailyTask, addDailyTask, deleteDailyTask,
    toggleHomeworkTask, addHomeworkTask, deleteHomeworkTask,
  } = useRoadmap();
  
  const [selectedRole, setSelectedRole] = useState<Role | "All Roles">("All Roles");
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
      // On mobile, navigating directly allows Universal Links / App Links to trigger the app.
      // Opening in a new tab often forces the browser to handle it, bypassing the app.
      window.location.href = "https://www.perplexity.ai/";
    } else {
      // On desktop, open in a new tab to keep the dashboard active.
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

  // Overall Progress (Filtered by selected role)
  const totalProgress = getCompletionPercentage(selectedRole === "All Roles" ? undefined : selectedRole);
  const overallData = [
    { name: 'Completed', value: totalProgress, fill: '#06b6d4' },
    { name: 'Remaining', value: 100 - totalProgress, fill: '#1e293b' }
  ];

  // Next Focus Items
  const nextFocusItems = items
    .filter(i => {
      const matchesRole = selectedRole === "All Roles" || i.role_alignment.includes(selectedRole) || i.role_alignment.includes("All Roles");
      const isPending = (i.status === 'To Do' || i.status === 'In Progress');
      const isHighPriority = i.priority === 'High';
      return matchesRole && isPending && isHighPriority;
    })
    .slice(0, 3);

  const completedCount = items.filter(i => {
    const matchesRole = selectedRole === "All Roles" || i.role_alignment.includes(selectedRole) || i.role_alignment.includes("All Roles");
    return matchesRole && i.status === 'Completed';
  }).length;
  
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, <span className="text-cyan-600 dark:text-cyan-400">{user?.username}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Track your journey to a powerful hybrid profile.</p>
        </div>
        
        {/* Dashboard Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
           {/* Role Filter */}
           <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <Filter size={16} className="text-slate-500 ml-2" />
             <select 
               value={selectedRole}
               onChange={(e) => setSelectedRole(e.target.value as Role | "All Roles")}
               className="bg-transparent text-sm font-medium text-slate-900 dark:text-slate-300 focus:outline-none p-1 max-w-[150px]"
             >
               <option value="All Roles">All Roles</option>
               {roles.map(r => (
                 <option key={r} value={r}>{r}</option>
               ))}
             </select>
           </div>
        </div>
      </div>

      {/* === DAILY FOCUS SECTION === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Routine */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
              <ListTodo className="mr-2 text-indigo-500" size={20} /> Daily Routine
            </h3>
            <span className="text-xs text-slate-400">Resets Daily</span>
          </div>
          
          <div className="flex-1 space-y-2 mb-4">
             {dailyTasks.map(task => (
               <div key={task.id} className="flex items-start group">
                 <button 
                   onClick={() => toggleDailyTask(task.id)}
                   className={`mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                     task.completed ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
                   }`}
                 >
                   {task.completed && <CheckCircle size={14} />}
                 </button>
                 <span className={`text-sm flex-1 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
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
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
              <BookOpen className="mr-2 text-rose-500" size={20} /> Today's Homework
            </h3>
            <span className="text-xs text-slate-400">Clears Tomorrow</span>
          </div>

          <div className="flex-1 space-y-2 mb-4">
             {homeworkTasks.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm min-h-[100px]">
                   <p>No homework added yet.</p>
                </div>
             )}
             {homeworkTasks.map(task => (
               <div key={task.id} className="flex items-start group">
                 <button 
                   onClick={() => toggleHomeworkTask(task.id)}
                   className={`mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                     task.completed ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-300 dark:border-slate-600 hover:border-rose-400'
                   }`}
                 >
                   {task.completed && <CheckCircle size={14} />}
                 </button>
                 <span className={`text-sm flex-1 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Progress Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Target className="mr-2 text-cyan-500" size={20} /> 
            {selectedRole === "All Roles" ? "Total Progress" : `${selectedRole} Progress`}
          </h3>
          <div className="h-64 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
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
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{totalProgress}%</span>
            </div>
          </div>
        </div>

        {/* Role Readiness Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:col-span-2 shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Trophy className="mr-2 text-purple-500" size={20} /> Role Readiness Comparison
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleData} layout="vertical" margin={{ left: 40, right: 20 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" fontSize={12} tick={{ fill: '#64748b' }} />
                <Tooltip 
                   cursor={{fill: '#f1f5f9'}}
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                />
                <Bar dataKey="score" barSize={20} radius={[0, 4, 4, 0]}>
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 70 ? '#22c55e' : entry.score > 40 ? '#06b6d4' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Next Focus Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
            <AlertCircle className="mr-2 text-amber-500" size={20} /> 
            {selectedRole === "All Roles" ? "Immediate Focus" : `Focus: ${selectedRole}`}
          </h3>
          <div className="space-y-4">
            {nextFocusItems.length > 0 ? nextFocusItems.map(item => (
              <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl flex justify-between items-center group hover:border-cyan-500/50 transition-colors">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400">Year {item.year > 0 ? item.year : "Gen"}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.category}</span>
                  </div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-200">{item.name}</h4>
                </div>
                <ArrowRight size={18} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
              </div>
            )) : (
              <div className="p-4 text-slate-400 text-center">No high priority items pending for this role! Great job.</div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-lg">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy size={100} className="text-white" />
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Milestones ({selectedRole === "All Roles" ? "Total" : "Role"})</h3>
           <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 my-4">
             {completedCount}
           </div>
           <p className="text-slate-400 max-w-xs">
             Tasks, projects, and skills mastered on your journey.
           </p>
        </div>
      </div>

      {/* Real Advice & Verdict Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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

      {/* Quick Tools / External Apps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
         <a 
           href="https://gamma.app/create" 
           target="_blank" 
           rel="noopener noreferrer"
           className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm hover:border-indigo-500 hover:shadow-md transition-all group flex items-center space-x-4 cursor-pointer"
         >
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
               <Presentation size={24} />
            </div>
            <div className="flex-1">
               <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">PPT Maker</h3>
               <p className="text-xs text-slate-500 dark:text-slate-400">Generate slides with Gamma AI</p>
            </div>
            <ExternalLink size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
         </a>

         <a 
           href="https://www.perplexity.ai/" 
           onClick={handlePerplexityClick}
           className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm hover:border-teal-500 hover:shadow-md transition-all group flex items-center space-x-4 cursor-pointer"
         >
            <div className="p-3 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-xl group-hover:scale-110 transition-transform">
               <Search size={24} />
            </div>
            <div className="flex-1">
               <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Perplexity AI</h3>
               <p className="text-xs text-slate-500 dark:text-slate-400">Smart search & research</p>
            </div>
            <ExternalLink size={18} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
         </a>
      </div>
    </div>
  );
};

export default Dashboard;
