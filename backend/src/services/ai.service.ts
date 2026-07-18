/**
 * AI Service
 *
 * Handles communication
 * with OpenRouter.
 */

import "dotenv/config";

import OpenAI from "openai";

import { AIMessage } from "../types/ai.types";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Generate AI response
 * using conversation history.
 */
export const generateAIResponse = async (
  messages: AIMessage[],
): Promise<string> => {
  const completion =
    await openai.chat.completions.create({
      model:
        process.env.AI_MODEL ??
        "nvidia/nemotron-3-super-120b-a12b:free",

      messages,
    });

  return (
    completion.choices[0].message.content ??
    "No response generated."
  );
};