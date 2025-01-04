import express from "express";
import db from "../database/db";

const router = express.Router();

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
      return;
    }
    res.json(data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
