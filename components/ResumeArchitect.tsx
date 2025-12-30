
import React, { useState } from 'react';
import { X, FileText, Sparkles, Loader2, Copy, Briefcase } from 'lucide-react';
import { useRoadmap } from '../RoadmapContext';
import { runGenAI } from '../services/ai';

interface ResumeArchitectProps {
  onClose: () => void;
}

const ResumeArchitectModal: React.FC<ResumeArchitectProps> = ({ onClose }) => {
  const { items, isAiConnected } = useRoadmap();
  const [jobDescription, setJobDescription] = useState('');
  const [generatedCV, setGeneratedCV] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const completedItems = items.filter(i => i.status === 'Completed').map(i => `${i.name}: ${i.description}`).join('; ');
  const projects = items.filter(i => i.is_project && i.status === 'Completed').map(i => i.name).join(', ');

  const generateBullets = async () => {
    if (!jobDescription.trim() || !isAiConnected) return;
    setIsGenerating(true);
    try {
        await runGenAI(async (ai) => {
            const prompt = `
              Role: Expert Resume Writer.
              Task: Generate 5-7 punchy, metric-driven resume bullet points.
              
              Candidate's Completed Work: ${completedItems}
              Candidate's Projects: ${projects}
              
              Target Job Description: "${jobDescription}"
              
              Instructions:
              - Match the candidate's actual completed work to the JD requirements.
              - Use strong action verbs (Architected, Engineered, Optimized).
              - Quantify results where possible (even if estimating).
              - Output ONLY the bullet points in Markdown format.
            `;
            const result = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt
            });
            setGeneratedCV(result.text || "Could not generate.");
        });
    } catch (e) {
        console.error(e);
        setGeneratedCV("Error generating CV. Please check connection.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 bg-blue-600 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl"><FileText size={24} /></div>
                    <div>
                        <h2 className="text-xl font-bold">Resume Architect</h2>
                        <p className="text-xs opacity-80">Transform completed tasks into hireable bullet points.</p>
                    </div>
                </div>
                <button onClick={onClose}><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                {!isAiConnected && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-bold flex gap-2">
                        <Briefcase size={16} /> AI connection required for this feature.
                    </div>
                )}
                
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Paste Job Description</label>
                    <textarea 
                        value={jobDescription}
                        onChange={e => setJobDescription(e.target.value)}
                        placeholder="Paste the JD here (Requirements, Responsibilities)..."
                        className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                </div>

                <button 
                    onClick={generateBullets}
                    disabled={isGenerating || !jobDescription.trim() || !isAiConnected}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50"
                >
                    {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    {isGenerating ? "Analyzing Skills & JD..." : "Generate Tailored Bullets"}
                </button>

                {generatedCV && (
                    <div className="space-y-2 animate-slide-up">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Generated Content</label>
                        <div className="relative">
                            <textarea 
                                readOnly
                                value={generatedCV}
                                className="w-full h-48 p-4 bg-slate-900 text-slate-200 font-mono text-xs rounded-xl border border-slate-700 focus:outline-none"
                            />
                            <button 
                                onClick={() => navigator.clipboard.writeText(generatedCV)}
                                className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                            >
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ResumeArchitectModal;
