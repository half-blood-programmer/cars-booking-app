import express from "express";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicle,
  getVehicle,
  updateVehicle,
} from "../controllers/vehicleController.js";
import { createError } from "../utilities/error.js";
import { verifyAdmin, verifyUser } from "../utilities/verifyToken.js";

const router = express.Router();

//Vehicle index link
router.get("/check", (req, res, next) => {
  try {
    res.send("Hello, this is Vehicles endpoint.");
  } catch (err) {
    next(createError(404, "Cannot Reach This site"));
  }
});

//call controller to create a Vehicle
router.post("/create/:hotelId", verifyUser, createVehicle);

//call controller to update a Vehicle
router.put("/update/:id", verifyUser, updateVehicle);

//call controller to delete a Vehicle
router.delete("/delete/:id", verifyUser, deleteVehicle);

//call controller to get a Vehicle
router.get("/get/:id", verifyUser, getVehicle);

//call controller to get all Vehicles
router.get("/", verifyUser, getAllVehicle);

export default router;
