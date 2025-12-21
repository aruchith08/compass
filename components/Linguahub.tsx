
import React, { useState, useEffect, useRef } from "react";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Star,
  ArrowRight,
  Layers,
  CheckCircle2,
  Loader2,
  PlayCircle,
  Volume2,
  X,
  ExternalLink,
  MessageSquare,
  Send,
  AlertCircle,
  CalendarCheck,
  Languages,
  Sparkles,
  SpellCheck,
  Zap,
  RefreshCw
} from "lucide-react";
import { Type } from "@google/genai";
import { User, SkillType, DailyChallenge, LinguaSession, ChallengeCategory } from "../types";
import { runGenAI } from "../services/ai";
import { useRoadmap } from "../RoadmapContext";

// --- TYPES ---

export interface ResourceLink {
  name: string;
  url: string;
}

export interface SkillCategory {
  id: SkillType;
  title: string;
  description: string;
  icon: React.ReactNode;
  resources: ResourceLink[];
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  isError?: boolean;
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
    if (cleaned.includes("```")) {
      const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (match) {
        cleaned = match[0];
      }
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
    title: "IELTS Listening",
    description: "Practice comprehension with varied accents and contexts.",
    icon: <Headphones className="w-6 h-6 md:w-8 md:h-8" />,
    resources: [
      { name: "British Council Listening", url: "https://learnenglish.britishcouncil.org/skills/listening" },
      { name: "IELTS Liz Listening", url: "https://ieltsliz.com/ielts-listening/" },
      { name: "TED Talks (Education)", url: "https://www.ted.com/topics/education" },
      { name: "BBC 6 Minute English", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english" },
    ],
  },
  {
    id: SkillType.READING,
    title: "IELTS Reading",
    description: "Academic texts, skimming, scanning, and detail questions.",
    icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8" />,
    resources: [
      { name: "British Council Reading", url: "https://learnenglish.britishcouncil.org/skills/reading" },
      { name: "IELTS Buddy Reading", url: "https://www.ieltsbuddy.com/ielts-reading.html" },
      { name: "Breaking News English", url: "https://breakingnewsenglish.com/" },
      { name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
    ],
  },
  {
    id: SkillType.WRITING,
    title: "IELTS Writing",
    description: "Task 1 (Charts/Letters) and Task 2 (Essays).",
    icon: <PenTool className="w-6 h-6 md:w-8 md:h-8" />,
    resources: [
      { name: "IELTS Liz Writing", url: "https://ieltsliz.com/ielts-writing-task-1-and-task-2/" },
      { name: "Cambridge Write & Improve", url: "https://writeandimprove.com/" },
      { name: "Purdue OWL", url: "https://owl.purdue.edu/owl/purdue_owl.html" },
      { name: "Hemingway Editor", url: "https://hemingwayapp.com/" },
    ],
  },
  {
    id: SkillType.SPEAKING,
    title: "IELTS Speaking",
    description: "Fluency, pronunciation, and cue card topics.",
    icon: <Mic className="w-6 h-6 md:w-8 md:h-8" />,
    resources: [
      { name: "IELTS Liz Speaking", url: "https://ieltsliz.com/ielts-speaking-free-lessons-essential-tips/" },
      { name: "IELTS Speaking Samples", url: "https://ielts-up.com/speaking/ielts-speaking-samples.html" },
      { name: "TalkEnglish", url: "https://www.talkenglish.com/speaking/listbasics.aspx" },
    ],
  },
];

export const SAMPLE_PAPERS: ResourceLink[] = [
  { name: "IELTS Online Tests", url: "https://ieltsonlinetests.com/" },
  { name: "Exam English", url: "https://www.examenglish.com/" },
  { name: "Cambridge English Prep", url: "https://www.cambridgeenglish.org/learning-english/exam-preparation/" },
];

// --- AI OPERATIONS ---

const sendMessageToGemini = async (message: string, history: ChatMessage[]): Promise<string> => {
  return runGenAI(async (ai) => {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are an expert IELTS Tutor named LinguaBot. Your goal is to help students achieve Band 7.0+. Keep answers concise, professional, and focused on IELTS marking criteria.",
      },
    });
    const response = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response.";
  });
};

