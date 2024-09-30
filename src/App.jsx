import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Farming from './components/Farming';
import Profile from './components/Profile';
import Tasks from './components/Tasks';
import Friends from './components/Friends';
import Airdrop from './components/Airdrop';
import BottomNav from './components/BottomNav';
import { GemProvider } from './components/GemContext';

function App() {
  const [isTelegramApp, setIsTelegramApp] = useState(true);

  // Check if the app is opened inside Telegram
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      setIsTelegramApp(false); // Not opened in Telegram
    }
  }, []);

  if (!isTelegramApp) {
    // Show a message if the app is opened outside of Telegram
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white text-center p-4">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Please open this app in Telegram</h1>
          <p className="text-lg">
            This web app is designed to be used inside the Telegram app. Please open it in Telegram to continue.
          </p>
          <a
            href="https://telegram.org"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold text-lg"
          >
            Open Telegram
          </a>
        </div>
      </div>
    );
  }

  // Main app rendering inside Telegram
  return (
    <GemProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Farming />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/airdrop" element={<Airdrop />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </GemProvider>
  );
}

export default App;
