import { PrismaClient } from '@prisma/client';

const parseJsonBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = await parseJsonBody(req); // Parse the JSON body
      const { telegramId, firstName, lastName } = body;

      if (!telegramId || !firstName || !lastName) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      let user = await prisma.user.findUnique({
        where: { telegramId },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            telegramId,
            firstName,
            lastName,
            gems: 0,
            level: 1,
          },
        });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Error handling user data:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
