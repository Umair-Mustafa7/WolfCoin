// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Tasks from './components/Tasks';
import Friends from './components/Friends';
import Airdrop from './components/Airdrop';
import Farming from './components/Farming'
import BottomNav from './components/BottomNav'
import { GemProvider } from './context/GemContext.jsx';
import TelegramLogin from './components/TelegramLogin';
import TelegramWebApp from './components/TelegramWebApp';


function App() {
return (
  <GemProvider>
    <TelegramWebApp/>
    <>
<Router>

      <div className="min-h-screen">
        <TelegramLogin/>
        {/* Define Routes for each page */}
        <Routes>
          <Route path="/" element={<Farming />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/airdrop" element={<Airdrop />} />
        </Routes>

        {/* Include the Bottom Navigation */}
        <BottomNav />
      </div>
    </Router>
    
    </>
    </GemProvider>
)

}


export default App;
