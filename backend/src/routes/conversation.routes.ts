/**
 * Conversation Routes
 *
 * Defines all conversation-related
 * API endpoints.
 */

import { Router } from "express";

import {
  createConversationController,
  getConversationController,
  getUserConversationsController,
} from "../controllers/conversation.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * Every conversation endpoint
 * requires authentication.
 */
router.use(authenticate);

/**
 * POST /api/conversations
 *
 * Create a new conversation.
 */
router.post(
  "/",
  createConversationController
);

/**
 * GET /api/conversations
 *
 * Get all conversations
 * of logged-in user.
 */
router.get(
  "/",
  getUserConversationsController
);

/**
 * GET /api/conversations/:id
 *
 * Get one conversation
 * with all messages.
 */
router.get(
  "/:id",
  getConversationController
);

export default router;