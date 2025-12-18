
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, RefreshCw, X, Loader2, Award, Briefcase } from 'lucide-react';
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
        
        let prompt = "";
        if (type === 'Behavioral') {
            prompt = "Generate a common behavioral interview question (e.g., STAR method based). Only return the question text, nothing else.";
        } else if (type === 'Technical') {
            prompt = "Generate a conceptual technical interview question for a Junior/Mid-level Software Engineer (e.g., about API design, Database indexing, OOPS, or React). Do not ask LeetCode coding problems, ask conceptual questions. Only return the question text.";
        } else {
            prompt = "Generate a system design interview question appropriate for a fresh graduate or junior engineer. Only return the question text.";
        }

        try {
            await runGenAI(async (ai) => {
                // Use gemini-3-flash-preview for basic text tasks like question generation.
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: prompt
                });
                setQuestion(response.text?.trim() || "Describe a challenging project you worked on.");
            });
        } catch (error) {
            console.error("Error generating question", error);
            setQuestion("Tell me about a time you handled a conflict in a team.");
        } finally {
            setIsGenerating(false);
        }
    };

    // Auto-generate question on open/type change if empty
    useEffect(() => {
        if (isOpen && !question) {
            generateQuestion();
        }
    }, [isOpen, type]);

    const handleSubmit = async () => {
        if (!userAnswer.trim()) return;
        setIsEvaluating(true);

        const prompt = `You are a strict technical interviewer.
        
        Question: "${question}"
        Candidate Answer: "${userAnswer}"
        
        Task:
        1. Rate the answer on a scale of 1-10.
        2. Provide constructive feedback. Mention what was missing (e.g., STAR method not used, technical inaccuracy).
        3. Suggest a better way to answer.

        Output format:
        Score: [Number]/10
        Feedback: [Text]
        Improved Answer: [Text]
        `;

        try {
            await runGenAI(async (ai) => {
                // Use gemini-3-flash-preview for evaluation tasks.
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: prompt
                });
                
                const text = response.text || "";
                // Extract score broadly
                const scoreMatch = text.match(/Score:\s*(\d+)/i);
                const extractedScore = scoreMatch ? parseInt(scoreMatch[1]) : 5;
                
                setScore(extractedScore);
                setFeedback(text);
            });
        } catch (error) {
            setFeedback("Error evaluating answer. Check internet connection.");
        } finally {
            setIsEvaluating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={(e) => {
                if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                    onClose();
                }
            }}
        >
            <div 
                ref={modalRef} 
                className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="bg-slate-50 dark:bg-slate-950 p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Briefcase className="text-indigo-600 dark:text-indigo-400" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Mock Interviewer</h2>
                            <p className="text-sm text-slate-500">Practice makes perfect.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* Type Selector */}
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        {(['Behavioral', 'Technical', 'System Design'] as InterviewType[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => {
                                    setType(t);
                                    setQuestion('');
                                    setFeedback(null);
                                    setUserAnswer('');
                                }}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                                    type === t 
                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Question Area */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-6 relative">
                        <span className="absolute top-4 left-4 text-xs font-bold text-indigo-500 uppercase tracking-wider">
                            {type} Question
                        </span>
                        <div className="mt-4 text-lg md:text-xl font-serif text-slate-800 dark:text-slate-100 leading-relaxed min-h-[60px]">
                            {isGenerating ? (
                                <div className="flex items-center gap-2 text-indigo-500">
                                    <Loader2 className="animate-spin" size={20} /> Generating question...
                                </div>
                            ) : (
                                question
                            )}
                        </div>
                        <button 
                            onClick={generateQuestion}
                            disabled={isGenerating}
                            className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-lg hover:text-indigo-500 shadow-sm text-slate-400 transition-colors"
                            title="Generate New Question"
                        >
                            <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
                        </button>
                    </div>

                    {/* Answer Area */}
                    {!feedback ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Your Answer
                                </label>
                                <textarea
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="Type your response here (use STAR method for behavioral)..."
                                    className="w-full h-40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none placeholder:text-slate-400"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={isEvaluating || !userAnswer.trim()}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isEvaluating ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                {isEvaluating ? 'Evaluating...' : 'Submit Answer'}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-700 pb-4">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Award className="text-amber-500" /> Evaluation
                                </h3>
                                {score !== null && (
                                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        score >= 7 ? 'bg-emerald-100 text-emerald-700' : 
                                        score >= 5 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        Score: {score}/10
                                    </div>
                                )}
                            </div>
                            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap text-slate-600 dark:text-slate-300">
                                {feedback}
                            </div>
                            <button 
                                onClick={() => {
                                    setFeedback(null);
                                    setUserAnswer('');
                                    generateQuestion();
                                }}
                                className="mt-6 w-full py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-medium transition-colors"
                            >
                                Practice Another Question
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MockInterview;
