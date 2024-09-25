import React, { useState, useEffect } from 'react';
import { FaGem, FaTrophy } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import axios from 'axios';

const Farming = ({ telegramId }) => {
  const [gems, setGems] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const farmingInterval = 30 * 1000; // 30 seconds
  const [showModal, setShowModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  // Fetch user gems when the component mounts
  useEffect(() => {
    const fetchUserGems = async () => {
      const response = await axios.get(`http://localhost:5000/api/user/${telegramId}`);
      setGems(response.data.gems);
    };

    fetchUserGems();
  }, [telegramId]);

  // Timer countdown and button visibility
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

  const handleCollectGems = async () => {
    if (timeLeft <= 0) {
      const newGemCount = gems + 100; // Collect 100 gems each time
      setGems(newGemCount);
      setTimeLeft(farmingInterval);
      setShowModal(true);
      setButtonVisible(false); // Hide button after collection

      // Update user's gem count in the backend
      try {
        await axios.post(`http://localhost:5000/api/user/${telegramId}`, { gems: newGemCount });
      } catch (error) {
        console.error("Error updating gems:", error);
      }
    }
  };

  // Calculate progress for the circular progress bar
  const progress = (timeLeft / farmingInterval) * 100;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      {/* Title and Gem Count */}
      <motion.div 
        className="w-full max-w-lg mb-8 p-6 rounded-2xl shadow-lg bg-gray-900 border border-purple-500"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-purple-400">Gem Farming</h1>
        <div className="flex justify-center items-center mt-6">
          <FaGem className="text-purple-400 text-5xl mr-4" />
          <span className="text-3xl font-bold">Gems: {gems}</span>
        </div>
      </motion.div>

      {/* Circular Progress Bar */}
      <motion.div
        className="mb-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-48 h-48">
          <CircularProgressbar
            value={progress}
            text={timeLeft > 0 ? `${Math.floor(timeLeft / 1000)}s` : 'Ready!'}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `rgba(129, 62, 245, ${progress / 100})`,
              textColor: '#fff',
              trailColor: '#202020',
              backgroundColor: '#3e98c7',
            })}
          />
        </div>
      </motion.div>

      {/* Claim Button */}
      {buttonVisible && (
        <motion.button
          onClick={handleCollectGems}
          className="bg-gradient-to-r from-purple-500 to-purple-700 py-3 px-10 rounded-full text-lg font-bold text-white hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {timeLeft > 0 ? 'Collecting...' : 'Collect 100 Gems'}
        </motion.button>
      )}

      {/* Leaderboard */}
      <motion.div
        className="mt-12 w-full max-w-lg p-6 rounded-2xl bg-gray-900 border border-blue-500"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">Leaderboard</h2>
        <ul className="text-lg text-gray-300">
          <li className="mb-2"><FaTrophy className="inline text-yellow-400 mr-2" /> Player1 - 1500 Gems</li>
          <li className="mb-2"><FaTrophy className="inline text-yellow-400 mr-2" /> Player2 - 1300 Gems</li>
          <li className="mb-2"><FaTrophy className="inline text-yellow-400 mr-2" /> Player3 - 1100 Gems</li>
        </ul>
      </motion.div>

      {/* Collection Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-gray-900 p-8 rounded-xl shadow-2xl text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-purple-400">Gems Collected!</h2>
            <p className="mt-4 text-lg text-white">You've collected <span className="font-bold text-purple-400">100 Gems!</span></p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold transition hover:scale-105"
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
