
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
    "In Progress": "text-amber-400",
    "Completed": "text-emerald-400",
    "Revisit": "text-rose-400"
  };

  const statusIcon = {
    "To Do": <Circle size={20} />,
    "In Progress": <Clock size={20} />,
    "Completed": <CheckCircle2 size={20} />,
    "Revisit": <AlertTriangle size={20} />
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
        bg-slate-900 border rounded-xl transition-all duration-200 group cursor-pointer
        ${item.status === 'Completed' ? 'border-slate-800 opacity-75' : 'border-slate-700 shadow-lg shadow-black/20'}
        hover:border-cyan-500/50 hover:shadow-cyan-900/10 hover:-translate-y-1
      `}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                item.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-700 text-slate-300'
              }`}>
                {item.priority}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider truncate max-w-[120px]">{item.category}</span>
            </div>
            <h4 className={`font-semibold text-lg line-clamp-2 ${item.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-100 group-hover:text-cyan-400 transition-colors'}`}>
              {item.name}
            </h4>
          </div>

          <button 
            onClick={handleStatusClick}
            className={`p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors ${statusColors[item.status]}`}
            title={`Current status: ${item.status}. Click to cycle.`}
          >
            {statusIcon[item.status]}
          </button>
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 mb-3 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800/50 mt-auto">
            <div className="flex gap-1 flex-wrap">
               {item.role_alignment.slice(0, 2).map((role, idx) => (
                 <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded border border-slate-700 text-slate-500">
                   {role === "All Roles" ? "Core" : role.split(" ")[0]}
                 </span>
               ))}
               {item.role_alignment.length > 2 && (
                 <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-700 text-slate-500">+{item.role_alignment.length - 2}</span>
               )}
            </div>
            {item.resource_name && (
               <div className="text-slate-600 group-hover:text-cyan-500 transition-colors">
                 <ExternalLink size={14} />
               </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
