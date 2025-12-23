
import { GoogleGenAI } from "@google/genai";

export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  try {
    // The system provides process.env.API_KEY at runtime
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Request failed:", error);
    throw error;
  }
};
