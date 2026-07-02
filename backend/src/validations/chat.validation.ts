/**
 * Chat Validation
 *
 * Validates incoming chat requests.
 */

import { z } from "zod";

export const chatSchema = z.object({
  /**
   * Conversation where
   * this message belongs.
   */
  conversationId: z
    .string()
    .min(1, "Conversation ID is required"),

  /**
   * User's message.
   */
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});