/**
 * Message Service
 *
 * Handles all database operations
 * related to chat messages.
 */

import { MessageRole } from "@prisma/client";
import { prisma } from "../config/prisma";

/**
 * Save a new message.
 *
 * This function is used for BOTH:
 * - User messages
 * - AI responses
 */
export const createMessage = async (
  conversationId: string,
  role: MessageRole,
  content: string,
) => {
  return prisma.message.create({
    data: {
      conversationId,
      role,
      content,
    },
  });
};

/**
 * Get every message
 * from a conversation.
 *
 * Messages are returned
 * oldest to newest.
 */
export const getConversationMessages = async (
  conversationId: string,
) => {
  return prisma.message.findMany({
    where: {
      conversationId,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
};