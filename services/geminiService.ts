
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getClarityResponse(history: ChatMessage[]): Promise<string> {
  try {
    const userMessage = history[history.length - 1].text;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are Clarity AI, a premium subscription intelligence and financial forecasting assistant. 
        Your goal is to help users optimize their recurring expenses and predict cash flow risks.
        Be professional, insightful, and calm. Provide specific financial reasoning.
        Context: The user is currently browsing Clarity, a platform for managing subscriptions.
        They have expenses like AWS, Netflix, Spotify, and Adobe CC.
        Offer proactive advice about "Zombie Subscriptions" (low usage) and duplicate detections.`,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "I'm having trouble analyzing your financial data right now. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered an error connecting to the intelligence server. Check your connection.";
  }
}
