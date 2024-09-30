import React, { useState } from 'react';
import { FaGem, FaGift, FaCopy, FaRocket, FaUserFriends, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Friends = () => {
  const [referralCode] = useState("ABC123XYZ");
  const [referralCount, setReferralCount] = useState(3);  // Number of successful referrals
  const [gemsEarned, setGemsEarned] = useState(150);  // Gems earned from referrals
  const [copyStatus, setCopyStatus] = useState(false);  // Track whether referral code was copied

  // Handle copying referral link
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://yourapp.com/referral/${referralCode}`);
    setCopyStatus(true);
    toast.success('Referral link copied!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-800 flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-6 text-white">
      <Toaster />

      {/* Simple Confetti Animation */}
      {copyStatus && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaCheckCircle className="text-7xl" />
        </motion.div>
      )}

      {/* Header Section */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Refer Friends & Earn Rewards!
      </motion.h1>

      {/* Glassmorphism Card for Referral Info */}
      <motion.div
        className="bg-opacity-60 backdrop-filter backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-xl max-w-xl w-full relative mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        whileHover={{ scale: 1.03, y: -10 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <FaUserFriends className="text-4xl text-yellow-300" />
            <h2 className="text-2xl font-bold">Referral Code</h2>
          </div>
          <motion.button
            className="bg-yellow-400 text-gray-900 p-3 rounded-full flex items-center hover:bg-yellow-500 transition"
            onClick={handleCopyReferral}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCopy className="text-xl" />
          </motion.button>
        </div>

        {/* Referral Code Display */}
        <p className="text-center text-lg bg-gray-800 bg-opacity-30 p-4 rounded-lg mb-8">
          <span className="text-white">{referralCode}</span>
        </p>

        <div className="text-center text-gray-300 text-sm">
          Share this code with your friends to earn rewards!
        </div>
      </motion.div>

      {/* Progress and Stats Card */}
      <motion.div
        className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 md:p-8 rounded-3xl shadow-xl max-w-xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h3 className="text-3xl font-bold mb-6 text-center text-white">Your Progress</h3>
        <div className="flex justify-around items-center text-lg">
          <div className="flex flex-col items-center">
            <FaUserFriends className="text-3xl text-pink-400" />
            <span>{referralCount}</span>
            <p>Referrals</p>
          </div>
          <div className="flex flex-col items-center">
            <FaGem className="text-3xl text-yellow-400" />
            <span>{gemsEarned}</span>
            <p>Gems Earned</p>
          </div>
        </div>

        {/* Claim Reward Button */}
        <motion.div className="mt-8 text-center">
          <motion.button
            className="bg-green-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Claim Your Rewards!
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="w-full max-w-lg bg-gray-700 bg-opacity-30 h-4 rounded-full mt-12 relative overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: `${(referralCount / 10) * 100}%` }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <div className="bg-yellow-400 h-full absolute top-0 left-0" />
      </motion.div>

      {/* Rocket Animation */}
      {copyStatus && (
        <motion.div
          className="absolute top-28 right-8 text-yellow-300 text-5xl"
          initial={{ y: 300 }}
          animate={{ y: -50, rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <FaRocket />
        </motion.div>
      )}
    </div>
  );
};

export default Friends;
