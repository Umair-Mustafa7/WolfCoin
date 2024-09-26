const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to handle Telegram bot webhook
router.post('/webhook', async (req, res) => {
  const telegramData = req.body;

  if (telegramData.message) {
    const telegramId = telegramData.message.from.id;
    const username = telegramData.message.from.username || 'Anonymous';

    try {
      // Check if the user already exists in the database
      let user = await User.findOne({ telegramId });

      if (!user) {
        // If user doesn't exist, create a new user
        user = new User({
          telegramId,
          username,
          gems: 0, // New users start with 0 gems
          level: 1, // Default level for new users
        });
        await user.save();
        console.log(`New user created: ${username}`);
      } else {
        console.log(`User exists: ${username}`);
      }

      // Send a response back to Telegram acknowledging the message
      res.status(200).send('Message received');

    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).send('Error processing request');
    }
  } else {
    res.status(200).send('No message received');
  }
});

module.exports = router;
