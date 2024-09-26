import React, { useState, useEffect, useContext } from 'react';
import { FaGem, FaLevelUpAlt } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GemContext } from './GemContext'; // Import the context

const Farming = ({ telegramId }) => {
  const { gems, addGems } = useContext(GemContext); // Get gems and addGems from context
  const [level, setLevel] = useState(1); // User level
  const [timeLeft, setTimeLeft] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [userName, setUserName] = useState('User'); // Store Telegram user's name
  const farmingInterval = 2 * 1000; // Farming interval time (adjust as needed)

  // Fetch user data (gems, level, name) when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://wolf-coin-ho99.vercel.app/api/user`, {
          params: { telegramId },
        });
        addGems(response.data.gems); // Update the global gems state
        setLevel(response.data.level || 1); // Default level is 1
        setUserName(response.data.username || 'User'); // Fetch Telegram username
        toast.success('Welcome back! Keep farming those gems!'); // Success notification
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      }
    };

    fetchUserData();
  }, [telegramId, addGems]);

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
      const newGemCount = gems + 100; // Collect 100 gems
      const newLevel = Math.floor(newGemCount / 500) + 1; // Level up every 500 gems

      addGems(100); // Update global gems
      setLevel(newLevel);
      setTimeLeft(farmingInterval);
      setShowModal(true);
      setButtonVisible(false); // Hide button after collection

      // Update user data in the backend
      try {
        await axios.post(`https://wolf-coin-ho99.vercel.app/api/user`, {
          telegramId,
          gems: newGemCount,
          level: newLevel,
        });
        toast.success(`You collected 100 gems! You're now at Level ${newLevel}.`);
      } catch (error) {
        console.error('Error updating gems:', error);
        toast.error('Error collecting gems');
      }
    }
  };

  // Calculate progress for the circular progress bar
  const progress = (timeLeft / farmingInterval) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-blue-900 text-white flex flex-col items-center justify-center p-4 md:p-8 relative">
      <Toaster /> {/* Notification container */}

      {/* Profile Avatar and Username */}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        {/* Avatar */}
        <img
          src="https://via.placeholder.com/50" // Use Telegram avatar if available
          alt="User Avatar"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-500"
        />
        {/* Username */}
        <div>
          <p className="text-lg md:text-xl font-semibold text-gray-100">{userName}</p>
        </div>
      </div>

      {/* Title, Gem Count, and Level */}
      <motion.div 
        className="w-full max-w-lg mb-8 p-6 rounded-2xl shadow-lg bg-gray-900 border border-purple-500 text-center"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-purple-400">Gem Farming</h1>
        <div className="flex justify-center items-center mt-4 md:mt-6">
          <FaGem className="text-4xl md:text-5xl text-purple-400 mr-2 md:mr-4" />
          <span className="text-2xl md:text-3xl font-bold">Gems: {gems}</span>
        </div>
        <div className="flex justify-center items-center mt-4">
          <FaLevelUpAlt className="text-3xl md:text-4xl text-yellow-400 mr-2 md:mr-4" />
          <span className="text-xl md:text-2xl font-bold">Level: {level}</span>
        </div>
      </motion.div>

      {/* Circular Progress Bar */}
      <motion.div
        className="mb-6 md:mb-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          <CircularProgressbar
            value={progress}
            text={timeLeft > 0 ? `${Math.floor(timeLeft / 1000)}s` : 'Ready!'}
            styles={buildStyles({
              textSize: '12px',
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
          className="bg-gradient-to-r from-purple-500 to-purple-700 py-2 px-6 md:py-3 md:px-10 rounded-full text-base md:text-lg font-bold text-white hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {timeLeft > 0 ? 'Collecting...' : 'Collect 100 Gems'}
        </motion.button>
      )}

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
            <h2 className="text-2xl md:text-3xl font-bold text-purple-400">Gems Collected!</h2>
            <p className="mt-4 text-lg text-white">You've collected <span className="font-bold text-purple-400">100 Gems!</span></p>
            <p className="mt-2 text-lg text-white">Level: {level}</p>
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
