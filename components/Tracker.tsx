
import React, { useState } from 'react';
import { useRoadmap } from '../RoadmapContext';
import TaskCard from './TaskCard';
import TaskDetailModal from './TaskDetailModal';
import { Filter, Layers, LayoutList } from 'lucide-react';
import { RoadmapItem, Role } from '../types';

const Tracker: React.FC = () => {
  const { items } = useRoadmap();
  const [activeYear, setActiveYear] = useState<number>(1);
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<Role | "All Roles">("All Roles");
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  
  const roles: Role[] = ["AI/ML Engineer", "Data Scientist", "Data Analyst", "AI Security Officer", "Full Stack Developer"];

  // Logic to get items for current view
  const yearItems = items.filter(item => item.year === activeYear);
  
  const filteredItems = yearItems.filter(item => {
      // 1. Priority Filter
      const matchPriority = filterPriority === 'All' || item.priority === filterPriority;
      
      // 2. Role Filter
      // Logic: If selectedRole is 'All Roles', show everything.
      // Else, show items that have 'All Roles' in alignment OR specific role.
      const matchRole = selectedRole === "All Roles" 
        || item.role_alignment.includes("All Roles")
        || item.role_alignment.includes(selectedRole);

      return matchPriority && matchRole;
  });

  const years = [1, 2, 3, 4];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white animate-fade-in">Yearly Roadmap Tracker</h2>
            
            {/* Filter Section */}
            <div className="grid grid-cols-2 gap-2 w-full md:w-auto md:flex md:items-center md:gap-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
               
               {/* Role Filter */}
               <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-2 rounded-xl border border-white/20 dark:border-white/10 shadow-sm min-w-0 transition-colors hover:border-emerald-500/30">
                  <Layers size={16} className="text-slate-500 ml-1 shrink-0" />
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as Role | "All Roles")}
                    className="bg-transparent text-sm font-medium text-slate-900 dark:text-slate-300 focus:outline-none p-1 w-full truncate cursor-pointer"
                  >
                    <option value="All Roles">All Roles</option>
                    {roles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
               </div>

               {/* Priority Filter */}
               <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-2 rounded-xl border border-white/20 dark:border-white/10 shadow-sm min-w-0 transition-colors hover:border-emerald-500/30">
                  <Filter size={16} className="text-slate-500 ml-1 shrink-0" />
                  <select 
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="bg-transparent text-sm font-medium text-slate-900 dark:text-slate-300 focus:outline-none p-1 w-full truncate cursor-pointer"
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
               </div>
            </div>
          </div>

          {/* Year Tabs with Sliding Animation */}
          <div className="relative bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl grid grid-cols-4 isolate overflow-hidden">
            {/* Sliding Pill Background */}
            <div 
                className="absolute top-0 bottom-0 left-0 w-1/4 p-1.5 transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] z-0"
                style={{ transform: `translateX(${(activeYear - 1) * 100}%)` }}
            >
                <div className="w-full h-full bg-white dark:bg-slate-800 shadow-sm rounded-xl"></div>
            </div>

            {years.map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`
                  relative z-10 py-3 px-4 text-sm font-bold transition-colors duration-200 whitespace-nowrap text-center
                  ${activeYear === year 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }
                `}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>

        {/* Task Grid - Removed Heavy Animation & Key */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="h-full" 
              >
                <TaskCard 
                  item={item} 
                  onClick={() => setSelectedItem(item)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center text-slate-500 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-dashed border-slate-200 dark:border-white/10 animate-fade-in">
               <LayoutList size={48} className="mb-4 opacity-50" />
               <p className="text-lg font-medium">No tasks found for this filter.</p>
               <p className="text-sm">Try changing the year, priority, or role.</p>
            </div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedItem && (
        <TaskDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </>
  );
};

export default Tracker;
