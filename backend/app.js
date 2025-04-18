import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config();


connectDB();


const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));

app.use(cookieParser());        
app.use(express.json());          
app.use(morgan('dev'));           

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

