/**
 * Chat Routes
 */

import { Router } from "express";

import { chatController } from "../controllers/chat.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * Protected Chat Route
 */
router.post("/", authenticate, chatController);

export default router;
