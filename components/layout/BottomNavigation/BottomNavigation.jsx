"use client";

import Link from "next/link";
import useNavigation from "@/hook/use-navigation";
import { useToken } from "@/context/TokenContext"; 
import {
  HomeIcon as HomeOutline,
  CalendarDaysIcon as ReservationOutline,
  InformationCircleIcon as AboutOutline,
  UserIcon as UserOutline,
  PhoneIcon as ContactOutline,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  CalendarDaysIcon as ReservationSolid,
  InformationCircleIcon as AboutSolid,
  UserIcon as UserSolid,
  PhoneIcon as ContactSolid,
} from "@heroicons/react/24/solid";

const BottomNavigation = () => {

  const { isHomeActive, isProfileActive, isReservationActive, isAboutActive, isContactActive } =
    useNavigation();


  const { token } = useToken(); 

  return (
    <div className="fixed bottom-0 w-full h-[75px] py-4 z-10 bg-gray-100 dark:bg-gray-800 custom-shadow sm:hidden">
      <div className="flex justify-around items-center w-full">
       
        <Link
          href="/"
          className={`flex flex-col items-center w-16 text-center ${isHomeActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          {isHomeActive ? <HomeSolid className="h-6 w-6" /> : <HomeOutline className="h-6 w-6" />}
          <span className="text-sm">خانه</span>
        </Link>

     
        <Link
          href="/about"
          className={`flex flex-col items-center w-16 text-center ${isAboutActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          {isAboutActive ? <AboutSolid className="h-6 w-6" /> : <AboutOutline className="h-6 w-6" />}
          <span className="text-sm">درباره ما</span>
        </Link>

  
        <Link
          href="/reservation"
          className={`flex flex-col items-center w-16 text-center ${isReservationActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          {isReservationActive ? <ReservationSolid className="h-6 w-6" /> : <ReservationOutline className="h-6 w-6" />}
          <span className="text-sm">رزرو</span>
        </Link>


        <Link
          href="/contact-us"
          className={`flex flex-col items-center w-16 text-center ${isContactActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          {isContactActive ? <ContactSolid className="h-6 w-6" /> : <ContactOutline className="h-6 w-6" />}
          <span className="text-sm">تماس با ما</span>
        </Link>

     
        <Link
          href={token ? "/profile" : "/login"} 
          className={`flex flex-col items-center w-16 text-center ${isProfileActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          {isProfileActive ? <UserSolid className="h-6 w-6" /> : <UserOutline className="h-6 w-6" />}
          <span className="text-sm">{token ? "پروفایل" : "ورود"}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
