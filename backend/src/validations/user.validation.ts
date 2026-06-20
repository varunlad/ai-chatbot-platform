import { z } from "zod";

/**
 * Schema used to validate user creation requests
 */
export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters"),

  email: z
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});