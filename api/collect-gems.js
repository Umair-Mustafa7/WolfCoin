export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract Telegram ID from bot interaction (message payload)
    const telegramId = req.body.message?.from?.id;

    if (!telegramId) {
      return res.status(400).json({ error: 'No Telegram ID found in the message' });
    }

    const { gems } = req.body;  // Number of gems to add

    try {
      await updateUserGems(telegramId, gems);

      res.status(200).json({ success: true, gems: updatedGems });
    } catch (error) {
      console.error('Error updating gems:', error);
      res.status(500).json({ error: 'Failed to update gems' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
