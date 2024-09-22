// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://skyshipstorelimited:ywMaxfvNddBrMmLX@cluster0.hfrku.mongodb.net/wolftest?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define a User schema
const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

// Endpoint to get user coins
app.get('/api/user/:telegramId', async (req, res) => {
  const user = await User.findOne({ telegramId: req.params.telegramId });
  if (user) {
    res.json({ coins: user.coins });
  } else {
    res.json({ coins: 0 }); // Return 0 if user not found
  }
});

// Endpoint to update user coins
app.post('/api/user/:telegramId', async (req, res) => {
  const { coins } = req.body;
  try {
    await User.findOneAndUpdate(
      { telegramId: req.params.telegramId },
      { coins },
      { upsert: true }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating coins:', error);
    res.status(500).send('Error updating coins');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
