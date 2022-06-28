import express from "express";

const router = express.Router();

//cars
router.get("/", (req, res) => {
  res.send("Hello, this is cars endpoint.");
});

export default router;
