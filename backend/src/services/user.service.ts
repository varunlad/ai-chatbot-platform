import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

/**
 * Creates a new user.
 */
export const createUser = async (
  data: CreateUserInput
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

  return prisma.user.create({
    data,
  });
};