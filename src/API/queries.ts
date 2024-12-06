export const fetchPlayerData = async () => {
    try {
      const response = await fetch('http://localhost:3000/players');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching player data:', error);
      return null; // Return null or an empty array to handle errors gracefully
    }
  };