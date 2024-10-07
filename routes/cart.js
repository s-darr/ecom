import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addToCart);

router.get("/", verifyToken, getCart);

router.put("/update", verifyToken, updateCartItem);

router.delete("/remove", verifyToken, removeFromCart);

export default router;
