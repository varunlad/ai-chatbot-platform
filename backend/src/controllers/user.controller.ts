import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { createUserSchema } from "../validations/user.validation";

/**
 * Creates a new user
 */
export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    /**
     * Validate incoming request body
     */
    const validatedData =
      createUserSchema.parse(req.body);

    /**
     * Create user in database
     */
    const user = await createUser(validatedData);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }
};