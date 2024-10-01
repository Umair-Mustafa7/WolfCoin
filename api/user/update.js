// /api/user/update.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { telegramId, gems, level } = req.body;

  try {
    // Update user data in MongoDB
    const updatedUser = await prisma.user.update({
      where: { telegramId },
      data: { gems, level },
    });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
