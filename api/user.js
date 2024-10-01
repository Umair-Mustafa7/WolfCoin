import { PrismaClient } from '@prisma/client';

// Helper function to parse JSON in serverless functions
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
      const body = await parseJsonBody(req);  // Manually parse the JSON body
      const { telegramId, firstName, lastName } = body;  // Destructure the parsed body

      // Check if the required fields are present
      if (!telegramId || !firstName || !lastName) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      // Check if the user already exists in the database
      let user = await prisma.user.findUnique({
        where: { telegramId },
      });

      if (!user) {
        // Create a new user if it doesn't exist
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
