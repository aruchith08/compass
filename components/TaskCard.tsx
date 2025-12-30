
import React from 'react';
import { RoadmapItem, Status } from '../types';
import { CheckCircle2, Circle, Clock, AlertTriangle, ExternalLink, Timer, ShieldAlert } from 'lucide-react';
import { useRoadmap } from '../RoadmapContext';

interface TaskCardProps {
  item: RoadmapItem;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, onClick }) => {
  const { toggleStatus, isAiConnected } = useRoadmap();

  const statusColors = {
    "To Do": "text-slate-500",
    "In Progress": "text-amber-500",
    "Completed": "text-emerald-500",
    "Revisit": "text-rose-400"
  };

  const statusBg = {
    "To Do": "bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50",
    "In Progress": "bg-amber-100/50 dark:bg-amber-900/20 hover:bg-amber-200/50 dark:hover:bg-amber-900/40",
    "Completed": "bg-emerald-100/50 dark:bg-emerald-900/20 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/40",
    "Revisit": "bg-rose-100/50 dark:bg-rose-900/20 hover:bg-rose-200/50 dark:hover:bg-rose-900/40"
  };

  const statusIcon = {
    "To Do": <Circle size={18} />,
    "In Progress": <Clock size={18} />,
    "Completed": <CheckCircle2 size={18} />,
    "Revisit": <AlertTriangle size={18} />
  };

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatusMap: Record<Status, Status> = {
      "To Do": "In Progress",
      "In Progress": "Completed",
      "Completed": "Revisit",
      "Revisit": "To Do"
    };
    
    const nextStatus = nextStatusMap[item.status];

    // Socratic Validator Interception
    // If trying to complete a High Priority task with AI connected, force modal open
    if (nextStatus === 'Completed' && item.priority === 'High' && isAiConnected) {
      if (onClick) {
        onClick(); // Open Modal to trigger validation
      }
      return;
    }

    toggleStatus(item.id, nextStatus);
  };

  // Check if Socratic Validation would be triggered next (High Priority + In Progress + AI Connected)
  const isProtected = item.status === 'In Progress' && item.priority === 'High' && isAiConnected;

  return (
    <div 
      onClick={onClick}
      className={`
        relative backdrop-blur-md border rounded-xl transition-all duration-300 group cursor-pointer flex flex-col h-full
        ${item.status === 'Completed' 
          ? 'bg-white/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-white/5 opacity-75' 
          : 'bg-white/80 dark:bg-slate-900/60 border-white/50 dark:border-white/10 shadow-sm shadow-indigo-50 dark:shadow-sm hover:shadow-lg hover:shadow-emerald-100/50 dark:hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-500/20'
        }
      `}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                item.priority === 'High' 
                  ? 'bg-rose-100/80 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                  : 'bg-slate-100/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'
              }`}>
                {item.priority}
              </span>
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate max-w-[150px]">
                {item.category}
              </span>
              {item.time_estimate && (
                <span className="text-[9px] font-bold px-1.5 py-1 rounded-md bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                  <Timer size={10} />
                  {item.time_estimate}
                </span>
              )}
            </div>
            <h4 className={`font-bold text-lg leading-tight mb-1 ${
              item.status === 'Completed' 
                ? 'text-slate-500 dark:text-slate-500 line-through decoration-slate-400' 
                : 'text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
            } transition-colors line-clamp-2`}>
              {item.name}
            </h4>
          </div>

          <button 
            onClick={statusIcon[item.status] ? handleStatusClick : undefined}
            className={`relative flex-shrink-0 p-2 rounded-lg transition-colors ${statusBg[item.status]} ${statusColors[item.status]}`}
            title={isProtected ? "Verification Required: Click to open validator" : `Current status: ${item.status}. Click to cycle.`}
          >
            {statusIcon[item.status]}
            {isProtected && (
              <div className="absolute -top-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm ring-1 ring-white dark:ring-slate-900">
                <ShieldAlert size={10} className="text-indigo-500 fill-indigo-100 dark:fill-indigo-900/50" />
              </div>
            )}
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5 mt-auto gap-4">
            <div className="flex gap-1.5 flex-wrap">
               {item.role_alignment.slice(0, 2).map((role, idx) => (
                 <span key={idx} className="text-[10px] px-2 py-1 rounded bg-slate-100/80 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                   {role === "All Roles" ? "Core" : role.split(" ")[0]}
                 </span>
               ))}
               {item.role_alignment.length > 2 && (
                 <span className="text-[10px] px-2 py-1 rounded bg-slate-100/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 font-medium">
                   +{item.role_alignment.length - 2}
                 </span>
               )}
            </div>
            
            {item.resource_name && (
               <div className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs font-medium">
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
