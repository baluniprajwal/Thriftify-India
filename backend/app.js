import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Stripe from 'stripe';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { stripeWebhook } from './controllers/paymentController.js';
import job from './utils/cronjob.js';

// Connect to DB
connectDB();

const app = express();
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ 1️⃣ CORS — set this up first
app.use(
  cors({
    origin: process.env.FRONTEND_URL?.replace(/\/$/, ''), // remove trailing slash if present
    credentials: true,
  })
);

// ✅ 2️⃣ Stripe webhook BEFORE express.json()
// Stripe requires the raw body to verify signatures
app.post(
  '/api/v1/payment/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

// ✅ 3️⃣ Normal middlewares AFTER webhook
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 4️⃣ Cron job (optional)
job.start();

// ✅ 5️⃣ Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '✅ Server is up and running!',
  });
});

// ✅ 6️⃣ API routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);

// ✅ 7️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

