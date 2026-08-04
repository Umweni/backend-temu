const express = require("express");
const router = express.Router();
const Cart = require("../model/cart");
const Product = require("../model/product");
const mongoose = require("mongoose");

// Create a new cart
router.post("/add-cart", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ status: "error", msg: "Missing required fields" });
  }

  // Validate productId format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ status: "error", msg: "Invalid product ID" });
  }

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ status: "error", msg: "Product not found" });
    }

    // Find or create cart for user
    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      userCart = new Cart({ userId, items: [] });
    }

    // Check if product already in cart
    const existingItem = userCart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userCart.items.push({ productId, quantity });
    }

    // Save cart
    await userCart.save();

    return res.status(200).json({ status: "ok", msg: "Product added to cart", data: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "Server error", error: error.message });
  }
});

module.exports = router;