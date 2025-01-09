import express, { NextFunction, Request, Response } from "express";
import pool from "../database/db";
import { AddVehicle, UpdateVehicle } from "../models/vehicle.model";

const router = express.Router();

router.get("/getvehicles", async (req: Request, res: Response) => {
  try {
    const result = await pool.from("vehicles").select(`
      *,
      customer:customers(id, email, first_name, last_name, phone_number),
      invoices:invoices(id, customer_id, vehicle_id, amount, invoice_date, due_date, paid)
      `);
    res.json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/getvehicle/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.from("vehicles").select("*").match({ id: +id });
    res.json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get(
  "/getvehiclesbycustomer/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const result = await pool
        .from("vehicles")
        .select("*")
        .match({ customer_id: +id });
      res.json(result.data);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/addvehicle", async (req: Request<{}, {}, AddVehicle>, res) => {
  const { customer_id, garage, license_plate, type } = req.body;

  try {
    const result = await pool
      .from("vehicles")
      .insert({
        customer_id,
        garage,
        license_plate,
        type,
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
  "/updatevehicle",
  async (req: Request<{}, {}, UpdateVehicle>, res) => {
    const { customer_id, garage, license_plate, type, id } = req.body;

    try {
      const result = await pool
        .from("vehicles")
        .update({
          customer_id,
          garage,
          license_plate,
          type,
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
  "/deletevehicle",
  async (req: Request<{}, {}, { id: number }>, res) => {
    const { id } = req.body;

    try {
      const result = await pool.from("vehicles").delete().eq("id", id);
      res.json(result);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
