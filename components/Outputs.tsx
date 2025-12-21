import React, { useState } from 'react';
import { useRoadmap } from '../RoadmapContext';
import { Github, FolderGit2, CheckSquare, Code2, Users, Play, Sparkles, BrainCircuit, ExternalLink } from 'lucide-react';
import TaskCard from './TaskCard';
import { RoadmapItem } from '../types';
import TaskDetailModal from './TaskDetailModal';
import MockInterview from './MockInterview';

const Outputs: React.FC = () => {
  const { items } = useRoadmap();
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);

  const projects = items.filter(item => item.is_project);
  const interviewPrep = items.filter(item => item.category === 'Interview Prep');
  const career = items.filter(item => item.category === 'Career');

  // Split Interview Prep
  const behavioralPrep = interviewPrep.filter(i => i.name.toLowerCase().includes('behavioral') || i.name.toLowerCase().includes('mock'));
  const technicalPrep = interviewPrep.filter(i => !i.name.toLowerCase().includes('behavioral') && !i.name.toLowerCase().includes('mock'));

  return (
    <div className="flex flex-col gap-10 pb-24 animate-fade-in w-full max-w-full overflow-hidden">
      
      {/* Projects Section */}
      <section className="flex flex-col gap-5 w-full">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-500">
            <FolderGit2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Project Portfolio</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Build proof of work. Every 2 months, create something real.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {projects.length > 0 ? (
            projects.map(project => (
              <div 
                key={project.id} 
                onClick={() => setSelectedItem(project)}
                className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl p-5 hover:border-emerald-500/50 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col h-full min-h-[200px]"
              >
                <div className="absolute top-5 right-5 text-slate-400 dark:text-slate-600 group-hover:text-emerald-500 transition-colors z-10 bg-white/80 dark:bg-slate-900/80 rounded-full p-1.5 shadow-sm border border-slate-100 dark:border-slate-800">
                  <Github size={20} />
                </div>
                
                <div className="mb-4 pr-14">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
                      Year {project.year}
                    </span>
                    {project.resource_name && (
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                        Resource Available
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                    {project.name}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100/50 dark:border-white/10 mt-auto gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2 flex-wrap">
                      {project.role_alignment.slice(0, 2).map((r, i) => (
                        <span key={i} className="text-[10px] bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-200/50 dark:border-white/10 font-medium whitespace-nowrap">
                          {r === "All Roles" ? "Core" : r.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                    {project.resource_link && (
                      <a 
                        href={project.resource_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                      >
                        Source <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                   <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide whitespace-nowrap ${
                     project.status === 'Completed' ? 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 
                     project.status === 'In Progress' ? 'bg-amber-100/50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' : 
                     'bg-slate-100/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'
                   }`}>
                     {project.status}
                   </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-500 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm">
              <FolderGit2 className="mx-auto mb-3 opacity-50" size={32} />
              <p>No projects found in your roadmap.</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Interview Coach Highlight */}
      <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
         <div className="relative group overflow-hidden rounded-3xl bg-slate-900 dark:bg-indigo-950/20 border border-indigo-500/20 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 p-12 bg-indigo-500/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
               <div className="p-5 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                  <BrainCircuit className="text-white w-12 h-12" />
               </div>
               <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-2">
                    <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-500/10 px-2 py-1 rounded">Feature Highlight</span>
                    <div className="flex text-amber-400"><Sparkles size={12} fill="currentColor" /><Sparkles size={12} fill="currentColor" /></div>
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight mb-3">AI Interview Simulator</h2>
                  <p className="text-slate-400 max-w-lg leading-relaxed">Practice technical and behavioral questions with our expert IELTS-trained evaluator. Get instant feedback, band scores, and strategic advice.</p>
               </div>
               <button 
                  onClick={() => setIsInterviewOpen(true)}
                  className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-black/20 hover:bg-indigo-50"
               >
                  <Play size={18} fill="currentColor" /> Launch Coach
               </button>
            </div>
         </div>
      </section>

      {/* Interview Prep Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full items-start">
        {/* Technical Prep */}
        <section className="flex flex-col gap-5 w-full h-full">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-500">
              <Code2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Technical Mastery</h2>
          </div>
          <div className="flex flex-col gap-4 h-full">
             {technicalPrep.length > 0 ? (
                 technicalPrep.map(item => (
                    <TaskCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => setSelectedItem(item)}
                    />
                 ))
             ) : (
                 <div className="text-slate-500 text-sm text-center py-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl">
                    No technical tasks assigned.
                 </div>
             )}
          </div>
        </section>

        {/* Behavioral Prep */}
        <section className="flex flex-col gap-5 w-full h-full">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-500">
              <Users size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Behavioral & HR</h2>
          </div>
          <div className="flex flex-col gap-4 h-full">
             {behavioralPrep.length > 0 ? (
                 behavioralPrep.map(item => (
                    <TaskCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => setSelectedItem(item)}
                    />
                 ))
             ) : (
                 <div className="text-slate-500 text-sm text-center py-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl">
                    No behavioral tasks assigned.
                 </div>
             )}
          </div>
        </section>
      </div>

      {/* Career Section */}
      <section className="flex flex-col gap-5 w-full">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600 dark:text-amber-500">
              <CheckSquare size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Career Milestones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
             {career.length > 0 ? (
                 career.map(item => (
                    <TaskCard 
                        key={item.id} 
                        item={item} 
                        onClick={() => setSelectedItem(item)}
                    />
                 ))
             ) : (
                <div className="text-slate-500 text-sm text-center py-12 col-span-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl">
                    No career milestones found.
                </div>
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

      {/* Mock Interview Modal */}
      <MockInterview 
        isOpen={isInterviewOpen} 
        onClose={() => setIsInterviewOpen(false)} 
      />
    </div>
  );
};

export default Outputs;