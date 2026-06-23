/**
 * Auth Controller
 *
 * Handles authentication requests.
 */

import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signupSchema } from "../validations/auth.validation";
import { signupUser } from "../services/auth.service";
import { loginSchema } from "../validations/auth.validation";
import { loginUser } from "../services/auth.service";
import { getCurrentUser } from "../services/auth.service";

export const signupController = asyncHandler(
  async (req: Request, res: Response) => {
    /**
     * Validate request body
     */
    const validatedData = signupSchema.parse(req.body);

    /**
     * Create user
     */
    const user = await signupUser(validatedData);

    /**
     * Remove password before response
     */
    const { password, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  },
);

/**
 * Login Controller
 */
export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
      },
    });
  },
);

/**
 * Current Logged In User
 */
export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getCurrentUser(req.user!.userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  },
);

/**
 * Logout User
 */
export const logoutController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      res.clearCookie("accessToken");

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    }
  );