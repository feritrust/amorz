"use client"; // Ensure this file is treated as a client component

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const TokenContext = createContext(null);

// Provide token functions and state
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load token from localStorage when the app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Save token to localStorage and state
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  // Remove token (logout)
  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook to use Token Context
export const useToken = () => useContext(TokenContext);
