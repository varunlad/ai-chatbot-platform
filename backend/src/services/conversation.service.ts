/**
 * Conversation Service
 *
 * Handles all database operations
 * related to conversations.
 */

import { AssistantType } from "@prisma/client";

import { prisma } from "../config/prisma";

/**
 * Create a new conversation
 * for the authenticated user.
 */
export const createConversation = async (
  userId: string,
  assistantType: AssistantType,
) => {
  return prisma.conversation.create({
    data: {
      title: "New Chat",
      userId,
      assistantType,
    },
  });
};

/**
 * Get every conversation
 * belonging to a user.
 */
export const getUserConversations = async (userId: string) => {
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
 * Get one conversation.
 */
export const getConversationById = async (
  conversationId: string,
  userId: string,
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
