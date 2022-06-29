import express from "express";

const router = express.Router();

//users
router.get("/", (req, res) => {
  res.send("Hello, this is users endpoint.");
});

export default router;
