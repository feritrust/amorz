// app/categories/page.jsx
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { apiFetch } from "@/lib/api";

export const metadata = {
  title: "دسته‌بندی‌ها",
  description: "لیست دسته‌بندی‌های خدمات بهشت زهرا برای رزرو آنلاین.",
  alternates: { canonical: "https://amorz.ir/categories" },
};

export const dynamic = "force-dynamic"; // ✅ برای اینکه تو prod هم cached نشه

export default async function CategoriesPage() {
  const categories = (await apiFetch("/categories", { cache: "no-store" })) || [];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: categories.map((cat, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cat.name,
      url: `https://amorz.ir/categories/${cat.slug}`,
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6" dir="rtl">
      <Script
        id="categories-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <h1 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
        دسته‌بندی‌ها
      </h1>

      {categories.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          هیچ دسته‌بندی‌ای ثبت نشده است.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="block bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              {cat.imageUrl && (
                <div className="relative w-full h-28 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-3">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {cat.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
