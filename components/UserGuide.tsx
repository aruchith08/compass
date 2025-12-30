
import React, { useState } from 'react';
import { X, LayoutDashboard, CheckSquare, Library, Briefcase, Languages, GraduationCap, CalendarClock, ShieldCheck, Zap, Info, ChevronRight, HelpCircle, Target, Sparkles, BrainCircuit, Mail, MessageCircle, AlertCircle, ExternalLink, Timer, FileText, Activity, Star, Network, PenTool, ShoppingBag, BookOpen, Store } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('getting-started');

  if (!isOpen) return null;

  const sections = [
    { id: 'getting-started', label: 'Basics & XP', icon: Zap },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: CheckSquare },
    { id: 'ai-tools', label: 'AI Suite', icon: BrainCircuit },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'academia-market', label: 'AcademiaMarket', icon: Store },
    { id: 'support', label: 'Support', icon: MessageCircle },
  ];

  const supportEmail = "ruchith.alok@gmail.com";
  const mailtoLink = `mailto:${supportEmail}?subject=Compass%20Feedback%20%26%20Support`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl h-[85vh] rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 flex flex-col overflow-hidden animate-scale-in"
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
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Master every feature of your Career OS</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-20 md:w-56 bg-slate-50 dark:bg-slate-950/40 border-r border-slate-100 dark:border-white/5 flex flex-col p-4 gap-2 overflow-y-auto custom-scrollbar shrink-0">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all group ${
                  activeTab === section.id 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <section.icon size={20} className={`shrink-0 ${activeTab === section.id ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500 transition-colors'}`} />
                <span className="hidden md:block font-bold text-xs uppercase tracking-widest">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-white dark:bg-slate-900">
            {activeTab === 'getting-started' && (
              <div className="space-y-8 animate-slide-up">
                
                {/* Welcome Card */}
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-900/20 rounded-[2rem] border border-indigo-100 dark:border-indigo-500/20">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={20} /> Welcome to Compass
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    Compass is a personal Career Operating System designed specifically for AIML and Data Science students. It tracks your progress over 4 years, helps you build a portfolio, and trains your professional skills using AI.
                  </p>
                </div>

                <div className="relative p-8 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-indigo-950 dark:to-slate-900 rounded-[2.5rem] border border-indigo-500/20 shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                  <div className="relative z-10 text-white">
                    <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                      <Zap className="text-amber-400" size={24} /> 
                      Gamification Economy
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm mb-6 max-w-xl">
                      Compass isn't just a tracker; it's a game. Earn <strong>Star Points (XP)</strong> to unlock themes and utilities.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                            <div className="text-amber-400 font-black text-xl mb-1">+10 XP</div>
                            <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">Daily Routine Complete</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                            <div className="text-rose-400 font-black text-xl mb-1">-20 XP</div>
                            <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">Missed Daily Tasks</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                            <div className="text-emerald-400 font-black text-xl mb-1">SHOP</div>
                            <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">Buy Themes & Freezes</div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 p-5 bg-slate-50 dark:bg-slate-950/30 rounded-3xl border border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest">
                      <ShieldCheck size={16} /> Browser Save Architecture
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Your data lives in your browser's <strong>Local Storage</strong>. We do not have servers. This ensures 100% privacy but means if you clear your browser cache, your progress resets unless you back it up manually.
                    </p>
                  </div>
                  <div className="space-y-3 p-5 bg-slate-50 dark:bg-slate-950/30 rounded-3xl border border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest">
                      <Zap size={16} /> AI Integration
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Connect your <strong>Gemini API Key</strong> via the Sidebar or Header. This enables the Socratic Validator, Linguahub, Resume Architect, and Neural Synthesis features. It's free from Google AI Studio.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-slide-up">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl"><LayoutDashboard size={24} /></div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Command Center</h3>
                        <p className="text-xs text-slate-500">Your central hub for daily operations.</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2"><Timer size={16} className="text-emerald-500" /> Focus Engine</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        A Pomodoro timer with <strong>Zen Mode</strong> (Brownian noise generator) and <strong>PiP (Picture-in-Picture)</strong> support so you can see the timer while coding in other tabs.
                      </p>
                    </div>
                    <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2"><Briefcase size={16} className="text-blue-500" /> Command Bar</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Top right icons allow quick access to:
                        <ul className="list-disc list-inside mt-1 ml-1 space-y-0.5">
                            <li><strong>Syllabus:</strong> Academic tracker.</li>
                            <li><strong>Resume:</strong> AI Resume builder.</li>
                            <li><strong>Shop:</strong> Spend your XP.</li>
                            <li><strong>Timetable:</strong> View your upload.</li>
                        </ul>
                      </p>
                    </div>
                    <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2"><BrainCircuit size={16} className="text-purple-500" /> Memory Anchor</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Spaced repetition flashcards. It picks a random <strong>Completed</strong> task and generates a conceptual question to test your retention.
                      </p>
                    </div>
                    <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2"><Activity size={16} className="text-rose-500" /> Market Pulse</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Uses AI with Google Search grounding to find the <strong>Top 3 Trending Skills</strong> for AI Engineers in real-time. Kept in your High Priority Queue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="space-y-8 animate-slide-up">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl"><CheckSquare size={24} /></div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Roadmap Tracker</h3>
                        <p className="text-xs text-slate-500">Visualize your 4-year journey.</p>
                     </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="flex gap-4 items-start p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg text-emerald-600"><Network size={20} /></div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Knowledge Graph View</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Toggle between the standard <strong>List View</strong> and the interactive <strong>Graph View</strong> (top right icons). The graph visualizes connections between different years and topics.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg text-indigo-600"><ShieldCheck size={20} /></div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Socratic Validator</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          You cannot simply mark a <strong>High Priority</strong> task as "Completed" if AI is active. The system will challenge you with a "Professor-style" question. You must answer correctly to verify mastery.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
                      <div className="p-2 bg-amber-100 dark:bg-amber-500/10 rounded-lg text-amber-600"><Target size={20} /></div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Role Alignment</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Use the filter dropdown to see only tasks relevant to: <strong>AI Engineer, Data Scientist, Full Stack Dev, AI Security, or Data Analyst</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-tools' && (
              <div className="space-y-8 animate-slide-up">
                <div className="p-8 bg-slate-900 dark:bg-black rounded-3xl text-white overflow-hidden relative border border-slate-800">
                  <div className="absolute top-0 right-0 p-24 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <BrainCircuit className="text-emerald-400" /> AI Suite Capabilities
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md">
                            <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><Languages size={16} /> Linguahub</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Complete <strong>IELTS training system</strong>. Includes daily challenges for Listening, Reading, Writing, Vocabulary, Grammar, and Collocations. Features <strong>Text-to-Speech</strong> for listening tasks.
                            </p>
                        </div>
                        <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md">
                            <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-2"><Briefcase size={16} /> Interview Coach</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Simulates 3 interview modes:
                                <br/>1. <strong>Behavioral</strong> (STAR method)
                                <br/>2. <strong>Technical</strong> (Deep concepts)
                                <br/>3. <strong>System Design</strong> (Architecture)
                                <br/>Provides scoring out of 10 and keyword suggestions.
                            </p>
                        </div>
                        <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md">
                            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2"><FileText size={16} /> Resume Architect</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Paste a Job Description. The AI scans your <strong>Completed Roadmap Items</strong> and generates highly tailored, metric-driven bullet points matching your actual skills to the job.
                            </p>
                        </div>
                        <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-md">
                            <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2"><PenTool size={16} /> GitFolio</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Inside any "Project" card in the Portfolio tab, click <strong>Generate README</strong>. It creates a professional GitHub documentation file based on the project description and tech stack.
                            </p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-8 animate-slide-up">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl"><GraduationCap size={24} /></div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Academic Tools</h3>
                        <p className="text-xs text-slate-500">JNTUH Syllabus & Scheduling.</p>
                     </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="flex gap-4 p-5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0 h-fit"><Sparkles size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Neural Synthesis</h4>
                        <p className="text-sm text-slate-500 leading-relaxed mb-3">
                          Found in the Syllabus Viewer. Click the sparkle icon next to any unit to generate:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-800">2-Sentence Summary</span>
                            <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-2 py-1 rounded border border-emerald-100 dark:border-emerald-800">3 Exam Questions</span>
                            <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-600 px-2 py-1 rounded border border-amber-100 dark:border-amber-800">Memory Mnemonic</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 p-5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 shrink-0 h-fit"><BookOpen size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Syllabus Tracker</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Click any semester to view the JNTUH R25 curriculum. Within each course, you can track individual topics. Checking off topics updates the semester progress bar at the top.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-5 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 shrink-0 h-fit"><CalendarClock size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Interactive Timetable</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Upload an image of your class schedule. The viewer supports <strong>Zoom & Pan</strong> gestures (pinch or scroll) so you can read small text easily on mobile.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academia-market' && (
              <div className="space-y-8 animate-slide-up">
                 <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl"><Store size={24} /></div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Partner Ecosystem</h3>
                        <p className="text-xs text-slate-500">Explore other tools in our network.</p>
                     </div>
                 </div>

                 <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-white/20 p-2 rounded-lg backdrop-blur-md"><Store size={24} /></span>
                            <h2 className="text-2xl font-black tracking-tight">AcademiaMarket</h2>
                        </div>

                        <p className="text-indigo-100 leading-relaxed mb-6 max-w-2xl">
                            AcademiaMarket is a hyper-local, peer-to-peer marketplace built with React and Firebase that connects university students for manual academic tasks like handwriting and formatting. It utilises a trust-based matching system and a structured "task handshake" workflow to ensure secure, community-driven collaboration.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://academia-market.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
                            >
                                Try Academia Market <ExternalLink size={16} />
                            </a>
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
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm">
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
             Close Manual
           </button>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
