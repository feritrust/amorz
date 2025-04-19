"use client";

import { useToken } from "@/context/TokenContext";
import { useGetUser } from "@/hook/useGetUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginPage from "@/app/login/page";

const Profile = () => {
  const { token, removeAuthToken } = useToken();
  const { data, isLoading, error } = useGetUser(token);

  const handleLogout = () => {
    removeAuthToken();
  };

  if (!token) {
    return <LoginPage />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">
          خطایی رخ داده است. لطفاً دوباره تلاش کنید.
        </div>
      </div>
    );
  }

  const phoneNumber = data?.phoneNumber || "User";

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-10 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/default-avatar.png" alt="User Avatar" />
            <AvatarFallback>{phoneNumber.slice(-4)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center text-2xl font-bold">
            خوش آمدید, {phoneNumber}!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            خروج
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="reservation" className="w-full max-w-4xl mt-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">تاریخچه سفارشات</TabsTrigger>
          <TabsTrigger value="reservation">سفارش‌های من</TabsTrigger>
          <TabsTrigger value="payment">پرداخت‌های من</TabsTrigger>
        </TabsList>

        <TabsContent value="reservation">
          <div className="p-4">
            <h3 className="text-xl font-semibold">سفارش‌های من</h3>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="p-4">
            <h3 className="text-xl font-semibold">پرداخت‌های من</h3>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="p-4">
            <h3 className="text-xl font-semibold">تاریخچه سفارشات</h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
