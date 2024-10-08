// controllers/orderController.js
/**
 * This file contains controller functions for handling orders after being placed in the cart.
 * It allows the user to place and order and update the cart and relevant statuses such as quantity.
 */
import { createOrder } from "../models/Order.js";
import pool from "../config/db.js";

export const buyCartItems = async (req, res) => {
  const buyerId = req.user.id;

  try {
    const cartItemsQuery = `
      SELECT product_id, quantity FROM Cart WHERE buyer_id = $1
    `;
    const cartItemsResult = await pool.query(cartItemsQuery, [buyerId]);
    const cartItems = cartItemsResult.rows;

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const newOrder = await createOrder(buyerId, cartItems);

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ error: "Server error while placing the order" });
  }
};
