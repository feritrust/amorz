"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isShopActive, setIsShopActive] = useState(false);

  useEffect(() => {
    // ابتدا همه صفحات غیر فعال می‌شوند
    setIsHomeActive(false);
    setIsProfileActive(false);
    setIsChatActive(false);
    setIsShopActive(false);

    // بر اساس مسیر فعلی، صفحه فعال تنظیم می‌شود
    switch (pathname) {
      case "/":
        setIsHomeActive(true);
        break;
      case "/profile":
        setIsProfileActive(true);
        break;
      case "/chats":
        setIsChatActive(true);
        break;
      case "/shop":
        setIsShopActive(true);
        break;
      default:
        // برای هر مسیر دیگری که وجود ندارد
        break;
    }
  }, [pathname]);

  return {
    isHomeActive,
    isProfileActive,
    isChatActive,
    isShopActive,
  };
};

export default useNavigation;
