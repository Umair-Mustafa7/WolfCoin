// Import required packages
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://skyshipstorelimited:ywMaxfvNddBrMmLX@cluster0.hfrku.mongodb.net/wolftest?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the user schema
const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  farmingData: { type: Object }, // Customize this based on what farming data you want to store
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Initialize the Telegram bot
const token = '8011852523:AAGzj2BtoTc3Rh6WW0L5xtuhWrHo9iZETec'; // Replace with your bot token
const bot = new TelegramBot(token, { polling: true });

// Handle the /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  // Check if the user already exists in the database
  let user = await User.findOne({ telegramId: chatId.toString() });

  if (!user) {
    // If the user does not exist, create a new entry
    user = new User({ telegramId: chatId.toString(), farmingData: {} });
    await user.save();
    bot.sendMessage(chatId, 'Welcome to the Farming App! Your data has been saved.');
  } else {
    bot.sendMessage(chatId, 'Welcome back to the Farming App! Your data is already saved.');
  }
});

// Handle the /update_farming_data command
bot.onText(/\/update_farming_data (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const newFarmingData = match[1]; // Get the new farming data from the message

  // Find the user and update their farming data
  await User.updateOne(
    { telegramId: chatId.toString() },
    { $set: { farmingData: { info: newFarmingData } } } // Customize this based on your data structure
  );

  bot.sendMessage(chatId, 'Your farming data has been updated.');
});

// Handle other commands as needed
