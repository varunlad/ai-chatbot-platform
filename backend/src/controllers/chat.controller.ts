/**
 * Chat Controller
 */

import {
  Request,
  Response,
} from "express";

import { asyncHandler }
from "../utils/asyncHandler";

import { chatSchema }
from "../validations/chat.validation";

import { sendMessage }
from "../services/chat.service";

export const chatController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      /**
       * Validate Request
       */
      const validatedData =
        chatSchema.parse(
          req.body
        );

      /**
       * Get AI Response
       */
      const aiResponse =
        await sendMessage(
          validatedData.message
        );

      res.status(200).json({
        success: true,
        data: {
          message:
            validatedData.message,
          response:
            aiResponse,
        },
      });
    }
  );