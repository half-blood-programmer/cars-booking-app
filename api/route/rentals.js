import express from "express";
import {
  createRental,
  deleteRental,
  getAllRental,
  getRental,
  updateRental,
} from "../controllers/rentalController.js";
import { createError } from "../utilities/error.js";
import { verifyAdmin, verifyUser } from "../utilities/verifyToken.js";

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
router.post("/create", verifyAdmin, createRental);

//call controller to update a Rental
router.put("/update/:id", verifyAdmin, updateRental);

//call controller to delete a Rental
router.delete("/delete/:id", verifyAdmin, deleteRental);

//call controller to get a Rental
router.get("/get/:id", verifyAdmin, getRental);

//call controller to get all Rentals
router.get("/get", verifyAdmin, getAllRental);

export default router;
