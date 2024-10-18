import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated sign-in with Google function
  const signInWithGoogle = async () => {
    // Implement your Google sign-in logic here
    const userData = { displayName: "John Doe", email: "john@example.com" }; // Simulated user data
    setUser(userData);
    setIsLoading(false);
  };

  const logout = async () => {
    // Implement your logout logic here
    setUser(null);
    setIsLoading(false);
  };

  useEffect(() => {
    // Here you might want to check if the user is already logged in (e.g., using localStorage)
    const userData = null; // Replace with actual check logic
    if (userData) {
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
