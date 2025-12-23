
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
 * Gets the current effective API key from LocalStorage or Environment.
 * Prioritizes manually entered keys for local development/testing.
 */
export const getApiKey = async (): Promise<string | undefined> => {
  // 1. Check local storage first (user manual entry)
  const localKey = localStorage.getItem(LOCAL_KEY_NAME);
  if (localKey && localKey.trim().length > 5) {
    return localKey.trim();
  }

  // 2. Check process.env (system injection)
  // We ignore strings like "undefined" or generic placeholders
  const envKey = process.env.API_KEY;
  if (envKey && envKey !== "undefined" && envKey.length > 10) {
    return envKey;
  }

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
  const key = await getApiKey();
  
  if (!key) {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      const retryKey = await getApiKey();
      if (!retryKey) throw new Error("API Key required");
    } else {
      throw new Error("API Key required. Please connect AI in the dashboard.");
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey: key! });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Request failed:", error);
    
    // If the key is invalid, we clear it so the user can re-enter
    if (error.message?.includes("API key not valid") || error.message?.includes("invalid")) {
       removeManualKey();
    }

    if (error.message?.includes("Requested entity was not found")) {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
      }
    }
    
    throw error;
  }
};
