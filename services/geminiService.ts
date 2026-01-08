
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMatchCommentary = async (situation: string, betAmount: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional 8-ball pool commentator. A player is currently in a high-stakes match with a ${betAmount} Taka bet. Current situation: ${situation}. Give a short, snappy, hype-filled one-sentence commentary. Avoid generic text. Be specific to pool (pockets, cue ball, chalk, banks, etc.).`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || "Unbelievable concentration on the table right now!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The pressure is mounting at the table.";
  }
};

export const getBettingTip = async (balance: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User balance is ${balance} Taka. Suggest which room they should play in (100, 300, or 500 Taka rooms) and give a brief motivational pool-themed tip. Keep it to 15 words max.`,
    });
    return response.text || "Play smart, aim true, and let the bankroll grow.";
  } catch (error) {
    return "Trust your stroke and choose your room wisely.";
  }
};
