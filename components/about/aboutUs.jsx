import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            درباره رزرو زمین پدل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            در دنیای پدل، داشتن دسترسی آسان و راحت به زمین‌های باکیفیت برای
            تمرین و مسابقه اهمیت زیادی دارد. ما در تلاش هستیم تا تجربه‌ای
            بی‌نظیر از رزرو زمین پدل را برای شما فراهم کنیم. با ارائه یک سیستم
            رزرو آنلاین ساده و کاربرپسند، شما می‌توانید به سرعت و راحتی زمین
            مورد نظر خود را برای هر زمان و تاریخ که نیاز دارید، رزرو کنید.
          </CardDescription>
          <CardTitle className="text-xl font-semibold mb-2">
            چرا رزرو زمین پدل با ما؟
          </CardTitle>
          <CardDescription className="mb-4">
            - **دسترسی آسان:** با سیستم رزرو آنلاین ما، می‌توانید از هر مکانی و
            در هر زمان زمین پدل را رزرو کنید.
            <br />
            - **تنوع زمین‌ها:** زمین‌های ما با استانداردهای بین‌المللی ساخته
            شده‌اند تا شما بتوانید تجربه‌ای حرفه‌ای و دلپذیر داشته باشید.
            <br />
            - **امکانات ویژه:** امکانات مختلفی مانند نورپردازی مناسب، امکانات
            رفاهی، و نظافت منظم به شما این امکان را می‌دهد که در بهترین شرایط
            ممکن از بازی پدل لذت ببرید.
            <br />- **رزرو راحت:** تنها با چند کلیک می‌توانید زمین دلخواه خود را
            برای ساعت‌ها یا روزهای مورد نیاز رزرو کنید.
          </CardDescription>
          <CardTitle className="text-xl font-semibold mb-2">
            نحوه رزرو
          </CardTitle>
          <CardDescription className="mb-4">
            برای رزرو زمین پدل، تنها کافیست وارد سیستم رزرو آنلاین ما شوید، زمان
            و تاریخ مورد نظر را انتخاب کنید، و رزرو خود را تایید نمایید. در کمتر
            از چند دقیقه، می‌توانید از بازی و تمرین در بهترین زمین‌های پدل لذت
            ببرید.
          </CardDescription>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} شرکت شما. تمام حقوق محفوظ است.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AboutUs;
