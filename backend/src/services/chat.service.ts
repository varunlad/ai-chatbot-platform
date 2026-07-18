/**
 * Chat Service
 *
 * This is the heart of the chatbot backend.
 */

import { MessageRole } from "@prisma/client";

import { AppError } from "../utils/AppError";

import { getConversationById } from "./conversation.service";

import {
  createMessage,
  getConversationMessages,
} from "./message.service";

import { mapMessagesToAI } from "../utils/chatMessageMapper";

import { generateAIResponse } from "./ai.service";

/**
 * Send a message to the chatbot.
 */
export const sendMessage = async (
  userId: string,
  conversationId: string,
  message: string,
) => {
  /**
   * Verify conversation ownership.
   */
  const conversation =
    await getConversationById(
      conversationId,
      userId,
    );

  if (!conversation) {
    throw new AppError(
      "Conversation not found.",
      404,
    );
  }

  /**
   * Save user's message.
   */
  await createMessage(
    conversationId,
    MessageRole.USER,
    message,
  );

  /**
   * Load conversation history.
   */
  const conversationMessages =
    await getConversationMessages(
      conversationId,
    );

  /**
   * Convert database messages
   * into OpenRouter format.
   */
  const aiMessages =
    mapMessagesToAI(
      conversationMessages,
      conversation.assistantType,
    );

  /**
   * Generate AI response.
   */
  const aiReply =
    await generateAIResponse(
      aiMessages,
    );

  /**
   * Save AI response.
   */
  const aiMessage =
    await createMessage(
      conversationId,
      MessageRole.AI,
      aiReply,
    );

  /**
   * Return response.
   */
  return {
    conversationId,
    messageId: aiMessage.id,
    response: aiMessage.content,
  };
};