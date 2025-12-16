// app/articles/page.jsx
import Link from "next/link";
import Script from "next/script";
import { apiFetch } from "@/lib/api";

export const metadata = {
  title: "مقالات | خدمات بهشت زهرا",
  description: "مقالات و راهنماهای مربوط به خدمات و مراسم در بهشت زهرا.",
  alternates: { canonical: "https://amorz.ir/articles" },
};

export default async function ArticlesPage() {
  const articles = (await apiFetch("/articles", { next: { revalidate: 300 } }).catch(() => [])) || [];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: `https://amorz.ir/articles/${a.slug || a.id}`,
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6" dir="rtl">
      <Script
        id="articles-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <h1 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">مقالات</h1>

      {articles.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">هنوز مقاله‌ای ثبت نشده است.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/articles/${a.slug || a.id}`}
              className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-sm transition"
            >
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                {a.title}
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {a.createdAt ? new Date(a.createdAt).toLocaleDateString("fa-IR") : ""}
                {a.author ? ` | نویسنده: ${a.author}` : ""}
              </p>

              {a.content && (
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {a.content.slice(0, 160)}
                  {a.content.length > 160 ? "..." : ""}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
