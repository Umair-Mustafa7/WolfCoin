import React, { useState, useEffect, useContext } from 'react';
import { FaGem, FaLevelUpAlt, FaTrophy } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GemContext } from './GemContext';

const Farming = ({ telegramId }) => {
  const { gems, addGems } = useContext(GemContext);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [userName, setUserName] = useState('User');
  const farmingInterval = 2000;

  // New: Add check for Telegram WebApp API
  const isTelegramWebApp = typeof window !== 'undefined' && window.Telegram?.WebApp;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${telegramId}`);
        addGems(response.data.gems);
        setLevel(response.data.level || 1);
        setUserName(response.data.username || 'User');
        toast.success('Welcome back! Keep farming those gems!');
      } catch (error) {
        toast.error('Failed to load user data');
      }
    };

    fetchUserData();
  }, [telegramId, addGems]);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1000);
      } else {
        setButtonVisible(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Handle gem collection and update user data in MongoDB
  const handleCollectGems = async () => {
    if (timeLeft <= 0) {
      const newGemCount = gems + 100;
      const newLevel = Math.floor(newGemCount / 500) + 1;

      addGems(100);  // Update global gems context
      setLevel(newLevel);
      setTimeLeft(farmingInterval);
      setShowModal(true);
      setButtonVisible(false);

      try {
        await axios.post(`/api/users/${telegramId}`, {
          gems: newGemCount,
          level: newLevel,
        });
        toast.success(`You collected 100 gems! You're now at Level ${newLevel}.`);
      } catch (error) {
        toast.error('Error collecting gems');
      }
    }
  };

  const progress = (timeLeft / farmingInterval) * 100;

  // If the Telegram WebApp API is not available, show a message
  if (!isTelegramWebApp) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white text-center p-4">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Please open this app in Telegram</h1>
          <p className="text-lg">
            This web app is designed to be used inside the Telegram app. Please open it in Telegram to continue.
          </p>
          <a
            href="https://telegram.org"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold text-lg"
          >
            Open Telegram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center p-4 md:p-8 relative">
      <Toaster />

      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${
            level > 10 ? 'border-gold-500' : level > 5 ? 'border-silver-500' : 'border-purple-500'
          } shadow-lg overflow-hidden`}
        >
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
          {level >= 10 && (
            <div className="absolute top-0 right-0 bg-yellow-500 p-1 rounded-full shadow-md">
              <FaTrophy className="text-xs text-white" />
            </div>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col items-start"
          whileHover={{ x: 10, opacity: 1 }}
          initial={{ x: 0, opacity: 0.8 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          <p className="text-lg md:text-xl font-semibold text-white">{userName}</p>
          <motion.p className="text-sm md:text-base text-purple-200 font-medium" whileHover={{ scale: 1.1, color: '#e5e5e5' }}>
            Level {level}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-lg mb-8 p-6 rounded-3xl shadow-xl bg-white bg-opacity-10 border border-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">Gem Farming</h1>
        <div className="flex justify-center items-center mt-6">
          <FaGem className="text-5xl text-yellow-500 mr-4" />
          <span className="text-4xl font-bold text-white">Gems: {gems}</span>
        </div>
        <div className="flex justify-center items-center mt-4">
          <FaLevelUpAlt className="text-4xl text-yellow-500 mr-4" />
          <span className="text-3xl font-bold text-white">Level: {level}</span>
        </div>
      </motion.div>

      <motion.div
        className="mb-6 md:mb-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56">
          <CircularProgressbar
            value={progress}
            text={timeLeft > 0 ? `${Math.floor(timeLeft / 1000)}s` : 'Ready!'}
            styles={buildStyles({
              textSize: '12px',
              pathColor: `rgba(255, 255, 255, ${progress / 100})`,
              textColor: '#fff',
              trailColor: '#333',
              backgroundColor: '#6e72fc',
            })}
          />
        </div>
      </motion.div>

      {buttonVisible && (
        <motion.button
          onClick={handleCollectGems}
          className="bg-gradient-to-r from-green-500 to-green-700 py-3 px-8 rounded-full text-lg font-bold text-white hover:scale-110 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {timeLeft > 0 ? 'Collecting...' : 'Collect 100 Gems'}
        </motion.button>
      )}
    </div>
  );
};

export default Farming;
