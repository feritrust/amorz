// components/about/aboutUs.jsx
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
    <main className="container mx-auto p-4" dir="rtl">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">
            درباره خدمات بهشت زهرا
          </h1>
        </CardHeader>

        <CardContent className="space-y-6">
          <section>
            <CardDescription>
              در لحظات سخت و حساس از دست دادن عزیزان، آرامش و اطمینان از روند
              امور بسیار مهم است. ما در «خدمات بهشت زهرا» تلاش می‌کنیم تا کلیه
              خدمات مورد نیاز شما مانند تاج گل، سبد گل، اجاره میز و صندلی و سایر
              خدمات مرتبط با مراسم ختم را با نهایت دقت، احترام و نظم انجام دهیم.
              هدف ما فراهم کردن تجربه‌ای آرام و بدون دغدغه برای خانواده‌هاست.
            </CardDescription>
          </section>

          <section>
            <CardTitle className="text-xl font-semibold mb-2">
              چرا خدمات ما را انتخاب کنید؟
            </CardTitle>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 text-sm md:text-base">
              <li>
                <strong>پشتیبانی کامل:</strong> همراهی از لحظه فوت تا پایان
                مراسم با مشاوره و راهنمایی کامل.
              </li>
              <li>
                <strong>احترام به آداب و رسوم:</strong> اجرای دقیق مراحل شرعی و
                عرفی با توجه به فرهنگ و باورهای خانواده‌ها.
              </li>
              <li>
                <strong>تسهیل فرآیندها:</strong> امکان رزرو و پیگیری آنلاین
                خدمات در بهشت زهرا و کاهش استرس و اتلاف وقت.
              </li>
              <li>
                <strong>تجربه و تخصص:</strong> تیم مجرب و آموزش‌دیده برای انجام
                امور با بالاترین کیفیت و احترام.
              </li>
            </ul>
          </section>

          <section>
            <CardTitle className="text-xl font-semibold mb-2">
              نحوه استفاده از خدمات
            </CardTitle>
            <CardDescription>
              برای دریافت خدمات، می‌توانید از طریق سیستم آنلاین ما درخواست خود
              را ثبت کنید تا مشاوران ما در کوتاه‌ترین زمان با شما تماس بگیرند.
              همچنین امکان هماهنگی تلفنی برای رزرو تاج گل، گل‌آرایی، میز و
              صندلی و سایر خدمات ویژه بهشت زهرا فراهم است. ما متعهد به ارائه
              خدماتی آرام، منظم و با احترام هستیم.
            </CardDescription>
          </section>
        </CardContent>

        <CardFooter className="text-center">
          <p className="text-gray-500 text-sm">
           &copy; 2025 خدمات بهشت زهرا. تمامی حقوق محفوظ است.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default AboutUs;
