"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

export default function SliderSection() {
  const slides = [
    {
      title: "گل و دسته گل",
      text: "انواع گل و دسته گل های یک طبقه ، دو طبقه بنا به سلیقه مشتری",
      image: "/images/dastegol.jpg",
      link: "/category/gol",
    },
    {
      title: "میز و صندلی ",
      text: "تحویل انواع میز و صندلی ، سایبان ، بخاری و غیره در محل",
      image: "/images/chair.jpg",
      link: "/category/miz-va-sandali",
    },
    {
      title: "اکو و مداح",
      text: "انواه مداح با زبان های مختلف و سیستم صوتی",
      image: "/images/madah.jpg",
      link: "/category/madah",
    },
    {
      title: "پذیرایی",
      text: "انواع پک پذیرایی ، خرما ، چایی  و  غیره به همراه همهماندار",
      image: "/images/khorma.jpg",
      link: "/category/paziresh",
    },
  ];

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">دسته بندی ها</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={1.5}
        centeredSlides={false}
        direction="horizontal"
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Card className="relative p-0 text-center overflow-hidden">
              {/* Absolute Link covering entire Card */}
              <Link href={slide.link} className="absolute inset-0 z-10" />

              <CardContent className="p-0 pointer-events-none">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-50 object-cover rounded-t-lg"
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
