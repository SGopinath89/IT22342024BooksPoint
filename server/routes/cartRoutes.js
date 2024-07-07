import express from "express";
const router = express.Router();
import CartItem from "../models/CartItem.js";

// Fetch cart items
router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
