"use client"; // ✅ Add this at the top

import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "@/utils/cookie"; // ✅ Ensure this path is correct

const TokenContext = createContext();

export const useToken = () => {
  return useContext(TokenContext);
};

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Initialize token from cookie if available
  useEffect(() => {
    const savedToken = getCookie("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const setAuthToken = (newToken) => {
    setToken(newToken);
    setCookie("authToken", newToken, { path: "/", secure: true, sameSite: "Strict" });
  };

  const removeAuthToken = () => {
    setToken(null);
    deleteCookie("authToken");
    deleteCookie("phoneNumber");

  };

  return (
    <TokenContext.Provider value={{ token, setAuthToken, removeAuthToken }}>
      {children}
    </TokenContext.Provider>
  );
};
