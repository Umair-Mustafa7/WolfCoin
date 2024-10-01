import connectDB from '../../db';  // Import MongoDB connection
import User from '../../models/User';  // Import the User model

export default async function handler(req, res) {
  await connectDB();  // Connect to the database

  if (req.method === 'POST') {
    const { telegramId, gems } = req.body;

    if (!telegramId || !gems) {
      return res.status(400).json({ error: 'Telegram ID or gems not provided' });
    }

    try {
      // Find the user by Telegram ID
      let user = await User.findOne({ telegramId });

      if (!user) {
        // If the user doesn't exist, create a new one
        user = new User({ telegramId, gems });
        await user.save();
        console.log(`Created new user with Telegram ID: ${telegramId}, Gems: ${gems}`);
      } else {
        // If the user exists, update their gem count
        user.gems += gems;
        await user.save();
        console.log(`Updated user ${telegramId} with new gem count: ${user.gems}`);
      }

      // Respond with the updated gem count
      return res.status(200).json({ success: true, gems: user.gems });
    } catch (error) {
      console.error('Error updating gems:', error);
      return res.status(500).json({ error: 'Failed to update gems' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
