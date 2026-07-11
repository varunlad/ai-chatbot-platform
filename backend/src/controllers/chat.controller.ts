/**
 * Chat Controller
 *
 * Handles chat-related requests.
 */

import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { sendMessageSchema } from "../validations/chat.validation";

import { sendMessage } from "../services/chat.service";

/**
 * Send a message
 * to the chatbot.
 */
export const sendMessageController =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      /**
       * Validate request body.
       */
      const {
        conversationId,
        message,
      } = sendMessageSchema.parse(
        req.body,
      );

      /**
       * Logged-in user
       * comes from JWT middleware.
       */
      const userId =
        req.user!.userId;

      /**
       * Send message.
       */
      const response =
        await sendMessage(
          userId,
          conversationId,
          message,
        );

      res.status(200).json({
        success: true,
        data: response,
      });
    },
  );