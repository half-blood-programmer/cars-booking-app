import express from "express";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

//vehicles
router.get("/", (req, res) => {
  res.send("Hello, this is vehicles endpoint.");
});

//create a vehicle
router.post("/create", async (req, res) => {
  const newVehicle = new Vehicle(req.body);

  try {
    const savedVehicle = await newVehicle.save();
    res.status(200).json(savedVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a vehicle

//delete a vehicle

//get a vehicle

//get all vehicles

export default router;
