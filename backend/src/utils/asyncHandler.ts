/**
 * Utility wrapper for async controllers.
 *
 * Any error thrown inside the controller
 * automatically gets passed to Express
 * error middleware.
 */

import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };