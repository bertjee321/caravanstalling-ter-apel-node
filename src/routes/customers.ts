import express, { NextFunction, Request, Response } from "express";
import pool from "../database/db";
import { AddCustomer, UpdateCustomer } from "../models/customer.model";

const router = express.Router();

router.get(
  "/getcustomers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await pool.from("customers").select(`
        *,
        vehicles:vehicles(id, customer_id, garage, license_plate, type),
        invoices:invoices(id, customer_id, vehicle_id, amount, invoice_date, due_date, paid)
      `);
      res.json(result.data);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/getcustomer/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.from("customers").select("*").match({ id: +id });
    res.json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addcustomer", async (req: Request<{}, {}, AddCustomer>, res) => {
  const { email, first_name, last_name, phone_number } = req.body;

  try {
    const result = await pool
      .from("customers")
      .insert({
        email,
        first_name,
        last_name,
        phone_number,
      })
      .select("id")
      .single();
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
        .eq("id", id);
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
      const result = await pool.from("customers").delete().eq("id", id);
      res.json(result);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
