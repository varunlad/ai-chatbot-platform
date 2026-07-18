/**
 * Assistants Configuration
 *
 * This file contains all available
 * AI assistants supported by the application.
 *
 * The frontend should consume this
 * through the Assistants API instead
 * of hardcoding these values.
 */

import { AssistantType } from "@prisma/client";

export interface AssistantConfig {
  id: AssistantType;
  name: string;
  description: string;
}

export const assistants: AssistantConfig[] = [
  {
    id: AssistantType.GENERAL,
    name: "General Assistant",
    description:
      "General-purpose AI assistant for everyday questions and conversations.",
  },

  {
    id: AssistantType.CODING,
    name: "Coding Assistant",
    description:
      "Programming, debugging, software architecture and best practices.",
  },

  {
    id: AssistantType.EDUCATION,
    name: "Education Assistant",
    description:
      "Learning, tutoring, explanations and study assistance.",
  },

  {
    id: AssistantType.WRITING,
    name: "Writing Assistant",
    description:
      "Emails, blogs, documentation and professional writing.",
  },

  {
    id: AssistantType.BUSINESS,
    name: "Business Assistant",
    description:
      "Business strategy, management and professional communication.",
  },

  {
    id: AssistantType.RESEARCH,
    name: "Research Assistant",
    description:
      "Research, summarization and fact-based information gathering.",
  },

  {
    id: AssistantType.CREATIVE,
    name: "Creative Assistant",
    description:
      "Creative writing, brainstorming and storytelling.",
  },

  {
    id: AssistantType.PRODUCTIVITY,
    name: "Productivity Assistant",
    description:
      "Planning, scheduling, organization and productivity improvement.",
  },

  {
    id: AssistantType.ANALYSIS,
    name: "Analysis Assistant",
    description:
      "Data analysis, logical reasoning and problem solving.",
  },

  {
    id: AssistantType.HEALTH,
    name: "Health Assistant",
    description:
      "General wellness and health information (not medical advice).",
  },

  {
    id: AssistantType.FINANCE,
    name: "Finance Assistant",
    description:
      "Personal finance, budgeting and investment education.",
  },

  {
    id: AssistantType.TRAVEL,
    name: "Travel Assistant",
    description:
      "Trip planning, itineraries and travel recommendations.",
  },
];