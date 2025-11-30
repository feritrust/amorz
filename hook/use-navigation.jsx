"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();

  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isCategoriesActive, setIsCategoriesActive] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);

  useEffect(() => {
    // ریست
    setIsHomeActive(false);
    setIsCategoriesActive(false);
    setIsAboutActive(false);
    setIsContactActive(false);

    // مسیر فعال
    if (pathname === "/") setIsHomeActive(true);
    else if (pathname.startsWith("/categories")) setIsCategoriesActive(true);
    else if (pathname.startsWith("/about")) setIsAboutActive(true);
    else if (pathname.startsWith("/contact-us")) setIsContactActive(true);

  }, [pathname]);

  return {
    isHomeActive,
    isCategoriesActive,
    isAboutActive,
    isContactActive,
  };
};

export default useNavigation;
