import express from "express";
import { protect } from "../middlewares/auth.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/all",getAllProducts);
router.post("/create",createProduct);
router.get("/search",searchProducts);
router.route("/:id").get(getProductById).delete(deleteProduct);




export default router;
