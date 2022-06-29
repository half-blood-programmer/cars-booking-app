import express from "express";
import {
  createRental,
  deleteRental,
  getAllRental,
  getRental,
  updateRental,
} from "../controllers/rentalController.js";
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

//call controller to create a Rental
router.post("/create", createRental);

//call controller to update a Rental
router.put("/update/:id", updateRental);

//call controller to delete a Rental
router.delete("/delete/:id", deleteRental);

//call controller to get a Rental
router.get("/get/:id", getRental);

//call controller to get all Rentals
router.get("/get", getAllRental);

export default router;
