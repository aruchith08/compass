
import React, { useState, useEffect, useRef } from 'react';
import { 
    Headphones, BookOpen, PenTool, Mic, 
    Star, ArrowRight, Layers, CheckCircle2, 
    Loader2, PlayCircle, Volume2, 
    X, ExternalLink, MessageSquare, Send, AlertCircle, CalendarCheck, Languages, Sparkles, SpellCheck, Zap
} from 'lucide-react';
import { Type } from "@google/genai";
import { User } from '../types';
import { runGenAI } from '../services/ai';

// --- TYPES ---

export interface ResourceLink {
    name: string;
    url: string;
}

export enum SkillType {
    LISTENING = 'Listening',
    READING = 'Reading',
    WRITING = 'Writing',
    SPEAKING = 'Speaking',
}

export type ChallengeCategory = 'Grammar' | 'Vocabulary' | 'Idiom' | 'Listening' | 'Reading' | 'Writing' | 'Speaking';

export interface SkillCategory {
    id: SkillType;
    title: string;
    description: string;
    icon: React.ReactNode;
    resources: ResourceLink[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    isError?: boolean;
}

export interface DailyChallenge {
    id: string;
    category: ChallengeCategory;
    type: string;
    content: string;
    hiddenContent?: string;
    requiresInput?: boolean;
    options?: string[];
}

export interface VocabularyWord {
    word: string;
    phonetic: string;
    partOfSpeech: string;
    definition: string;
    example: string;
}

// --- Robust JSON Parsing Helper ---
const parseAIJSON = (text: string) => {
    try {
        if (!text) return null;
        let cleaned = text.trim();
        
        // Remove markdown formatting if present
        if (cleaned.includes('```')) {
            cleaned = cleaned.replace(/```json/g, '').replace(/```/g, '').trim();
        }

        // Find first occurrence of { or [ and last occurrence of } or ]
        const firstBrace = cleaned.indexOf('{');
        const firstBracket = cleaned.indexOf('[');
        const lastBrace = cleaned.lastIndexOf('}');
        const lastBracket = cleaned.lastIndexOf(']');
        
        let start = -1;
        let end = -1;
        
        if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
            start = firstBrace;
            end = lastBrace;
        } else if (firstBracket !== -1) {
            start = firstBracket;
            end = lastBracket;
        }
        
        if (start !== -1 && end !== -1) {
            cleaned = cleaned.substring(start, end + 1);
        }
        
        return JSON.parse(cleaned);
    } catch (e) {
        console.error("AI JSON Parse Error:", e, text);
        return null;
    }
};

// --- CONSTANTS ---

export const SKILL_DATA: SkillCategory[] = [
    {
        id: SkillType.LISTENING,
        title: 'IELTS Listening',
        description: 'Practice comprehension with varied accents and contexts.',
        icon: <Headphones className="w-8 h-8 text-emerald-500" />,
        resources: [
        { name: 'British Council Listening', url: 'https://learnenglish.britishcouncil.org/skills/listening' },
        { name: 'IELTS Liz Listening', url: 'https://ieltsliz.com/ielts-listening/' },
        { name: 'BBC 6 Minute English', url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english' },
        ],
    },
    {
        id: SkillType.READING,
        title: 'IELTS Reading',
        description: 'Academic texts, skimming, scanning, and detail questions.',
        icon: <BookOpen className="w-8 h-8 text-blue-500" />,
        resources: [
        { name: 'British Council Reading', url: 'https://learnenglish.britishcouncil.org/skills/reading' },
        { name: 'IELTS Buddy Reading', url: 'https://www.ieltsbuddy.com/ielts-reading.html' },
        { name: 'Breaking News English', url: 'https://breakingnewsenglish.com/' },
        ],
    },
    {
        id: SkillType.WRITING,
        title: 'IELTS Writing',
        description: 'Task 1 (Charts/Letters) and Task 2 (Essays).',
        icon: <PenTool className="w-8 h-8 text-purple-500" />,
        resources: [
        { name: 'IELTS Liz Writing', url: 'https://ieltsliz.com/ielts-writing-task-1-and-task-2/' },
        { name: 'Cambridge Write & Improve', url: 'https://writeandimprove.com/' },
        ],
    },
    {
        id: SkillType.SPEAKING,
        title: 'IELTS Speaking',
        description: 'Fluency, pronunciation, and cue card topics.',
        icon: <Mic className="w-8 h-8 text-orange-500" />,
        resources: [
        { name: 'IELTS Speaking Samples', url: 'https://ielts-up.com/speaking/ielts-speaking-samples.html' },
        { name: 'TalkEnglish', url: 'https://www.talkenglish.com/speaking/listbasics.aspx' },
        ],
    },
];

export const SAMPLE_PAPERS: ResourceLink[] = [
    { name: 'IELTS Online Tests', url: 'https://ieltsonlinetests.com/' },
    { name: 'Exam English', url: 'https://www.examenglish.com/' },
    { name: 'Cambridge English Prep', url: 'https://www.cambridgeenglish.org/learning-english/exam-preparation/' },
];

// --- GEMINI SERVICE INTEGRATION ---

const sendMessageToGemini = async (message: string, history: ChatMessage[]): Promise<string> => {
    return runGenAI(async (ai) => {
        // FILTER: history must alternate user/model and MUST start with 'user'.
        // If first msg is model, Gemini throws 400.
        const chatHistory = history
            .filter(msg => msg.role === 'user' || msg.role === 'model')
            .map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }));

        // Remove history items if they don't alternate correctly
        let sanitizedHistory: any[] = [];
        if (chatHistory.length > 0) {
            // First message in history MUST be user
            if (chatHistory[0].role !== 'user') {
                sanitizedHistory = chatHistory.slice(1);
            } else {
                sanitizedHistory = chatHistory;
            }
        }

        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            history: sanitizedHistory,
            config: {
                systemInstruction: 'You are an expert IELTS Tutor named LinguaBot. Your goal is to help students achieve Band 7.0+. Keep answers concise, professional, and focused on marking criteria.',
            },
        });
        const result = await chat.sendMessage({ message });
        return result.text || "I'm sorry, I couldn't generate a response.";
    });
};

