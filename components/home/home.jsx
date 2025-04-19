"use client";
import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import SliderSection from "@/components/slider/SwiperSlider";

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

export default function Home() {
  return (
    <AppProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
     
        <div className="w-full relative">
        
          <div
            className="absolute top-0 left-0 w-full h-[150px] md:h-[300px] bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: "url('/images/paddle.jpg')",
            }}
          ></div>

       
          <div className="relative z-10 flex justify-center items-end p-2 w-full h-[150px] md:h-[300px] ">
            <div className="bg-white opacity-80 p-1 rounded-sm shadow-xl text-[13px] text-center">
              <h1 className=" font-bold text-gray-900">
                به باشگاه مشتریان پدل خوش آمدید
              </h1>
              <p className="text-gray-600 mt-1">
                همین حالا زمین رو رزرو کن و با خیال راحت ورزش حرفه‌ای کن
              </p>
              <Button className="mt-4">رزرو زمین</Button>
            </div>
          </div>
        </div>

     
        <div className="w-full flex justify-start mt-8">
          <SliderSection />
        </div>
        <div className="w-full flex justify-start mt-8">
          <SliderSection />
        </div>
      </div>
    </AppProvider>
  );
}
