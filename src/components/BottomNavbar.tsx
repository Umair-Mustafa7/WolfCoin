import React from 'react';
import { FaHome, FaTasks, FaCoins, FaUserPlus, FaGift } from 'react-icons/fa';

const BottomNavbar = ({ setActiveTab, activeTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white shadow-lg">
      <div className="flex justify-around items-center py-3">
        {/* Home */}
        <div
          className={`flex flex-col items-center ${activeTab === 'home' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
          onClick={() => setActiveTab('home')}
        >
          <FaHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </div>

        {/* Tasks */}
        <div
          className={`flex flex-col items-center ${activeTab === 'tasks' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
          onClick={() => setActiveTab('tasks')}
        >
          <FaTasks size={24} />
          <span className="text-xs mt-1">Tasks</span>
        </div>

        {/* Earn */}
        <div
          className={`flex flex-col items-center ${activeTab === 'earn' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
          onClick={() => setActiveTab('earn')}
        >
          <FaCoins size={24} />
          <span className="text-xs mt-1">Earn</span>
        </div>

        {/* Refer */}
        <div
          className={`flex flex-col items-center ${activeTab === 'refer' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
          onClick={() => setActiveTab('refer')}
        >
          <FaUserPlus size={24} />
          <span className="text-xs mt-1">Refer</span>
        </div>

        {/* Airdrop */}
        <div
          className={`flex flex-col items-center ${activeTab === 'airdrop' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
          onClick={() => setActiveTab('airdrop')}
        >
          <FaGift size={24} />
          <span className="text-xs mt-1">Airdrop</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
