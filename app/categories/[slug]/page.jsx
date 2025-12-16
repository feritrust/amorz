// app/categories/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const category = await apiFetch(
    `/categories/slug/${encodeURIComponent(slug)}`,
    { next: { revalidate: 600 } }
  ).catch(() => null);

  if (!category) return { title: "دسته‌بندی پیدا نشد" };

  const title = `${category.name} | دسته‌بندی خدمات`;
  const description = `مشاهده خدمات و محصولات دسته «${category.name}» برای رزرو آنلاین در بهشت زهرا.`;

  return {
    title,
    description,
    alternates: { canonical: `https://amorz.ir/categories/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://amorz.ir/categories/${slug}`,
      type: "website",
      images: category.imageUrl
        ? [{ url: category.imageUrl, width: 1200, height: 630, alt: category.name }]
        : undefined,
      locale: "fa_IR",
      siteName: "خدمات بهشت زهرا",
    },
  };
}

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params;

  const category = await apiFetch(
    `/categories/slug/${encodeURIComponent(slug)}`,
    { next: { revalidate: 600 } }
  ).catch(() => null);

  if (!category) notFound();

  const products =
    (await apiFetch(
      `/products?categoryId=${encodeURIComponent(category.id)}`,
      { next: { revalidate: 120 } }
    ).catch(() => [])) || [];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://amorz.ir/" },
      { "@type": "ListItem", position: 2, name: "دسته‌بندی‌ها", item: "https://amorz.ir/categories" },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://amorz.ir/categories/${slug}`,
      },
    ],
  };

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
    <div className="max-w-5xl mx-auto px-4 py-6" dir="rtl">
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="category-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <Link href="/categories" className="text-sm text-blue-600 dark:text-blue-400">
        ← بازگشت به دسته‌بندی‌ها
      </Link>

      <header className="mt-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {category.isActive ? "فعال" : "غیرفعال"}
        </p>
      </header>

      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        خدمات این دسته
      </h2>

      {products.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          هنوز محصولی برای این دسته ثبت نشده است.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug || p.id}`}
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 hover:shadow-md transition"
            >
              {p.imageUrl && (
                <div className="relative w-full h-28 rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              )}

              <h3 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">
                {p.title}
              </h3>

              <p className="text-xs text-gray-800 dark:text-gray-100">
                {Number(p.price || 0).toLocaleString("fa-IR")} تومان
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
