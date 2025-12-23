
import React, { useState, useEffect, useRef } from "react";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Star,
  ArrowRight,
  Layers,
  Loader2,
  X,
  ExternalLink,
  MessageSquare,
  Send,
  CalendarCheck,
  Languages,
  Sparkles,
  SpellCheck,
  Zap,
  Hash,
  Type as TypeIcon,
  Info,
  RefreshCw,
  AlertTriangle,
  Play,
  Volume2,
  Square,
  Circle,
  CheckCircle,
  FileText
} from "lucide-react";
import { Type, Modality } from "@google/genai";
import { User, SkillType, DailyChallenge, LinguaSession } from "../types";
import { runGenAI } from "../services/ai";
import { useRoadmap } from "../RoadmapContext";

// --- Utility Functions for Audio ---
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Robust JSON Parsing Helper ---
const parseAIJSON = (text: string | undefined) => {
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

// --- STATIC FALLBACK DATA ---
const FALLBACK_CHALLENGES: DailyChallenge[] = [
  {
    id: "fb_1",
    category: "Listening",
    type: "Comprehension",
    content: "Script: 'I think the lecture on renewable energy was quite insightful, though the section on tidal power was a bit dense.'\n\nQuestion: What part of the lecture did the speaker find difficult?",
    requiresInput: true,
    hiddenContent: "The section on tidal power."
  },
  {
    id: "fb_2",
    category: "Reading",
    type: "Detail",
    content: "Text: 'Urbanization has led to a significant increase in noise pollution, affecting avian migration patterns in metropolitan areas.'\n\nQuestion: What specific group of animals is being affected by noise pollution in cities?",
    requiresInput: true,
    hiddenContent: "Birds / Avian species."
  }
];

const FALLBACK_VOCAB: VocabularyWord = {
  word: "Resilient",
  phonetic: "rɪˈzɪl.jənt",
  partOfSpeech: "Adjective",
  definition: "Able to withstand or recover quickly from difficult conditions.",
  example: "The global economy proved remarkably resilient despite the recent challenges."
};

// --- CONSTANTS ---
export interface ResourceLink { name: string; url: string; }
export interface SkillCategory { id: SkillType; title: string; description: string; icon: React.ReactNode; resources: ResourceLink[]; }
export interface ChatMessage { role: "user" | "model"; text: string; isError?: boolean; }
export interface VocabularyWord { word: string; phonetic: string; partOfSpeech: string; definition: string; example: string; }

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
    const contextStr = hiddenContext ? `\nContext/Script: "${hiddenContext}"` : "";
    
    const contents = {
        parts: [{
            text: `You are a certified IELTS Examiner. 
            Task: Evaluate the candidate's WRITTEN response based on IELTS standards (Grammar, Vocabulary, Coherence, Task Response).
            Question/Prompt: "${challenge}"
            ${contextStr} 
            Candidate Answer: "${userAnswer}"
            
            Return a Band Score (1.0-9.0) and constructive feedback.
            Format:
            Score: [X]/9
            Feedback: [Detailed feedback]`
        }]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
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
      contents: "Generate a random, sophisticated English vocabulary word suitable for IELTS Band 8/9.",
      config: { 
        responseMimeType: "application/json", 
        responseSchema: schema 
      },
    });
    return parseAIJSON(response.text);
  });
};

const checkVocabularyUsage = async (word: string, sentence: string): Promise<string> => {
  return runGenAI(async (ai) => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate the usage of the word "${word}" in this sentence: "${sentence}". Max 2 sentences feedback.`,
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
    const prompt = `Generate exactly 6 high-quality IELTS preparation challenges (TEXT-ONLY responses required, no Speaking tasks). 
    Categories MUST include: 
    1. Listening (provide a script in hiddenContent and a question in content)
    2. Reading (provide a text snippet and a question)
    3. Writing (provide an essay or report prompt)
    4. Vocabulary (focus on high-level word choice)
    5. Grammar & Structure (advanced sentence forms)
    6. Collocations & Phrasal Verbs (natural English expressions).
    
    Target Band: 7.5+. Return valid JSON. Do not include 'Speaking' type tasks.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { 
        responseMimeType: "application/json", 
        responseSchema: schema 
      },
    });
    return parseAIJSON(response.text) || [];
  });
};

