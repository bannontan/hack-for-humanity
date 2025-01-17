import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Provide the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => useContext(UserContext);
