import React, { useState, useEffect, useContext } from 'react';
import { FaGem, FaLevelUpAlt, FaTrophy } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { GemContext } from '../context/GemContext';
import { collectGemsAPI, fetchUserDataAPI } from '../services/api';

const Farming = () => {
  const { gems, addGems } = useContext(GemContext);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [userName, setUserName] = useState('User');
  const [farmingInterval] = useState(20000);

  // Fetch user data (like gems and username) from backend
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserDataAPI();  // API call to get user data
      if (userData) {
        setUserName(userData.username);
        addGems(userData.gems);
        setLevel(Math.floor(userData.gems / 500) + 1);
      }
    };
    fetchUserData();
  }, [addGems]);

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

  // Handle gem collection
  const handleCollectGems = async () => {
    if (timeLeft <= 0) {
      const newGemCount = gems + 100;
      const newLevel = Math.floor(newGemCount / 500) + 1;

      const success = await collectGemsAPI(100);  // API call to collect gems
      if (success) {
        addGems(100);  // Update local gem state
        setLevel(newLevel);
        setTimeLeft(farmingInterval);
        setShowModal(true);
        setButtonVisible(false);
        toast.success(`You collected 100 gems! You're now at Level ${newLevel}.`);
      } else {
        toast.error("Failed to collect gems. Try again!");
      }
    }
  };

  const progress = (timeLeft / farmingInterval) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center p-4 md:p-8 relative">
      <Toaster />

      {/* User avatar, username, and level */}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <motion.div className={`relative w-12 h-12 rounded-full border-4 ${level > 10 ? "border-yellow-500" : "border-purple-500"}`}>
          <img src="https://via.placeholder.com/100" alt="User Avatar" className="object-cover w-full h-full" />
          {level >= 10 && (
            <div className="absolute top-0 right-0 bg-yellow-500 p-1 rounded-full">
              <FaTrophy className="text-xs text-white" />
            </div>
          )}
        </motion.div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{userName}</p>
          <p className="text-sm text-purple-200">Level {level}</p>
        </div>
      </div>

      {/* Gems and Level Display */}
      <motion.div className="text-center mt-8">
        <h1 className="text-4xl font-extrabold">Gem Farming</h1>
        <div className="mt-6">
          <FaGem className="text-5xl text-yellow-500 mr-2" />
          <span className="text-3xl">{gems} Gems</span>
        </div>
        <div className="mt-4">
          <FaLevelUpAlt className="text-4xl text-yellow-500 mr-2" />
          <span className="text-3xl">Level {level}</span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div className="mt-10">
        <CircularProgressbar value={progress} text={timeLeft > 0 ? `${Math.floor(timeLeft / 1000)}s` : 'Ready!'} 
          styles={buildStyles({ pathColor: 'rgba(255, 255, 255)', textColor: '#fff', trailColor: '#333' })} />
      </motion.div>

      {/* Collect Gems Button */}
      {buttonVisible && (
        <motion.button
          onClick={handleCollectGems}
          className="bg-green-500 py-3 px-8 mt-8 rounded-full text-lg font-bold text-white hover:scale-110 transition-transform"
        >
          {timeLeft > 0 ? 'Collecting...' : 'Collect 100 Gems'}
        </motion.button>
      )}
    </div>
  );
};

export default Farming;
