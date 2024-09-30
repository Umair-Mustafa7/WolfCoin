const express = require('express');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User model for MongoDB
const User = mongoose.model('User', new mongoose.Schema({
  telegramId: { type: String, unique: true },  // Unique identifier for each Telegram user
  username: String,  // Telegram username
  gems: { type: Number, default: 0 },  // Gem balance for each user
}));

// Initialize Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Bot command to register new users or greet existing users
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || 'NoUsername'; // Telegram username

  let user = await User.findOne({ telegramId: chatId });
  if (!user) {
    // Create a new user if not found
    user = new User({ telegramId: chatId, username });
    await user.save();
    bot.sendMessage(chatId, `Welcome, ${username}! You are now registered.`);
  } else {
    bot.sendMessage(chatId, `Welcome back, ${username}! You have ${user.gems} gems.`);
  }
});

// Bot command to retrieve gem balance
bot.onText(/\/getgems/, async (msg) => {
  const chatId = msg.chat.id;
  const user = await User.findOne({ telegramId: chatId });
  if (user) {
    bot.sendMessage(chatId, `You have ${user.gems} gems.`);
  } else {
    bot.sendMessage(chatId, "You're not registered. Send /start to register.");
  }
});

// Bot command to add gems
bot.onText(/\/addgems/, async (msg) => {
  const chatId = msg.chat.id;
  const user = await User.findOne({ telegramId: chatId });
  if (user) {
    user.gems += 100; // Add 100 gems
    await user.save();
    bot.sendMessage(chatId, `You now have ${user.gems} gems.`);
  } else {
    bot.sendMessage(chatId, "You need to register first. Send /start to register.");
  }
});

// API endpoint to fetch user gems (for frontend)
app.get('/api/gems', async (req, res) => {
  const telegramId = req.query.telegramId; // Fetch by telegramId
  const user = await User.findOne({ telegramId });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ gems: user.gems });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
