import express, { Request } from "express";
import pool from "../database/db";
import { AddVehicle, UpdateVehicle } from "../models/vehicle.models";

const router = express.Router();

router.get("/getvehicles", async (req, res) => {
  try {
    const result = await pool.from("vehicles").select("*");
    res.json(result.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addvehicle", async (req: Request<{}, {}, AddVehicle>, res) => {
  const { customer_id, garage, license_plate, type } = req.body;

  try {
    const result = await pool.from("vehicles").insert({
      customer_id,
      garage,
      license_plate,
      type,
    });
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
        .match({ id });
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
      const result = await pool.from("vehicles").delete().match({ id });
      res.json(result);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
