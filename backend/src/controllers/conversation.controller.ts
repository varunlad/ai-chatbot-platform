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
  renameConversationSchema,
  pinConversationSchema
} from "../validations/conversation.validation";

import {
  createConversation,
  getConversationById,
  getUserConversations,
  renameConversation ,
  pinConversation,
  deleteConversation 
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

  /**
 * Rename Conversation
 */
export const renameConversationController =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const { title } =
        renameConversationSchema.parse(
          req.body,
        );

      const conversation =
        await renameConversation(
          req.params.id,
          req.user!.userId,
          title,
        );

      if (!conversation) {
        throw new AppError(
          "Conversation not found.",
          404,
        );
      }

      res.status(200).json({
        success: true,
        data: conversation,
      });
    },
  );

  /**
 * Delete Conversation
 */
export const deleteConversationController =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const deleted =
        await deleteConversation(
          req.params.id,
          req.user!.userId,
        );

      if (!deleted) {
        throw new AppError(
          "Conversation not found.",
          404,
        );
      }

      res.status(200).json({
        success: true,
        message:
          "Conversation deleted successfully.",
      });
    },
  );

  /**
 * Pin / Unpin Conversation
 */
export const pinConversationController =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const { isPinned } =
        pinConversationSchema.parse(
          req.body,
        );

      const conversation =
        await pinConversation(
          req.params.id,
          req.user!.userId,
          isPinned,
        );

      if (!conversation) {
        throw new AppError(
          "Conversation not found.",
          404,
        );
      }

      res.status(200).json({
        success: true,
        data: conversation,
      });
    },
  );