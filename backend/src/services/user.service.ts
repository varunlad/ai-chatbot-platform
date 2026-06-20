import { prisma } from "../config/prisma";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (
  data: CreateUserInput
) => {
  return prisma.user.create({
    data,
  });
};