
import React, { useState } from 'react';
import { useRoadmap } from '../RoadmapContext';
import { Github, FolderGit2, CheckSquare, Code2, Users } from 'lucide-react';
import TaskCard from './TaskCard';
import { RoadmapItem } from '../types';
import TaskDetailModal from './TaskDetailModal';

const Outputs: React.FC = () => {
  const { items } = useRoadmap();
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);

  const projects = items.filter(item => item.is_project);
  const interviewPrep = items.filter(item => item.category === 'Interview Prep');
  const career = items.filter(item => item.category === 'Career');

  // Split Interview Prep
  const behavioralPrep = interviewPrep.filter(i => i.name.toLowerCase().includes('behavioral') || i.name.toLowerCase().includes('mock'));
  const technicalPrep = interviewPrep.filter(i => !i.name.toLowerCase().includes('behavioral') && !i.name.toLowerCase().includes('mock'));

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      
      {/* Projects Section */}
      <section className="flex flex-col space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <FolderGit2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Portfolio</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Build proof of work. Every 2 months, create something real.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {projects.length > 0 ? (
            projects.map(project => (
              <div 
                key={project.id} 
                onClick={() => setSelectedItem(project)}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
              >
                <div className="absolute top-5 right-5 text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 transition-colors z-10">
                  <Github size={20} />
                </div>
                <div className="mb-4 pr-8">
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1 block">Year {project.year}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{project.name}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">{project.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <div className="flex gap-2 flex-wrap">
                     {project.role_alignment.slice(0, 2).map((r, i) => (
                       <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                         {r === "All Roles" ? "Core" : r.split(" ")[0]}
                       </span>
                     ))}
                  </div>
                   <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
                     project.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 
                     project.status === 'In Progress' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' : 
                     'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                   }`}>
                     {project.status}
                   </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              No projects found.
            </div>
          )}
        </div>
      </section>

      {/* Interview Prep Section (Split) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Technical Prep */}
        <section className="flex flex-col space-y-4 h-full">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <Code2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Technical Mastery</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col space-y-4 h-full">
             {technicalPrep.length > 0 ? (
                 technicalPrep.map(item => (
                    <TaskCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => setSelectedItem(item)}
                    />
                 ))
             ) : (
                 <p className="text-slate-500 text-sm text-center py-8">No technical tasks.</p>
             )}
          </div>
        </section>

        {/* Behavioral Prep */}
        <section className="flex flex-col space-y-4 h-full">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
              <Users size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Behavioral & HR</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col space-y-4 h-full">
             {behavioralPrep.length > 0 ? (
                 behavioralPrep.map(item => (
                    <TaskCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => setSelectedItem(item)}
                    />
                 ))
             ) : (
                 <p className="text-slate-500 text-sm text-center py-8">No behavioral tasks.</p>
             )}
          </div>
        </section>
      </div>

      {/* Career Section */}
      <section className="flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <CheckSquare size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Career Milestones</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
             {career.length > 0 ? (
                 career.map(item => (
                    <TaskCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => setSelectedItem(item)}
                    />
                 ))
             ) : (
                <p className="text-slate-500 text-sm text-center py-8 col-span-full">
                    No career milestones found.
                </p>
             )}
          </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <TaskDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default Outputs;
