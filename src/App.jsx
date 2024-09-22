// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Farming from './components/Farming'
import BottomNav from './components/BottomNav'

const App = () => {
    const [telegramId, setTelegramId] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTelegramId = async () => {
        try {
          // Replace with your actual API endpoint to get the user data
          const response = await axios.get('https://your-api-endpoint.com/api/user'); 
          setTelegramId(response.data.telegramId); // Adjust based on your data structure
        } catch (error) {
          console.error("Error fetching Telegram ID:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTelegramId();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        {telegramId ? (
          <Farming telegramId={telegramId} />
        ) : (
          <div>Error: Telegram ID is required. Please ensure you have started the bot.</div>
        )}
        <BottomNavbar/>
      </div>
    );
  };
  
  export default App;
