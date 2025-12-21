import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyDoKkE9CpIMrVCVbTYJ32gN2cojgiUW2ug"; 

export const runGenAI = async <T>(
  operation: (ai: GoogleGenAI) => Promise<T>
): Promise<T> => {
  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    return await operation(ai);
  } catch (error: any) {
    console.error("[GenAI] Request failed:", error);
    throw error;
  }
};