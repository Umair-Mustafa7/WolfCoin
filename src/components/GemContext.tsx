import React, { createContext, useState } from 'react';

// Create a context with default values
export const GemContext = createContext({
  gems: 0,
  addGems: () => {},  // Default function that does nothing
});

// GemProvider component to provide gems and addGems to its children
export const GemProvider = ({ children }) => {
  const [gems, setGems] = useState(0);

  // Function to add gems, expecting a number as an argument
  const addGems = (amount) => {
    setGems((prevGems) => prevGems + amount);
  };

  return (
    <GemContext.Provider value={{ gems, addGems }}>
      {children}
    </GemContext.Provider>
  );
};
