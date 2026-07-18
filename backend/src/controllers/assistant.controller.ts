/**
 * Assistant Controller
 *
 * Handles requests related
 * to available AI assistants.
 */

import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { assistants } from "../config/assistants";

/**
 * Get every available assistant.
 */
export const getAssistantsController =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      res.status(200).json({
        success: true,
        data: assistants,
      });
    },
  );