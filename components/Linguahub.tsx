
import React, { useState, useEffect, useRef } from 'react';
import { 
    Headphones, BookOpen, PenTool, Mic, 
    Star, ArrowRight, Layers, CheckCircle2, 
    Loader2, PlayCircle, Volume2, 
    X, ExternalLink, MessageSquare, Send, AlertCircle, CalendarCheck, Globe, Sparkles
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

export interface VocabularyWord {
    word: string;
    phonetic: string;
    partOfSpeech: string;
    definition: string;
    example: string;
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
        title: 'IELTS Listening',
        description: 'Practice comprehension with varied accents and contexts.',
        icon: <Headphones className="w-8 h-8 text-emerald-500" />,
        resources: [
        { name: 'British Council Listening', url: 'https://learnenglish.britishcouncil.org/skills/listening' },
        { name: 'IELTS Liz Listening', url: 'https://ieltsliz.com/ielts-listening/' },
        { name: 'TED Talks (Education)', url: 'https://www.ted.com/topics/education' },
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
        { name: 'Project Gutenberg', url: 'https://www.gutenberg.org/' },
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
        { name: 'Purdue OWL', url: 'https://owl.purdue.edu/owl/purdue_owl.html' },
        { name: 'Hemingway Editor', url: 'https://hemingwayapp.com/' },
        ],
    },
    {
        id: SkillType.SPEAKING,
        title: 'IELTS Speaking',
        description: 'Fluency, pronunciation, and cue card topics.',
        icon: <Mic className="w-8 h-8 text-orange-500" />,
        resources: [
        { name: 'IELTS Liz Speaking', url: 'https://ieltsliz.com/ielts-speaking-free-lessons-essential-tips/' },
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

// --- GEMINI SERVICE ---

let client: GoogleGenAI | null = null;
let chatSession: any | null = null;

const getApiKey = () => {
    return "AIzaSyCsrwyWyYdquFKvekzJId5_ab9jW9PPvKM"; 
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
            systemInstruction: 'You are an expert IELTS Tutor named LinguaBot. Your goal is to help students achieve Band 7.0+. Keep answers concise, professional, and focused on IELTS marking criteria (Lexical Resource, Grammatical Range, Coherence, Fluency).',
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

    const contextStr = hiddenContext ? `\nContext (Transcript/Passage): "${hiddenContext}"` : "";

    const prompt = `You are a certified IELTS Examiner.
    
    Task: Evaluate the candidate's response to the following IELTS practice task.
    
    Task Type: "${challenge}"${contextStr}
    Candidate Response: "${userAnswer}"
    
    Requirements:
    1. Assign a Band Score (0.0 - 9.0) based on strict IELTS criteria.
    2. For Speaking/Writing: Assess Lexical Resource, Grammatical Range, Coherence, and Task Response.
    3. For Listening/Reading: Check factual accuracy against the context.
    4. Provide specific corrections and tips to improve the band score.
    
    Output Format (Strictly follow this):
    Score: [Band Score]/9
    Feedback: [Detailed feedback]`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        
        const responseText = response.text || "No response generated.";
        
        // Parse score (Band 0-9)
        const scoreMatch = responseText.match(/Score:\s*(\d+(\.\d+)?)\/9/i);
        const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;
        
        return { text: responseText, score };
    } catch (error) {
        console.error("Evaluation Error:", error);
        return { text: "Unable to verify answer at the moment.", score: 0 };
    }
};

const generateVocabularyWord = async (): Promise<VocabularyWord | null> => {
    const ai = initializeClient();
    if (!ai) return null;

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

    const prompt = `Generate a random, sophisticated English vocabulary word suitable for IELTS Band 8/9.
    Examples of complexity: 'Ubiquitous', 'Ephemeral', 'Cacophony', 'Serendipity', 'Obfuscate', 'Mellifluous', 'Esoteric'.
    
    Return a JSON object with:
    - word: The word itself.
    - phonetic: IPA pronunciation guide.
    - partOfSpeech: e.g., Adjective, Noun, Verb.
    - definition: Clear, academic definition.
    - example: A sentence demonstrating its usage in a high-level context.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
                temperature: 1.2
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (error) {
        console.error("Vocab generation failed:", error);
        return null;
    }
};

const checkVocabularyUsage = async (word: string, sentence: string): Promise<string> => {
    const ai = initializeClient();
    if (!ai) return "Unable to check.";
    
    const prompt = `Evaluate the usage of the word "${word}" in the following sentence:
    "${sentence}"
    
    Is it used correctly grammatically and contextually?
    Respond with a short, helpful feedback message (max 2 sentences). If correct, praise the usage.`;
    
    try {
        const response = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: prompt
        });
        return response.text || "No feedback generated.";
    } catch (e) {
        return "Error checking sentence.";
    }
};

const generateDailyChallenges = async (): Promise<DailyChallenge[]> => {
    const ai = initializeClient();
    if (!ai) {
         console.error("API Key missing");
         return [];
    }

    // Schema for tasks
    const schema = {
        type: Type.ARRAY,
        items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['Grammar', 'Vocabulary', 'Idiom', 'Listening', 'Reading', 'Writing', 'Speaking'] },
            type: { type: Type.STRING, description: 'Short label like "IELTS Task 2" or "Reading Detail"' },
            content: { type: Type.STRING, description: 'The question or task instruction' },
            requiresInput: { type: Type.BOOLEAN },
            hiddenContent: { type: Type.STRING, description: 'Text for reading passages or listening transcripts' },
        },
        required: ['id', 'category', 'type', 'content', 'requiresInput'],
        }
    };

    const prompt = `Generate 5 high-quality, exam-style IELTS preparation challenges.
    
    Strictly generate one task for each of these categories: 
    1. 'Listening': Provide a realistic IELTS audio script (approx 60-100 words) about a university conversation or news report in 'hiddenContent'. The 'content' must be a specific comprehension question based on that script (e.g. "What time does the library close?").
    2. 'Reading': Provide a dense academic paragraph (approx 100-150 words) in 'hiddenContent'. The 'content' must be a "True/False/Not Given" question or a specific detail question based on the text.
    3. 'Speaking': Provide an IELTS Part 2 Cue Card topic or Part 3 abstract discussion question in 'content'.
    4. 'Writing': Provide an IELTS Task 2 Essay prompt (Argumentative/Problem-Solution) in 'content'.
    5. 'Grammar': Provide a sentence with a grammatical error and ask the user to correct it in 'content'.

    Ensure the difficulty matches IELTS Band 7.0-8.0.`;

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
                <h2 className="text-xl font-bold">{skill.title}</h2>
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
        { role: 'model', text: "Hello! I'm LinguaBot, your IELTS Tutor. I can help with grammar, vocabulary, or simulate a speaking test. How can I help you today?" }
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
                <h3 className="font-semibold">IELTS AI Tutor</h3>
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
                placeholder="Ask about IELTS..."
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

    // Vocab State
    const [vocabWord, setVocabWord] = useState<VocabularyWord | null>(null);
    const [vocabInput, setVocabInput] = useState('');
    const [vocabFeedback, setVocabFeedback] = useState<string | null>(null);
    const [isVocabLoading, setIsVocabLoading] = useState(true);
    const [isVocabChecking, setIsVocabChecking] = useState(false);

    // Interaction State
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);
    const [lastScore, setLastScore] = useState<number | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    // Load Data
    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            const today = new Date().toDateString();
            const username = user.username;
            const sessionKey = `lingua_session_${username}_${today}`;
            const vocabKey = `lingua_vocab_${username}_${today}`;
            
            // Load Vocab
            const savedVocab = localStorage.getItem(vocabKey);
            if (savedVocab) {
                setVocabWord(JSON.parse(savedVocab));
                setIsVocabLoading(false);
            } else {
                setIsVocabLoading(true);
                const word = await generateVocabularyWord();
                if(word) {
                    localStorage.setItem(vocabKey, JSON.stringify(word));
                    setVocabWord(word);
                }
                setIsVocabLoading(false);
            }

            // Load Daily Challenges
            const savedSession = localStorage.getItem(sessionKey);
            let sessionLoaded = false;

            if (savedSession) {
                try {
                    const session = JSON.parse(savedSession);
                    // Check if tasks exist and are not empty
                    if (session.tasks && Array.isArray(session.tasks) && session.tasks.length > 0) {
                        setTodayTasks(session.tasks);
                        setCurrentTaskIndex(session.currentIndex);
                        setIsSessionComplete(session.isComplete);
                        setIsLoadingTasks(false);
                        sessionLoaded = true;
                    }
                } catch (e) {
                    console.error("Error parsing saved session", e);
                }
            }
            
            if (!sessionLoaded) {
                setIsLoadingTasks(true);
                const newTasks = await generateDailyChallenges();
                if (newTasks && newTasks.length > 0) {
                    const newSession = {
                        date: today,
                        tasks: newTasks,
                        currentIndex: 0,
                        isComplete: false
                    };
                    localStorage.setItem(sessionKey, JSON.stringify(newSession));
                    setTodayTasks(newTasks);
                    setCurrentTaskIndex(0);
                    setIsSessionComplete(false);
                } else {
                    setTodayTasks([]);
                }
                setIsLoadingTasks(false);
            }
        };

        loadData();
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

    const handleCheckVocab = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!vocabWord || !vocabInput.trim()) return;

        setIsVocabChecking(true);
        const result = await checkVocabularyUsage(vocabWord.word, vocabInput);
        setVocabFeedback(result);
        setIsVocabChecking(false);
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
                <p className="text-slate-500 dark:text-slate-400">Your IELTS AI Training Partner.</p>
                </div>
            </div>

            {/* Section: Vocabulary Builder */}
            <section className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-purple-500" size={20} />
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm">Word of the Day</h2>
                </div>
                
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm relative overflow-hidden min-h-[250px] flex flex-col justify-center">
                    {isVocabLoading ? (
                        <div className="flex flex-col items-center justify-center py-8 gap-4 text-slate-500">
                             <Loader2 size={32} className="animate-spin text-purple-500" />
                             <p>Curating today's advanced vocabulary...</p>
                        </div>
                    ) : vocabWord ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                <div>
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white">{vocabWord.word}</h3>
                                        <span className="text-slate-500 font-mono text-sm">/{vocabWord.phonetic}/</span>
                                        <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase">{vocabWord.partOfSpeech}</span>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 mt-2 text-lg leading-relaxed">{vocabWord.definition}</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border-l-4 border-purple-500">
                                    <p className="italic text-slate-600 dark:text-slate-400 font-serif text-lg">"{vocabWord.example}"</p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col">
                                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                                    <PenTool size={16} /> Try it yourself
                                </h4>
                                {!vocabFeedback ? (
                                    <form onSubmit={handleCheckVocab} className="flex flex-col gap-3 flex-1">
                                        <textarea
                                            value={vocabInput}
                                            onChange={(e) => setVocabInput(e.target.value)}
                                            placeholder={`Write a sentence using "${vocabWord.word}"...`}
                                            className="w-full p-3 text-sm border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none h-24"
                                        />
                                        <button 
                                            type="submit"
                                            disabled={isVocabChecking || !vocabInput.trim()}
                                            className="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isVocabChecking ? <Loader2 size={16} className="animate-spin" /> : "Check Usage"}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-2">
                                        <div className="flex-1 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 mb-3 overflow-y-auto max-h-[120px]">
                                            {vocabFeedback}
                                        </div>
                                        <button 
                                            onClick={() => {
                                                setVocabFeedback(null);
                                                setVocabInput('');
                                            }}
                                            className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Try Another Sentence
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-red-400">Failed to load vocabulary word.</div>
                    )}
                </div>
            </section>

            {/* Section: Daily AI Tasks */}
            <section className="animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Star className="text-amber-500 fill-amber-500" size={20} />
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm">Daily IELTS Challenges</h2>
                </div>
                {!isLoadingTasks && !isSessionComplete && todayTasks.length > 0 && (
                    <div className="text-sm font-medium px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300">
                    Question {currentTaskIndex + 1} of {todayTasks.length}
                    </div>
                )}
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:p-8 shadow-sm transition-all min-h-[300px] flex flex-col justify-center relative">
                
                {isLoadingTasks ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4 text-slate-500">
                        <Loader2 size={40} className="animate-spin text-emerald-500" />
                        <p className="animate-pulse">Consulting AI for today's IELTS tasks...</p>
                    </div>
                ) : isSessionComplete ? (
                    <div className="flex flex-col items-center justify-center py-8 md:py-12 gap-6 text-center animate-in zoom-in duration-300">
                        <div className="bg-emerald-100 dark:bg-emerald-900/50 p-6 rounded-full">
                            <CalendarCheck size={64} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">All Done For Today!</h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                Great job completing your daily IELTS challenges. Come back tomorrow for a new set of tasks.
                            </p>
                        </div>
                    </div>
                ) : todayTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                        <AlertCircle size={48} className="mb-4 text-red-400" />
                        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Unable to generate tasks</h3>
                        <p className="mb-6 max-w-xs mx-auto">There was an issue connecting to the AI tutor. Please check your connection.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-emerald-900/20"
                        >
                            Retry Connection
                        </button>
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
                    
                    {/* Text Display for Reading */}
                    {currentTask?.category === 'Reading' && currentTask.hiddenContent && (
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border-l-4 border-blue-500 mb-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                                <BookOpen size={16} />
                                <span className="text-xs font-bold uppercase">Reading Passage</span>
                            </div>
                            <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-serif whitespace-pre-line">
                                {currentTask.hiddenContent}
                            </p>
                        </div>
                    )}
                    
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
                                            Examiner Feedback
                                        </strong>
                                        {lastScore !== null && (
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                lastScore >= 7 ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                                            }`}>
                                                Band: {lastScore}/9
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
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-sm">IELTS Skills Resources</h2>
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
                        View Resources <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
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
