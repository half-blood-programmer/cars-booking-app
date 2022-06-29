import Rental from "../models/Rental.js";
import { createError } from "../utilities/error.js";

// create a Rental
export const createRental = async (req, res, next) => {
  const newRental = new Rental(req.body);

  try {
    const savedRental = await newRental.save();
    res.status(200).json(savedRental);
  } catch (err) {
    next(createError(404, "Unable to Add this Rental"));
  }
};

// update a rental
export const updateRental = async (req, res, next) => {
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
};

//delete a Rental
export const deleteRental = async (req, res, next) => {
  try {
    await Rental.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(`Rental with id : ${req.params.id} successfully deleted`);
  } catch (err) {
    next(createError(404, "Unable to Delete this Rental"));
  }
};

//get a Rental
export const getRental = async (req, res, next) => {
  try {
    const getedRental = await Rental.findById(req.params.id);
    res.status(200).json(getedRental);
  } catch (err) {
    next(createError(404, "There is no data found."));
  }
};

//get all Rentals
export const getAllRental = async (req, res, next) => {
  try {
    const getedAllRental = await Rental.find();
    res.status(200).json(getedAllRental);
  } catch (err) {
    next(createError(404, "There is no data yet."));
  }
};
