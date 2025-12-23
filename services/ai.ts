
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
 * Gets the current effective API key from environment, AI Studio, or LocalStorage.
 */
export const getApiKey = async (): Promise<string | undefined> => {
  // 1. Check process.env
  if (process.env.API_KEY && process.env.API_KEY !== "undefined") {
    return process.env.API_KEY;
  }

  // 2. Check local storage
  const localKey = localStorage.getItem(LOCAL_KEY_NAME);
  if (localKey) return localKey;

  return undefined;
};

/**
 * Saves a manual API key to local storage.
 */
export const saveManualKey = (key: string) => {
  localStorage.setItem(LOCAL_KEY_NAME, key);
};

/**
 * Removes the manual API key.
 */
export const removeManualKey = () => {
  localStorage.removeItem(LOCAL_KEY_NAME);
};

/**
 * Ensures an API key has been selected or provided.
 */
export const ensureKeySelected = async (): Promise<boolean> => {
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
    return true;
  }
  
  const existing = await getApiKey();
  return !!existing;
};

/**
 * Executes a GenAI operation with a fresh instance of GoogleGenAI.
 */
export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  try {
    const key = await getApiKey();
    
    if (!key) {
      // If we are in AI Studio, try to trigger the picker
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
        const retryKey = await getApiKey();
        if (!retryKey) throw new Error("API Key required");
      } else {
        throw new Error("API Key required. Please connect AI in the dashboard.");
      }
    }

    const ai = new GoogleGenAI({ apiKey: key || process.env.API_KEY });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Request failed:", error);
    
    if (error.message?.includes("Requested entity was not found")) {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
      }
    }
    
    throw error;
  }
};
