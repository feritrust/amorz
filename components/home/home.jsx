// components/home/home.jsx
"use client";
import { Button } from "@/components/ui/button";
import SliderSection from "@/components/slider/SwiperSlider";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-4">
      <section className="w-full relative">
        <div
          className="absolute top-0 left-0 w-full h-[150px] md:h-[300px] bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: "url('/images/haven.jpg')",
          }}
        />

        <div className="relative z-10 flex justify-center items-end p-2 w-full h-[150px] md:h-[300px]">
          <div className="bg-white/80 p-3 rounded-md shadow-xl text-[13px] text-center">
            <h1 className="font-bold text-gray-900">
              خدمات بهشت زهرا
            </h1>
            <p className="text-gray-600 mt-1">
              تمامی خدمات بهشت زهرا را از قبل به صورت آنلاین رزرو کنید
            </p>

            <Link href="/contact-us">
              <Button className="mt-4 w-full">تماس بگیر</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-start mt-8">
        <SliderSection />
      </section>
    </main>
  );
}
