// telegramBot.js

const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import your user model

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected for Telegram Bot'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Replace with your actual Telegram bot token from BotFather
const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// When the bot receives a message
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from.id; // Telegram ID of the user
  const username = msg.from.username;
  const firstName = msg.from.first_name;
  const lastName = msg.from.last_name;

  // Reply to the user
  bot.sendMessage(chatId, `Hello ${firstName}, you're now registered for gem farming!`);

  // Store or update the user's data in MongoDB
  try {
    const user = await User.findOneAndUpdate(
      { telegramId }, // Find user by Telegram ID
      { telegramId, username, firstName, lastName, gems: 0 }, // Default gems = 0
      { new: true, upsert: true } // Create new user if doesn't exist
    );

    console.log('User saved to MongoDB:', user);
  } catch (err) {
    console.error('Error saving user data:', err);
  }
});
