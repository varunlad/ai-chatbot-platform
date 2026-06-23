/**
 * Authentication Middleware
 *
 * Verifies JWT token from HttpOnly Cookie
 * and attaches user info to req.user
 */

import { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  /**
   * Read token from HttpOnly Cookie
   */
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new AppError(
      "Authentication required",
      401,
    );
  }

  /**
   * Verify JWT Token
   */
  const decoded = verifyToken(token) as {
    userId: string;
    email: string;
  };

  /**
   * Attach user data to request
   */
  req.user = {
    userId: decoded.userId,
    email: decoded.email,
  };

  next();
};