import mongoose from 'mongoose';
import User from '../models/User'; // Assuming your Mongoose model is in models/User.js

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

// Main API handler
export default async function handler(req, res) {
  // Connect to the database before handling any request
  await connectToDatabase();

  // Handle GET requests (to fetch user data)
  if (req.method === 'GET') {
    const { telegramId } = req.query; // Extract telegramId from the query string
    try {
      const user = await User.findOne({ telegramId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user); // Send back the user data (gems, level, etc.)
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  // Handle POST requests (to update or create user data)
  if (req.method === 'POST') {
    const { telegramId } = req.query;
    const { gems, level, username } = req.body; // Extract the data from the request body

    try {
      // Find the user by telegramId
      let user = await User.findOne({ telegramId });
      if (!user) {
        // If the user doesn't exist, create a new one
        user = new User({
          telegramId,
          username,
          gems,
          level,
        });
      } else {
        // Update existing user
        user.gems = gems || user.gems;
        user.level = level || user.level;
        user.username = username || user.username;
      }
      await user.save(); // Save the user data in MongoDB
      return res.status(200).json(user); // Return the updated user data
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  // Handle other request methods (like DELETE, PUT) if needed
  return res.status(405).json({ message: 'Method not allowed' });
}