const evaluateChallenge = async (challenge: string, userAnswer: string, hiddenContext?: string): Promise<{text: string, score: number}> => {
    return runGenAI(async (ai) => {
        const contextStr = hiddenContext ? `\nContext: "${hiddenContext}"` : "";
        const prompt = `Evaluate this IELTS response. Task: "${challenge}"${contextStr} Answer: "${userAnswer}" Output Format: Score: [X.X]/9 Feedback: [Brief feedback]`;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt
        });
        const responseText = response.text || "No feedback.";
        const scoreMatch = responseText.match(/Score:\s*(\d+(\.\d+)?)/i);
        const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;
        return { text: responseText, score };
    });
};

const generateVocabularyWord = async (): Promise<VocabularyWord | null> => {
    try {
        return await runGenAI(async (ai) => {
            const schema = {
                type: Type.OBJECT,
                properties: {
                    word: { type: Type.STRING },
                    phonetic: { type: Type.STRING },
                    partOfSpeech: { type: Type.STRING },
                    definition: { type: Type.STRING },
                    example: { type: Type.STRING },
                },
                required: ['word', 'phonetic', 'partOfSpeech', 'definition', 'example'],
            };
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: "Generate one advanced English vocabulary word for IELTS Band 8+. Return JSON.",
                config: { responseMimeType: 'application/json', responseSchema: schema }
            });
            return parseAIJSON(response.text);
        });
    } catch (e) { return null; }
};

const generateDailyChallenges = async (): Promise<DailyChallenge[]> => {
    try {
        return await runGenAI(async (ai) => {
            const schema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        category: { type: Type.STRING },
                        type: { type: Type.STRING },
                        content: { type: Type.STRING },
                        requiresInput: { type: Type.BOOLEAN },
                        hiddenContent: { type: Type.STRING },
                    },
                    required: ['id', 'category', 'type', 'content', 'requiresInput'],
                }
            };
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: "Generate 5 exam-style IELTS preparation tasks (Listening, Reading, Speaking, Writing, Grammar). Return JSON array.",
                config: { responseMimeType: 'application/json', responseSchema: schema }
            });
            return parseAIJSON(response.text) || [];
        });
    } catch (e) { return []; }
};

// --- MAIN COMPONENTS ---

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'model', text: "Hello! I'm LinguaBot. How can I help you today?" }]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => { if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isOpen]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const userMsg = input.trim();
        setInput('');
        
        const previousMessages = [...messages];
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);
        
        try {
            // We pass the history EXCLUDING the current message, because chat.sendMessage adds it internally
            const response = await sendMessageToGemini(userMsg, previousMessages);
            setMessages(prev => [...prev, { role: 'model', text: response }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'model', text: "Error: AI Tutor is currently unavailable. Ensure history role sequence is correct.", isError: true }]);
        } finally { setIsLoading(false); }
    };

    return (
        <div className="fixed bottom-24 lg:bottom-6 right-6 z-40 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden flex flex-col h-[500px] animate-fade-in">
                    <div className="bg-emerald-600 dark:bg-slate-950 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2"><h3 className="font-semibold">IELTS AI Tutor</h3></div>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/10"><X size={20} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : msg.isError ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm'}`}>{msg.text}</div>
                            </div>
                        ))}
                        {isLoading && <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="p-3 bg-white/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-white/10 flex gap-2">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about IELTS..." className="flex-1 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        <button type="submit" disabled={isLoading || !input.trim()} className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 disabled:opacity-50"><Send size={18} /></button>
                    </form>
                </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all">
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
};

