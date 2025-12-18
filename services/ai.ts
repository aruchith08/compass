
import { GoogleGenAI } from "@google/genai";

// ============================================================================
// 🔑 GENAI CONFIGURATION
// ============================================================================

/**
 * Executes a GenAI operation using the configured API key from environment variables.
 * 
 * @param operation A function that takes a GoogleGenAI client and returns a promise.
 */
export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  try {
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    // Use this process.env.API_KEY string directly when initializing the client instance.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Request failed:", error);
    throw error;
  }
};
