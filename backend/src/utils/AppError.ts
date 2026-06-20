/**
 * AppError
 *
 * Custom error class used throughout
 * the application.
 *
 * Allows us to throw errors with
 * HTTP status codes.
 *
 * Example:
 *
 * throw new AppError(
 *   "User already exists",
 *   409
 * );
 * 
 */
// 401 Unauthorized
// 403 Forbidden
// 404 Not Found
// 409 Conflict
// 422 Validation Error
// 500 Internal Error

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
