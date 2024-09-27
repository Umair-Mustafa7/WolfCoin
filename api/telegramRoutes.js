
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Function to send a message back to the user
const sendTelegramMessage = async (chatId, message) => {
  const token = '8011852523:AAGzj2BtoTc3Rh6WW0L5xtuhWrHo9iZETec'; // Replace with your actual token
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message,
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// POST route to handle Telegram bot webhook
router.post('/webhook', async (req, res) => {
  const telegramData = req.body;
    // Log the incoming data from Telegram
    console.log('Incoming Telegram data:', req.body);
  
    // Respond to Telegram to acknowledge the webhook
    res.status(200).send('Webhook received');


  if (telegramData.message) {
    const telegramId = telegramData.message.from.id;  // Get user ID from Telegram
    const username = telegramData.message.from.username || 'Anonymous';  // Get username

    try {
      // Check if the user already exists in the database
      let user = await User.findOne({ telegramId });

      if (!user) {
        // If user doesn't exist, create a new user
        user = new User({
          telegramId,
          username,
          gems: 0,  // New user starts with 0 gems
          level: 1, // Default level
        });
        await user.save();
        await sendTelegramMessage(telegramId, `Welcome, ${username}! Your account has been created. Start collecting gems now! 💎`);
      } else {
        // If user exists, send a message with the user's current info
        await sendTelegramMessage(telegramId, `Welcome back, ${username}! You currently have ${user.gems} gems and are at level ${user.level}.`);
      }

      // Respond to Telegram that the message was processed
      res.status(200).send('Message received and processed');
    } catch (error) {
      console.error('Error processing Telegram message:', error);
      res.status(500).send('Error processing request');
    }
  } else {
    res.status(200).send('No message to process');
  }
});

module.exports = router;
