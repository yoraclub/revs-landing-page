import { Request, Response, NextFunction } from "express";

/**
 * Global error handling middleware
 * Catches all unhandled errors and returns JSON responses
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Server error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Send JSON error response
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

/**
 * Async route handler wrapper
 * Catches errors from async route handlers and passes to error middleware
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
