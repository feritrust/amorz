"use client";

import Link from "next/link";
import useNavigation from "@/hook/use-navigation"; // استفاده از هوک اصلاح شده
import {
  HomeIcon as HomeOutline,
  ChatBubbleLeftEllipsisIcon as ChatOutline,
  ShoppingBagIcon as ShopOutline,
  UserIcon as UserOutline,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  ChatBubbleLeftEllipsisIcon as ChatSolid,
  ShoppingBagIcon as ShopSolid,
  UserIcon as UserSolid,
} from "@heroicons/react/24/solid";

const BottomNavigation = () => {
  // استفاده از هوک برای مشخص کردن صفحه فعال
  const { isHomeActive, isProfileActive, isChatActive, isShopActive } =
    useNavigation();

  return (
    <div className="fixed bottom-0 w-full h-[75px] py-4 z-10 bg-gray-100 custom-shadow sm:hidden">
      <div className="flex justify-around items-center w-full">
        {/* لینک به صفحه Home */}
        <Link href="/" className={`flex flex-col items-center ${isHomeActive ? "text-black" : "text-gray-500"}`}>
          {isHomeActive ? <HomeSolid className="h-6 w-6" /> : <HomeOutline className="h-6 w-6" />}
          <span className="text-sm">Home</span>
        </Link>

        {/* لینک به صفحه Chat */}
        <Link href="/chats" className={`flex flex-col items-center ${isChatActive ?  "text-black" : "text-gray-500"}`}>
          {isChatActive ? <ChatSolid className="h-6 w-6" /> : <ChatOutline className="h-6 w-6" />}
          <span className="text-sm">Chat</span>
        </Link>

        {/* لینک به صفحه Shop */}
        <Link href="/shop" className={`flex flex-col items-center ${isShopActive ?  "text-black" : "text-gray-500"}`}>
          {isShopActive ? <ShopSolid className="h-6 w-6" /> : <ShopOutline className="h-6 w-6" />}
          <span className="text-sm">Shop</span>
        </Link>

        {/* لینک به صفحه Profile */}
        <Link href="/profile" className={`flex flex-col items-center ${isProfileActive ?  "text-black" : "text-gray-500"}`}>
          {isProfileActive ? <UserSolid className="h-6 w-6" /> : <UserOutline className="h-6 w-6" />}
          <span className="text-sm">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
