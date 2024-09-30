import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGem, faTasks, faUsers, faGift } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom'; // Import Link from React Router

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white bg-opacity-10 backdrop-blur-md shadow-lg py-4 rounded-t-3xl border-t border-gray-300">
      <div className="flex justify-around items-center">
        {/* Home */}
        <Link to="/" className="group flex flex-col items-center text-gray-300 hover:text-white transition duration-300 ease-in-out cursor-pointer relative">
          <div className="relative">
            <FontAwesomeIcon
              icon={faHome}
              className="text-2xl group-hover:scale-125 group-hover:text-yellow-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-50 blur-lg transition duration-300 ease-in-out"></div>
          </div>
          <p className="absolute bottom-10 opacity-0 text-sm font-semibold transition-all duration-300 group-hover:bottom-12 group-hover:opacity-100">
            Home
          </p>
        </Link>

        {/* Profile - Now with Diamond Icon */}
        <div className="group flex flex-col items-center text-gray-500 relative cursor-not-allowed">
          <div className="relative">
            <FontAwesomeIcon
              icon={faGem} // Changed from faUser to faGem
              className="text-2xl group-hover:scale-125 group-hover:text-gray-400 transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-0 rounded-full bg-gray-500 opacity-0 group-hover:opacity-50 blur-lg transition duration-300 ease-in-out"></div>
          </div>
          <p className="absolute bottom-10 opacity-0 text-sm font-semibold transition-all duration-300 group-hover:bottom-12 group-hover:opacity-100 text-gray-300">
            Coming Soon
          </p>
        </div>

        {/* Tasks */}
        <Link to="/tasks" className="group flex flex-col items-center text-gray-300 hover:text-white transition duration-300 ease-in-out cursor-pointer relative">
          <div className="relative">
            <FontAwesomeIcon
              icon={faTasks}
              className="text-2xl group-hover:scale-125 group-hover:text-yellow-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-50 blur-lg transition duration-300 ease-in-out"></div>
          </div>
          <p className="absolute bottom-10 opacity-0 text-sm font-semibold transition-all duration-300 group-hover:bottom-12 group-hover:opacity-100">
            Tasks
          </p>
        </Link>

        {/* Friends */}
        <Link to="/friends" className="group flex flex-col items-center text-gray-300 hover:text-white transition duration-300 ease-in-out cursor-pointer relative">
          <div className="relative">
            <FontAwesomeIcon
              icon={faUsers}
              className="text-2xl group-hover:scale-125 group-hover:text-yellow-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-50 blur-lg transition duration-300 ease-in-out"></div>
          </div>
          <p className="absolute bottom-10 opacity-0 text-sm font-semibold transition-all duration-300 group-hover:bottom-12 group-hover:opacity-100">
            Friends
          </p>
        </Link>

        {/* Airdrop */}
        <Link to="/airdrop" className="group flex flex-col items-center text-gray-300 hover:text-white transition duration-300 ease-in-out cursor-pointer relative">
          <div className="relative">
            <FontAwesomeIcon
              icon={faGift}
              className="text-2xl group-hover:scale-125 group-hover:text-yellow-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-50 blur-lg transition duration-300 ease-in-out"></div>
          </div>
          <p className="absolute bottom-10 opacity-0 text-sm font-semibold transition-all duration-300 group-hover:bottom-12 group-hover:opacity-100">
            Airdrop
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
