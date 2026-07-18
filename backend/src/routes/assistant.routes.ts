/**
 * Assistant Routes
 */

import { Router } from "express";

import {
  getAssistantsController,
} from "../controllers/assistant.controller";

const router = Router();

/**
 * Get all assistants.
 */
router.get(
  "/",
  getAssistantsController,
);

export default router;