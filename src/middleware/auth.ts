// src/middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserBase } from "../models/user.model";

// Middleware to verify JWT token
export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    res.sendStatus(401); // Unauthorized if no token
    return;
  } else {
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token is invalid or expired
      }

      // Attach user information to request object
      req.user = user as UserBase;
      return next(); // Call the next middleware or route handler
    });
  }
};
