
// DO NOT use or import GoogleGenerativeAI from @google/genai as it is deprecated.
import { GoogleGenAI } from "@google/genai";

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

const LOCAL_KEY_NAME = "compass_manual_api_key";

/**
 * Ensures an API key is selected in AI Studio environments.
 * This fixes the missing export error in App.tsx.
 */
export const ensureKeySelected = async (): Promise<void> => {
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
      // Guidelines: MUST assume key selection was successful after triggering openSelectKey().
    }
  }
};

/**
 * Gets the current effective API key. 
 * Manual user entry overrides environment variables.
 */
export const getApiKey = async (): Promise<string | undefined> => {
  // 1. Priority 1: User's manual input
  const localKey = localStorage.getItem(LOCAL_KEY_NAME);
  if (localKey && localKey.trim().length > 10) {
    return localKey.trim();
  }

  // 2. Priority 2: System provided key from process.env.API_KEY
  const envKey = process.env.API_KEY;
  if (envKey && envKey !== "undefined" && envKey.length > 10) {
    return envKey;
  }

  return undefined;
};

export const saveManualKey = (key: string) => {
  localStorage.setItem(LOCAL_KEY_NAME, key.trim());
};

export const removeManualKey = () => {
  localStorage.removeItem(LOCAL_KEY_NAME);
};

/**
 * Tests if a key is valid by making a tiny request.
 */
export const validateApiKey = async (key: string): Promise<boolean> => {
  if (!key || key.trim().length < 10) return false;
  try {
    const ai = new GoogleGenAI({ apiKey: key.trim() });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Return the word 'VALID' in JSON format.",
      config: {
        responseMimeType: "application/json"
      }
    });
    // Check text property directly (not a method).
    return !!response.text && response.text.includes("VALID");
  } catch (e) {
    console.error("API Key Validation Failed:", e);
    return false;
  }
};

/**
 * Executes a GenAI operation with a fresh instance.
 * Handles key selection in AI Studio and "Requested entity not found" errors.
 */
export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  let key = await getApiKey();
  
  if (!key) {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Guidelines: assume key selection was successful after triggering openSelectKey()
      key = process.env.API_KEY;
    } else {
      throw new Error("No API Key detected. Please connect via Dashboard.");
    }
  }

  // Guidelines: Create a new GoogleGenAI instance right before making an API call.
  // ALWAYS use new GoogleGenAI({apiKey: process.env.API_KEY}).
  const ai = new GoogleGenAI({ apiKey: key || "" });
  
  try {
    return await operation(ai);
  } catch (error: any) {
    // Guidelines: Handle "Requested entity was not found." by re-prompting for key selection.
    if (error?.message?.includes("Requested entity was not found.") && window.aistudio) {
      await window.aistudio.openSelectKey();
      const retryKey = await getApiKey();
      const retryAi = new GoogleGenAI({ apiKey: retryKey || "" });
      return await operation(retryAi);
    }
    
    // If key is clearly invalid, we might want to flag it here for the UI
    if (error?.message?.includes("API key not valid") || error?.status === 403 || error?.status === 401) {
       console.error("API Key flagged as invalid by remote server.");
    }

    throw error;
  }
};
