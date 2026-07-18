/**
 * AI Types
 *
 * Shared types used
 * throughout the AI module.
 */

/**
 * Message format expected by OpenRouter/OpenAI.
 */
export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}