const evaluateChallenge = async (challenge: string, userAnswer: string, hiddenContext?: string) => {
  return runGenAI(async (ai) => {
    const contextStr = hiddenContext ? `\nContext: "${hiddenContext}"` : "";
    const prompt = `You are a certified IELTS Examiner. Task: Evaluate the candidate's response. Task: "${challenge}"${contextStr} Candidate Answer: "${userAnswer}". Return Band Score and detailed feedback. Format exactly like this: Score: [X]/9 Feedback: [Your text]`;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const text = response.text || "";
    const scoreMatch = text.match(/Score:\s*(\d+(\.\d+)?)\/9/i);
    return { text, score: scoreMatch ? parseFloat(scoreMatch[1]) : 0 };
  });
};

const generateVocabularyWord = async (): Promise<VocabularyWord | null> => {
  return runGenAI(async (ai) => {
    const schema = {
      type: Type.OBJECT,
      properties: {
        word: { type: Type.STRING },
        phonetic: { type: Type.STRING },
        partOfSpeech: { type: Type.STRING },
        definition: { type: Type.STRING },
        example: { type: Type.STRING },
      },
      required: ["word", "phonetic", "partOfSpeech", "definition", "example"],
    };
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: "Generate a random, sophisticated English vocabulary word suitable for IELTS Band 8/9." }] }],
      config: { responseMimeType: "application/json", responseSchema: schema } as any,
    });
    return parseAIJSON(response.text);
  });
};

const checkVocabularyUsage = async (word: string, sentence: string): Promise<string> => {
  return runGenAI(async (ai) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: `Evaluate the usage of the word "${word}" in this sentence: "${sentence}". Max 2 sentences feedback.` }] }],
    });
    return response.text || "No feedback generated.";
  });
};

const generateDailyChallenges = async (): Promise<DailyChallenge[]> => {
  return runGenAI(async (ai) => {
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
        required: ["id", "category", "type", "content", "requiresInput"],
      },
    };
    const prompt = "Generate exactly 5 high-quality, exam-style IELTS preparation challenges. One each for Listening, Reading, Speaking, Writing, and Grammar. Band 7.0-8.0 difficulty.";
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json", responseSchema: schema } as any,
    });
    return parseAIJSON(response.text) || [];
  });
};

// --- SUB-COMPONENTS ---

