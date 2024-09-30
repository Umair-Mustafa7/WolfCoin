require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./users'); // Point to the new users.js route inside the api folder

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);

// Export the app as a module for serverless deployment
module.exports = app;
