
import { GoogleGenAI } from "@google/genai";

/**
 * Executes a GenAI operation using the API key obtained exclusively from the environment.
 * Adheres strictly to project standards for API key retrieval and client initialization.
 * 
 * @param operation A function that takes a GoogleGenAI client and returns a promise.
 */
export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  // Ensure the 'process' object and 'env' property are safely initialized in the browser context.
  // This prevents ReferenceErrors while allowing host-injected variables to be accessed.
  if (typeof (window as any).process === 'undefined') {
    (window as any).process = { env: {} };
  }

  // Priority mapping: Use the direct API_KEY if available.
  // If not, check for platform-prefixed variables (like VITE_API_KEY from the Vercel dashboard)
  // and map them to process.env.API_KEY to satisfy the SDK requirements.
  if (!process.env.API_KEY) {
    // Accessing through import.meta.env for Vite-like environments or window globals
    const metaEnv = (import.meta as any).env;
    process.env.API_KEY = metaEnv?.VITE_API_KEY || metaEnv?.API_KEY;
  }

  // Final check to ensure we have a key before attempting to initialize the client.
  if (!process.env.API_KEY) {
    console.error("[GenAI] API_KEY not found in environment. Please ensure VITE_API_KEY is set in your deployment settings.");
  }

  try {
    /**
     * The API key must be obtained exclusively from the environment variable process.env.API_KEY.
     * Always use a named parameter: new GoogleGenAI({ apiKey: process.env.API_KEY }).
     */
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Initialization or Execution failed:", error);
    throw error;
  }
};
