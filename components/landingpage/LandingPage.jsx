"use client";
import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import SliderSection from "@/components/Slider/SwiperSlider";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState("Hello World");
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default function LandingPage() {
  return (
    <AppProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Banner */}
        <div className="w-full max-w-4xl mb-6">
          <img
            src="/images/slide1.jpg"
            alt="Banner"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold">
            به باشگاه مشتریان پدل خوش آمدید
          </h1>
          <p className="text-gray-600 mt-2">
            همین حالا زمین رو رزرو کن و با خیال رحت ورزش حرفه ای کن
          </p>
          <Button className="mt-4">رزرو زمین</Button>
        </div>

        {/* Slider Section */}
        <SliderSection />
        <SliderSection />
      </div>
    </AppProvider>
  );
}
