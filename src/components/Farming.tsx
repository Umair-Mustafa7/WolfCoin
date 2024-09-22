import React, { useState, useEffect } from 'react';
import { FaCoins, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const Farming = ({ telegramId }) => {
  const [coins, setCoins] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const harvestingInterval = 5 * 1000; // 5 seconds for testing
  const [showModal, setShowModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  // Fetch user coins when the component mounts
  useEffect(() => {
    const fetchUserCoins = async () => {
      const response = await axios.get(`http://localhost:5000/api/user/${telegramId}`);
      setCoins(response.data.coins);
    };

    fetchUserCoins();
  }, [telegramId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1000);
      } else {
        setButtonVisible(true); // Show button when time is up
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleCollectCoins = async () => {
    if (timeLeft <= 0) {
      const newCoinCount = coins + 50;
      setCoins(newCoinCount);
      setProgress(0);
      setTimeLeft(harvestingInterval);
      setShowModal(true);
      setButtonVisible(false); // Hide button after claim

      // Update the user's coin count in the database
      await axios.post(`http://localhost:5000/api/user/${telegramId}`, { coins: newCoinCount });
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      setProgress((timeLeft / harvestingInterval) * 100);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 flex flex-col items-center p-8 text-white mb-60">
      {/* Total Coins Display */}
      <motion.div 
        className="w-full max-w-lg mb-6 bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-semibold flex items-center">
          <FaCoins className="text-yellow-400 mr-2" /> Total Coins: {coins}
        </h2>
      </motion.div>

      {/* Rest of your component remains unchanged */}
    </div>
  );
};

export default Farming;
