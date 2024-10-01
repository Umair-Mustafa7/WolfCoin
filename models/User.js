// models/User.js - MongoDB User model
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
    unique: true,
  },
  gems: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
