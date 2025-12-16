
import React from 'react';
import { RoadmapItem, Status } from '../types';
import { CheckCircle2, Circle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { useRoadmap } from '../RoadmapContext';

interface TaskCardProps {
  item: RoadmapItem;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, onClick }) => {
  const { toggleStatus } = useRoadmap();

  const statusColors = {
    "To Do": "text-slate-500",
    "In Progress": "text-amber-500",
    "Completed": "text-emerald-500",
    "Revisit": "text-rose-500"
  };

  const statusBg = {
    "To Do": "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
    "In Progress": "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50",
    "Completed": "bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50",
    "Revisit": "bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/50"
  };

  const statusIcon = {
    "To Do": <Circle size={18} />,
    "In Progress": <Clock size={18} />,
    "Completed": <CheckCircle2 size={18} />,
    "Revisit": <AlertTriangle size={18} />
  };

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus: Record<Status, Status> = {
      "To Do": "In Progress",
      "In Progress": "Completed",
      "Completed": "Revisit",
      "Revisit": "To Do"
    };
    toggleStatus(item.id, nextStatus[item.status]);
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative bg-white dark:bg-slate-900 border rounded-xl transition-all duration-200 group cursor-pointer flex flex-col h-full
        ${item.status === 'Completed' 
          ? 'border-slate-200 dark:border-slate-800 opacity-75' 
          : 'border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md'
        }
        hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:-translate-y-1
      `}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                item.priority === 'High' 
                  ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {item.priority}
              </span>
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate max-w-[150px]">
                {item.category}
              </span>
            </div>
            <h4 className={`font-bold text-lg leading-tight mb-1 ${
              item.status === 'Completed' 
                ? 'text-slate-500 dark:text-slate-500 line-through decoration-slate-400' 
                : 'text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
            } transition-colors line-clamp-2`}>
              {item.name}
            </h4>
          </div>

          <button 
            onClick={handleStatusClick}
            className={`flex-shrink-0 p-2 rounded-lg transition-colors ${statusBg[item.status]} ${statusColors[item.status]}`}
            title={`Current status: ${item.status}. Click to cycle.`}
          >
            {statusIcon[item.status]}
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto gap-4">
            <div className="flex gap-1.5 flex-wrap">
               {item.role_alignment.slice(0, 2).map((role, idx) => (
                 <span key={idx} className="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                   {role === "All Roles" ? "Core" : role.split(" ")[0]}
                 </span>
               ))}
               {item.role_alignment.length > 2 && (
                 <span className="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 font-medium">
                   +{item.role_alignment.length - 2}
                 </span>
               )}
            </div>
            
            {item.resource_name && (
               <div className="text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs font-medium">
                 <span className="hidden sm:inline">Resource</span>
                 <ExternalLink size={14} />
               </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
