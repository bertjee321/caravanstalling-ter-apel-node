import { User, UserResponse } from "@supabase/auth-js";
import { NextFunction, Request, Response } from "express";
import db from "../database/db";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

// Middleware to verify JWT token
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const response: UserResponse = await db.auth.getUser(token);

    if (response.error) {
      res.status(403).json({ error: "Invalid or expired token" });
      return;
    }
    req.user = response.data.user; // Attach user data to request object
  } catch (error) {
    res.status(403).json({ error: "Invalid token or expired" });
    return;
  }

  next();
};
