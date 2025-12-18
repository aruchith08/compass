import React, { useState, useEffect, useRef } from 'react';
// Added ArrowRight to the imports from lucide-react
import { Mic, Send, RefreshCw, X, Loader2, Award, Briefcase, Zap, Star, ShieldCheck, MessageSquareQuote, ArrowRight } from 'lucide-react';
import { runGenAI } from '../services/ai';

type InterviewType = 'Technical' | 'Behavioral' | 'System Design';

interface MockInterviewProps {
    isOpen: boolean;
    onClose: () => void;
}

const MockInterview: React.FC<MockInterviewProps> = ({ isOpen, onClose }) => {
    const [type, setType] = useState<InterviewType>('Behavioral');
    const [question, setQuestion] = useState<string>('');
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);

    const generateQuestion = async () => {
        setIsGenerating(true);
        setFeedback(null);
        setScore(null);
        setUserAnswer('');
        
        let aiPrompt = "";
        if (type === 'Behavioral') {
            aiPrompt = "Generate a challenging behavioral interview question (e.g., STAR method based) for a software engineering candidate. Focus on leadership, conflict, or failure. Only return the question text.";
        } else if (type === 'Technical') {
            aiPrompt = "Generate a conceptual technical interview question for a software engineer specializing in AIML or Data Science. Focus on fundamentals like 'The bias-variance tradeoff', 'Regularization techniques', or 'Gradient Descent internals'. Only return the question text.";
        } else {
            aiPrompt = "Generate a system design interview question for a scalable web application. Focus on components like 'Load balancing', 'Database sharding', or 'Caching strategies'. Only return the question text.";
        }

        try {
            await runGenAI(async (ai) => {
                // Flash is good for simple generation
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: aiPrompt
                });
                setQuestion(response.text?.trim() || "Tell me about a project that didn't go as planned.");
            });
        } catch (error) {
            setQuestion("Tell me about a time you had to learn a new technology quickly.");
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        if (isOpen && !question) {
            generateQuestion();
        }
    }, [isOpen, type]);

    const handleSubmit = async () => {
        if (!userAnswer.trim()) return;
        setIsEvaluating(true);

        const aiPrompt = `You are a Senior Engineering Manager and expert interviewer.
        
        Task: Provide a deep evaluation of the candidate's response.
        Question: "${question}"
        Candidate Answer: "${userAnswer}"
        
        Strict Evaluation Criteria:
        1. Accuracy & Depth: Does the answer demonstrate true understanding?
        2. Structure: For behavioral, check if the STAR (Situation, Task, Action, Result) method was used. For technical, check for clarity.
        3. Professionalism: Is the tone appropriate?

        Return your response in this EXACT format:
        Score: [Number from 1-10]/10
        
        ### 🎯 Core Feedback
        [Your detailed critique here]
        
        ### 💡 Better Response Strategy
        [How they should have framed it for maximum impact]
        
        ### 🗝️ Key Terms to Use
        [List 3-5 keywords that would strengthen this answer]`;

        try {
            await runGenAI(async (ai) => {
                // Pro model for better reasoning and evaluation
                const response = await ai.models.generateContent({
                    model: 'gemini-3-pro-preview',
                    contents: aiPrompt
                });
                
                const text = response.text || "";
                const scoreMatch = text.match(/Score:\s*(\d+)/i);
                setScore(scoreMatch ? parseInt(scoreMatch[1]) : 5);
                setFeedback(text.replace(/Score:\s*(\d+)\/10/i, '').trim());
            });
        } catch (error) {
            setFeedback("Evaluation failed. Please try again.");
        } finally {
            setIsEvaluating(false);
        }
    };

    const handleInternalClose = () => {
        setQuestion('');
        setUserAnswer('');
        setFeedback(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
            onClick={(e) => {
                if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                    handleInternalClose();
                }
            }}
        >
            {/* Ambient Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div 
                ref={modalRef} 
                className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] border border-white/20 dark:border-white/5 animate-scale-in"
            >
                {/* Header */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                            <Briefcase className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                AI Interview Coach
                                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Pro</span>
                            </h2>
                            <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                                <Zap size={12} className="text-amber-500" /> Powered by Gemini 3 Pro
                            </p>
                        </div>
                    </div>
                    <button onClick={handleInternalClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-all">
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    
                    {/* Mode Selection */}
                    <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-white/5">
                        {(['Behavioral', 'Technical', 'System Design'] as InterviewType[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => {
                                    setType(t);
                                    setQuestion('');
                                    setFeedback(null);
                                    setUserAnswer('');
                                }}
                                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
                                    type === t 
                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-md' 
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Question Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800/50 dark:to-slate-900 border border-indigo-100 dark:border-white/10 rounded-2xl p-6 shadow-sm relative group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">
                                <MessageSquareQuote size={14} /> Current Task
                            </span>
                            <button 
                                onClick={generateQuestion}
                                disabled={isGenerating}
                                className="p-2 bg-white dark:bg-slate-800 rounded-xl hover:text-indigo-500 shadow-sm border border-slate-100 dark:border-white/5 transition-all active:scale-90"
                                title="Skip / New Question"
                            >
                                <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
                            </button>
                        </div>
                        
                        <div className="min-h-[60px]">
                            {isGenerating ? (
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2 animate-pulse"></div>
                                </div>
                            ) : (
                                <h3 className="text-lg md:text-xl font-serif text-slate-800 dark:text-slate-100 leading-relaxed font-semibold italic">
                                    "{question}"
                                </h3>
                            )}
                        </div>
                    </div>

                    {/* Answer Area */}
                    {!feedback ? (
                        <div className="space-y-4 animate-slide-up">
                            <div className="relative">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                    Your Response
                                </label>
                                <textarea
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder={type === 'Behavioral' ? "Use the STAR method: Situation, Task, Action, Result..." : "Be specific and technical..."}
                                    className="w-full h-48 p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none placeholder:text-slate-400 shadow-inner transition-all text-base leading-relaxed"
                                />
                                {userAnswer.length > 0 && (
                                    <span className="absolute bottom-3 right-4 text-[10px] font-bold text-slate-400">
                                        {userAnswer.length} chars
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={isEvaluating || !userAnswer.trim()}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
                            >
                                {isEvaluating ? (
                                    <><Loader2 className="animate-spin" size={20} />Analyzing your performance...</>
                                ) : (
                                    <><Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />Submit for Evaluation</>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-slide-up">
                            {/* Evaluation Card */}
                            <div className="bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl">
                                <div className="bg-indigo-600 p-4 flex items-center justify-between">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <Award size={20} /> Official Evaluation
                                    </h3>
                                    {score !== null && (
                                        <div className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-white font-black text-sm border border-white/30">
                                            SCORE: {score}/10
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300 font-medium">
                                        {feedback}
                                    </div>
                                    
                                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/50 rounded-xl flex items-start gap-3">
                                            <ShieldCheck className="text-emerald-500 shrink-0" size={18} />
                                            <div>
                                                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-1">Pass Criteria</h4>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400">Aim for a score above 7 for Tier-1 readiness.</p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/50 rounded-xl flex items-start gap-3">
                                            <Star className="text-amber-500 shrink-0" size={18} />
                                            <div>
                                                <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase mb-1">Growth Mindset</h4>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400">Apply the tips and retry to build muscle memory.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    setFeedback(null);
                                    setUserAnswer('');
                                    generateQuestion();
                                }}
                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
                            >
                                Next Interview Round <ArrowRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Footer Tip */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-white/10 text-center shrink-0">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                        Tip: Speak your answer aloud while typing to practice fluency.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MockInterview;