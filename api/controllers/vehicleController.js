import express from "express";
import Vehicle from "../models/Vehicle.js";
import Rental from "../models/Rental.js";
import { createError } from "../utilities/error.js";

const router = express.Router();

//vehicle index link
router.get("/", (req, res) => {
  res.send("Hello, this is vehicles endpoint.");
});

//create a vehicle
export const createVehicle = async (req, res, next) => {
  //catch rental id for vehicle
  const rentalId = req.params.rentalId;

  //add vehicle in a rental
  const newVehicle = new Vehicle(req.body);

  try {
    const savedVehicle = await newVehicle.save();

    try {
      await Rental.findByIdAndUpdate(rentalId, {
        $push: { vehicles: savedVehicle._id },
      });
      res.status(200).json(savedVehicle);
    } catch {
      next(createError(404, "Unable to Add Vehicle in this Rental"));
    }
  } catch (err) {
    next(createError(404, "Unable to Add Vehicle in this Rental"));
  }
};

// update a Vehicle
export const updateVehicle = async (req, res, next) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedVehicle);
  } catch (err) {
    next(createError(404, "Unable to Update this Vehicle"));
  }
};

//delete a Vehicle
export const deleteVehicle = async (req, res, next) => {
  //catch rental id for vehicle
  const rentalId = req.params.rentalId;
  try {
    await Vehicle.findByIdAndDelete(req.params.id);

    try {
      await Rental.findByIdAndDelete(rentalId, {
        $pull: { vehicles: req.params.id },
      });
      res
        .status(200)
        .json(`Vehicle with id : ${req.params.id} successfully deleted`);
    } catch {
      next(createError(404, "Unable to Delete Vehicle in this Rental"));
    }
  } catch (err) {
    next(createError(404, "Unable to Delete this Vehicle"));
  }
};

//get a Vehicle
export const getVehicle = async (req, res, next) => {
  try {
    const getedVehicle = await Vehicle.findById(req.params.id);
    res.status(200).json(getedVehicle);
  } catch (err) {
    next(createError(404, "There is no data found."));
  }
};

//get all Vehicles
export const getAllVehicle = async (req, res, next) => {
  try {
    const getedAllVehicle = await Vehicle.find();
    res.status(200).json(getedAllVehicle);
  } catch (err) {
    next(createError(404, "There is no data yet."));
  }
};

export default router;
