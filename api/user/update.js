import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { telegramId, gems, level } = req.body;

      // Validate the incoming data
      if (!telegramId || gems === undefined || level === undefined) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      // Check if the user exists
      let user = await prisma.user.findUnique({
        where: { telegramId: String(telegramId) },  // Ensure telegramId is treated as a string
      });

      if (!user) {
        // If the user does not exist, create a new user with initial values
        user = await prisma.user.create({
          data: {
            telegramId: String(telegramId),  // Ensure it's a string
            gems: 0,  // Start with 0 gems
            level: 1  // Start at level 1
          }
        });
      }

      // Update the user's gems and level
      const updatedUser = await prisma.user.update({
        where: { telegramId: String(telegramId) },  // Ensure telegramId is treated as a string
        data: { gems, level },
      });

      // Send success response
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error('Error updating user data:', error);  // Log the error for debugging
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
