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
import { comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { LoginInput } from "../types/auth.types";


/**
 * Signup user
 */
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
      "User already exists same email",
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

/**
 * Login user
 */
export const loginUser = async (
  data: LoginInput
) => {

  const user =
    await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const isPasswordValid =
    await comparePassword(
      data.password,
      user.password
    );

  if (!isPasswordValid) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const token =
    generateToken({
      userId: user.id,
      email: user.email,
    });

  const { password, ...userWithoutPassword } =
    user;

  return {
    user: userWithoutPassword,
    token,
  };
};

/**
 * Get current user by ID
 */
export const getCurrentUser = async (
  userId: string
) => {

  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};