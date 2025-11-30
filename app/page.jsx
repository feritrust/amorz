// app/page.jsx

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchHomeData() {
  const [discounted, randomProducts, randomCategories] = await Promise.all([
    fetch(`${API_URL}/products/discounted?limit=8`, {
      cache: "no-store",
    }).then((r) => r.json()),
    fetch(`${API_URL}/products/random?limit=8`, {
      cache: "no-store",
    }).then((r) => r.json()),
    fetch(`${API_URL}/categories/random?limit=6`, {
      cache: "no-store",
    }).then((r) => r.json()),
  ]);

  return { discounted, randomProducts, randomCategories };
}

export default async function HomePage() {
  const { discounted, randomProducts, randomCategories } =
    await fetchHomeData();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-24 pt-4" dir="rtl">
      {/* === HERO شبیه جاجیگا === */}
      <section className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-10">
        {/* بک‌گراند (اینجا از یک عکس ثابت استفاده کن؛ بعداً عوضش کن) */}
        <img
          src="/images/haven.jpg"
          alt="خدمات بهشت زهرا"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* لایه تیره برای خوانایی متن */}
        <div className="absolute inset-0 bg-black/40" />

        {/* محتوا */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            خدمات بهشت زهرا
          </h1>
          <p className="text-sm md:text-base mb-4 max-w-xl">
            رزرو آنلاین تاج گل، سبد گل، میز و صندلی و سایر خدمات ویژه مراسم در
            بهشت زهرا با احترام و آرامش خاطر.
          </p>

          {/* فرم سرچ – مشابه جاجیگا */}
          <form
            action="/products"
            method="GET"
            className="flex items-center bg-white rounded-full overflow-hidden shadow-md max-w-xl w-full"
          >
            <button
              type="submit"
              className="px-4 py-2 text-yellow-500 flex items-center justify-center"
            >
              🔍
            </button>
            <input
              type="text"
              name="q"
              placeholder="دنبال چه خدمتی هستید؟"
              className="flex-1 px-3 py-2 text-sm md:text-base text-gray-800 outline-none"
            />
          </form>
        </div>
      </section>

      {/* === دسته‌بندی‌های پیشنهادی (شبیه مقاصد پرطرفدار) === */}
      {randomCategories && randomCategories.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              دسته‌بندی‌های پیشنهادی
            </h2>
            <a
              href="/categories"
              className="text-xs text-blue-600 dark:text-blue-400"
            >
              مشاهده همه دسته‌ها
            </a>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {randomCategories.map((cat) => (
              <a
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="block bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {cat.imageUrl && (
                  <div className="w-full h-24 md:h-28 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    خدمات در
                  </p>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    ترتیب نمایش: {cat.sortOrder}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* === سه مزیت زیر دسته‌ها (شبیه کارت‌های جاجیگا) === */}
      <section className="mb-10 grid gap-3 md:grid-cols-3">
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-3 shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600">
            💰
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              هزینه مناسب با کیفیت بالا
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              خدمات آبرومندانه با مدیریت هزینه‌های مراسم.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-3 shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
            🤝
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              پشتیبانی کامل مراسم
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              همراهی از لحظه سفارش تا پایان مراسم.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-3 shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
            ⏱
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              هماهنگی سریع در بهشت زهرا
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              کاهش رفت‌وآمد و اتلاف وقت خانواده‌ها.
            </p>
          </div>
        </div>
      </section>

      {/* === خدمات تخفیف‌دار === */}
      {discounted && discounted.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              خدمات تخفیف‌دار
            </h2>
            <a
              href="/products"
              className="text-xs text-blue-600 dark:text-blue-400"
            >
              مشاهده همه
            </a>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {discounted.map((p) => (
              <a
                key={p.id}
                href={`/products/${p.slug || p.id}`}
                className="relative block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 hover:shadow-md transition"
              >
                {/* برچسب تخفیف */}
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] px-2 py-[2px] rounded-full">
                  تخفیف
                </div>

                {p.imageUrl && (
                  <div className="w-full h-28 rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2">
                  {p.category?.name ? `دسته: ${p.category.name}` : ""}
                </p>
                <div className="flex items-center gap-2">
                  {p.discountPrice != null && (
                    <span className="text-sm font-bold text-green-600">
                      {p.discountPrice.toLocaleString("fa-IR")} تومان
                    </span>
                  )}
                  <span className="text-xs line-through text-gray-400">
                    {p.price.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* === سایر خدمات (تصادفی) === */}
      {randomProducts && randomProducts.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text.white">
              سایر خدمات
            </h2>
            <a
              href="/products"
              className="text-xs text-blue-600 dark:text-blue-400"
            >
              مشاهده همه
            </a>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {randomProducts.map((p) => (
              <a
                key={p.id}
                href={`/products/${p.slug || p.id}`}
                className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 hover:shadow-md transition"
              >
                {p.imageUrl && (
                  <div className="w-full h-28 rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">
                  {p.category?.name ? `دسته: ${p.category.name}` : ""}
                </p>
                <p className="text-xs text-gray-800 dark:text-gray-100">
                  {p.price.toLocaleString("fa-IR")} تومان
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
