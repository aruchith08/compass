
import React from 'react';
import { RoadmapItem, Status } from '../types';
import { X, ExternalLink, Calendar, CheckCircle2, Circle, Clock, AlertTriangle, Tag, Timer } from 'lucide-react';
import { useRoadmap } from '../RoadmapContext';

interface TaskDetailModalProps {
  item: RoadmapItem | null;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ item, onClose }) => {
  const { toggleStatus } = useRoadmap();

  if (!item) return null;

  const statusColors = {
    "To Do": "text-slate-500",
    "In Progress": "text-amber-400",
    "Completed": "text-emerald-400",
    "Revisit": "text-rose-400"
  };

  const statusBg = {
    "To Do": "bg-slate-100 dark:bg-slate-800",
    "In Progress": "bg-amber-100 dark:bg-amber-900/20",
    "Completed": "bg-emerald-100 dark:bg-emerald-900/20",
    "Revisit": "bg-rose-100 dark:bg-rose-900/20"
  };

  const handleStatusChange = (newStatus: Status) => {
    toggleStatus(item.id, newStatus);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                item.priority === 'High' 
                  ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {item.priority} Priority
              </span>
              <span className="text-xs font-bold px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {item.category}
              </span>
              {item.time_estimate && (
                <span className="text-xs font-bold px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Timer size={14} />
                  Est. {item.time_estimate}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {item.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {item.description}
            </p>
          </div>

          {/* Status Control */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Current Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(["To Do", "In Progress", "Completed", "Revisit"] as Status[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`
                    flex items-center justify-center space-x-2 p-3 rounded-xl border transition-all duration-200
                    ${item.status === status 
                      ? `${statusBg[status]} border-transparent ring-2 ring-emerald-500/50` 
                      : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}
                  `}
                >
                  {status === "Completed" && <CheckCircle2 size={16} className={item.status === status ? "text-emerald-500" : ""} />}
                  {status === "In Progress" && <Clock size={16} className={item.status === status ? "text-amber-500" : ""} />}
                  {status === "To Do" && <Circle size={16} className={item.status === status ? "text-slate-500" : ""} />}
                  {status === "Revisit" && <AlertTriangle size={16} className={item.status === status ? "text-rose-500" : ""} />}
                  <span className={`font-medium text-sm ${item.status === status ? 'text-slate-900 dark:text-slate-100' : ''}`}>
                    {status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Resource Link */}
          {item.resource_name && (
            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Recommended Resource</h3>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-200">{item.resource_name}</span>
                <a 
                  href={item.resource_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  <span>Open Resource</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
             <div>
               <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Year</h3>
               <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-200">
                 <Calendar size={18} className="text-emerald-500" />
                 <span>Year {item.year > 0 ? item.year : "Gen"}</span>
               </div>
             </div>
             <div>
               <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Roles Aligned</h3>
               <div className="flex flex-wrap gap-2">
                 {item.role_alignment.map((role, idx) => (
                   <span key={idx} className="inline-flex items-center px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                     <Tag size={10} className="mr-1" />
                     {role}
                   </span>
                 ))}
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;