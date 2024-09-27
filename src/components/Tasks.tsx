import React, { useState, useEffect } from 'react';
import { FaTelegram, FaTwitter, FaYoutube, FaGift, FaClock, FaCheckCircle, FaGem } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Tasks = () => {
  const [timeLeft, setTimeLeft] = useState(34 * 3600); // 34 hours for daily reward (in seconds)
  const [gems, setGems] = useState(0); // User's gem balance
  const [rewardClaimed, setRewardClaimed] = useState(false); // Track if the reward was claimed
  const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem('completedTasks')) || []); // Track completed tasks
  const [taskStatus, setTaskStatus] = useState(JSON.parse(localStorage.getItem('taskStatus')) || {}); // Task status: visited or ready to claim

  // Dummy data for tasks
  const tasks = [
    {
      id: 1,
      title: 'Follow Telegram Channel',
      reward: 50,
      icon: <FaTelegram />,
      actionLink: 'https://t.me/telegram',
    },
    {
      id: 2,
      title: 'Follow Twitter Page',
      reward: 50,
      icon: <FaTwitter />,
      actionLink: 'https://twitter.com/twitter',
    },
    {
      id: 3,
      title: 'Watch YouTube Video',
      reward: 50,
      icon: <FaYoutube />,
      actionLink: 'https://www.youtube.com/',
    },
  ];

  // Countdown Timer Logic for the daily reward
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer); // Cleanup interval on unmount
    }
  }, [timeLeft]);

  // Handle reward claim for daily reward
  const handleClaimReward = () => {
    if (timeLeft === 0 && !rewardClaimed) {
      setGems(gems + 100); // Add 100 gems to the user's balance
      setRewardClaimed(true); // Mark reward as claimed
      toast.success('You claimed 100 gems!');
    }
  };

  // Handle external task completion (Telegram, Twitter, YouTube)
  const handleExternalTaskClick = (taskId) => {
    // Mark task as visited (but not claimed yet)
    setTaskStatus({ ...taskStatus, [taskId]: 'visited' });
    localStorage.setItem('taskStatus', JSON.stringify({ ...taskStatus, [taskId]: 'visited' }));

    // Open the external link in a new tab
    const task = tasks.find((t) => t.id === taskId);
    window.open(task.actionLink, '_blank');
  };

  // Handle claim after visiting external link
  const handleClaimTask = (taskId, reward) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      localStorage.setItem('completedTasks', JSON.stringify([...completedTasks, taskId]));
      setGems(gems + reward); // Add gems reward to user's balance
      toast.success(`Task completed! You earned ${reward} gems!`);
    }
  };

  // Format time for the countdown timer
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-4 md:p-6 relative overflow-hidden">
      <Toaster />

      {/* Header Section */}
      <motion.div
        className="text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-300">Daily Reward & Tasks</h1>
        <p className="text-sm md:text-lg text-gray-300 mt-4">Complete tasks to earn gems and claim daily rewards!</p>
      </motion.div>

      {/* Gems Balance Display */}
      <motion.div
        className="bg-indigo-500 text-white p-4 md:p-6 rounded-lg shadow-lg text-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold">
          Your Gems: <FaGem className="inline text-yellow-400" /> {gems}
        </h3>
      </motion.div>

      {/* Daily Reward Task */}
      <motion.div
        className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md text-center max-w-md w-full relative overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center mb-4 md:mb-6">
          <FaGift className="text-4xl md:text-5xl text-yellow-400 mr-4" />
          <h2 className="text-2xl md:text-3xl font-bold">Claim 100 Gems</h2>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center items-center mb-4 md:mb-6">
          <FaClock className="text-2xl md:text-3xl text-gray-400 mr-2" />
          <span className="text-xl md:text-2xl font-bold">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-700 w-full h-4 rounded-full mb-4 md:mb-6">
          <div
            className="bg-yellow-400 h-full rounded-full"
            style={{ width: `${((34 * 3600 - timeLeft) / (34 * 3600)) * 100}%` }}
          ></div>
        </div>

        {/* Claim Button */}
        <motion.button
          className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-lg font-bold transition-transform ${
            timeLeft === 0 && !rewardClaimed
              ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 hover:scale-105'
              : 'bg-gray-500 cursor-not-allowed'
          }`}
          onClick={handleClaimReward}
          disabled={timeLeft > 0 || rewardClaimed}
        >
          {rewardClaimed ? (
            <span>
              <FaCheckCircle className="inline mr-2" />
              Reward Claimed
            </span>
          ) : (
            'Claim Reward'
          )}
        </motion.button>
      </motion.div>

      {/* Additional Tasks */}
      <div className="mb-12 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Complete Tasks for Gems</h2>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md flex items-center justify-between relative overflow-hidden mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: task.id * 0.2 }}
          >
            <div className="flex items-center">
              <div className="bg-gray-700 p-3 rounded-full text-yellow-500 text-2xl md:text-3xl mr-4 md:mr-6">
                {task.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{task.title}</h3>
                <p className="text-sm md:text-base text-gray-400">
                  Reward: <FaGem className="inline text-yellow-400" /> {task.reward} Gems
                </p>
              </div>
            </div>
            {/* Action Button */}
            {taskStatus[task.id] === 'visited' && !completedTasks.includes(task.id) ? (
              <button
                className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-green-600 transition-all"
                onClick={() => handleClaimTask(task.id, task.reward)}
                
              >
                Claim
              </button>
            ) : completedTasks.includes(task.id) ? (
              <button
                className="bg-gray-500 px-4 py-2 rounded-lg text-white font-bold cursor-not-allowed"
                disabled
              >
                <FaCheckCircle className="inline mr-2" />
                Claimed
              </button>
            ) : (
              <button
                className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-600 transition-all"
                onClick={() => handleExternalTaskClick(task.id)}
              >
                Go to {task.title}
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
