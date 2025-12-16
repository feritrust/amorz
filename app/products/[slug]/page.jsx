// app/products/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = await apiFetch(`/products/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 120 },
  }).catch(() => null);

  if (!product) return { title: "محصول پیدا نشد" };

  const title = `${product.title} | خدمات بهشت زهرا`;
  const description =
    product.description?.slice(0, 160) ||
    `مشاهده و رزرو آنلاین «${product.title}» در بهشت زهرا.`;

  return {
    title,
    description,
    alternates: { canonical: `https://amorz.ir/products/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://amorz.ir/products/${slug}`,
      type: "website",
      siteName: "خدمات بهشت زهرا",
      locale: "fa_IR",
      images: product.imageUrl
        ? [{ url: product.imageUrl, width: 1200, height: 630, alt: product.title }]
        : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  const product = await apiFetch(`/products/slug/${encodeURIComponent(slug)}`, {
    next: { revalidate: 120 },
  }).catch(() => null);

  if (!product) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://amorz.ir/" },
      { "@type": "ListItem", position: 2, name: "محصولات", item: "https://amorz.ir/products" },
      { "@type": "ListItem", position: 3, name: product.title, item: `https://amorz.ir/products/${slug}` },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    description: product.description || undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: product.discountPrice ?? product.price,
      availability: "https://schema.org/InStock",
      url: `https://amorz.ir/products/${slug}`,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" dir="rtl">
      <Script
        id="product-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <Link href="/products" className="text-sm text-blue-600 dark:text-blue-400">
        ← بازگشت به لیست محصولات
      </Link>

      <div className="mt-4">
        {product.imageUrl && (
          <div className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {product.title}
        </h1>

        {product.category?.name && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            دسته: {product.category.name}
          </p>
        )}

        <div className="flex items-center gap-3 mb-4">
          {product.discountPrice != null ? (
            <>
              <span className="text-lg font-bold text-green-600">
                {Number(product.discountPrice).toLocaleString("fa-IR")} تومان
              </span>
              <span className="text-sm line-through text-gray-400">
                {Number(product.price || 0).toLocaleString("fa-IR")} تومان
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {Number(product.price || 0).toLocaleString("fa-IR")} تومان
            </span>
          )}
        </div>

        {product.description && (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p>{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
