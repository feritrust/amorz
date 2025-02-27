"use client";

import Link from "next/link";
import useNavigation from "@/hook/use-navigation"; // استفاده از هوک اصلاح شده
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
  // استفاده از هوک برای مشخص کردن صفحه فعال
  const { isHomeActive, isProfileActive, isReservationActive, isAboutActive, isContactActive } =
    useNavigation();

  return (
    <div className="fixed bottom-0 w-full h-[75px] py-4 z-10 bg-gray-100 custom-shadow sm:hidden">
  <div className="flex justify-around items-center w-full">
    {/* Home */}
    <Link href="/" className={`flex flex-col items-center w-16 text-center ${isHomeActive ? "text-black" : "text-gray-500"}`}>
      {isHomeActive ? <HomeSolid className="h-6 w-6" /> : <HomeOutline className="h-6 w-6" />}
      <span className="text-sm">خانه</span>
    </Link>

    {/* About Us */}
    <Link href="/about" className={`flex flex-col items-center w-16 text-center ${isAboutActive ? "text-black" : "text-gray-500"}`}>
      {isAboutActive ? <AboutSolid className="h-6 w-6" /> : <AboutOutline className="h-6 w-6" />}
      <span className="text-sm">درباره ما</span>
    </Link>

    {/* Reservation */}
    <Link href="/reservation" className={`flex flex-col items-center w-16 text-center ${isReservationActive ? "text-black" : "text-gray-500"}`}>
      {isReservationActive ? <ReservationSolid className="h-6 w-6" /> : <ReservationOutline className="h-6 w-6" />}
      <span className="text-sm">رزرو</span>
    </Link>

    {/* Contact Us */}
    <Link href="/contact-us" className={`flex flex-col items-center w-16 text-center ${isContactActive ? "text-black" : "text-gray-500"}`}>
      {isContactActive ? <ContactSolid className="h-6 w-6" /> : <ContactOutline className="h-6 w-6" />}
      <span className="text-sm">تماس با ما</span>
    </Link>

    {/* Profile */}
    <Link href="/profile" className={`flex flex-col items-center w-16 text-center ${isProfileActive ? "text-black" : "text-gray-500"}`}>
      {isProfileActive ? <UserSolid className="h-6 w-6" /> : <UserOutline className="h-6 w-6" />}
      <span className="text-sm">پروفایل</span>
    </Link>
  </div>
</div>
  );
};

export default BottomNavigation;
