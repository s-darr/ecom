import express from "express";
import { buyCartItems } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/buy", verifyToken, buyCartItems);

export default router;
