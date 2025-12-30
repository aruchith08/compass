
import React, { useState, useEffect, useMemo } from 'react';
import { SyllabusCourse, SyllabusUnit } from '../types';
import { X, CheckCircle2, Circle, Trophy, FileText, Copy, Check, Sparkles, Brain, Loader2, BookOpen } from 'lucide-react';
import { runGenAI } from '../services/ai';
import { useRoadmap } from '../RoadmapContext';
import { Type } from "@google/genai";

interface SyllabusModalProps {
  course: SyllabusCourse;
  onClose: () => void;
}

interface UnitAnalysis {
  summary: string;
  examQuestions: string[];
  mnemonic: string;
}

const SyllabusModal: React.FC<SyllabusModalProps> = ({ course, onClose }) => {
  const { isAiConnected } = useRoadmap();
  
  // State for checked topics
  const [checkedTopics, setCheckedTopics] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // AI States
  const [analyzingUnitIdx, setAnalyzingUnitIdx] = useState<number | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<number, UnitAnalysis>>({});

  // Helper to parse topics string into array
  const parseTopics = (topicsStr: string): string[] => {
    return topicsStr.split(/,|•|–/).map(t => t.trim()).filter(t => t.length > 2);
  };

  // Generate a robust unique ID for topics using indices
  const getTopicId = (unitIdx: number, topicIdx: number) => {
    return `${course.code}_u${unitIdx}_t${topicIdx}`;
  };

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`syllabus_progress_${course.code}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCheckedTopics(new Set(parsed));
      } catch (e) {
        console.error("Failed to load syllabus progress");
      }
    }
  }, [course.code]);

  // Save progress
  const toggleTopic = (id: string) => {
    const newSet = new Set(checkedTopics);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCheckedTopics(newSet);
    localStorage.setItem(`syllabus_progress_${course.code}`, JSON.stringify(Array.from(newSet)));
  };

  const handleCopy = (topic: string, unitTitle: string, id: string) => {
    const richText = `${course.title} - ${unitTitle}: ${topic}`;
    navigator.clipboard.writeText(richText).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); 
    });
  };

  // AI Generation Logic
  const handleSynthesizeUnit = async (unit: SyllabusUnit, idx: number) => {
    if (!isAiConnected || analyzingUnitIdx !== null) return;
    
    // Check if we already have it to save tokens/time
    if (analysisResults[idx]) {
        // Toggle view logic could go here if we wanted to hide/show, but currently we just show if exists
        return; 
    }

    setAnalyzingUnitIdx(idx);

    try {
      const prompt = `
        Act as an expert Engineering Professor.
        Analyze this syllabus unit:
        Course: ${course.title}
        Unit: ${unit.title}
        Topics: ${unit.topics}

        Output a JSON object with:
        1. "summary": A concise 2-sentence summary of what this unit covers.
        2. "examQuestions": An array of 3 likely short-answer exam questions based on these topics.
        3. "mnemonic": A creative mnemonic to remember key concepts.
      `;

      await runGenAI(async (ai) => {
        const schema = {
           type: Type.OBJECT,
           properties: {
             summary: { type: Type.STRING },
             examQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
             mnemonic: { type: Type.STRING },
           },
           required: ["summary", "examQuestions", "mnemonic"]
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
           const parsed = JSON.parse(result.text) as UnitAnalysis;
           setAnalysisResults(prev => ({ ...prev, [idx]: parsed }));
        }
      });
    } catch (e) {
      console.error("Syllabus Synthesis Error", e);
    } finally {
      setAnalyzingUnitIdx(null);
    }
  };

  // Stats Calculation
  const { totalTopics, completedCount, progress } = useMemo(() => {
    const allUnits = course.units || [];
    let total = 0;
    let completed = 0;

    allUnits.forEach((unit, unitIdx) => {
      const topics = parseTopics(unit.topics);
      total += topics.length;
      topics.forEach((_, topicIdx) => {
        const id = getTopicId(unitIdx, topicIdx);
        if (checkedTopics.has(id)) {
          completed++;
        }
      });
    });

    const prog = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalTopics: total, completedCount: completed, progress: prog };
  }, [course, checkedTopics]);

  const allUnits = course.units || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-in">
        
        {/* Header */}
        <div className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 p-6 z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                  {course.code}
                </span>
                <span className="text-xs font-bold text-slate-500 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
                  {course.credits} Credits
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {course.title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><Trophy size={14} className="text-amber-500" /> Syllabus Progress</span>
              <span>{progress}% Completed ({completedCount}/{totalTopics})</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
          {allUnits.length > 0 ? (
            allUnits.map((unit, unitIdx) => {
              const topics = parseTopics(unit.topics);
              const analysis = analysisResults[unitIdx];
              const isAnalyzing = analyzingUnitIdx === unitIdx;
              
              return (
                <div key={unitIdx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                  {/* Unit Header */}
                  <div className="bg-slate-100/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm shrink-0">
                        {['I', 'II', 'III', 'IV', 'V'][unitIdx]}
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">
                        {unit.title}
                      </h3>
                    </div>
                    
                    {/* AI Button */}
                    {isAiConnected && (
                      <button 
                        onClick={() => handleSynthesizeUnit(unit, unitIdx)}
                        disabled={isAnalyzing || !!analysis}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                           analysis ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 cursor-default' : 
                           isAnalyzing ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' :
                           'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95'
                        }`}
                      >
                         {isAnalyzing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                         {isAnalyzing ? "Synthesizing..." : analysis ? "Unit Synthesized" : "Neural Synthesis"}
                      </button>
                    )}
                  </div>

                  {/* AI Analysis Result */}
                  {analysis && (
                    <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border-b border-indigo-100 dark:border-indigo-900/30 p-4 animate-slide-down">
                        <div className="grid gap-4">
                            <div className="flex gap-3">
                                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg h-fit text-indigo-600 dark:text-indigo-400"><BookOpen size={16} /></div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-indigo-700 dark:text-indigo-400 mb-1">Brief Summary</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{analysis.summary}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg h-fit text-amber-600 dark:text-amber-400"><Brain size={16} /></div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400 mb-1">Mnemonic</h4>
                                    <p className="text-sm font-mono text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-black/20 p-2 rounded border border-amber-200 dark:border-amber-900/30">{analysis.mnemonic}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg h-fit text-emerald-600 dark:text-emerald-400"><FileText size={16} /></div>
                                <div className="w-full">
                                    <h4 className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 mb-1">Exam Prediction</h4>
                                    <ul className="list-disc pl-4 space-y-1">
                                        {analysis.examQuestions.map((q, i) => (
                                            <li key={i} className="text-xs text-slate-600 dark:text-slate-300">{q}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                  )}

                  {/* Checklist */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {topics.map((topic, topicIdx) => {
                      const id = getTopicId(unitIdx, topicIdx);
                      const isChecked = checkedTopics.has(id);

                      return (
                        <div 
                          key={id}
                          className={`
                            group flex items-start justify-between p-4 transition-all duration-200
                            ${isChecked ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                          `}
                        >
                          <div 
                            className="flex items-start gap-4 flex-1 cursor-pointer"
                            onClick={() => toggleTopic(id)}
                          >
                            <div className={`mt-0.5 shrink-0 transition-transform duration-200 ${isChecked ? 'scale-110' : 'group-hover:scale-110'}`}>
                              {isChecked ? (
                                <CheckCircle2 size={20} className="text-emerald-500 fill-emerald-100 dark:fill-emerald-900" />
                              ) : (
                                <Circle size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-400" />
                              )}
                            </div>
                            <span className={`text-sm leading-relaxed transition-colors ${isChecked ? 'text-slate-400 line-through decoration-slate-300 dark:decoration-slate-700' : 'text-slate-700 dark:text-slate-300'}`}>
                              {topic}
                            </span>
                          </div>
                          
                          {/* Copy Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(topic, unit.title, id);
                            }}
                            className="ml-2 opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all flex-shrink-0"
                            title="Copy full topic with context"
                          >
                            {copiedId === id ? (
                              <Check size={16} className="text-emerald-500" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500 dark:text-slate-400">
              <FileText size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">Detailed syllabus not available yet.</p>
              <p className="text-sm opacity-70">Check back later for topic breakdown.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-white/10 text-center text-xs text-slate-400">
          <p>Progress is saved automatically to this device.</p>
        </div>

      </div>
    </div>
  );
};

export default SyllabusModal;
