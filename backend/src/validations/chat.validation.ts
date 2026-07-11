/**
 * Chat Validation
 *
 * Validates chat requests
 * before reaching the service layer.
 */

import { z } from "zod";

/**
 * Send Message Validation
 */
export const sendMessageSchema = z.object({
  conversationId: z
    .string()
    .min(1, "Conversation ID is required"),

  message: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(
      5000,
      "Message cannot exceed 5000 characters",
    ),
});

export type SendMessageInput =
  z.infer<typeof sendMessageSchema>;