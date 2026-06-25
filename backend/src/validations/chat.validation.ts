/**
 * Chat Validation
 *
 * Validates incoming chat messages.
 */

import { z } from "zod";

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(
      5000,
      "Message is too long"
    ),
});