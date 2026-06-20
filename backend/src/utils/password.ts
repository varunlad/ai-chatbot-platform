/**
 * Password Utility
 *
 * Responsible for:
 * - Hashing passwords
 * - Comparing passwords
 *
 * We never store plain text passwords
 * in the database.
 */

import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hash a plain password
 */
export const hashPassword = async (
  password: string
): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare plain password with hash
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(
    password,
    hashedPassword
  );
};