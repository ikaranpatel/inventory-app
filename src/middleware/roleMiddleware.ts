import { Response, NextFunction } from 'express';

// Middleware to check if the user has a specific role
export const authorizeRole = (role: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role?.toLowerCase() !== role?.toLowerCase()) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};
