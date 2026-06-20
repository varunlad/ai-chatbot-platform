/**
 * Auth Service
 *
 * Handles business logic for:
 * - Signup
 * - Login
 */

import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { hashPassword } from "../utils/password";
import { SignupInput } from "../types/auth.types";

export const signupUser = async (
  data: SignupInput
) => {

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      409
    );
  }

  const hashedPassword =
    await hashPassword(data.password);

  const user =
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

  return user;
};