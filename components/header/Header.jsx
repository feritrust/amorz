"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/darkmode/Darkmode";
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
  const currentPage = pathname?.split("/")[1] || "Home";
  const {
    isHomeActive,
    isProfileActive,
    isReservationActive,
    isAboutActive,
    isContactActive,
  } = useNavigation();

  return (
    <header className="bg-white shadow-md p-4 w-full">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        {/* Right Section: Navigation Menu (Hidden on mobile, 70% width) */}
        <nav className="hidden md:flex w-2/3 justify-end space-x-6">
          <Link
            href="/"
            className={`flex items-center space-x-1 ${
              isHomeActive ? "text-black font-bold" : "text-gray-600"
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
            className={`flex items-center space-x-1 ${
              isAboutActive ? "text-black font-bold" : "text-gray-600"
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
            className={`flex items-center space-x-1 ${
              isReservationActive ? "text-black font-bold" : "text-gray-600"
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
            className={`flex items-center space-x-1 ${
              isContactActive ? "text-black font-bold" : "text-gray-600"
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
            className={`flex items-center space-x-1 ${
              isProfileActive ? "text-black font-bold" : "text-gray-600"
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
        {/* Left Section: Logo & Current Page (30% width) */}
        <div className="w-full flex justify-between space-x-2 md:w-1/5 ">
          <div className="flex space-x-2">
            <Link href="/">
              <span className="text-xl font-bold text-blue-600">
                باشگاه مشتریان پدل
              </span>
            </Link>
          </div>

          <div className="">
            <ModeToggle />
          </div>
        </div>

        {/* Mode Toggle (Visible on all screens) */}
      </div>
    </header>
  );
};

export default Header;
