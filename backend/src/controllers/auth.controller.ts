/**
 * Auth Controller
 *
 * Handles authentication requests.
 */

import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signupSchema } from "../validations/auth.validation";
import { signupUser } from "../services/auth.service";

export const signupController = asyncHandler(
  async (req: Request, res: Response) => {
    /**
     * Validate request body
     */
    const validatedData =
      signupSchema.parse(req.body);

    /**
     * Create user
     */
    const user = await signupUser(
      validatedData
    );

    /**
     * Remove password before response
     */
    const { password, ...userWithoutPassword } =
      user;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  }
);