import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./route/auth.js";
import usersRoute from "./route/users.js";
import vehiclesRoute from "./route/vehicles.js";
import rentalsRoute from "./route/rentals.js";
import cookieParser from "cookie-parser";

// init express app
const app = express();
// init json usage
app.use(express.json());
// init .env
dotenv.config();
//cookie
app.use(cookieParser());

//initial connection to mongoDB
const connect = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Database.");
  } catch (error) {
    console.log("Unable to Connect Database.");
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

// rentals middleware
app.use("/api/rentals", rentalsRoute);

// vehicles middleware
app.use("/api/vehicles", vehiclesRoute);

//handle erorr middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  // returning error detail
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
