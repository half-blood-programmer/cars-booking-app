import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./route/auth.js";
import usersRoute from "./route/users.js";
import vehiclesRoute from "./route/vehicles.js";
import carsRoute from "./route/cars.js";

const app = express();
app.use(express.json());
dotenv.config();

//initial connection to mongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Database.");
  } catch (error) {
    throw error;
  }
};

//Disconected handler
mongoose.connection.on("disconected", () => {
  console.log("Database disconected.");
});

//coneect from local to mongoDB
app.listen(8800, () => {
  connect();
});

// Check respond for /
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// middlewares //

// auth middleware
app.use("/api/auth", authRoute);

// users middleware
app.use("/api/users", usersRoute);

// vehicles middleware
app.use("/api/vehicles", vehiclesRoute);

// cars middleware
app.use("/api/cars", carsRoute);
