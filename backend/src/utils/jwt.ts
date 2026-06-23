/**
 * JWT Utility
 *
 * Responsible for:
 * - Creating JWT tokens
 * - Verifying JWT tokens
 */

import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  email: string;
}

/**
 * Generate JWT token
 */
export const generateToken = (
  payload: TokenPayload
): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

/**
 * Verify JWT token
 */
export const verifyToken = (
  token: string
) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );
};