export const collectGemsAPI = async (gemsToCollect) => {
    try {
      const response = await fetch(' https://cfc6-2400-adc7-1921-5100-5c8a-87ba-558d-6c4d.ngrok-free.app/api/collect-gems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: '6187296748',  // Use a real Telegram ID for testing
          gems: 100,
        }),
        body: JSON.stringify({ gems: gemsToCollect }),
      });
      return response.ok;
    } catch (error) {
      console.error("Error collecting gems:", error);
      return false;
    }
  };
  
  export const fetchUserDataAPI = async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    return null;
  };
  