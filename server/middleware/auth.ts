import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    fullName?: string;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : undefined;
    if (!token) {
      return res.status(401).json({ error: "No authorization token" });
    }
    const secret = process.env.JWT_SECRET || "dev-secret";
    const decoded = jwt.verify(token, secret) as any;
    req.user = { id: decoded.id, email: decoded.email, fullName: decoded.fullName };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const optionalAuth = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : undefined;
    if (token) {
      const secret = process.env.JWT_SECRET || "dev-secret";
      const decoded = jwt.verify(token, secret) as any;
      req.user = { id: decoded.id, email: decoded.email, fullName: decoded.fullName };
    }
  } catch (_) {
    // ignore errors; proceed unauthenticated
  }
  next();
};
