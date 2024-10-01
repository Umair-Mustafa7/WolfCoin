// /api/user.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { telegramId, firstName, lastName } = req.body;

  try {
    // Check if user exists in MongoDB by their telegramId
    let user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      // If user doesn't exist, create a new one
      user = await prisma.user.create({
        data: {
          telegramId,
          firstName: firstName || "Unknown",
          lastName: lastName || "",
          gems: 0,
          level: 1,
        },
      });
    }

    // Return the user data (existing or new)
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
