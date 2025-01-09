import express, { Request } from "express";
import pool from "../database/db";
import { AddInvoice, UpdateInvoice } from "../models/invoice.model";

const router = express.Router();

router.get("/getinvoices", async (req, res) => {
  try {
    const result = await pool.from("invoices").select(`
      *,
      customer:customers(id, email, first_name, last_name, phone_number),
      vehicle:vehicles(id, customer_id, garage, license_plate, type)
    `);
    res.json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/getinvoice/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.from("invoices").select("*").match({ id: +id });
    res.json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addinvoice", async (req: Request<{}, {}, AddInvoice>, res) => {
  const { amount, customer_id, due_date, invoice_date, vehicle_id, paid } =
    req.body;

  try {
    const result = await pool
      .from("invoices")
      .insert({
        amount,
        customer_id,
        due_date,
        invoice_date,
        vehicle_id,
        paid,
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
  "/updateinvoice",
  async (req: Request<{}, {}, UpdateInvoice>, res) => {
    const {
      amount,
      customer_id,
      due_date,
      invoice_date,
      vehicle_id,
      id,
      paid,
    } = req.body;

    try {
      const result = await pool
        .from("invoices")
        .update({
          amount,
          customer_id,
          due_date,
          invoice_date,
          vehicle_id,
          paid,
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
  "/deleteinvoice",
  async (req: Request<{}, {}, { id: number }>, res) => {
    const { id } = req.body;

    try {
      const result = await pool.from("invoices").delete().eq("id", id);
      res.json(result);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
