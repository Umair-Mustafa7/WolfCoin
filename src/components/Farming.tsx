// src/Farming.js

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
      const response = await axios.get(`https://wolf-coin-ho99.vercel.app/api/user/${telegramId}`);
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
      try {
        await axios.post(`https://wolf-coin-ho99.vercel.app/api/user/${telegramId}`, { coins: newCoinCount });
      } catch (error) {
        console.error("Error updating coins:", error);
      }
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

      <main className="mt-5 w-full max-w-lg">
        {/* Progress Bar Component */}
        <motion.div 
          className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6 transition-transform"
          initial={{ scale: 0.95 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <div className="bg-gray-700 rounded-full h-6 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <span className="absolute top-0 left-0 right-0 text-center text-sm font-medium flex items-center justify-center">
              {timeLeft > 0 ? (
                <>
                  <FaClock className="mr-1 animate-pulse" />
                  {`Next reward in: ${Math.floor(timeLeft / 1000)}s`}
                </>
              ) : (
                "Ready to collect!"
              )}
            </span>
          </div>
        </motion.div>

        {/* Claim Button Component */}
        {buttonVisible && (
          <motion.button
            onClick={handleCollectCoins}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {timeLeft > 0 ? "Wait to Collect" : <><FaCoins className="inline mr-2" /> Claim 50 Coins!</>}
          </motion.button>
        )}
      </main>

      {/* Notification Modal */}
      {showModal && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="bg-gray-900 rounded-lg p-6 shadow-xl transition-transform transform scale-95"
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold">Coins Collected!</h2>
            <p className="mt-2">You have received <span className="font-bold text-green-400">50 coins!</span></p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Farming;
