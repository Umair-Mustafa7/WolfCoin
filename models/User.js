// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true }, // Telegram User ID
  username: { type: String }, // Optional Telegram username
  firstName: { type: String }, // First name from Telegram
  lastName: { type: String }, // Last name from Telegram
  gems: { type: Number, default: 0 }, // Default number of gems (or coins)
});

const User = mongoose.model('User', userSchema);
module.exports = User;
