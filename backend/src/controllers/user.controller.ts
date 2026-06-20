/**
 * User Controller
 *
 * Receives requests and returns responses.
 */

import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { createUserSchema } from "../validations/user.validation";
import { asyncHandler } from "../utils/asyncHandler";

export const createUserController =
  asyncHandler(async (req: Request, res: Response) => {

    /**
     * Validate request body
     */
    const validatedData =
      createUserSchema.parse(req.body);

    /**
     * Create user in database
     */
    const user =
      await createUser(validatedData);

    res.status(201).json({
      success: true,
      data: user,
    });
  });