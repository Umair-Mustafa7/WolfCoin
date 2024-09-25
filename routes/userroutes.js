// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user data by Telegram ID
router.get('/user/:telegramId', async (req, res) => {
  const { telegramId } = req.params;

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ gems: user.gems });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// Update user gems by Telegram ID
router.post('/user/:telegramId', async (req, res) => {
  const { telegramId } = req.params;
  const { gems } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { telegramId }, // Find user by Telegram ID
      { gems }, // Update gems field
      { new: true, upsert: true } // Create user if doesn't exist
    );

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: 'Error updating gems' });
  }
});

module.exports = router;
