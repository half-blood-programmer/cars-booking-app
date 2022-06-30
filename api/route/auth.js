import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

//auth
router.get("/", (req, res) => {
  res.send("Hello, this is auth endpoint.");
});

// call controller to register
router.post("/register", register);

// call controller to login
router.post("/login", login);

//call controller to update a User
// router.put("/update/:id", updateUser);

//call controller to delete a User

//call controller to get a User
// router.get("/get/:id", getUser);

//call controller to get all Users
// router.get("/get", getAllUser);

export default router;
