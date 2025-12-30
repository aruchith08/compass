
import React, { useState } from 'react';
import { RoadmapItem, Status } from '../types';
import { X, ExternalLink, Calendar, CheckCircle2, Circle, Clock, AlertTriangle, Tag, Timer, Brain, Send, GraduationCap, Loader2, ThumbsUp, ThumbsDown, ArrowRight, ShieldAlert, FileCode, FileText } from 'lucide-react';
import { useRoadmap } from '../RoadmapContext';
import { runGenAI } from '../services/ai';
import { Type } from '@google/genai';

interface TaskDetailModalProps {
  item: RoadmapItem | null;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ item, onClose }) => {
  const { toggleStatus, isAiConnected } = useRoadmap();

  // Challenge State
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeStep, setChallengeStep] = useState<'generating' | 'answering' | 'evaluating' | 'result'>('generating');
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<{ pass: boolean; feedback: string } | null>(null);

  // Readme Gen State
  const [isGeneratingReadme, setIsGeneratingReadme] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);

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

  const handleStatusChange = async (newStatus: Status) => {
    // Intercept "Completed" for High Priority items if AI is active
    if (newStatus === 'Completed' && item.priority === 'High' && isAiConnected && item.status !== 'Completed') {
      setShowChallenge(true);
      generateSocraticQuestion();
    } else {
      toggleStatus(item.id, newStatus);
    }
  };

  const generateSocraticQuestion = async () => {
    setChallengeStep('generating');
    try {
      await runGenAI(async (ai) => {
        const prompt = `
          You are a strict Engineering Professor. The student claims to have mastered "${item.name}" (Description: ${item.description}).
          
          Generate ONE conceptual verification question to test their deep understanding. 
          Do not ask for definitions. Ask for a "Why" or "How" or a scenario-based question.
          Keep it short (max 2 sentences).
        `;
        const result = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt
        });
        setQuestion(result.text || "Explain the core concept and a practical use case in your own words.");
        setChallengeStep('answering');
      });
    } catch (e) {
      console.error("Gen Question Error", e);
      // Fallback
      setQuestion("Describe the most critical concept you learned from this topic and how you would apply it.");
      setChallengeStep('answering');
    }
  };

  const evaluateAnswer = async () => {
    if (!userAnswer.trim()) return;
    setChallengeStep('evaluating');
    
    try {
      await runGenAI(async (ai) => {
        const prompt = `
          Task: ${item.name}
          Professor Question: "${question}"
          Student Answer: "${userAnswer}"
          
          Evaluate strictly. Did the student demonstrate understanding?
          Return JSON: { "pass": boolean, "feedback": "string (max 20 words)" }
        `;
        
        const schema = {
          type: Type.OBJECT,
          properties: {
            pass: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING }
          },
          required: ["pass", "feedback"]
        };

        const result = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schema
          }
        });

        if (result.text) {
          setEvaluation(JSON.parse(result.text));
          setChallengeStep('result');
        }
      });
    } catch (e) {
      console.error("Evaluation Error", e);
      setEvaluation({ pass: true, feedback: "AI unavailable. Passing on trust." });
      setChallengeStep('result');
    }
  };

  const generateReadme = async () => {
    setIsGeneratingReadme(true);
    try {
       await runGenAI(async (ai) => {
          const prompt = `
            Generate a professional GitHub README.md for the project: "${item.name}".
            Description: ${item.description}.
            Tech Stack (infer from context): Python, React, etc.
            
            Structure:
            1. Title & Badges
            2. Features
            3. Tech Stack
            4. Installation
            
            Return ONLY raw Markdown.
          `;
          const result = await ai.models.generateContent({
             model: "gemini-3-flash-preview",
             contents: prompt
          });
          setReadmeContent(result.text || "Failed to generate.");
       });
    } catch (e) {
       console.error(e);
       setReadmeContent("Error generating README. Check API connection.");
    } finally {
       setIsGeneratingReadme(false);
    }
  };

  const confirmCompletion = () => {
    toggleStatus(item.id, 'Completed');
    setShowChallenge(false);
  };

  const cancelChallenge = () => {
    setShowChallenge(false);
    setUserAnswer('');
    setEvaluation(null);
    setChallengeStep('generating');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        
        {/* Socratic Validator Overlay */}
        {showChallenge && (
          <div className="absolute inset-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col p-8 animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30">
                <Brain className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">The Socratic Validator</h3>
                <p className="text-xs text-slate-500 font-medium">Verify your mastery before proceeding.</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {challengeStep === 'generating' && (
                <div className="text-center space-y-4">
                  <Loader2 size={48} className="text-indigo-500 animate-spin mx-auto" />
                  <p className="text-slate-600 dark:text-slate-300 font-medium animate-pulse">The Professor is formulating a question...</p>
                </div>
              )}

              {challengeStep === 'answering' && (
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 relative">
                    <div className="absolute -top-3 left-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Challenge Question
                    </div>
                    <p className="text-lg font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                      "{question}"
                    </p>
                  </div>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your explanation here..."
                    className="w-full h-32 p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-900 dark:text-white"
                  />
                  <div className="flex gap-3">
                    <button onClick={cancelChallenge} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                      Cancel
                    </button>
                    <button onClick={evaluateAnswer} disabled={!userAnswer.trim()} className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      Submit Answer
                    </button>
                  </div>
                </div>
              )}

              {challengeStep === 'evaluating' && (
                <div className="text-center space-y-4">
                  <Loader2 size={48} className="text-amber-500 animate-spin mx-auto" />
                  <p className="text-slate-600 dark:text-slate-300 font-medium animate-pulse">Analyzing your response logic...</p>
                </div>
              )}

              {challengeStep === 'result' && evaluation && (
                <div className="space-y-6 text-center">
                  <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${evaluation.pass ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'}`}>
                    {evaluation.pass ? <ThumbsUp size={40} /> : <ThumbsDown size={40} />}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${evaluation.pass ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {evaluation.pass ? "Mastery Verified" : "Knowledge Gap Detected"}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      "{evaluation.feedback}"
                    </p>
                  </div>
                  
                  {evaluation.pass ? (
                    <button onClick={confirmCompletion} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                      Mark as Completed <CheckCircle2 size={20} />
                    </button>
                  ) : (
                    <button onClick={cancelChallenge} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2">
                      Keep 'In Progress' & Review <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start shrink-0 bg-white dark:bg-slate-900 z-10">
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
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
          
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {item.description}
            </p>
          </div>

          {/* Status Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
               <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Current Status</h3>
               {item.priority === 'High' && isAiConnected && item.status !== 'Completed' && (
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/30">
                    <ShieldAlert size={12} /> Socratic Validation Active
                 </div>
               )}
            </div>
            
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

          {/* GitFolio (README Generator) */}
          {item.is_project && isAiConnected && (
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                        <FileCode size={16} className="text-purple-500" /> GitFolio: README Architect
                    </h3>
                </div>
                {!readmeContent ? (
                    <button 
                        onClick={generateReadme} 
                        disabled={isGeneratingReadme}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/20"
                    >
                        {isGeneratingReadme ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                        {isGeneratingReadme ? "Drafting Documentation..." : "Generate Professional README.md"}
                    </button>
                ) : (
                    <div className="space-y-3">
                        <textarea 
                            readOnly 
                            value={readmeContent} 
                            className="w-full h-48 bg-slate-900 text-slate-300 font-mono text-xs p-3 rounded-lg border border-slate-700 focus:outline-none"
                        />
                        <button 
                            onClick={() => {navigator.clipboard.writeText(readmeContent); setReadmeContent(null)}} 
                            className="w-full py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            Copy & Close
                        </button>
                    </div>
                )}
             </div>
          )}

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
