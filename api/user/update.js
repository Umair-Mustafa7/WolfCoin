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
  if (req.method === 'PUT') {
    try {
      const body = await parseJsonBody(req);  // Parse the JSON body
      const { telegramId, gems, level } = body;

      if (!telegramId || gems === undefined || level === undefined) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const updatedUser = await prisma.user.update({
        where: { telegramId },
        data: { gems, level },
      });

      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
