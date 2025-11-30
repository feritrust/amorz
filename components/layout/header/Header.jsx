"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/darkmode/Darkmode";

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

const Header = () => {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md p-4 w-full" dir="rtl">
      <div className="w-full flex items-center justify-between">
        {/* سمت راست: منو + دکمه دارک‌مود */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          <nav className="hidden md:flex gap-2">
            {/* خانه */}
            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive("/")
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isActive("/") ? (
                <HomeSolid className="h-5 w-5" />
              ) : (
                <HomeOutline className="h-5 w-5" />
              )}
              <span>خانه</span>
            </Link>

            {/* دسته‌بندی‌ها */}
            <Link
              href="/categories"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive("/categories")
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isActive("/categories") ? (
                <CategoriesSolid className="h-5 w-5" />
              ) : (
                <CategoriesOutline className="h-5 w-5" />
              )}
              <span>دسته‌بندی‌ها</span>
            </Link>

            {/* خدمات ما (صفحه استاتیک AboutUs) */}
            <Link
              href="/about"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive("/about")
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isActive("/about") ? (
                <AboutSolid className="h-5 w-5" />
              ) : (
                <AboutOutline className="h-5 w-5" />
              )}
              <span>خدمات ما</span>
            </Link>

            {/* تماس با ما */}
            <Link
              href="/contact-us"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive("/contact-us")
                  ? "text-black dark:text-white font-bold bg-gray-100 dark:bg-gray-800"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isActive("/contact-us") ? (
                <ContactSolid className="h-5 w-5" />
              ) : (
                <ContactOutline className="h-5 w-5" />
              )}
              <span>تماس با ما</span>
            </Link>
          </nav>
        </div>

        {/* سمت چپ: لوگو / نام سایت */}
        <div>
          <Link href="/">
            <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              خدمات بهشت زهرا
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
