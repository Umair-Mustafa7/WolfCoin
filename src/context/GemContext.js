import React, { createContext, useState } from 'react';

export const GemContext = createContext();

export const GemProvider = ({ children }) => {
  const [gems, setGems] = useState(0);

  const addGems = (newGems) => {
    setGems((prevGems) => prevGems + newGems);
  };

  return (
    <GemContext.Provider value={{ gems, addGems }}>
      {children}
    </GemContext.Provider>
  );
};
