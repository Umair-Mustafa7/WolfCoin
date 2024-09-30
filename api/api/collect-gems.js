import { updateUserGems } from '../../services/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { gems } = req.body;

    // Replace this with real user info (e.g., from session or Telegram login)
    const telegramId = 'example-telegram-id';

    try {
      await updateUserGems(telegramId, gems);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error updating gems:", error);
      res.status(500).json({ error: 'Failed to update gems' });
    }
  }
}
