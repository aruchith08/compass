
import { GoogleGenAI } from "@google/genai";

declare global {
  // Define AIStudio interface to match the global type expected by the environment.
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Redeclare aistudio using the named interface 'AIStudio' as suggested by the compiler.
    // Marking as optional to match typical global environment extensions and existing usage patterns.
    aistudio?: AIStudio;
  }
}

/**
 * Ensures an API key has been selected in the AI Studio environment.
 */
export const ensureKeySelected = async (): Promise<boolean> => {
  // Type guard for optional aistudio property.
  if (!window.aistudio) return true; // Fallback for standard environments
  
  const hasKey = await window.aistudio.hasSelectedApiKey();
  if (!hasKey) {
    await window.aistudio.openSelectKey();
    return true; // Assume success after trigger per guidelines to avoid race conditions.
  }
  return true;
};

/**
 * Executes a GenAI operation with a fresh instance of GoogleGenAI.
 * Ensures the most up-to-date API key is used.
 */
export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  try {
    // Verify key selection before making the call
    await ensureKeySelected();
    
    // Create a new instance right before making an API call to ensure it always uses 
    // the most up-to-date API key from the environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Request failed:", error);
    
    // If the request fails with a "Requested entity was not found" error, reset the key selection state.
    if (error.message?.includes("Requested entity was not found")) {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
      }
    }
    
    throw error;
  }
};
