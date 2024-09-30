import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  telegramId: String,
  gems: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

export const getUserData = async (telegramId) => {
  return await User.findOne({ telegramId });
};

export const updateUserGems = async (telegramId, newGems) => {
  const user = await User.findOne({ telegramId });
  if (user) {
    user.gems += newGems;
    await user.save();
    return user;
  } else {
    const newUser = new User({ telegramId, gems: newGems });
    await newUser.save();
    return newUser;
  }
};
