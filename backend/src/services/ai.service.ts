/**
 * AI Service
 *
 * Handles communication
 * with OpenRouter.
 */
import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Send prompt to AI model
 */
export const generateAIResponse =
  async (
    message: string
  ) => {
    const completion =
      await openai.chat.completions.create({
        model:
          process.env.AI_MODEL ||
          "nvidia/nemotron-3-super-120b-a12b:free",

        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

    return (
      completion.choices[0].message.content ??
      "No response generated."
    );
  };