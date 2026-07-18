/**
 * Conversation Validation
 */

import { z } from "zod";
import { AssistantType } from "@prisma/client";

export const createConversationSchema = z.object({
  assistantType: z.nativeEnum(AssistantType),
});

export const renameConversationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title cannot exceed 100 characters."),
});

export const pinConversationSchema = z.object({
  isPinned: z.boolean(),
});