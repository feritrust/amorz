// app/components/home/FaqJsonLd.jsx
import Script from "next/script";

export default function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "چطور خدمات بهشت زهرا را آنلاین رزرو کنم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "از بخش محصولات/خدمات، گزینه موردنظر را انتخاب کنید و درخواست خود را ثبت کنید.",
        },
      },
      {
        "@type": "Question",
        name: "تحویل تاج گل و سایر خدمات چقدر زمان می‌برد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بسته به نوع سفارش، هماهنگی سریع انجام می‌شود و زمان تحویل قبل از ثبت نهایی اعلام می‌گردد.",
        },
      },
      {
        "@type": "Question",
        name: "آیا امکان هماهنگی تلفنی هم هست؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بله، در صورت نیاز می‌توانید برای هماهنگی دقیق‌تر با پشتیبانی تماس بگیرید.",
        },
      },
    ],
  };

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
