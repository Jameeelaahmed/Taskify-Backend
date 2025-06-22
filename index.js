const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/userRoutes');
const boardRouter = require('./routes/boardRoutes');
const otpRouter = require('./routes/otpRoutes');

const app = express();
const compression = require('compression');

// Enable response compression
app.use(compression());

// ✅ Proper CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://taskify-frontend.vercel.app'],
    credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/otp', otpRouter);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(3000, () => {
            console.log('🚀 Server running at http://localhost:3000');
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
    });
