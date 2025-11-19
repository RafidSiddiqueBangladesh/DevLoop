import { Request, Response, NextFunction } from "express";

/**
 * Authentication middleware
 * TODO: Implement JWT verification when backend is fully set up
 */

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Verify JWT token from request headers
    // const token = req.headers.authorization?.replace('Bearer ', '');
    // if (!token) {
    //   return res.status(401).json({ error: 'No authorization token' });
    // }
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // req.user = decoded as any;

    // For now, continue without authentication
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const optionalAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Optional authentication - doesn't require token
    // TODO: Implement optional JWT verification
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
