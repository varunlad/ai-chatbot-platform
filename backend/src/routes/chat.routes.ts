/**
 * Chat Routes
 */

import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { sendMessageController } from "../controllers/chat.controller";

const router = Router();

/**
 * Protected Chat Route
 *
 * POST /api/chat
 */
router.post(
  "/",
  authenticate,
  sendMessageController,
);

export default router;