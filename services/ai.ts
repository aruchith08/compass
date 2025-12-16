
import { GoogleGenAI } from "@google/genai";

// ============================================================================
// 🔑 API KEY CONFIGURATION
// ============================================================================
// Add as many keys as you want here. The app will cycle through them if one fails.
const API_KEYS = [
  "AIzaSyCsrwyWyYdquFKvekzJId5_ab9jW9PPvKM", // Primary Key
  "AIzaSyBMvXZn64jgN2oTQuk2h-QZ68N_K7W2ARw", // Backup Key 1
  "AIzaSyDoKkE9CpIMrVCVbTYJ32gN2cojgiUW2ug", // Backup Key 2
];

let currentKeyIndex = 0;

/**
 * Gets the current active GoogleGenAI client.
 */
const getClient = (): GoogleGenAI => {
  const key = API_KEYS[currentKeyIndex];
  if (!key) throw new Error("No API Key configured in services/ai.ts");
  return new GoogleGenAI({ apiKey: key });
};

/**
 * Rotates to the next available API key.
 */
const rotateKey = () => {
  const prevIndex = currentKeyIndex;
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  console.log(`[AI Service] Switching API Key: #${prevIndex + 1} -> #${currentKeyIndex + 1}`);
};

/**
 * Executes a GenAI operation with automatic key rotation on failure.
 * It will try every key in the API_KEYS list before giving up.
 * 
 * @param operation A function that takes a GoogleGenAI client and returns a promise.
 */
export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  let attempts = 0;
  // Try each key at least once
  const maxAttempts = Math.max(1, API_KEYS.length);
  const startIndex = currentKeyIndex;

  while (attempts < maxAttempts) {
    try {
      const ai = getClient();
      return await operation(ai);
    } catch (error: any) {
      console.warn(`[GenAI] Attempt failed with Key #${currentKeyIndex + 1}. Error:`, error);
      
      // Check if we should stop trying (e.g., if it's a logic error vs a connection/quota error)
      // For simplicity, we assume most errors in this context (429, 503, 500) are worth retrying with a new key.
      
      // Rotate Key
      rotateKey();
      attempts++;
      
      // If we've looped back to the start and still failing, break to avoid infinite loops
      if (currentKeyIndex === startIndex) {
         throw new Error("All API keys are exhausted or failing.");
      }
    }
  }
  
  throw new Error("Failed to execute GenAI request after rotating through all keys.");
};
