// app/page.jsx
import HomeSections from "@/components/home/HomeSections";
import FaqJsonLd from "@/components/home/FaqJsonLd";
import { fetchHomeData } from "@/lib/home-data";

export const metadata = {
  title: "خدمات بهشت زهرا | رزرو آنلاین گل، تاج گل، میز و صندلی",
  description:
    "رزرو آنلاین تاج گل، سبد گل، میز و صندلی و سایر خدمات ویژه مراسم در بهشت زهرا با پشتیبانی و تحویل مطمئن.",
  alternates: { canonical: "https://amorz.ir/" },
  openGraph: {
    title: "خدمات بهشت زهرا | رزرو آنلاین خدمات",
    description: "رزرو آنلاین تاج گل، سبد گل، میز و صندلی و سایر خدمات مراسم.",
    url: "https://amorz.ir/",
    siteName: "خدمات بهشت زهرا",
    images: [{ url: "/images/haven.jpg", width: 1200, height: 630, alt: "خدمات بهشت زهرا" }],
    locale: "fa_IR",
    type: "website",
  },
};

export default async function HomePage() {
  const { discounted, randomProducts, randomCategories } = await fetchHomeData();

  return (
    <>
      <FaqJsonLd />
      <HomeSections
        discounted={discounted}
        randomProducts={randomProducts}
        randomCategories={randomCategories}
      />
    </>
  );
}
