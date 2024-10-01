import React, { useState, useEffect, useContext } from 'react';
import { FaGem, FaLevelUpAlt, FaTrophy } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { GemContext } from './GemContext';

const Farming = () => {
  const { gems, addGems } = useContext(GemContext);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [userName, setUserName] = useState('User');
  const farmingInterval = 20000;

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

  // Handle gem collection with API call
  const handleCollectGems = async () => {
    if (timeLeft <= 0) {
      try {
        const response = await fetch(' https://671f-2400-adc7-1921-5100-553e-b6bd-28ca-7931.ngrok-free.app/api/collect-gems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gems: 100,
          }),
        });
        

        if (response.ok) {
          const data = await response.json();
          const newGemCount = data.gems;
          const newLevel = Math.floor(newGemCount / 500) + 1;

          addGems(100); // Update global gems context
          setLevel(newLevel);
          setTimeLeft(farmingInterval);
          setShowModal(true);
          setButtonVisible(false);

          toast.success(`You collected 100 gems! You're now at Level ${newLevel}.`);
        } else {
          throw new Error('Failed to collect gems');
        }
      } catch (error) {
        toast.error('Failed to collect gems. Please try again later.');
      }
    }
  };

  const progress = (timeLeft / farmingInterval) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center p-4 md:p-8 relative">
      <Toaster />

      <div className="absolute top-4 left-4 flex items-center space-x-4">
        {/* Avatar with level-based frame */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${
            level > 10 ? "border-yellow-500" : level > 5 ? "border-gray-300" : "border-purple-500"
          } shadow-lg overflow-hidden`}
        >
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
          {/* Avatar Badge for High Levels */}
          {level >= 10 && (
            <div className="absolute top-0 right-0 bg-yellow-500 p-1 rounded-full shadow-md">
              <FaTrophy className="text-xs text-white" />
            </div>
          )}
        </motion.div>

        {/* Username */}
        <motion.div 
          className="flex flex-col items-start"
          whileHover={{ x: 10, opacity: 1 }}
          initial={{ x: 0, opacity: 0.8 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          <p className="text-lg md:text-xl font-semibold text-white">{userName}</p>
          <motion.p 
            className="text-sm md:text-base text-purple-200 font-medium"
            whileHover={{ scale: 1.1, color: "#e5e5e5" }}
          >
            Level {level}
          </motion.p>
        </motion.div>
      </div>

      {/* Gem Counter */}
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

      {/* Circular Progress Bar */}
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

      {/* Collect Gems Button */}
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
      <div className="absolute top-4 right-4">
        <motion.button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
          whileHover={{ scale: 1.1 }}
        >
          <FaTrophy className="inline-block mr-2" /> Achievements
        </motion.button>
      </div>

      {/* Achievement Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-green-500">Gems Collected!</h2>
            <p className="mt-4 text-lg text-white">You've collected <span className="font-bold text-green-400">100 Gems!</span></p>
            <p className="mt-2 text-lg text-white">Level: {level}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 py-2 px-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-white font-bold transition hover:scale-110"
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
