const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// Get user data
app.get('/api/users/:telegramId', async (req, res) => {
  const { telegramId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { telegramId },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// Update user coins
app.post('/api/users/:telegramId/coins', async (req, res) => {
  const { telegramId } = req.params;
  const { coins } = req.body;

  try {
    const user = await prisma.user.upsert({
      where: { telegramId },
      update: { coins },
      create: { telegramId, coins },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating coins' });
  }
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const message = req.body.message;
  console.log('Received message:', message);
  res.send('OK');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
