/**
 * Chat Service
 *
 * Handles chatbot business logic.
 */

import { generateAIResponse }
from "./ai.service";

/**
 * Generate AI response
 */
export const sendMessage =
  async (
    message: string
  ) => {

    const response =
      await generateAIResponse(
        message
      );

    return response;
  };