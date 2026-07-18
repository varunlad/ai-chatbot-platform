/**
 * Conversation Validation
 */

import { z } from "zod";
import { AssistantType } from "@prisma/client";

export const createConversationSchema = z.object({
  assistantType: z.nativeEnum(AssistantType),
});