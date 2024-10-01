import React, { useEffect, useState } from 'react';

const TelegramWebApp = () => {
  const [telegramId, setTelegramId] = useState(null);
  const [userName, setUserName] = useState('User');
  const [userDataFetched, setUserDataFetched] = useState(false);

  // This effect runs when the component loads
  useEffect(() => {
    // Ensure we're in the Telegram Web App environment
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Telegram Web App detected!");
      window.Telegram.WebApp.init();

      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      console.log('User Data:', user);  // Log the entire user object

      if (user) {
        setTelegramId(user.id);
        setUserName(user.username || user.first_name || 'User');
        setUserDataFetched(true);
        console.log('Fetched Telegram ID:', user.id); // Debugging
      } else {
        console.error('Telegram user data not found');
      }
    } else {
      console.log('Simulating user for local testing');  // Local fallback
      setTelegramId('123456789');  // Simulate a Telegram ID for testing
      setUserName('TestUser');
      setUserDataFetched(true);
    }
  }, []);

  const handleCollectGems = async () => {
    if (!telegramId) {
      alert('Failed to fetch Telegram ID.');
      return;
    }

    try {
      const response = await fetch(' https://cfc6-2400-adc7-1921-5100-5c8a-87ba-558d-6c4d.ngrok-free.app/api/collect-gems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId, // Send the Telegram ID we fetched
          gems: 100,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`You collected ${data.gems} gems!`);
      } else {
        throw new Error('Failed to collect gems');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to collect gems. Please try again later.');
    }
  };

  return (
    <div>
      {userDataFetched ? (
        <div>
          <h1>Welcome, {userName}!</h1>
          <button onClick={handleCollectGems}>Collect 100 Gems</button>
        </div>
      ) : (
        <h1>Loading your data...</h1>
      )}
    </div>
  );
};

export default TelegramWebApp;
