// src/context/authProvider.jsx

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate user authentication (replace with real logic)
  useEffect(() => {
    const fetchUser = async () => {
      // Example: Replace this with your auth logic
      const storedUser = JSON.parse(localStorage.getItem("user")); // Example of getting user from localStorage
      if (storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
