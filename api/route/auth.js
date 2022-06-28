import express from "express";

const router = express.Router();

//auth
router.get("/", (req, res) => {
  res.send("Hello, this is auth endpoint.");
});

//register
router.get("/register", (req, res) => {
  res.send("Hello, this is auth register endpoint.");
});

export default router;