const generateSpeechFromText = async (text: string): Promise<string | null> => {
    return runGenAI(async (ai) => {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: `Read this IELTS listening prompt clearly and naturally: ${text}` }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Kore' },
                        },
                    },
                },
            });
            return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
        } catch (e) {
            console.error("TTS Error:", e);
            return null;
        }
    });
};

// --- SUB-COMPONENTS ---

const SkillModal = ({ isOpen, onClose, skill }: { isOpen: boolean; onClose: () => void; skill: SkillCategory | null }) => {
  if (!isOpen || !skill) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
        <div className="bg-emerald-600 dark:bg-slate-950 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">{skill.icon}</div>
            <h2 className="text-xl font-bold">{skill.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={24} /></button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Select a trusted source to practice {skill.title.toLowerCase()}:</p>
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
      setMessages(prev => [...prev, { role: "model", text: "AI is currently unavailable. Please check your API key in the dashboard.", isError: true }]);
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md">
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
  const { linguaSession, updateLinguaSession, isAiConnected } = useRoadmap();
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
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  // Audio State
  const [prefetchedAudio, setPrefetchedAudio] = useState<string | null>(null);
  const [isPreFetchingAudio, setIsPreFetchingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const todayStr = new Date().toDateString();

  const loadEverything = async () => {
    if (!user) return;
    setIsLoadingTasks(true);
    setErrorInfo(null);

    try {
      // 1. Sync Vocabulary
      const vocabKey = `lingua_vocab_${user.username}_${todayStr}`;
      const savedVocabRaw = localStorage.getItem(vocabKey);
      const savedVocab = savedVocabRaw ? JSON.parse(savedVocabRaw) : null;
      
      const isFallbackVocab = savedVocab?.word === FALLBACK_VOCAB.word;

      if (isAiConnected && (isFallbackVocab || !savedVocab)) {
        setIsVocabLoading(true);
        try {
          const word = await generateVocabularyWord();
          if (word) {
            localStorage.setItem(vocabKey, JSON.stringify(word));
            setVocabWord(word);
          } else { setVocabWord(FALLBACK_VOCAB); }
        } catch (e) { setVocabWord(FALLBACK_VOCAB); }
        setIsVocabLoading(false);
      } else if (savedVocab) {
        setVocabWord(savedVocab);
        setIsVocabLoading(false);
      } else {
        setVocabWord(FALLBACK_VOCAB);
        setIsVocabLoading(false);
      }

      // 2. Sync Challenges
      const isFallbackSession = linguaSession?.tasks?.[0]?.id?.startsWith('fb_');

      if (isAiConnected && (!linguaSession || isFallbackSession || linguaSession.date !== todayStr)) {
        const tasks = await generateDailyChallenges();
        if (tasks && tasks.length > 0) {
          updateLinguaSession({ date: todayStr, tasks, currentIndex: 0, isComplete: false });
        } else {
          updateLinguaSession({ date: todayStr, tasks: FALLBACK_CHALLENGES, currentIndex: 0, isComplete: false });
        }
      } else if (!linguaSession || linguaSession.date !== todayStr) {
        updateLinguaSession({ date: todayStr, tasks: FALLBACK_CHALLENGES, currentIndex: 0, isComplete: false });
      }
    } catch (err: any) {
      console.error("Linguahub load error:", err);
      setErrorInfo(err.message || "Unknown AI error.");
      if (!linguaSession) {
        updateLinguaSession({ date: todayStr, tasks: FALLBACK_CHALLENGES, currentIndex: 0, isComplete: false });
      }
    } finally {
      setIsLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadEverything();
  }, [user, todayStr, isAiConnected]);

  const currentTask = linguaSession?.tasks[linguaSession.currentIndex] || null;

  // --- Audio Pre-fetching Effect ---
  useEffect(() => {
    const prefetch = async () => {
        if (currentTask?.category === 'Listening' && isAiConnected) {
            setPrefetchedAudio(null);
            setIsPreFetchingAudio(true);
            try {
                const data = await generateSpeechFromText(currentTask.hiddenContent || currentTask.content);
                setPrefetchedAudio(data);
            } catch (err) {
                console.error("Failed to pre-fetch audio:", err);
            } finally {
                setIsPreFetchingAudio(false);
            }
        } else {
            setPrefetchedAudio(null);
            setIsPreFetchingAudio(false);
        }
    };
    prefetch();
  }, [currentTask, isAiConnected]);

  const handleCheckAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTask || !userAnswer.trim()) return;
    setIsChecking(true);
    try {
      const result = await evaluateChallenge(currentTask.content, userAnswer, currentTask.hiddenContent);
      setFeedback(result.text);
      setLastScore(result.score);
    } catch (error: any) {
      setFeedback(`Evaluation failed: ${error.message || "AI Connection Error"}. Please check your API key.`);
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
      setVocabFeedback("AI feedback requires an active connection.");
    } finally {
      setIsVocabChecking(false);
    }
  };

  const handleNextTask = () => {
    if (!linguaSession) return;
    setUserAnswer("");
    setFeedback(null);
    setLastScore(null);
    setPrefetchedAudio(null); // Reset audio for next round
    const nextIdx = linguaSession.currentIndex + 1;
    const complete = nextIdx >= linguaSession.tasks.length;
    updateLinguaSession({ ...linguaSession, currentIndex: complete ? linguaSession.currentIndex : nextIdx, isComplete: complete });
  };

  // --- Audio Logic ---
  const playListeningAudio = async () => {
    if (!currentTask || isPlaying) return;
    
    let audioData = prefetchedAudio;
    
    // Fallback if not pre-fetched (e.g. user clicked too fast)
    if (!audioData) {
        setIsPlaying(true);
        audioData = await generateSpeechFromText(currentTask.hiddenContent || currentTask.content);
        if (!audioData) {
            setIsPlaying(false);
            return;
        }
    } else {
        setIsPlaying(true);
    }

    if (audioData) {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const decoded = decodeBase64(audioData);
        const buffer = await decodeAudioData(decoded, ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
    } else {
        setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Languages className="text-emerald-500" /> Lingua <span className="text-emerald-600 dark:text-emerald-400">Hub</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Your IELTS AI Training Partner.</p>
        </div>
        {!isAiConnected ? (
           <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-4 py-2 rounded-2xl flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold">
              <Info size={14} /> Offline Mode (Connect AI to enable dynamic tasks)
           </div>
        ) : (
           <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-4 py-2 rounded-2xl flex items-center gap-2 text-emerald-700 dark:text-amber-400 text-xs font-bold">
              <Sparkles size={14} className="animate-pulse" /> AI Enhanced Experience
           </div>
        )}
      </div>

      {errorInfo && isAiConnected && (
        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center justify-between gap-4 animate-slide-up">
           <div className="flex items-center gap-3">
             <AlertTriangle className="text-rose-600 dark:text-rose-400 shrink-0" size={20} />
             <p className="text-xs text-rose-700 dark:text-rose-300 font-bold">Failed to connect to Gemini: {errorInfo}</p>
           </div>
           <button onClick={loadEverything} className="p-2 hover:bg-rose-100 dark:hover:bg-rose-800 rounded-xl transition-all"><RefreshCw size={16} /></button>
        </div>
      )}

      {/* Word of the Day Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-purple-500" size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Word of the Day</h2>
        </div>
        <div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-100 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-12 bg-purple-500/5 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none"></div>
          {isVocabLoading ? (
            <div className="py-12 flex flex-col items-center justify-center h-full gap-2 text-slate-400">
               <Loader2 className="animate-spin text-purple-500" /> 
               <p className="text-xs font-bold uppercase tracking-widest">Searching Archives...</p>
            </div>
          ) : vocabWord && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">{vocabWord.word}</h3>
                  <span className="text-slate-400 font-mono text-sm tracking-widest">// {vocabWord.phonetic} //</span>
                  <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-black uppercase tracking-widest">
                    {vocabWord.partOfSpeech}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed">{vocabWord.definition}</p>
                <div className="relative pl-6 py-2">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-200 dark:bg-purple-900/40 rounded-full" />
                  <p className="italic text-slate-500 dark:text-slate-400 font-serif text-xl leading-relaxed">"{vocabWord.example}"</p>
                </div>
              </div>
              <div className="bg-slate-50/80 dark:bg-slate-950/40 rounded-3xl p-6 border border-slate-100 dark:border-white/5 flex flex-col shadow-inner">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <PenTool size={16} className="text-slate-500" /> Try it yourself
                </h4>
                {!vocabFeedback ? (
                  <form onSubmit={handleCheckVocab} className="flex flex-col gap-4 flex-1">
                    <textarea 
                      value={vocabInput} 
                      onChange={e => setVocabInput(e.target.value)} 
                      placeholder={`Write a sentence using "${vocabWord.word}"...`}
                      className="w-full p-4 text-sm border border-slate-200 dark:border-slate-800 rounded-2xl outline-none bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white resize-none h-32 shadow-sm focus:ring-2 focus:ring-purple-500/20 transition-all" 
                    />
                    <button type="submit" disabled={isVocabChecking || !vocabInput.trim()} className="mt-auto w-full bg-purple-500 hover:bg-purple-600 text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 shadow-md active:scale-95">
                      {isVocabChecking ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Check Usage"}
                    </button>
                  </form>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="text-sm text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 mb-4 shadow-sm flex-1 leading-relaxed">{vocabFeedback}</div>
                    <button onClick={() => { setVocabFeedback(null); setVocabInput(""); }} className="w-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Try Another</button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <a href="https://www.merriam-webster.com/games/spell-it" target="_blank" className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md p-5 md:p-6 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-between group shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-5">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-2xl transition-transform group-hover:scale-105"><SpellCheck className="text-indigo-600 dark:text-indigo-400" size={32} /></div>
              <div><h3 className="font-bold text-slate-900 dark:text-white text-lg">Spelling Mastery</h3><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Practice with word sets.</p></div>
            </div>
            <ArrowRight size={24} className="text-slate-200 group-hover:text-indigo-500 group-hover:translate-x-2 transition-all" />
          </a>
          <a href="https://www.merriam-webster.com/" target="_blank" className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-md p-5 md:p-6 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-between group shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-5">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl transition-transform group-hover:scale-105"><BookOpen className="text-blue-600 dark:text-blue-400" size={32} /></div>
              <div><h3 className="font-bold text-slate-900 dark:text-white text-lg">Advanced Dictionary</h3><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Academic definitions.</p></div>
            </div>
            <ArrowRight size={24} className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
          </a>
        </div>
      </section>
      
      {/* Daily Challenges */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="text-amber-500 fill-amber-500" size={18} />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Daily Mission (6 Pillars)</h2>
          </div>
          {!isLoadingTasks && !linguaSession?.isComplete && linguaSession && (
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 md:px-4 py-1.5 rounded-full tracking-widest uppercase">
              {linguaSession.currentIndex + 1}/{linguaSession.tasks.length}
            </span>
          )}
        </div>
        <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-100 dark:border-white/5 p-4 md:p-8 rounded-[2rem] md:rounded-3xl shadow-xl relative min-h-[300px] flex flex-col justify-center transition-all overflow-hidden">
          {isLoadingTasks ? (
            <div className="flex flex-col items-center justify-center h-full py-12 gap-3">
              <Loader2 className="animate-spin text-emerald-500" size={32} />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Generating Your Session...</p>
            </div>
          ) : (linguaSession?.isComplete || (linguaSession && linguaSession.tasks.length === 0)) ? (
            <div className="text-center py-8 animate-fade-in">
               <div className="bg-emerald-50 dark:bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                 <CalendarCheck className="text-emerald-600 dark:text-emerald-400" size={32} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Daily Mission Complete</h3>
               <p className="text-slate-500 text-sm">All 6 linguistic pillars evaluated.</p>
               <button onClick={loadEverything} className="mt-6 px-6 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Regenerate AI Tasks</button>
            </div>
          ) : currentTask && (
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
               <div className="flex flex-row md:flex-col items-center gap-4 md:gap-3 shrink-0 pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/5 md:pr-8 md:w-32">
                  <div className={`p-2.5 md:p-4 rounded-xl md:rounded-full shadow-inner flex-shrink-0 ${
                    currentTask.category === 'Listening' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-500' :
                    'bg-amber-50 dark:bg-amber-500/10 text-amber-500'
                  }`}>
                    {currentTask.category === 'Listening' ? <Headphones size={32} /> : 
                     currentTask.category === 'Writing' ? <PenTool size={32} /> :
                     currentTask.category === 'Reading' ? <BookOpen size={32} /> :
                     <FileText size={32} />}
                  </div>
                  <div className="text-left md:text-center flex-1 md:flex-none">
                    <span className="hidden md:block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">IELTS</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm md:text-sm">{currentTask.category}</span>
                  </div>
               </div>

               <div className="flex-1 space-y-4 md:space-y-5">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg md:text-xl font-serif text-slate-800 dark:text-slate-100 leading-relaxed tracking-wide whitespace-pre-wrap">
                      {currentTask.content}
                    </h3>
                  </div>

                  {/* Audio Controls for Listening */}
                  <div className="flex flex-wrap gap-3">
                    {currentTask.category === 'Listening' && (
                        <button 
                          onClick={playListeningAudio} 
                          disabled={isPlaying}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 ${
                             prefetchedAudio ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20' : 'bg-blue-600 hover:bg-blue-700'
                          } text-white`}
                        >
                          {isPlaying ? <Loader2 className="animate-spin" size={16} /> : (prefetchedAudio ? <Volume2 size={16} className="animate-pulse" /> : <Play size={16} fill="currentColor" />)}
                          {isPlaying ? "Playing..." : prefetchedAudio ? "Audio Ready: Play Now" : "Generating Audio..."}
                          {prefetchedAudio && !isPlaying && <CheckCircle size={14} className="ml-1" />}
                        </button>
                    )}
                  </div>
                  
                  <div className="pt-2 md:pt-5 border-t border-slate-100 dark:border-white/5">
                    {!feedback ? (
                      <form onSubmit={handleCheckAnswer} className="space-y-3 md:space-y-4">
                        <textarea 
                          value={userAnswer} 
                          onChange={e => setUserAnswer(e.target.value)} 
                          placeholder="Type your response or analysis here..." 
                          className="w-full h-24 md:h-32 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl md:rounded-2xl p-4 text-sm md:text-base focus:ring-1 focus:ring-emerald-500/20 outline-none shadow-inner resize-none transition-all dark:text-white" 
                        />
                        <div className="flex justify-end">
                          <button type="submit" disabled={isChecking || !userAnswer.trim()} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all disabled:opacity-50 shadow-md active:scale-95">
                            {isChecking ? <Loader2 className="animate-spin" size={16} /> : "Submit for AI Evaluation"}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="animate-in slide-in-from-bottom-2 duration-300 space-y-3 md:space-y-4">
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/40 p-4 md:p-5 rounded-xl md:rounded-2xl shadow-sm">
                          <div className="flex justify-between items-center border-b border-emerald-100 dark:border-emerald-900/40 pb-2 mb-3 md:mb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">IELTS Performance Analysis</span>
                            {lastScore !== null && lastScore > 0 && (
                              <span className="bg-emerald-500 text-white px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black shadow-md uppercase">BAND {lastScore}/9</span>
                            )}
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 text-xs md:text-sm whitespace-pre-wrap leading-relaxed font-medium">{feedback}</p>
                        </div>
                        <button onClick={handleNextTask} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                          Next Pillar <ArrowRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Focused Skills Grid */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Layers className="text-emerald-700 dark:text-emerald-500" size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Focused Skills</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_DATA.map(skill => (
            <button 
              key={skill.id} 
              onClick={() => setSelectedSkill(skill)} 
              className="group relative bg-white/80 dark:bg-slate-900/40 backdrop-blur-md p-5 md:p-6 rounded-3xl border border-slate-100 dark:border-white/5 transition-all duration-300 text-left flex flex-col h-full shadow-sm hover:shadow-xl dark:hover:shadow-emerald-500/5 hover:border-emerald-500/50 dark:hover:border-emerald-500/30 hover:-translate-y-1 overflow-hidden"
            >
               <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 dark:bg-slate-800/50 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                 {React.isValidElement(skill.icon) && React.cloneElement(skill.icon as React.ReactElement<any>, {
                   className: `w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300`
                 })}
               </div>
               <h3 className="font-bold text-sm md:text-base mb-1 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{skill.title}</h3>
               <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mb-6 flex-1 leading-relaxed line-clamp-2">{skill.description}</p>
               <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                 View Resources <ArrowRight size={14} className="ml-1 md:ml-1.5 transition-transform group-hover:translate-x-1.5" />
               </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mock Tests Box */}
      <section className="bg-slate-600 dark:bg-slate-900/80 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 p-16 bg-white/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">Mock Tests & Sample Papers</h2>
          <p className="text-slate-300 text-sm mb-6 max-w-xl leading-relaxed opacity-90">Simulate exam conditions with free full-length tests from top providers.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {SAMPLE_PAPERS.map((paper, idx) => (
              <a 
                key={idx} 
                href={paper.url} 
                target="_blank" 
                className="bg-slate-800/40 backdrop-blur-xl border border-slate-500/30 hover:bg-slate-800/60 transition-all font-bold text-sm flex justify-between items-center px-5 py-4 rounded-2xl group shadow-sm"
              >
                {paper.name} 
                <ExternalLink size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
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
