import express from "express";
import Rental from "../models/Rental.js";
import { createError } from "../utilities/error.js";

const router = express.Router();

//Rental index link
router.get("/", (req, res, next) => {
  try {
    res.send("Hello, this is Rentals endpoint.");
  } catch (err) {
    next(createError(404, "Cannot Reach This site"));
  }
});

//create a Rental
router.post("/create", async (req, res, next) => {
  const newRental = new Rental(req.body);

  try {
    const savedRental = await newRental.save();
    res.status(200).json(savedRental);
  } catch (err) {
    next(createError(404, "Unable to Add this Rental"));
  }
});

//update a Rental
router.put("/update/:id", async (req, res, next) => {
  try {
    const updatedRental = await Rental.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRental);
  } catch (err) {
    next(createError(404, "Unable to Update this Rental"));
  }
});

//delete a Rental
router.delete("/delete/:id", async (req, res, next) => {
  try {
    await Rental.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(`Rental with id : ${req.params.id} successfully deleted`);
  } catch (err) {
    next(createError(404, "Unable to Delete this Rental"));
  }
});

//get a Rental
router.get("/get/:id", async (req, res, next) => {
  try {
    const getRental = await Rental.findById(req.params.id);
    res.status(200).json(getRental);
  } catch (err) {
    next(createError(404, "There is no data found."));
  }
});

//get all Rentals
router.get("/get", async (req, res, next) => {
  try {
    const getAllRental = await Rental.find();
    res.status(200).json(getAllRental);
  } catch (err) {
    next(createError(404, "There is no data yet."));
  }
});

export default router;
