import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create app
const app = express();

// Middlewares

// ✅ Proper CORS config to support cookies
app.use(cors({
  origin: 'http://localhost:5173', // Your React frontend origin
  credentials: true               // Allow credentials (cookies, auth headers)
}));

app.use(cookieParser());          // ✅ Needed to parse cookies
app.use(express.json());          // Parse JSON requests
app.use(morgan('dev'));           // Log HTTP requests

// Routes
app.use('/api/v1/user', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

