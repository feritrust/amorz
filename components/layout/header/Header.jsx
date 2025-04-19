"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/darkmode/Darkmode";
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
import useNavigation from "@/hook/use-navigation";

const Header = () => {
  const pathname = usePathname();
  const {
    isHomeActive,
    isProfileActive,
    isReservationActive,
    isAboutActive,
    isContactActive,
  } = useNavigation();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md p-4 w-full">
      <div className="w-full flex items-center justify-between">
     
        <div className="flex items-center space-x-4">
       
          <div className="md:ml-2">
            <ModeToggle />
          </div>

        
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isHomeActive
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isHomeActive ? (
                <HomeSolid className="h-5 w-5" />
              ) : (
                <HomeOutline className="h-5 w-5" />
              )}
              <span>خانه</span>
            </Link>
            <Link
              href="/about"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isAboutActive
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isAboutActive ? (
                <AboutSolid className="h-5 w-5" />
              ) : (
                <AboutOutline className="h-5 w-5" />
              )}
              <span>درباره ما</span>
            </Link>
            <Link
              href="/reservation"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isReservationActive
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isReservationActive ? (
                <ReservationSolid className="h-5 w-5" />
              ) : (
                <ReservationOutline className="h-5 w-5" />
              )}
              <span>رزرو</span>
            </Link>
            <Link
              href="/contact-us"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isContactActive
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isContactActive ? (
                <ContactSolid className="h-5 w-5" />
              ) : (
                <ContactOutline className="h-5 w-5" />
              )}
              <span>تماس با ما</span>
            </Link>
            <Link
              href="/profile"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isProfileActive
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isProfileActive ? (
                <UserSolid className="h-5 w-5" />
              ) : (
                <UserOutline className="h-5 w-5" />
              )}
              <span>پروفایل</span>
            </Link>
          </nav>
        </div>

    
        <div>
          <Link href="/">
            <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              باشگاه مشتریان پدل
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
