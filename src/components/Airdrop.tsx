import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaGift, FaLock, FaClock } from 'react-icons/fa';

// Define the airdrop end date (20 days from September 26, 2024)
const airdropDate = new Date(2024, 8, 26); // September is month 8 in JavaScript (0-indexed)
airdropDate.setDate(airdropDate.getDate() + 20); // Add 20 days to September 26, 2024

// Function to calculate time left until the airdrop date
const calculateTimeLeft = () => {
  const now = new Date(); // Current time
  const difference = airdropDate.getTime() - now.getTime(); // Difference in milliseconds

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const Airdrop = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format the countdown into a readable format (add leading zero if necessary)
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900 text-white p-4 relative overflow-hidden">
      
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-700 opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-purple-500 text-8xl md:text-9xl opacity-20"
        animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      >
        <FaRocket />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 text-indigo-500 text-7xl md:text-8xl opacity-20"
        animate={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      >
        <FaGift />
      </motion.div>
      
      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center p-6 md:p-10 bg-black bg-opacity-40 rounded-2xl shadow-2xl border border-purple-500 max-w-xl mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4 md:mb-6 tracking-wide">
          Airdrop <span className="text-purple-400">Announcement</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6">
          Our biggest airdrop event is on the way! Get ready to receive exclusive rewards. The countdown has begun — mark your calendars for this event!
        </p>

        {/* Glowing "Coming Soon" text */}
        <motion.div
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-400 animate-pulse"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1.1 }}
          transition={{
            yoyo: Infinity,
            duration: 1,
            ease: "easeInOut"
          }}
        >
          Coming in {timeLeft.days || '00'} Days...
        </motion.div>

        {/* Countdown Timer */}
        <div className="flex justify-center items-center mt-6 md:mt-8">
          <FaClock className="text-3xl md:text-4xl text-gray-400 mr-2 md:mr-3" />
          <span className="text-lg md:text-2xl text-gray-400">
            {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
            {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
        </div>

        {/* Locked Airdrop Button */}
        <motion.button
          className="mt-6 md:mt-8 bg-gradient-to-r from-purple-500 to-indigo-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-sm md:text-lg font-bold transition transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled
        >
          <FaLock className="inline mr-2" /> Airdrop Locked
        </motion.button>
      </motion.div>
      
      {/* Subtle Background Animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-75"
        animate={{ x: [-200, 200] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default Airdrop;
