/**
 * Chat Message Mapper
 *
 * Converts database messages into
 * the format expected by OpenRouter/OpenAI.
 */

import {
  Message,
  MessageRole,
} from "@prisma/client";

/**
 * OpenRouter message format.
 */
export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Convert database messages
 * into AI messages.
 */
export const mapMessagesToAI = (
  messages: Message[],
): AIMessage[] => {
  return messages.map((message) => ({
    role:
      message.role === MessageRole.USER
        ? "user"
        : "assistant",

    content: message.content,
  }));
};