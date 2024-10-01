import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true },
  firstName: String,
  username: String,
  gems: { type: Number, default: 0 },
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Function to store/update Telegram user in the database
export const storeTelegramUser = async (telegramId, firstName, username) => {
  let user = await User.findOne({ telegramId });

  if (!user) {
    user = new User({
      telegramId,
      firstName,
      username,
    });
    await user.save();
  }

  return user;
};

// Function to update gems for a user
export const updateUserGems = async (telegramId, gemsToAdd) => {
  let user = await User.findOne({ telegramId });

  if (user) {
    user.gems += gemsToAdd;
    await user.save();
  }
};
