import React, { useState } from 'react';
import { FaUserPlus, FaShareAlt, FaCheck, FaGift } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ReferPage = () => {
  const [showToast, setShowToast] = useState(false);

  // Sample data for the list of referees
  const referees = [
    { id: 1, name: 'John Doe', date: '2024-09-17', reward: '25,000' },
    { id: 2, name: 'Jane Smith', date: '2024-09-16', reward: '25,000' },
    { id: 3, name: 'Alex Johnson', date: '2024-09-15', reward: '25,000' },
  ];

  // Function to handle share action
  const handleShareLink = () => {
    navigator.clipboard.writeText('https://example.com/referral-link'); // Example referral link
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="p-4 relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 right-4 bg-green-600 text-white py-2 px-3 rounded-md shadow-md text-sm"
        >
          <FaCheck className="inline-block mr-2" /> Referral link copied!
        </motion.div>
      )}

      {/* Invite a Friend Section */}
      <div className="relative mx-auto max-w-sm flex flex-col items-center justify-center bg-gray-800 p-6 rounded-xl shadow-md text-center mb-6">
        <h2 className="text-2xl font-extrabold mb-3 z-10 text-white">Invite a Friend</h2>
        <p className="text-sm mb-4 z-10 text-gray-300">Earn 25,000 points for each friend who joins using your link!</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold shadow-md transition duration-300 z-10 flex items-center justify-center"
          onClick={handleShareLink}
        >
          <FaShareAlt className="mr-2" /> Share Link
        </motion.button>
      </div>

      {/* List of Referrals */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Your Referrals</h3>
        <ul className="space-y-4">
          {referees.map((referee) => (
            <motion.li
              key={referee.id}
              className="relative bg-gray-800 p-4 rounded-lg shadow-md transform transition duration-300 hover:shadow-lg"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-3">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full w-12 h-12 flex items-center justify-center text-xl text-white font-bold mr-3">
                  {referee.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{referee.name}</p>
                  <p className="text-gray-400 text-xs">Referred on: {referee.date}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-bold text-base">+{referee.reward}</span>
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-md text-sm transition duration-300">
                  View Details
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Floating Action Button (FAB) for Quick Share */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-16 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 p-4 rounded-full shadow-md transition duration-300 flex items-center"
        onClick={handleShareLink}
      >
        <FaGift className="mr-2" /> Share
      </motion.button>
    </div>
  );
};

export default ReferPage;
