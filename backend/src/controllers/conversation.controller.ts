/**
 * Conversation Controller
 *
 * Handles HTTP requests related
 * to conversations.
 */

import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createConversationSchema,
} from "../validations/conversation.validation";

import {
  createConversation,
  getConversationById,
  getUserConversations,
} from "../services/conversation.service";

import { AppError } from "../utils/AppError";

/**
 * Create a new conversation.
 */
/**
 * Create Conversation
 */
export const createConversationController =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      /**
       * Validate request.
       */
      const {
        assistantType,
      } =
        createConversationSchema.parse(
          req.body,
        );

      /**
       * Logged in user.
       */
      const userId =
        req.user!.userId;

      /**
       * Create conversation.
       */
      const conversation =
        await createConversation(
          userId,
          assistantType,
        );

      res.status(201).json({
        success: true,
        data: conversation,
      });
    },
  );

/**
 * Get all conversations
 * of the logged-in user.
 */
export const getUserConversationsController =
  asyncHandler(async (req: Request, res: Response) => {
    const conversations =
      await getUserConversations(req.user.userId);

    res.status(200).json({
      success: true,
      data: conversations,
    });
  });

/**
 * Get a single conversation
 * with all messages.
 */
export const getConversationController =
  asyncHandler(async (req: Request, res: Response) => {
    const conversation =
      await getConversationById(
        req.params.id,
        req.user.userId
      );

    if (!conversation) {
      throw new AppError(
        "Conversation not found",
        404
      );
    }

    res.status(200).json({
      success: true,
      data: conversation,
    });
  });