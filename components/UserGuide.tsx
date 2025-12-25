
import React, { useState } from 'react';
import { X, LayoutDashboard, CheckSquare, Library, Briefcase, Languages, GraduationCap, CalendarClock, ShieldCheck, Zap, Info, ChevronRight, HelpCircle, Target, Sparkles, BrainCircuit, Mail, MessageCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('getting-started');

  if (!isOpen) return null;

  const sections = [
    { id: 'getting-started', label: 'Basics', icon: Zap },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: CheckSquare },
    { id: 'ai-tools', label: 'AI Power', icon: BrainCircuit },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'support', label: 'Support', icon: MessageCircle },
  ];

  const supportEmail = "ruchith.alok@gmail.com";
  const mailtoLink = `mailto:${supportEmail}?subject=Compass%20Feedback%20%26%20Support`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-3xl h-[80vh] rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 flex flex-col overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
              <HelpCircle className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">System Manual</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Navigate your future with precision</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-20 md:w-48 bg-slate-50 dark:bg-slate-950/40 border-r border-slate-100 dark:border-white/5 flex flex-col p-4 gap-2 overflow-y-auto custom-scrollbar">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  activeTab === section.id 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <section.icon size={20} className="shrink-0" />
                <span className="hidden md:block font-bold text-xs uppercase tracking-widest">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-white dark:bg-slate-900">
            {activeTab === 'getting-started' && (
              <div className="space-y-8 animate-slide-up">
                <div className="relative p-6 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 rounded-[2rem] border border-indigo-500/10">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={20} /> Welcome to Compass
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Compass is a personal Career Operating System designed specifically for AIML and Data Science students. It tracks your progress over 4 years, helps you build a portfolio, and trains your professional skills using AI.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                      <ShieldCheck size={14} /> Data Privacy
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      All your data is stored <strong>locally in your browser</strong>. We don't save your progress on any servers. Your Roadmap and tasks stay only on your device.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest">
                      <Zap size={14} /> AI Connection
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      To use features like <strong>Linguahub</strong> or the <strong>Interview Coach</strong>, connect your Gemini API key via the Sidebar.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-slide-up">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><LayoutDashboard size={20} /> The Hub</h3>
                  <div className="grid gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-1">Utility Shortcuts</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-2">The header contains instant links to elite learning resources:</p>
                      <ul className="space-y-2 text-[11px] text-slate-500">
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-400 rounded-full" /> <strong>Roadmap.sh:</strong> Visual career paths for developers.</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-400 rounded-full" /> <strong>GoalKicker:</strong> Access 100+ free professional programming books.</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-teal-400 rounded-full" /> <strong>Perplexity AI:</strong> Deep research for technical concepts.</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full" /> <strong>Gamma:</strong> Professional AI-driven presentation builder.</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-1">Daily Routine</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Resets every night at 12:00 AM. Custom tasks stay in the list, but their "Completed" status is cleared to give you a fresh start every day.</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-1">Homework Tasks</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Specifically for academic deadlines. These are <strong>cleared completely</strong> every 24 hours to keep your desk clean for the new day's workload.</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mb-1">Milestone Radar</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">A live visualization of your career readiness. It calculates your percentage score for each job role based on the specific tasks you've completed in the <strong>Roadmap</strong> tab.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="space-y-8 animate-slide-up">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><CheckSquare size={20} /> Tracking Progress</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg text-emerald-600"><Target size={20} /></div>
                      <div>
                        <h4 className="font-bold text-sm">Role Alignment</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Use the filter to focus on your target path (e.g., Data Scientist). The roadmap will show you the exact skills and projects required for that specific career.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg text-indigo-600"><Library size={20} /></div>
                      <div>
                        <h4 className="font-bold text-sm">Learning Resources</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">The <strong>Learn</strong> tab is your centralized vault. It collects all recommended resource links (Youtube, Books, Documentation) mentioned across the entire 4-year roadmap.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="p-2 bg-amber-100 dark:bg-amber-500/10 rounded-lg text-amber-600"><Briefcase size={20} /></div>
                      <div>
                        <h4 className="font-bold text-sm">Portfolio Logic</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">The <strong>Portfolio</strong> tab separates projects and milestones. Mark these as "Completed" to build your <em>Proof of Work</em> for recruiters.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-tools' && (
              <div className="space-y-8 animate-slide-up">
                <div className="p-6 bg-slate-900 rounded-3xl text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-12 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10"><Languages className="text-emerald-400" /> Linguahub (IELTS Prep)</h3>
                  <ul className="space-y-3 relative z-10">
                    <li className="text-xs text-slate-400 flex items-start gap-2">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                      <strong>6 Linguistic Pillars:</strong> Daily AI-generated challenges across Listening, Writing, Reading, and more.
                    </li>
                    <li className="text-xs text-slate-400 flex items-start gap-2">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                      <strong>AI Band Score:</strong> Submit your answer to get an instant IELTS Band score evaluation (1.0 - 9.0) and feedback.
                    </li>
                    <li className="text-xs text-slate-400 flex items-start gap-2">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                      <strong>Native Audio:</strong> Listening tasks feature high-fidelity AI-generated native speech.
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-indigo-900 rounded-3xl text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10"><BrainCircuit className="text-indigo-300" /> Mock Interview Simulator</h3>
                  <p className="text-xs text-indigo-200 leading-relaxed relative z-10">
                    Located in the Portfolio tab. Select Behavioral or Technical rounds. The AI will provide deep critiques using the <strong>STAR method</strong> (Situation, Task, Action, Result) and suggest keywords to improve your answer.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-8 animate-slide-up">
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 shrink-0"><GraduationCap size={24} /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Syllabus Tracker</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Click any semester to view the JNTUH R25 curriculum. Within each course, you can track individual topics. Checking off topics updates the semester progress bar at the top.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 shrink-0"><CalendarClock size={24} /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Interactive Timetable</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Upload an image of your class schedule. Once uploaded, you can <strong>Zoom in/out</strong> and <strong>Drag (Pan)</strong> the image to see small details of your schedule quickly.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-8 animate-slide-up">
                <div className="relative p-6 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-3xl border border-emerald-500/20">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="text-emerald-500" size={24} /> Support & Feedback
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Compass is built to empower your journey. If you encounter any issues or have suggestions to make it better, we're listening.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white dark:border-white/5 shadow-sm">
                       <AlertCircle className="text-rose-500 shrink-0" size={20} />
                       <div>
                         <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">Report Problems</h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400">Found a bug or something isn't loading? Let us know the details.</p>
                       </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white dark:border-white/5 shadow-sm">
                       <Sparkles className="text-amber-500 shrink-0" size={20} />
                       <div>
                         <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">Feature Suggestions</h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400">Have an idea for a new AI tool or academic feature? We'd love to hear it.</p>
                       </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white dark:border-white/5 shadow-sm">
                       <Mail className="text-indigo-500 shrink-0" size={20} />
                       <div>
                         <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">General Feedback</h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400">Just want to say hi or share how Compass is helping you? Drop a line!</p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-950/40 rounded-3xl border border-slate-100 dark:border-white/5 text-center">
                   <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Direct Response Channel:</p>
                   <p className="font-mono text-emerald-600 dark:text-emerald-400 font-bold select-all">{supportEmail}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:px-10 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
           <a 
             href={mailtoLink}
             className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl transition-all text-[11px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-sm active:scale-95"
           >
             <Mail size={16} /> Write to Us
           </a>
           <button 
             onClick={onClose}
             className="w-full md:w-auto px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-sm active:scale-95 transition-all shadow-lg shadow-black/10"
           >
             Got it, Thanks!
           </button>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
