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

/**
 * Rename a conversation.
 */
export const renameConversation = async (
  conversationId: string,
  userId: string,
  title: string,
) => {
  const conversation =
    await getConversationById(
      conversationId,
      userId,
    );

  if (!conversation) {
    return null;
  }

  return prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      title,
    },
  });
};

/**
 * Delete a conversation.
 */
export const deleteConversation = async (
  conversationId: string,
  userId: string,
) => {
  const conversation =
    await getConversationById(
      conversationId,
      userId,
    );

  if (!conversation) {
    return null;
  }

  await prisma.conversation.delete({
    where: {
      id: conversationId,
    },
  });

  return true;
};

/**
 * Pin / Unpin a conversation.
 */
export const pinConversation = async (
  conversationId: string,
  userId: string,
  isPinned: boolean,
) => {
  const conversation =
    await getConversationById(
      conversationId,
      userId,
    );

  if (!conversation) {
    return null;
  }

  return prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      isPinned,

      pinnedAt: isPinned
        ? new Date()
        : null,
    },
  });
};

/**
 * Update conversation title.
 *
 * Used when generating
 * an automatic title
 * after the user's first message.
 */
export const updateConversationTitle =
  async (
    conversationId: string,
    title: string,
  ) => {
    return prisma.conversation.update({
      where: {
        id: conversationId,
      },

      data: {
        title,
      },
    });
  };