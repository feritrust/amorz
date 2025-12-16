// app/products/page.jsx
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { apiFetch } from "@/lib/api";

export const metadata = {
  title: "خدمات / محصولات | بهشت زهرا",
  description: "لیست خدمات و محصولات قابل رزرو در بهشت زهرا.",
  alternates: { canonical: "https://amorz.ir/products" },
};

export default async function ProductsPage({ searchParams }) {
  const search = searchParams?.q?.toString() || "";
  const query = search ? `?q=${encodeURIComponent(search)}` : "";

  const products = (await apiFetch(`/products${query}`, { next: { revalidate: 120 } }).catch(
    () => []
  )) || [];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `https://amorz.ir/products/${p.slug || p.id}`,
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" dir="rtl">
      <Script
        id="products-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        خدمات / محصولات
      </h1>

      {search && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          نتایج برای: <span className="font-semibold">"{search}"</span>
        </p>
      )}

      {products.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">هیچ محصولی یافت نشد.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug || p.id}`}
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 hover:shadow-md transition"
            >
              {p.imageUrl && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              )}

              <h2 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">
                {p.title}
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {p.category?.name ? `دسته: ${p.category.name}` : ""}
              </p>

              <div className="flex items-center gap-2">
                {p.discountPrice != null && (
                  <span className="text-sm font-bold text-green-600">
                    {Number(p.discountPrice).toLocaleString("fa-IR")} تومان
                  </span>
                )}

                <span
                  className={`text-xs ${
                    p.discountPrice != null
                      ? "line-through text-gray-400"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {Number(p.price || 0).toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
