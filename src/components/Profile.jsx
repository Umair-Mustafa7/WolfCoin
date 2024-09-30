import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Profile = () => {
  const [gems, setGems] = useState(0);
  const [searchParams] = useSearchParams();
  const telegramId = searchParams.get('telegramId');  // Extract telegramId from URL

  useEffect(() => {
    // Fetch the user's gem balance from the backend API
    axios.get(`https://wolf-coin-ho99.vercel.app/api/gems?telegramId=${telegramId}`)
      .then(response => {
        setGems(response.data.gems);  // Set the user's gem balance
      })
      .catch(error => {
        console.error('Error fetching gem balance:', error);
      });
  }, [telegramId]);

  return (
    <div>
      <h1>Your Gem Balance: {gems}</h1>
    </div>
  );
};

export default Profile;
