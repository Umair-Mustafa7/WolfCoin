export const collectGemsAPI = async (gemsToCollect) => {
    try {
      const response = await fetch('/api/collect-gems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  