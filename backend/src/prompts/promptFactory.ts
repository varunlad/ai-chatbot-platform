/**
 * Prompt Factory
 */

import { AssistantType } from "@prisma/client";

import {
  generalPrompt,
  codingPrompt,
  educationPrompt,
  writingPrompt,
  businessPrompt,
  researchPrompt,
  creativePrompt,
  productivityPrompt,
  analysisPrompt,
  healthPrompt,
  financePrompt,
  travelPrompt,
} from ".";

export const getSystemPrompt = (
  assistantType: AssistantType,
): string => {
  switch (assistantType) {
    case AssistantType.CODING:
      return codingPrompt;

    case AssistantType.EDUCATION:
      return educationPrompt;

    case AssistantType.WRITING:
      return writingPrompt;

    case AssistantType.BUSINESS:
      return businessPrompt;

    case AssistantType.RESEARCH:
      return researchPrompt;

    case AssistantType.CREATIVE:
      return creativePrompt;

    case AssistantType.PRODUCTIVITY:
      return productivityPrompt;

    case AssistantType.ANALYSIS:
      return analysisPrompt;

    case AssistantType.HEALTH:
      return healthPrompt;

    case AssistantType.FINANCE:
      return financePrompt;

    case AssistantType.TRAVEL:
      return travelPrompt;

    case AssistantType.GENERAL:
    default:
      return generalPrompt;
  }
};