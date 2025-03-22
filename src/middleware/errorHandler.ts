import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '@src/common/HttpStatusCodes'; // Assuming you have status codes constants

// Custom error class (Optional if you don't already have it)
export class RouteError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'RouteError';
  }
}

// Custom error handler function to throw errors
export const throwError = (message: string, statusCode: number): never => {
  throw new RouteError(message, statusCode);
};

// Global error handling middleware for Express
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // If error is an instance of RouteError, use its status code and message
  if (err instanceof RouteError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle MongoDB specific errors like duplicate key errors (as an example)
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Duplicate key error, please check your input.',
    });
  }

  console.error(err); // Log error for debugging purposes
  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'An unexpected error occurred.',
  });
};
