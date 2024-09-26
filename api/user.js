import mongoose from 'mongoose';
import User from '../models/User'; // Assuming you have a Mongoose model defined

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

// Main API handler function
export default async function handler(req, res) {
  await connectToDatabase(); // Ensure MongoDB is connected

  if (req.method === 'GET') {
    const { telegramId } = req.query;
    try {
      const user = await User.findOne({ telegramId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  if (req.method === 'POST') {
    const { telegramId, gems, level } = req.body;
    try {
      let user = await User.findOne({ telegramId });
      if (!user) {
        user = new User({
          telegramId,
          gems,
          level,
        });
      } else {
        user.gems = gems || user.gems;
        user.level = level || user.level;
      }
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
