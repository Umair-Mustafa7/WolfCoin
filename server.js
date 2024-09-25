require('dotenv').config(); // To use environment variables from .env

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes); // Define the route for user-related APIs

// Import routes for your API (such as saving gems)
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Start the Telegram bot
require('./telegramBot'); // This will start the Telegram bot

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log('Error connecting to MongoDB:', err));
