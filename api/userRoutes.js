const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user data by Telegram ID
router.get('/:telegramId', async (req, res) => {
  const { telegramId } = req.params;
  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update gems and level for a user by Telegram ID
router.post('/:telegramId', async (req, res) => {
  const { telegramId } = req.params;
  const { gems, level } = req.body;

  try {
    let user = await User.findOne({ telegramId });

    if (!user) {
      user = new User({ telegramId, gems, level });
    } else {
      user.gems = gems !== undefined ? gems : user.gems;
      user.level = level !== undefined ? level : user.level;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
