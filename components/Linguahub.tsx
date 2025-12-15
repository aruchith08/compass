
import React, { useState, useEffect, useRef } from 'react';
import { 
    Headphones, BookOpen, PenTool, Mic, 
    Star, ArrowRight, Layers, CheckCircle2, 
    Loader2, PlayCircle, Volume2, 
    X, ExternalLink, MessageSquare, Send, AlertCircle, CalendarCheck, Globe
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { User } from '../types';

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

export interface DailySessionData {
    date: string;
    tasks: DailyChallenge[];
    currentIndex: number;
    isComplete: boolean;
}

// --- CONSTANTS ---

export const SKILL_DATA: SkillCategory[] = [
    {
        id: SkillType.LISTENING,
        title: 'Listening',
        description: 'Improve comprehension through podcasts and audio.',
        icon: <Headphones className="w-8 h-8 text-emerald-500" />,
        resources: [
        { name: 'British Council', url: 'https://learnenglish.britishcouncil.org/skills/listening' },
        { name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english' },
        { name: 'TED Talks (Education)', url: 'https://www.ted.com/topics/education' },
        { name: 'IELTS Liz', url: 'https://ieltsliz.com/ielts-listening/' },
        ],
    },
    {
        id: SkillType.READING,
        title: 'Reading',
        description: 'Enhance vocabulary and speed with diverse texts.',
        icon: <BookOpen className="w-8 h-8 text-blue-500" />,
        resources: [
        { name: 'British Council', url: 'https://learnenglish.britishcouncil.org/skills/reading' },
        { name: 'Breaking News English', url: 'https://breakingnewsenglish.com/' },
        { name: 'Project Gutenberg', url: 'https://www.gutenberg.org/' },
        { name: 'UsingEnglish Comprehension', url: 'https://www.usingenglish.com/comprehension/' },
        ],
    },
    {
        id: SkillType.WRITING,
        title: 'Writing',
        description: 'Practice structure, grammar, and style.',
        icon: <PenTool className="w-8 h-8 text-purple-500" />,
        resources: [
        { name: 'Cambridge Write & Improve', url: 'https://writeandimprove.com/' },
        { name: 'Purdue OWL', url: 'https://owl.purdue.edu/owl/purdue_owl.html' },
        { name: 'Hemingway Editor', url: 'https://hemingwayapp.com/' },
        { name: 'IELTS Buddy Writing', url: 'https://www.ieltsbuddy.com/ielts-writing.html' },
        ],
    },
    {
        id: SkillType.SPEAKING,
        title: 'Speaking',
        description: 'Build confidence in pronunciation and fluency.',
        icon: <Mic className="w-8 h-8 text-orange-500" />,
        resources: [
        { name: 'TalkEnglish', url: 'https://www.talkenglish.com/speaking/listbasics.aspx' },
        { name: 'Toastmasters Tips', url: 'https://www.toastmasters.org/resources/public-speaking-tips' },
        { name: 'IELTS Speaking Samples', url: 'https://ielts-up.com/speaking/ielts-speaking-samples.html' },
        ],
    },
];

export const SAMPLE_PAPERS: ResourceLink[] = [
    { name: 'IELTS Online Tests', url: 'https://ieltsonlinetests.com/' },
    { name: 'Exam English', url: 'https://www.examenglish.com/' },
    { name: 'Cambridge English Prep', url: 'https://www.cambridgeenglish.org/learning-english/exam-preparation/' },
];

// --- GEMINI SERVICE ---

let client: GoogleGenAI | null = null;
let chatSession: any | null = null;

const getApiKey = () => {
   
    return "sk-abcdef1234567890abcdef1234567890abcdef12"; 
}

const initializeClient = () => {
    const key = getApiKey();
    if (!client && key) {
        client = new GoogleGenAI({ apiKey: key });
    }
    return client;
};

const startChat = () => {
    const ai = initializeClient();
    if (!ai) return null;

    if (!chatSession) {
        chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
            systemInstruction: 'You are a helpful, encouraging, and knowledgeable language learning assistant named LinguaBot. Keep your answers concise and focused on helping the user learn English.',
            },
        });
    }
    return chatSession;
};

