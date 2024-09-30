require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./users'); // Adjust path as per your folder structure

const app = express();
let isConnected = false; // Track MongoDB connection status to avoid reconnecting on every function call

app.use(cors());
app.use(express.json());

// MongoDB Connection Logic
const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return; // If already connected, return to avoid reconnecting
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true; // Set connected status
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the serverless function if MongoDB connection fails
  }
};

// Call the connection function before handling any routes
app.use(async (req, res, next) => {
  await connectToDatabase(); // Ensure MongoDB connection before each request
  next();
});

// Routes
app.use('/api/users', userRoutes);

// Export the app for Vercel serverless function
module.exports = app;
