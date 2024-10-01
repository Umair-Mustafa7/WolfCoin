import crypto from 'crypto';
import { storeTelegramUser } from '../../services/database';

export default async function handler(req, res) {
  const { hash, id, first_name, username } = req.query;

  // Validate the Telegram login
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const dataCheckString = `id=${id}&username=${username}&first_name=${first_name}`;
  const secretKey = crypto.createHash('sha256').update(token).digest();
  const expectedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (hash === expectedHash) {
    // Store the authenticated user in the database
    const telegramId = id;
    await storeTelegramUser(telegramId, first_name, username);

    res.status(200).json({ telegramId, username, first_name });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