const sendMessageToGemini = async (message: string): Promise<string> => {
    const key = getApiKey();
    if (!key) {
        return "API configuration missing. Please ensure API_KEY is set.";
    }

    const session = startChat();
    if (!session) {
         return "Failed to initialize AI.";
    }

    try {
        const result = await session.sendMessage({ message });
        return result.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Failed to communicate with AI.";
    }
};

const evaluateChallenge = async (challenge: string, userAnswer: string, hiddenContext?: string): Promise<{text: string, score: number}> => {
    const ai = initializeClient();
    if (!ai) {
        return { text: "API Key missing.", score: 0 };
    }

    const contextStr = hiddenContext ? `\nContext (User did not see this text, but heard/read it): "${hiddenContext}"` : "";

    const prompt = `You are a strict but helpful English tutor.
    
    Task: Evaluate the student's answer.
    
    Challenge Question: "${challenge}"${contextStr}
    Student Answer: "${userAnswer}"
    
    Requirements:
    1. Give a score out of 10.
    2. Provide specific feedback on grammar, vocabulary, and accuracy.
    3. If the answer is wrong, provide the correction.
    
    Output Format (Strictly follow this):
    Score: [0-10]/10
    Feedback: [Your feedback here]`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        
        const responseText = response.text || "No response generated.";
        
        // Parse score
        const scoreMatch = responseText.match(/Score:\s*(\d+(\.\d+)?)\/10/i);
        const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;
        
        return { text: responseText, score };
    } catch (error) {
        console.error("Evaluation Error:", error);
        return { text: "Unable to verify answer at the moment.", score: 0 };
    }
};

const generateDailyChallenges = async (): Promise<DailyChallenge[]> => {
    const ai = initializeClient();
    if (!ai) {
         console.error("API Key missing");
         return [];
    }

    // Schema for 10 tasks
    const schema = {
        type: Type.ARRAY,
        items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['Grammar', 'Vocabulary', 'Idiom', 'Listening', 'Reading', 'Writing', 'Speaking'] },
            type: { type: Type.STRING, description: 'Short label like "Word of the Day"' },
            content: { type: Type.STRING, description: 'The question or task instruction' },
            requiresInput: { type: Type.BOOLEAN },
            hiddenContent: { type: Type.STRING, description: 'Optional text for listening/reading tasks that user does not see immediately' },
        },
        required: ['id', 'category', 'type', 'content', 'requiresInput'],
        }
    };

    const prompt = `Generate 10 unique, diverse, and engaging English language learning challenges for a daily practice session.
    
    Mix the categories: 
    - Vocabulary (e.g., obscure words, synonyms)
    - Grammar (e.g., error correction)
    - Idioms (e.g., define or use in sentence)
    - Listening (provide a short transcript in hiddenContent for the user to "hear" via TTS)
    - Speaking (pronunciation or description tasks)
    
    Make them fun and varied. Ensure the content is suitable for intermediate learners.`;

    try {
        const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: schema
        }
        });

        const jsonText = response.text || "[]";
        const tasks = JSON.parse(jsonText);
        return tasks;
    } catch (error) {
        console.error("Failed to generate daily tasks:", error);
        return [];
    }
};

// --- SUB-COMPONENTS ---

