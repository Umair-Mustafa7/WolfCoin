import React, { useState, useEffect } from 'react';
import { FaGem, FaLevelUpAlt, FaTrophy } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

// Define the shape of the user data
interface UserData {
  telegramId: number;
  firstName: string;
  lastName: string;
  gems: number;
  level: number;
}

const Farming = () => {
  const [userData, setUserData] = useState<UserData | null>(null); // Updated with UserData type
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(true);

  const farmingInterval = 20000; // 20 seconds interval for farming

  // Fetch user data from Telegram WebApp and backend API
  useEffect(() => {
    const isTelegramAvailable = typeof window !== 'undefined' && window.Telegram;
    
    // Check if Telegram WebApp object is available
    if (isTelegramAvailable && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      // Extract user information from Telegram WebApp
      const user = tg.initDataUnsafe?.user;
      const telegramId = user?.id || 0;
      const firstName = user?.first_name || 'Unknown';
      const lastName = user?.last_name || '';

      // Fetch or create user in MongoDB via backend API
      const fetchUserData = async () => {
        try {
          const response = await axios.post('/api/user', {
            telegramId: user?.id,
            firstName: user?.first_name,
            lastName: user?.last_name,
          }, {
            headers: {
              'Content-Type': 'application/json',  // Ensure correct content type
            },
          });
      
          if (response.data.success) {
            setUserData(response.data.user);  // Set the user data in the state
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    } else {
      // Fallback for local development: use dummy data
      setUserData({
        telegramId: 1,
        firstName: 'Test User',
        lastName: 'Local',
        gems: 0,
        level: 1,
      });
      setLoading(false);
    }
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1000);
      } else {
        setButtonVisible(true); // Show button when timer reaches zero
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval
  }, [timeLeft]);

  // Handle gem collection (update the gems and level)
  const handleCollectGems = async () => {
    if (timeLeft <= 0 && userData) {
      const newGemCount = userData.gems + 100;
      const newLevel = Math.floor(newGemCount / 500) + 1;
  
      try {
        const response = await axios.put('/api/user/update', {
          telegramId: userData.telegramId,
          gems: newGemCount,
          level: newLevel,
        }, {
          headers: {
            'Content-Type': 'application/json',  // Ensure correct content type
          },
        });
  
        if (response.data.success) {
          setUserData((prevData) => {
            if (prevData) {
              return {
                ...prevData, // Keep all other fields intact
                gems: newGemCount,
                level: newLevel,
              };
            }
            return prevData; // If prevData is null, return it
          });
  
          setTimeLeft(farmingInterval);
          setButtonVisible(false);
  
          toast.success(`You collected 100 gems! Now at Level ${newLevel}.`);
        }
      } catch (error) {
        console.error('Error updating user data:', error);
        toast.error('Failed to update user data.');
      }
    }
  };

  // Progress for the circular timer bar
  const progress = (timeLeft / farmingInterval) * 100; // Calculate the progress percentage

  // Render the UI for loading state, and user data when available
  if (loading || !userData) {
    return <div>Loading user data...</div>; // Show loading until data is fetched
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center p-4 md:p-8 relative">
      <Toaster /> {/* Toast notification */}

      {/* User Avatar and Level */}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full border-4 ${
            userData.level > 10 ? 'border-yellow-500' : userData.level > 5 ? 'border-gray-300' : 'border-purple-500'
          } shadow-lg overflow-hidden`}
        >
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
          {userData.level >= 10 && (
            <div className="absolute top-0 right-0 bg-yellow-500 p-1 rounded-full shadow-md">
              <FaTrophy className="text-xs text-white" />
            </div>
          )}
        </motion.div>
        <motion.div className="flex flex-col items-start" whileHover={{ x: 10, opacity: 1 }} initial={{ x: 0, opacity: 0.8 }} animate={{ opacity: 1, transition: { duration: 0.5 } }}>
          <p className="text-lg md:text-xl font-semibold text-white">{userData.firstName}</p>
          <motion.p className="text-sm md:text-base text-purple-200 font-medium" whileHover={{ scale: 1.1, color: '#e5e5e5' }}>
            Level {userData.level}
          </motion.p>
        </motion.div>
      </div>

      {/* Gem Counter */}
      <motion.div className="w-full max-w-lg mb-8 p-6 rounded-3xl shadow-xl bg-white bg-opacity-10 border border-white text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">Gem Farming</h1>
        <div className="flex justify-center items-center mt-6">
          <FaGem className="text-5xl text-yellow-500 mr-4" />
          <span className="text-4xl font-bold text-white">Gems: {userData.gems}</span>
        </div>
        <div className="flex justify-center items-center mt-4">
          <FaLevelUpAlt className="text-4xl text-yellow-500 mr-4" />
          <span className="text-3xl font-bold text-white">Level: {userData.level}</span>
        </div>
      </motion.div>

      {/* Circular Progress Bar */}
      <motion.div className="mb-6 md:mb-10" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
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
    </div>
  );
};

export default Farming;
