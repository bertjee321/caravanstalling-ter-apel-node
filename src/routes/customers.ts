import express, { NextFunction, Request, Response } from "express";
import pool from "../database/db";
import { AddCustomer, UpdateCustomer } from "../models/customer.models";

const router = express.Router();

router.get(
  "/getcustomers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await pool.from("customers").select("*");
      res.json(result.data);
    } catch (err: any) {
      console.error(err.message);
      next(err);
    }
  }
);

router.post("/addcustomer", async (req: Request<{}, {}, AddCustomer>, res) => {
  const { email, first_name, last_name, phone_number } = req.body;

  try {
    const result = await pool.from("customers").insert({
      email,
      first_name,
      last_name,
      phone_number,
    });
    res.json(result);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/updatecustomer",
  async (req: Request<{}, {}, UpdateCustomer>, res) => {
    const { email, first_name, last_name, phone_number, id } = req.body;

    try {
      const result = await pool
        .from("customers")
        .update({
          email,
          first_name,
          last_name,
          phone_number,
        })
        .match({ id });
      res.json(result);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete(
  "/deletecustomer",
  async (req: Request<{}, {}, { id: number }>, res) => {
    const { id } = req.body;

    try {
      const result = await pool.from("customers").delete().match({ id });
      res.json(result);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
