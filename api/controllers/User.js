const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch a user by their Telegram ID
const getUserByTelegramId = async (telegramId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { telegramId: telegramId },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Create a new user or update the user if they exist (Upsert)
const upsertUser = async (telegramId, username, gems = 0, level = 1) => {
  try {
    const user = await prisma.user.upsert({
      where: { telegramId: telegramId },
      update: { gems: gems, level: level, username: username },
      create: { telegramId: telegramId, username: username, gems: gems, level: level },
    });
    return user;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
};

// Update gems and level for a specific user
const updateUser = async (telegramId, gems, level) => {
  try {
    const user = await prisma.user.update({
      where: { telegramId: telegramId },
      data: { gems: gems, level: level },
    });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user by Telegram ID
const deleteUser = async (telegramId) => {
  try {
    const user = await prisma.user.delete({
      where: { telegramId: telegramId },
    });
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Export the functions
module.exports = {
  getUserByTelegramId,
  upsertUser,
  updateUser,
  deleteUser,
};
