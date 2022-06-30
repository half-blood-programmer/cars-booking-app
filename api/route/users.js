import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken, verifyUser } from "../utilities/verifyToken.js";

const router = express.Router();

//users
router.get("/", (req, res) => {
  res.send("Hello, this is users endpoint.");
});

// cheking authenticatin
router.get("/check", verifyToken, (req, res, next) => {
  res.send("user authenticated");
});

// call controller to update a User
router.put("/update/:id", verifyUser, updateUser);

// call controller to delete a User
router.delete("/delete/:id", verifyUser, deleteUser);

// call controller to get a User
router.get("/get/:id", verifyUser, getUser);

// call controller to get all Users
router.get("/get", verifyUser, getAllUser);

export default router;
