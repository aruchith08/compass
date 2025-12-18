import { GoogleGenAI } from "@google/genai";

// ============================================================================
// 🔑 GENAI CONFIGURATION
// ============================================================================

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("Missing API_KEY environment variable for GoogleGenAI.");
}

/**
 * Executes a GenAI operation using the configured API key from environment variables.
 *
 * @param operation A function that takes a GoogleGenAI client and returns a promise.
 */
export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey as string });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Request failed:", error);
    throw error;
  }
};
