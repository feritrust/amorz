"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function SliderSection() {
  const slides = [
    {
      title: "Slide 1",
      text: "Short text for slide 1",
      image: "/images/slide1.jpg",
    },
    {
      title: "Slide 2",
      text: "Short text for slide 2",
      image: "/images/slide1.jpg",
    },
    {
      title: "Slide 3",
      text: "Short text for slide 3",
      image: "/images/slide1.jpg",
    },
    {
      title: "Slide 4",
      text: "Short text for slide 4",
      image: "/images/slide1.jpg",
    },
  ];

  return (
    <div className="w-full max-w-3xl mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Best Coaches</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={1.1}
        centeredSlides={true}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.5 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Card className="p-3 text-center">
              <CardContent>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-40 object-cover rounded-lg"
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
