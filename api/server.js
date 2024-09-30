const express = require('express');
const { getUserByTelegramId, upsertUser, updateUser, deleteUser } = require('./controllers/User');
require('dotenv').config();

const app = express();
app.use(express.json());

// Fetch user by Telegram ID
app.get('/api/users/:telegramId', async (req, res) => {
  const { telegramId } = req.params;

  try {
    const user = await getUserByTelegramId(telegramId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Create or update user
app.post('/api/users/:telegramId', async (req, res) => {
  const { telegramId } = req.params;
  const { username, gems, level } = req.body;

  try {
    const user = await upsertUser(telegramId, username, gems, level);
    res.json({ message: 'User data updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user data' });
  }
});

// Update user's gems and level
app.patch('/api/users/:telegramId', async (req, res) => {
  const { telegramId } = req.params;
  const { gems, level } = req.body;

  try {
    const user = await updateUser(telegramId, gems, level);
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete user by Telegram ID
app.delete('/api/users/:telegramId', async (req, res) => {
  const { telegramId } = req.params;

  try {
    const user = await deleteUser(telegramId);
    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