const SkillModal = ({ isOpen, onClose, skill }: { isOpen: boolean, onClose: () => void, skill: SkillCategory | null }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        };
        
        if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        }

        return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !skill) return null;

    return (
        <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in"
        onClick={(e) => {
             if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                 onClose();
             }
        }}
        >
        <div 
            ref={modalRef}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-slate-200 dark:border-slate-800"
        >
            <div className="bg-emerald-600 dark:bg-slate-950 p-6 flex justify-between items-center text-white border-b border-white/10 dark:border-slate-800">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                {skill.icon}
                </div>
                <h2 className="text-xl font-bold">{skill.title} Resources</h2>
            </div>
            <button 
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
                <X size={24} />
            </button>
            </div>

            <div className="p-6 space-y-4">
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                Select a trusted source to practice your {skill.title.toLowerCase()} skills:
            </p>
            <div className="grid gap-3">
                {skill.resources.map((res, index) => (
                <a
                    key={index}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent hover:bg-emerald-50 dark:hover:bg-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all group"
                >
                    <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {res.name}
                    </span>
                    <ExternalLink size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400" />
                </a>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Hi! I'm LinguaBot. Ask me anything about English grammar, vocabulary, or learning tips!" }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
        const response = await sendMessageToGemini(userMsg);
        setMessages(prev => [...prev, { role: 'model', text: response }]);
        } catch (error) {
        setMessages(prev => [...prev, { 
            role: 'model', 
            text: "Connection error. Please check configuration.",
            isError: true 
        }]);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-24 lg:bottom-6 right-6 z-40 flex flex-col items-end">
        {isOpen && (
            <div className="mb-4 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-[500px] transition-all animate-fade-in">
            {/* Header */}
            <div className="bg-emerald-600 dark:bg-slate-950 text-white p-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                <h3 className="font-semibold">Ask AI Assistant</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition">
                <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
                {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : msg.isError 
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800 rounded-bl-none'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-bl-none'
                    }`}
                    >
                    {msg.isError && <AlertCircle size={16} className="inline mr-1 mb-0.5" />}
                    {msg.text}
                    </div>
                </div>
                ))}
                {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-700">
                    <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                    </div>
                </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 dark:text-white border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder-slate-400"
                />
                <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                <Send size={18} />
                </button>
            </form>
            </div>
        )}

        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-2 bg-emerald-600 text-white px-5 py-4 rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all duration-300"
        >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            {!isOpen && <span className="font-medium hidden sm:inline">Ask AI</span>}
        </button>
        </div>
    );
};

// --- MAIN LINGUAHUB COMPONENT ---

const Linguahub: React.FC<{ user: User | null }> = ({ user }) => {
    const [selectedSkill, setSelectedSkill] = useState<SkillCategory | null>(null);
    
    // Daily Session State
    const [todayTasks, setTodayTasks] = useState<DailyChallenge[]>([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [isSessionComplete, setIsSessionComplete] = useState(false);
    const [isLoadingTasks, setIsLoadingTasks] = useState(true);

    // Interaction State
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [lastScore, setLastScore] = useState<number | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    // Load Session Logic
    useEffect(() => {
        if (!user) return;

        const loadDailySession = async () => {
            const today = new Date().toDateString();
            const username = user.username;
            const storageKey = `lingua_session_${username}_${today}`;
            
            const savedData = localStorage.getItem(storageKey);

            if (savedData) {
                // Load existing session for today
                const session = JSON.parse(savedData);
                setTodayTasks(session.tasks);
                setCurrentTaskIndex(session.currentIndex);
                setIsSessionComplete(session.isComplete);
                setIsLoadingTasks(false);
            } else {
                // Generate new session for today
                setIsLoadingTasks(true);
                try {
                    const newTasks = await generateDailyChallenges();
                    if (newTasks && newTasks.length > 0) {
                        const newSession = {
                            date: today,
                            tasks: newTasks,
                            currentIndex: 0,
                            isComplete: false
                        };
                        localStorage.setItem(storageKey, JSON.stringify(newSession));
                        setTodayTasks(newTasks);
                        setCurrentTaskIndex(0);
                        setIsSessionComplete(false);
                    } else {
                        setTodayTasks([]);
                    }
                } catch (error) {
                    console.error("Error init tasks", error);
                } finally {
                    setIsLoadingTasks(false);
                }
            }
        };

        loadDailySession();
    }, [user]);

    // Persist Progress
    const updateSessionProgress = (newIndex: number, complete: boolean) => {
        if (!user) return;
        const today = new Date().toDateString();
        const storageKey = `lingua_session_${user.username}_${today}`;

        const updatedSession = {
            date: today,
            tasks: todayTasks,
            currentIndex: newIndex,
            isComplete: complete
        };
        localStorage.setItem(storageKey, JSON.stringify(updatedSession));
        
        setCurrentTaskIndex(newIndex);
        setIsSessionComplete(complete);
    };

    const handleCheckAnswer = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentTask = todayTasks[currentTaskIndex];
        if (!currentTask || !userAnswer.trim()) return;

        setIsChecking(true);
        try {
            const result = await evaluateChallenge(currentTask.content, userAnswer, currentTask.hiddenContent);
            setFeedback(result.text);
            setLastScore(result.score);
        } catch (error) {
            setFeedback("Sorry, I couldn't check your answer right now. Please try again.");
        } finally {
            setIsChecking(false);
        }
    };

    const handleNextTask = () => {
        setUserAnswer('');
        setFeedback(null);
        setLastScore(null);
        
        if (currentTaskIndex < todayTasks.length - 1) {
            updateSessionProgress(currentTaskIndex + 1, false);
        } else {
            updateSessionProgress(currentTaskIndex, true);
        }
    };

    const playTextToSpeech = (text: string) => {
        if (!window.speechSynthesis) return;
        if (isPlayingAudio) {
            window.speechSynthesis.cancel();
            setIsPlayingAudio(false);
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingAudio(false);
        setIsPlayingAudio(true);
        window.speechSynthesis.speak(utterance);
    };

    const currentTask = todayTasks[currentTaskIndex];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Globe className="text-emerald-500" />
                    Lingua<span className="text-emerald-600 dark:text-emerald-400">Hub</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400">Your AI-powered English language assistant.</p>
                </div>
            </div>

            {/* Section: Daily AI Tasks */}
            <section className="animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Star className="text-amber-500 fill-amber-500" size={20} />
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm">Daily AI Session</h2>
                </div>
                {!isLoadingTasks && !isSessionComplete && (
                    <div className="text-sm font-medium px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300">
                    Question {currentTaskIndex + 1} of {todayTasks.length}
                    </div>
                )}
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-8 shadow-sm transition-all min-h-[300px] flex flex-col justify-center relative">
                
                {isLoadingTasks ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4 text-slate-500">
                        <Loader2 size={40} className="animate-spin text-emerald-500" />
                        <p className="animate-pulse">Consulting AI for today's curriculum...</p>
                    </div>
                ) : isSessionComplete ? (
                    <div className="flex flex-col items-center justify-center py-8 md:py-12 gap-6 text-center animate-in zoom-in duration-300">
                        <div className="bg-emerald-100 dark:bg-emerald-900/50 p-6 rounded-full">
                            <CalendarCheck size={64} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">All Done For Today!</h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                Great job completing your daily challenges. Come back tomorrow for a brand new set of AI-generated tasks tailored for you.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 w-full">
                    <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-auto md:min-w-[80px]">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 md:p-4 rounded-full shrink-0">
                        <Star size={24} className="md:w-8 md:h-8 text-amber-500" />
                    </div>
                    <div className="flex-1 md:text-center">
                            <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">Type</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base">{currentTask?.category}</span>
                    </div>
                    {currentTask?.category === 'Listening' && <Volume2 size={20} className="text-slate-400" />}
                    {currentTask?.category === 'Speaking' && <Mic size={20} className="text-slate-400" />}
                    </div>
                    
                    <div className="flex-1 w-full space-y-4">
                    <div>
                        <span className="inline-block px-2 py-0.5 mb-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-xs font-medium uppercase">
                            {currentTask?.type}
                        </span>
                        <h3 className="text-lg md:text-2xl font-serif text-slate-800 dark:text-slate-100 italic leading-relaxed">
                            "{currentTask?.content}"
                        </h3>
                    </div>
                    
                    {/* Audio Controls */}
                    {currentTask?.category === 'Listening' && currentTask.hiddenContent && (
                        <button 
                            onClick={() => currentTask.hiddenContent && playTextToSpeech(currentTask.hiddenContent)}
                            className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                                isPlayingAudio 
                                ? 'bg-amber-100 text-amber-700 animate-pulse' 
                                : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200'
                            }`}
                        >
                            {isPlayingAudio ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
                            {isPlayingAudio ? 'Playing Audio...' : 'Play Audio Clip'}
                        </button>
                    )}

                    {/* Interaction Area */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mt-4">
                        {!feedback ? (
                            <form onSubmit={handleCheckAnswer} className="flex flex-col gap-3">
                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    {currentTask?.category === 'Speaking' ? 'Transcription (What you said):' : 'Your Answer:'}
                                </label>
                                {currentTask?.requiresInput ? (
                                    <div className="flex flex-col gap-3">
                                        <textarea 
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            placeholder="Type your response here..."
                                            className="w-full px-4 py-3 min-h-[100px] border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-y text-base"
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={isChecking || !userAnswer.trim()}
                                            className="w-full md:w-auto self-end bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            {isChecking ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                                            Check Answer
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={handleNextTask}
                                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg w-full"
                                    >
                                        Mark as Done & Continue
                                    </button>
                                )}
                            </form>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className={`p-4 rounded-lg border text-sm leading-relaxed mb-4 ${
                                    (lastScore && lastScore >= 7) 
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
                                    : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-slate-800 dark:text-amber-100'
                                }`}>
                                    <div className="flex items-center justify-between gap-2 mb-2 border-b border-black/5 dark:border-white/5 pb-2">
                                        <strong className="font-semibold flex items-center gap-1">
                                            AI Feedback
                                        </strong>
                                        {lastScore !== null && (
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                lastScore >= 7 ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                                            }`}>
                                                Score: {lastScore}/10
                                            </span>
                                        )}
                                    </div>
                                    <div className="whitespace-pre-wrap text-base">{feedback}</div>
                                </div>
                                <button 
                                    onClick={handleNextTask}
                                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    Next Task <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
                )}
                </div>
            </section>

            {/* Section: Core Skills */}
            <section>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                    <Layers className="text-emerald-600 dark:text-emerald-500" size={20} />
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm">Core Skills</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {SKILL_DATA.map((skill) => (
                    <button
                        key={skill.id}
                        onClick={() => setSelectedSkill(skill)}
                        className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-300 text-left group h-full flex flex-col active:scale-95"
                    >
                        <div className="mb-4 bg-slate-50 dark:bg-slate-800 w-fit p-3 rounded-xl group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                        {React.cloneElement(skill.icon as React.ReactElement<any>, {
                            className: "w-8 h-8 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                        })}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {skill.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-grow">
                        {skill.description}
                        </p>
                        <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium mt-auto">
                        Start Practice <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                    ))}
                </div>
            </section>

            {/* Section: Practice Papers */}
            <section className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Mock Tests & Sample Papers</h2>
                    <p className="text-slate-300 dark:text-slate-400 mb-6 max-w-xl text-sm md:text-base">
                    Simulate exam conditions with free full-length tests from top providers.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                    {SAMPLE_PAPERS.map((paper, idx) => (
                        <a
                        key={idx}
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-slate-900 hover:border-white px-4 py-3 md:px-5 md:py-4 rounded-xl transition-all font-medium flex items-center justify-between group text-sm md:text-base"
                        >
                        {paper.name}
                        <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                    </div>
                </div>
            </section>

            <SkillModal 
                isOpen={!!selectedSkill} 
                onClose={() => setSelectedSkill(null)} 
                skill={selectedSkill} 
            />

            <ChatWidget />
        </div>
    );
};

export default Linguahub;
