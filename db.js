// db.js - MongoDB connection logic
import mongoose from 'mongoose';

// MongoDB connection string (replace with your own MongoDB URI)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://skyshipstorelimited:ywMaxfvNddBrMmLX@cluster0.hfrku.mongodb.net/wolftest?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      // If already connected, no need to reconnect
      return;
    }
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
