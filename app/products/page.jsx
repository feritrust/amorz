// app/products/page.jsx

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchProducts(search) {
  const query = search ? `?q=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${API_URL}/products${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  const search = searchParams?.q || "";
  const products = await fetchProducts(search);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">خدمات / محصولات</h1>

      {/* اگر چیزی سرچ شده بود، نشون بده چی سرچ شده */}
      {search && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          نتایج برای: <span className="font-semibold">"{search}"</span>
        </p>
      )}

      {products.length === 0 ? (
        <p>هیچ محصولی یافت نشد.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <a
              key={p.id}
              href={`/products/${p.slug || p.id}`}
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 hover:shadow-md transition"
            >
              {p.imageUrl && (
                <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
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
                    {p.discountPrice.toLocaleString("fa-IR")} تومان
                  </span>
                )}
                <span
                  className={`text-xs ${
                    p.discountPrice != null
                      ? "line-through text-gray-400"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {p.price.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
