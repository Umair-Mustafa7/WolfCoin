import { getUserData } from '../src/services/database';

export default async function handler(req, res) {
  const telegramId = '6187296748'; // Replace with real Telegram ID

  try {
    const user = await getUserData(telegramId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
