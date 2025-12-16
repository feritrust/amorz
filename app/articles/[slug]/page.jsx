import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";

function stripText(s = "") {
  return s.replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const article = await apiFetch(`/articles/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  }).catch(() => null);

  if (!article) return { title: "مقاله پیدا نشد" };

  const title = `${article.title} | مقالات`;
  const description =
    stripText(article.content).slice(0, 160) || "مشاهده مقاله در خدمات بهشت زهرا.";

  return {
    title,
    description,
    alternates: { canonical: `https://amorz.ir/articles/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://amorz.ir/articles/${slug}`,
      type: "article", // ✅ مجاز
      siteName: "خدمات بهشت زهرا",
      locale: "fa_IR",
      images: article.imageUrl
        ? [{ url: article.imageUrl, width: 1200, height: 630, alt: article.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.imageUrl ? [article.imageUrl] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;

  const article = await apiFetch(`/articles/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  }).catch(() => null);

  if (!article) notFound();

  const url = `https://amorz.ir/articles/${slug}`;
  const published = article.createdAt ? new Date(article.createdAt).toISOString() : undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://amorz.ir/" },
      { "@type": "ListItem", position: 2, name: "مقالات", item: "https://amorz.ir/articles" },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: article.author ? { "@type": "Person", name: article.author } : undefined,
    datePublished: published,
    dateModified: article.updatedAt ? new Date(article.updatedAt).toISOString() : published,
    image: article.imageUrl ? [article.imageUrl] : undefined,
    mainEntityOfPage: url,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" dir="rtl">
      <Script
        id="article-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link href="/articles" className="text-sm text-blue-600 dark:text-blue-400">
        ← بازگشت به مقالات
      </Link>

      <header className="mt-4 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {article.title}
        </h1>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {article.createdAt ? new Date(article.createdAt).toLocaleString("fa-IR") : ""}
          {article.author ? ` | نویسنده: ${article.author}` : ""}
        </p>
      </header>

      {article.imageUrl && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-5">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {article.content && (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p style={{ whiteSpace: "pre-wrap" }}>{article.content}</p>
        </div>
      )}
    </div>
  );
}
