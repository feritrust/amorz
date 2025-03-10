"use client";

import { useToken } from "@/context/TokenContext";
import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookie";
import LoginPage from "@/app/login/page"; // ✅ Import Login Component

const ProfilePage = () => {
  const { token, removeAuthToken } = useToken();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (token) {
      const storedPhoneNumber = getCookie("phoneNumber");
      if (storedPhoneNumber) {
        setPhoneNumber(storedPhoneNumber);
      }
    }
  }, [token]);

  const handleLogout = () => {
    removeAuthToken();
    setPhoneNumber("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      
        {token ? (
          <>
            <h2 className="text-2xl font-bold text-center">Welcome, {phoneNumber || "User"}!</h2>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <LoginPage /> // ✅ Show full login UI inside Profile
        )}
      
    </div>
  );
};

export default ProfilePage;
