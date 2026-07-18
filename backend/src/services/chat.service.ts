/**
 * Chat Service
 *
 * This is the heart of the chatbot backend.
 *
 * Responsibilities:
 * - Verify conversation ownership
 * - Save user's message
 * - Load conversation history
 * - Convert messages into AI format
 * - Call OpenRouter
 * - Save AI response
 * - Generate conversation title
 * - Return AI response
 */

import { MessageRole } from "@prisma/client";

import { AppError } from "../utils/AppError";

import {
  getConversationById,
  updateConversationTitle,
} from "./conversation.service";

import {
  createMessage,
  getConversationMessages,
} from "./message.service";

import { mapMessagesToAI } from "../utils/chatMessageMapper";

import { generateConversationTitle } from "../utils/generateConversationTitle";

import { generateAIResponse } from "./ai.service";

/**
 * Send a message to the chatbot.
 *
 * @param userId Logged-in user's ID
 * @param conversationId Conversation ID
 * @param message User's message
 */
export const sendMessage = async (
  userId: string,
  conversationId: string,
  message: string,
) => {
  /**
   * STEP 1
   * Verify conversation belongs
   * to the authenticated user.
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
   * STEP 2
   * Save user's message.
   */
  await createMessage(
    conversationId,
    MessageRole.USER,
    message,
  );

  /**
   * STEP 3
   * Load complete conversation.
   */
  const conversationMessages =
    await getConversationMessages(
      conversationId,
    );

  /**
   * STEP 4
   * Convert messages into
   * AI format including
   * the selected assistant prompt.
   */
  const aiMessages =
    mapMessagesToAI(
      conversationMessages,
      conversation.assistantType,
    );

  /**
   * STEP 5
   * Generate AI response.
   */
  const aiReply =
    await generateAIResponse(
      aiMessages,
    );

  /**
   * STEP 6
   * Save AI response.
   */
  const aiMessage =
    await createMessage(
      conversationId,
      MessageRole.AI,
      aiReply,
    );

  /**
   * STEP 7
   * Generate conversation title.
   *
   * This only happens once,
   * when the conversation
   * still has the default title.
   */
  if (conversation.title === "New Chat") {
    const title =
      generateConversationTitle(
        message,
      );

    await updateConversationTitle(
      conversationId,
      title,
    );
  }

  /**
   * STEP 8
   * Return AI response.
   */
  return {
    conversationId,
    messageId: aiMessage.id,
    response: aiMessage.content,
  };
};