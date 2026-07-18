/**
 * Chat Message Mapper
 *
 * Converts database messages into
 * the format expected by OpenRouter.
 */

import {
  AssistantType,
  Message,
  MessageRole,
} from "@prisma/client";

import { AIMessage } from "../types/ai.types";
import { getSystemPrompt } from "../prompts/promptFactory";

/**
 * Convert database messages into
 * OpenRouter message format.
 */
export const mapMessagesToAI = (
  messages: Message[],
  assistantType: AssistantType,
): AIMessage[] => {
  const aiMessages: AIMessage[] = [];

  // Add system prompt first
  aiMessages.push({
    role: "system",
    content: getSystemPrompt(assistantType),
  });

  // Add conversation history
  messages.forEach((message) => {
    aiMessages.push({
      role:
        message.role === MessageRole.USER
          ? "user"
          : "assistant",
      content: message.content,
    });
  });

  return aiMessages;
};