const Linguahub: React.FC<{ user: User | null }> = ({ user }) => {
    const [selectedSkill, setSelectedSkill] = useState<SkillCategory | null>(null);
    const [todayTasks, setTodayTasks] = useState<DailyChallenge[]>([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [isSessionComplete, setIsSessionComplete] = useState(false);
    const [isLoadingTasks, setIsLoadingTasks] = useState(true);
    const [vocabWord, setVocabWord] = useState<VocabularyWord | null>(null);
    const [isVocabLoading, setIsVocabLoading] = useState(true);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (!user) return;
        const load = async () => {
            const today = new Date().toDateString();
            const sessionKey = `ling_sesh_${user.username}_${today}`;
            const stored = localStorage.getItem(sessionKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                setTodayTasks(parsed.tasks);
                setCurrentTaskIndex(parsed.currentIndex);
                setIsSessionComplete(parsed.isComplete);
                setIsLoadingTasks(false);
            } else {
                const tasks = await generateDailyChallenges();
                if (tasks.length) {
                    localStorage.setItem(sessionKey, JSON.stringify({ tasks, currentIndex: 0, isComplete: false }));
                    setTodayTasks(tasks);
                }
                setIsLoadingTasks(false);
            }
            const word = await generateVocabularyWord();
            setVocabWord(word);
            setIsVocabLoading(false);
        };
        load();
    }, [user]);

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        const task = todayTasks[currentTaskIndex];
        if (!task || !userAnswer.trim()) return;
        setIsChecking(true);
        const result = await evaluateChallenge(task.content, userAnswer, task.hiddenContent);
        setFeedback(result.text);
        setIsChecking(false);
    };

    const handleNext = () => {
        setUserAnswer(''); setFeedback(null);
        if (currentTaskIndex < todayTasks.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
        } else { setIsSessionComplete(true); }
    };

    const glassCard = "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-2xl p-6";

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Languages className="text-emerald-500" /> Linguahub
            </h2>

            <section className={glassCard}>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Star className="text-amber-500" /> Word of the Day</h3>
                {isVocabLoading ? <div className="animate-pulse h-20 bg-slate-200 dark:bg-slate-800 rounded-xl" /> : vocabWord ? (
                    <div>
                        <div className="flex items-baseline gap-2">
                            <h4 className="text-2xl font-bold">{vocabWord.word}</h4>
                            <span className="text-slate-500 italic text-sm">{vocabWord.phonetic}</span>
                        </div>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">{vocabWord.definition}</p>
                        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg italic">"{vocabWord.example}"</div>
                    </div>
                ) : <p className="text-slate-400">Failed to load word.</p>}
            </section>

            <section className={glassCard}>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2"><Zap className="text-indigo-500" /> Daily IELTS Challenges</h3>
                {isLoadingTasks ? <Loader2 className="animate-spin text-emerald-500 mx-auto" /> : isSessionComplete ? <div className="text-center py-8"><CheckCircle2 className="text-emerald-500 mx-auto w-12 h-12 mb-2" /><p>All tasks cleared!</p></div> : (
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase text-indigo-500">{todayTasks[currentTaskIndex]?.category} Challenge</span>
                            <h4 className="text-lg font-serif italic mt-1">"{todayTasks[currentTaskIndex]?.content}"</h4>
                        </div>
                        {!feedback ? (
                            <form onSubmit={handleCheck} className="flex flex-col gap-3">
                                <textarea value={userAnswer} onChange={e => setUserAnswer(e.target.value)} placeholder="Your response..." className="w-full p-4 rounded-xl border bg-white/50 dark:bg-slate-950 dark:text-white" />
                                <button type="submit" disabled={isChecking || !userAnswer.trim()} className="bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2">{isChecking && <Loader2 className="animate-spin" />} Submit Answer</button>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-sm border border-emerald-100 whitespace-pre-wrap">{feedback}</div>
                                <button onClick={handleNext} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold">Next Challenge <ArrowRight className="inline" /></button>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SKILL_DATA.map(skill => (
                    <div key={skill.id} className={glassCard}>
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 w-fit rounded-lg mb-4">{skill.icon}</div>
                        <h4 className="font-bold mb-1">{skill.title}</h4>
                        <p className="text-xs text-slate-500 mb-4">{skill.description}</p>
                        <div className="flex flex-col gap-2">
                            {skill.resources.map((res, i) => (
                                <a key={i} href={res.url} target="_blank" className="text-xs text-emerald-600 hover:underline flex items-center gap-1"><ExternalLink size={10} /> {res.name}</a>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
            <ChatWidget />
        </div>
    );
};

export default Linguahub;