const SkillModal = ({ isOpen, onClose, skill }: { isOpen: boolean; onClose: () => void; skill: SkillCategory | null }) => {
  if (!isOpen || !skill) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
        <div className="bg-emerald-600 dark:bg-slate-950 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">{skill.icon}</div>
            <h2 className="text-xl font-bold">{skill.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={24} /></button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-slate-600 dark:text-slate-300 text-sm">Select a trusted source to practice {skill.title.toLowerCase()}:</p>
          <div className="grid gap-3">
            {skill.resources.map((res, index) => (
              <a key={index} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent hover:bg-emerald-50 dark:hover:bg-slate-800 hover:border-emerald-500 transition-all group">
                <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">{res.name}</span>
                <ExternalLink size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
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
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "model", text: "Hello! I'm LinguaBot, your IELTS Tutor. Ask me anything about grammar, vocabulary, or the test format." }]);
  const endRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { if (isOpen) endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setIsLoading(true);
    try {
      const response = await sendMessageToGemini(msg, messages);
      setMessages(prev => [...prev, { role: "model", text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", text: "I'm having trouble connecting right now. Please try again later.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col h-[500px] animate-fade-in">
          <div className="bg-emerald-600 dark:bg-slate-950 p-4 flex justify-between items-center text-white">
            <h3 className="font-semibold">IELTS AI Tutor</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === "user" ? "bg-emerald-600 text-white" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-100 dark:border-slate-700"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <Loader2 className="animate-spin text-emerald-500 mx-auto" />}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 dark:border-white/10 flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about IELTS..." className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 text-sm outline-none" />
            <button type="submit" disabled={isLoading || !input.trim()} className="bg-emerald-600 text-white p-2 rounded-xl"><Send size={18} /></button>
          </form>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="group flex items-center gap-2 bg-emerald-600 text-white px-5 py-4 rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all">
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="font-medium hidden sm:inline">Ask AI</span>}
      </button>
    </div>
  );
};

// --- MAIN COMPONENT ---

const Linguahub: React.FC<{ user: User | null }> = ({ user }) => {
  const { linguaSession, updateLinguaSession } = useRoadmap();
  const [selectedSkill, setSelectedSkill] = useState<SkillCategory | null>(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [vocabWord, setVocabWord] = useState<VocabularyWord | null>(null);
  const [vocabInput, setVocabInput] = useState("");
  const [vocabFeedback, setVocabFeedback] = useState<string | null>(null);
  const [isVocabLoading, setIsVocabLoading] = useState(true);
  const [isVocabChecking, setIsVocabChecking] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const todayStr = new Date().toDateString();

  useEffect(() => {
    if (!user) return;
    const loadSession = async () => {
      // Sync Vocabulary
      const vocabKey = `lingua_vocab_${user.username}_${todayStr}`;
      const savedVocab = localStorage.getItem(vocabKey);
      if (savedVocab) {
        setVocabWord(JSON.parse(savedVocab));
        setIsVocabLoading(false);
      } else {
        setIsVocabLoading(true);
        const word = await generateVocabularyWord();
        if (word) {
          localStorage.setItem(vocabKey, JSON.stringify(word));
          setVocabWord(word);
        }
        setIsVocabLoading(false);
      }

      // CLOUD SYNC: Only generate if cloud session is missing or date is old
      if (linguaSession && linguaSession.date === todayStr && linguaSession.tasks.length > 0) {
        setIsLoadingTasks(false);
      } else {
        setIsLoadingTasks(true);
        const tasks = await generateDailyChallenges();
        if (tasks.length > 0) {
          updateLinguaSession({ date: todayStr, tasks, currentIndex: 0, isComplete: false });
        }
        setIsLoadingTasks(false);
      }
    };
    loadSession();
  }, [user, linguaSession?.date]);

  const currentTask = linguaSession?.tasks[linguaSession.currentIndex] || null;

  const handleCheckAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTask || !userAnswer.trim()) return;
    setIsChecking(true);
    try {
      const result = await evaluateChallenge(currentTask.content, userAnswer, currentTask.hiddenContent);
      setFeedback(result.text);
      setLastScore(result.score);
    } catch (error) {
      setFeedback("Sorry, I couldn't evaluate that right now.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleCheckVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vocabWord || !vocabInput.trim() || isVocabChecking) return;
    setIsVocabChecking(true);
    try {
      const result = await checkVocabularyUsage(vocabWord.word, vocabInput);
      setVocabFeedback(result);
    } catch (error) {
      setVocabFeedback("Sorry, I couldn't evaluate your vocabulary usage.");
    } finally {
      setIsVocabChecking(false);
    }
  };

  const handleNextTask = () => {
    if (!linguaSession) return;
    setUserAnswer("");
    setFeedback(null);
    setLastScore(null);
    const nextIdx = linguaSession.currentIndex + 1;
    const complete = nextIdx >= linguaSession.tasks.length;
    updateLinguaSession({ ...linguaSession, currentIndex: complete ? linguaSession.currentIndex : nextIdx, isComplete: complete });
  };

  const playTextToSpeech = (text: string) => {
    if (!window.speechSynthesis) return;
    if (isPlayingAudio) { window.speechSynthesis.cancel(); setIsPlayingAudio(false); return; }
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.9;
    utt.onend = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utt);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Languages className="text-emerald-500" /> Lingua <span className="text-emerald-600 dark:text-emerald-400">Hub</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Your IELTS AI Training Partner.</p>
        </div>
      </div>

      {/* Word of the Day Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-purple-500" size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Word of the Day</h2>
        </div>
        <div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-md border border-slate-100 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden">
          {isVocabLoading ? (
            <div className="py-12 flex flex-col items-center gap-2 text-slate-400"><Loader2 className="animate-spin text-purple-500" /> <p className="text-xs">Finding advanced vocabulary...</p></div>
          ) : vocabWord && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-5xl font-serif font-bold text-slate-900 dark:text-white">{vocabWord.word}</h3>
                  <span className="text-slate-400 font-mono text-sm tracking-widest">// {vocabWord.phonetic} //</span>
                  <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-black uppercase tracking-widest">
                    {vocabWord.partOfSpeech}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed">{vocabWord.definition}</p>
                <div className="relative pl-6 py-2">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-200 dark:bg-purple-900/40 rounded-full" />
                  <p className="italic text-slate-500 dark:text-slate-400 font-serif text-xl leading-relaxed">"{vocabWord.example}"</p>
                </div>
              </div>
              <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-100 dark:border-white/5 flex flex-col shadow-inner">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <PenTool size={16} className="text-slate-500" /> Try it yourself
                </h4>
                {!vocabFeedback ? (
                  <form onSubmit={handleCheckVocab} className="flex flex-col gap-4 flex-1">
                    <textarea 
                      value={vocabInput} 
                      onChange={e => setVocabInput(e.target.value)} 
                      placeholder={`Write a sentence using "${vocabWord.word}"...`}
                      className="w-full p-4 text-sm border border-slate-200 dark:border-slate-700 rounded-2xl outline-none bg-white dark:bg-slate-950 text-slate-900 dark:text-white resize-none h-32 shadow-sm focus:ring-2 focus:ring-purple-500/20 transition-all" 
                    />
                    <button type="submit" disabled={isVocabChecking || !vocabInput.trim()} className="mt-auto w-full bg-purple-300 hover:bg-purple-400 text-purple-900 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 shadow-md active:scale-95">
                      {isVocabChecking ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Check Usage"}
                    </button>
                  </form>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="text-sm text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 mb-4 shadow-sm flex-1 leading-relaxed">{vocabFeedback}</div>
                    <button onClick={() => { setVocabFeedback(null); setVocabInput(""); }} className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Try Another</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Language Power-Ups */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-blue-500" size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Language Power-Ups</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="https://www.merriam-webster.com/games/spell-it" target="_blank" className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-5">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-2xl transition-transform group-hover:scale-105"><SpellCheck className="text-indigo-600 dark:text-indigo-400" size={32} /></div>
              <div><h3 className="font-bold text-slate-900 dark:text-white text-lg">Spelling Mastery (Games)</h3><p className="text-xs text-slate-500 mt-0.5">Practice your spelling with challenging word sets.</p></div>
            </div>
            <ArrowRight size={24} className="text-slate-200 group-hover:text-indigo-500 group-hover:translate-x-2 transition-all" />
          </a>
          <a href="https://www.merriam-webster.com/" target="_blank" className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-5">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl transition-transform group-hover:scale-105"><BookOpen className="text-blue-600 dark:text-blue-400" size={32} /></div>
              <div><h3 className="font-bold text-slate-900 dark:text-white text-lg">Advanced Dictionary</h3><p className="text-xs text-slate-500 mt-0.5">Look up advanced definitions and usage notes.</p></div>
            </div>
            <ArrowRight size={24} className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
          </a>
        </div>
      </section>

      {/* Daily Challenges (Cloud Synced) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="text-amber-500 fill-amber-500" size={18} />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Daily IELTS Challenges</h2>
          </div>
          {!isLoadingTasks && !linguaSession?.isComplete && (
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full tracking-widest uppercase">
              Question {linguaSession!.currentIndex + 1} of {linguaSession!.tasks.length}
            </span>
          )}
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative min-h-[400px] flex flex-col justify-center">
          {isLoadingTasks ? (
            <div className="flex flex-col items-center justify-center h-full py-12 gap-3">
              <Loader2 className="animate-spin text-emerald-500" size={32} />
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Generating Session...</p>
            </div>
          ) : linguaSession?.isComplete ? (
            <div className="text-center py-12 animate-fade-in">
               <div className="bg-emerald-50 dark:bg-emerald-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                 <CalendarCheck className="text-emerald-600 dark:text-emerald-400" size={48} />
               </div>
               <h3 className="text-3xl font-bold dark:text-white mb-2">Daily Mission Complete</h3>
               <p className="text-slate-500 text-base">You've cleared today's challenges. See you tomorrow!</p>
            </div>
          ) : currentTask && (
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-32 flex flex-col items-center gap-4 shrink-0">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-full shadow-inner"><Star className="text-amber-500" size={40} /></div>
                  <div className="text-center">
                    <span className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Type</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-lg">{currentTask.category}</span>
                  </div>
                  {currentTask.category === "Listening" && <Volume2 className="text-slate-300 animate-pulse" size={24} />}
               </div>
               <div className="flex-1 space-y-8">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg mb-4 inline-block tracking-widest">{currentTask.type}</span>
                    <h3 className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-100 leading-relaxed">"{currentTask.content}"</h3>
                  </div>
                  {currentTask.category === "Listening" && (
                    <button 
                      onClick={() => playTextToSpeech(currentTask.hiddenContent || "")} 
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 ${isPlayingAudio ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
                    >
                      <PlayCircle size={20} /> {isPlayingAudio ? "Playing Transcript..." : "Play Audio Clip"}
                    </button>
                  )}
                  
                  <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                    {!feedback ? (
                      <form onSubmit={handleCheckAnswer} className="space-y-5">
                        <div className="flex flex-col gap-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Answer</label>
                          <textarea 
                            value={userAnswer} 
                            onChange={e => setUserAnswer(e.target.value)} 
                            placeholder="Type your response here..." 
                            className="w-full h-40 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/10 rounded-3xl p-6 text-lg focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-inner resize-none" 
                          />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" disabled={isChecking || !userAnswer.trim()} className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20 active:scale-95">
                            {isChecking ? <Loader2 className="animate-spin" size={20} /> : "Check Answer"}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/50 p-6 md:p-8 rounded-[2rem] shadow-sm">
                          <div className="flex justify-between items-center border-b border-emerald-100 dark:border-emerald-900/40 pb-4 mb-6">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Examiner Evaluation</span>
                            <span className="bg-emerald-500 text-white px-5 py-1.5 rounded-full text-sm font-black shadow-lg shadow-emerald-500/30">BAND {lastScore}/9</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 text-lg whitespace-pre-wrap leading-relaxed font-medium">{feedback}</p>
                        </div>
                        <button onClick={handleNextTask} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-[0.98] shadow-xl">
                          Next Question <ArrowRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Resources Grid (Updated Visual Style & Mobile Optimization) */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Layers className="text-emerald-700 dark:text-emerald-500" size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">IELTS Skills Resources</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {SKILL_DATA.map(skill => (
            <button 
              key={skill.id} 
              onClick={() => setSelectedSkill(skill)} 
              className="group relative bg-white dark:bg-slate-900 p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 dark:border-white/5 transition-all duration-300 text-left flex flex-col h-full shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:-translate-y-2 overflow-hidden"
            >
               <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-50 dark:bg-slate-800/50 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 rounded-lg md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-colors duration-300">
                 {React.cloneElement(skill.icon as React.ReactElement, {
                   className: `w-6 h-6 md:w-8 md:h-8 text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300`
                 })}
               </div>
               <h3 className="font-bold text-base md:text-xl mb-1 md:mb-3 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{skill.title}</h3>
               <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 mb-4 md:mb-8 flex-1 leading-relaxed line-clamp-2 md:line-clamp-none">{skill.description}</p>
               <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-[10px] md:text-sm font-bold">
                 View Resources <ArrowRight size={14} className="ml-1 md:ml-1.5 transition-transform group-hover:translate-x-1.5" />
               </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mock Tests Box */}
      <section className="bg-slate-800 dark:bg-slate-900/80 p-10 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 p-24 bg-white/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Mock Tests & Sample Papers</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl leading-relaxed">Simulate exam conditions with full-length timed tests from the world's leading IELTS preparation providers.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SAMPLE_PAPERS.map((paper, idx) => (
              <a key={idx} href={paper.url} target="_blank" className="bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white hover:text-slate-900 px-6 py-5 rounded-2xl transition-all font-bold text-base flex justify-between items-center group shadow-sm">
                {paper.name} <ExternalLink size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <SkillModal isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)} skill={selectedSkill} />
      <ChatWidget />
    </div>
  );
};

export default Linguahub;
