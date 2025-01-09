import express from "express";
import db from "../database/db";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      res.status(401).send({ error: "Ongeldig e-mailadres of wachtwoord." });
      return;
    }

    res.json(data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error. Probeer later opnieuw.");
  }
});

router.get("/logout", async (req, res) => {
  try {
    const { error } = await db.auth.signOut();

    if (error) {
      console.error(error.message);
      res.status(500).send(error.message);
      return;
    }

    res.status(200).send();
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
