"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function SliderSection() {
  const slides = [
    {
      title: "سپهر ستاری",
      text: "مربی درجه 1 در خانه",
      image: "/images/coach1.jpg",
    },
    {
      title: "علی دایی",
      text: "علاقه مند به یادگییری",
      image: "/images/coach2.jpg",
    },
    {
      title: "لیلا فروهر",
      text: "کمک مربی اصلی",
      image: "/images/coach3.jpg",
    },
    {
      title: "اسنوپ داگ",
      text: "فروشنده تجهیزات ",
      image: "/images/coach4.jpg",
    },
  ];

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">مربیان برتر</h2>
      <Swiper
        spaceBetween={10} // فاصله بین اسلایدها
        slidesPerView={1.5} // تعداد اسلایدهای پیش‌فرض برای دسکتاپ
        centeredSlides={false}
        direction="horizontal"
        breakpoints={{
          640: { slidesPerView: 1.5 }, // موبایل: اسلایدها به 1.5 تغییر پیدا می‌کند
          768: { slidesPerView: 2.5 }, // تبلت: اسلایدها به 2 تغییر پیدا می‌کند
          1024: { slidesPerView: 3 }, // دسکتاپ: اسلایدها به 3 تغییر پیدا می‌کند
        }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Card className="p-0 text-center">
              <CardContent className="p-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <h2 className="text-lg font-semibold mt-2">{slide.title}</h2>
                <p className="text-gray-500">{slide.text}</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center mt-4">
        <a href="/coaches" className="text-blue-600 font-semibold">
          نمایش همه
        </a>
      </div>
    </div>
  );
}
