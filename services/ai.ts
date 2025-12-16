
import { GoogleGenAI } from "@google/genai";

// ============================================================================
// 🔑 API KEY CONFIGURATION
// ============================================================================
const API_KEY = "AIzaSyBMvXZn64jgN2oTQuk2h-QZ68N_K7W2ARw";

/**
 * Executes a GenAI operation using the configured API key.
 * 
 * @param operation A function that takes a GoogleGenAI client and returns a promise.
 */
export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Request failed:", error);
    throw error;
  }
};
