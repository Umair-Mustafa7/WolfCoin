import React, { useState } from 'react';
import { FaGem, FaGift, FaCopy, FaCheckCircle, FaRocket, FaUserFriends } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Friends = () => {
  const [referralCode] = useState("ABC123XYZ");
  const [referralCount, setReferralCount] = useState(3); // Number of successful referrals
  const [gemsEarned, setGemsEarned] = useState(150); // Gems earned from referrals
  const [copyStatus, setCopyStatus] = useState(false); // Track whether referral code was copied

  // Handle copy referral link
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://yourapp.com/referral/${referralCode}`);
    setCopyStatus(true);
    toast.success('Referral link copied!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 relative overflow-hidden p-4 md:p-6 text-white">
      <Toaster />
      
      {/* Parallax Animated Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-10"
        style={{ zIndex: -1 }}
        initial={{ x: -100, y: -100 }}
        animate={{ x: 100, y: 100 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />
      
      {/* Header */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-yellow-300 mb-8 md:mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Earn Rewards by Referring Friends!
      </motion.h1>

      {/* 3D Card for Referral Info */}
      <motion.div
        className="bg-gray-900 p-6 md:p-8 rounded-3xl shadow-2xl max-w-xl w-full relative mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileHover={{ scale: 1.02, y: -10, transition: { duration: 0.4 } }}
      >
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center space-x-4">
            <FaUserFriends className="text-3xl md:text-4xl text-purple-400" />
            <h2 className="text-xl md:text-2xl font-bold">Referral Code</h2>
          </div>
          <motion.button
            className="bg-yellow-400 text-gray-900 p-2 md:p-3 rounded-full flex items-center hover:bg-yellow-500 transition-colors"
            onClick={handleCopyReferral}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCopy className="text-lg md:text-xl" />
          </motion.button>
        </div>

        <p className="text-center text-md md:text-lg bg-gray-800 p-3 md:p-4 rounded-lg mb-6 md:mb-8">
          <span className="text-white">{referralCode}</span>
        </p>

        <div className="text-center text-gray-300 text-sm">
          Share this code with friends and earn rewards!
        </div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        className="bg-gradient-to-r from-purple-700 to-indigo-700 p-6 md:p-8 rounded-3xl shadow-xl max-w-xl w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-white">Your Progress</h3>
        <div className="flex justify-around items-center text-sm md:text-lg">
          <div className="flex flex-col items-center">
            <FaUserFriends className="text-2xl md:text-3xl text-pink-300" />
            <span>{referralCount}</span>
            <p>Referrals</p>
          </div>
          <div className="flex flex-col items-center">
            <FaGem className="text-2xl md:text-3xl text-yellow-400" />
            <span>{gemsEarned}</span>
            <p>Gems Earned</p>
          </div>
        </div>

        {/* Confetti when claim */}
        <motion.div
          className="mt-6 md:mt-8 text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="bg-green-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors">
            Claim Your Rewards!
          </button>
        </motion.div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="w-full max-w-lg bg-gray-700 h-3 md:h-4 rounded-full mt-8 md:mt-12 relative overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: `${(referralCount / 10) * 100}%` }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="bg-yellow-500 h-full absolute top-0 left-0" />
      </motion.div>

      {/* Rocket icon flying when sharing */}
      {copyStatus && (
        <motion.div
          className="absolute top-28 md:top-32 right-8 md:right-16 text-yellow-300 text-3xl md:text-5xl"
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
