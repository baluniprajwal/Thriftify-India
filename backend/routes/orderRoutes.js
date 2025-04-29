import express from "express";
import { createOrder, getOrderById, updateOrderToDelivered, updateOrderToPaid } from "../controllers/orderController.js";
import { protect } from "../middlewares/auth.js";


const router = express.Router();

router.post("/", protect, createOrder);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, updateOrderToDelivered);

export default router;
