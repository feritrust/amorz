"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isReservationActive, setIsReservationActive] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);

  useEffect(() => {
    // ابتدا همه صفحات غیر فعال می‌شوند
    setIsHomeActive(false);
    setIsProfileActive(false);
    setIsReservationActive(false);
    setIsAboutActive(false);
    setIsContactActive(false);

    // بر اساس مسیر فعلی، صفحه فعال تنظیم می‌شود
    switch (pathname) {
      case "/":
        setIsHomeActive(true);
        break;
      case "/profile":
        setIsProfileActive(true);
        break;
      case "/reservation":
        setIsReservationActive(true);
        break;
      case "/about":
        setIsAboutActive(true);
        break;
        case "/contact-us":
          setIsContactActive(true);
          break;
      default:
        // برای هر مسیر دیگری که وجود ندارد
        break;
    }
  }, [pathname]);

  return {
    isHomeActive,
    isProfileActive,
    isReservationActive,
    isAboutActive,
    isContactActive,
  };
};

export default useNavigation;
