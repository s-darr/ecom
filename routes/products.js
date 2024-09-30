import express from "express";
import {
  getProducts,
  addProduct,
  buyProduct,
} from "../controllers/productsController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/sell", verifyToken, addProduct);

export default router;
