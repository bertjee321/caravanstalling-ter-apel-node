import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findUserByUsername } from "../models/user.model";

dotenv.config();

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Hash password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = createUser(username, hashedPassword);

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, username: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );

  res.status(201).json({ token });
  return;
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = findUserByUsername(email);
  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  } else {
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    res.json({ token });
    return;
  }
});

export default router;
