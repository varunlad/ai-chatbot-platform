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
 * - Return AI response
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
 *
 * @param userId - Logged-in user's ID
 * @param conversationId - Conversation to which the message belongs
 * @param message - User's input message
 *
 * @returns
 * Conversation ID,
 * AI Message ID,
 * AI Response
 */
export const sendMessage = async (
  userId: string,
  conversationId: string,
  message: string,
) => {
  /**
   * STEP 1
   * Verify that the conversation
   * exists and belongs to
   * the authenticated user.
   */
  const conversation = await getConversationById(
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
   * Save the user's message
   * into the database.
   */
  await createMessage(
    conversationId,
    MessageRole.USER,
    message,
  );

  /**
   * STEP 3
   * Fetch the complete
   * conversation history.
   *
   * Messages are returned
   * from oldest to newest.
   */
  const conversationMessages =
    await getConversationMessages(
      conversationId,
    );

  /**
   * STEP 4
   * Convert database messages
   * into the format expected
   * by OpenRouter.
   */
  const aiMessages =
    mapMessagesToAI(
      conversationMessages,
    );

  /**
   * STEP 5
   * Send the conversation
   * history to the AI model.
   */
  const aiReply =
    await generateAIResponse(
      aiMessages,
    );

  /**
   * STEP 6
   * Save the AI's response
   * into the database.
   */
  const aiMessage =
    await createMessage(
      conversationId,
      MessageRole.AI,
      aiReply,
    );

  /**
   * STEP 7
   * Return the response
   * to the controller.
   */
  return {
    conversationId,
    messageId: aiMessage.id,
    response: aiMessage.content,
  };
};