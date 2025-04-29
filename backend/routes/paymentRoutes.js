import express from "express"
import { createStripeCheckoutSession} from "../controllers/paymentController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();
router.post("/checkout",protect,createStripeCheckoutSession);


export default router;