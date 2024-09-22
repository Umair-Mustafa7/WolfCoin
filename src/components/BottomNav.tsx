import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTasks, faUsers, faGift } from '@fortawesome/free-solid-svg-icons'; // Example icons

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-blue-900 to-gray-800 shadow-lg py-4">
      <div className="flex justify-around items-center">
        {/* Home */}
        <div className="group flex flex-col items-center text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer">
          <div className="relative">
            <FontAwesomeIcon icon={faHome} className="text-xl group-hover:scale-125 transition duration-300 ease-in-out" />
            <div className="absolute -inset-0 bg-yellow-500 opacity-0 group-hover:opacity-100 rounded-full blur-md transition duration-300 ease-in-out"></div>
          </div>
          <p className="text-sm mt-2 group-hover:font-semibold">Home</p>
        </div>

        {/* Profile */}
        <div className="group flex flex-col items-center text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer">
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="text-xl group-hover:scale-125 transition duration-300 ease-in-out" />
            <div className="absolute -inset-0 bg-yellow-500 opacity-0 group-hover:opacity-100 rounded-full blur-md transition duration-300 ease-in-out"></div>
          </div>
          <p className="text-sm mt-2 group-hover:font-semibold">Profile</p>
        </div>

        {/* Tasks */}
        <div className="group flex flex-col items-center text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer">
          <div className="relative">
            <FontAwesomeIcon icon={faTasks} className="text-xl group-hover:scale-125 transition duration-300 ease-in-out" />
            <div className="absolute -inset-0 bg-yellow-500 opacity-0 group-hover:opacity-100 rounded-full blur-md transition duration-300 ease-in-out"></div>
          </div>
          <p className="text-sm mt-2 group-hover:font-semibold">Tasks</p>
        </div>

        {/* Friends */}
        <div className="group flex flex-col items-center text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer">
          <div className="relative">
            <FontAwesomeIcon icon={faUsers} className="text-xl group-hover:scale-125 transition duration-300 ease-in-out" />
            <div className="absolute -inset-0 bg-yellow-500 opacity-0 group-hover:opacity-100 rounded-full blur-md transition duration-300 ease-in-out"></div>
          </div>
          <p className="text-sm mt-2 group-hover:font-semibold">Friends</p>
        </div>

        {/* Airdrop */}
        <div className="group flex flex-col items-center text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer">
          <div className="relative">
            <FontAwesomeIcon icon={faGift} className="text-xl group-hover:scale-125 transition duration-300 ease-in-out" />
            <div className="absolute -inset-0 bg-yellow-500 opacity-0 group-hover:opacity-100 rounded-full blur-md transition duration-300 ease-in-out"></div>
          </div>
          <p className="text-sm mt-2 group-hover:font-semibold">Airdrop</p>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
