const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicates
  },
  username: {
    type: String,
    required: true,
  },
  gems: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
