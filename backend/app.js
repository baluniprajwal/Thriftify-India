import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Stripe from "stripe";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { stripeWebhook } from './controllers/paymentController.js';
import job from './utils/cronjob.js';

connectDB();

const app = express();
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

job.start();
app.use(cookieParser());
app.use(morgan('dev'));
app.use("/api/v1/payment/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '✅ Server is up and running!',
  });
});
// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:${PORT}");
});


