
import React, { useState } from 'react';
import { useRoadmap } from '../RoadmapContext';
import TaskCard from './TaskCard';
import TaskDetailModal from './TaskDetailModal';
import { Filter } from 'lucide-react';
import { RoadmapItem } from '../types';

const Tracker: React.FC = () => {
  const { items } = useRoadmap();
  const [activeYear, setActiveYear] = useState<number>(1);
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  
  // Logic to get items for current view
  const yearItems = items.filter(item => item.year === activeYear);
  const filteredItems = filterPriority === 'All' 
    ? yearItems 
    : yearItems.filter(item => item.priority === filterPriority);

  const years = [1, 2, 3, 4];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Yearly Roadmap Tracker</h2>
          
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
             <Filter size={16} className="text-slate-500 ml-2" />
             <select 
               value={filterPriority} 
               onChange={(e) => setFilterPriority(e.target.value)}
               className="bg-transparent text-sm text-slate-900 dark:text-slate-300 focus:outline-none p-1"
             >
               <option value="All">All Priorities</option>
               <option value="High">High Priority</option>
               <option value="Medium">Medium Priority</option>
             </select>
          </div>
        </div>

        {/* Year Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`
                px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all
                ${activeYear === year 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}
              `}
            >
              Year {year}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <TaskCard 
                key={item.id} 
                item={item} 
                onClick={() => setSelectedItem(item)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              No tasks found for this filter.
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
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
