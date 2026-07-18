/**
 * Generates a conversation title
 * from the user's first message.
 */
export const generateConversationTitle = (
  message: string,
): string => {
  return message
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .slice(0, 6)
    .join(" ")
    .slice(0, 50);
};