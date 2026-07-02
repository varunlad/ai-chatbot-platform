/**
 * Conversation Service
 *
 * Handles all database operations
 * related to conversations.
 */

import { prisma } from "../config/prisma";

/**
 * Create a new conversation
 * for the logged-in user.
 */
export const createConversation = async (
  userId: string
) => {
  return prisma.conversation.create({
    data: {
      title: "New Chat",
      userId,
    },
  });
};

/**
 * Get all conversations
 * belonging to a user.
 */
export const getUserConversations = async (
  userId: string
) => {
  return prisma.conversation.findMany({
    where: {
      userId,
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
};

/**
 * Get one conversation
 * including all messages.
 */
export const getConversationById = async (
  conversationId: string,
  userId: string
) => {
  return prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId,
    },

    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
};