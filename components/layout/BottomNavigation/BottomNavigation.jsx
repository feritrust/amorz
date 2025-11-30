"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HomeIcon as HomeOutline,
  Squares2X2Icon as CategoriesOutline,
  InformationCircleIcon as AboutOutline,
  PhoneIcon as ContactOutline,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeSolid,
  Squares2X2Icon as CategoriesSolid,
  InformationCircleIcon as AboutSolid,
  PhoneIcon as ContactSolid,
} from "@heroicons/react/24/solid";

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 w-full h-[75px] py-4 z-10 bg-gray-100 dark:bg-gray-800 border-t sm:hidden">
      <div className="flex justify-around items-center w-full">
        {/* خانه */}
        <Link
          href="/"
          className={`flex flex-col items-center w-16 text-center ${
            isActive("/")
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {isActive("/") ? (
            <HomeSolid className="h-6 w-6" />
          ) : (
            <HomeOutline className="h-6 w-6" />
          )}
          <span className="text-sm">خانه</span>
        </Link>

        {/* دسته‌بندی‌ها */}
        <Link
          href="/categories"
          className={`flex flex-col items-center w-16 text-center ${
            isActive("/categories")
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {isActive("/categories") ? (
            <CategoriesSolid className="h-6 w-6" />
          ) : (
            <CategoriesOutline className="h-6 w-6" />
          )}
          <span className="text-sm">دسته‌بندی‌ها</span>
        </Link>

        {/* خدمات ما (صفحه استاتیک AboutUs) */}
        <Link
          href="/about"
          className={`flex flex-col items-center w-16 text-center ${
            isActive("/about")
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {isActive("/about") ? (
            <AboutSolid className="h-6 w-6" />
          ) : (
            <AboutOutline className="h-6 w-6" />
          )}
          <span className="text-sm">خدمات ما</span>
        </Link>

        {/* تماس با ما */}
        <Link
          href="/contact-us"
          className={`flex flex-col items-center w-16 text-center ${
            isActive("/contact-us")
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {isActive("/contact-us") ? (
            <ContactSolid className="h-6 w-6" />
          ) : (
            <ContactOutline className="h-6 w-6" />
          )}
          <span className="text-sm">تماس با ما</span>
        </Link>
      </div>
    </div>
  );
}
