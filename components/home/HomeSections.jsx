// app/components/home/HomeSections.jsx
import Link from "next/link";
import Image from "next/image";

export default function HomeSections({ discounted, randomProducts, randomCategories }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-24 pt-4" dir="rtl">
      {/* === HERO === */}
      <section className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-10">
        <Image
          src="/images/haven.jpg"
          alt="خدمات بهشت زهرا"
          fill
          priority
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">خدمات بهشت زهرا</h1>
          <p className="text-sm md:text-base mb-4 max-w-xl">
            رزرو آنلاین تاج گل، سبد گل، میز و صندلی و سایر خدمات ویژه مراسم در بهشت زهرا
            با احترام و آرامش خاطر.
          </p>

          <form
            action="/products"
            method="GET"
            role="search"
            className="flex items-center bg-white rounded-full overflow-hidden shadow-md max-w-xl w-full"
          >
            <button
              type="submit"
              className="px-4 py-2 text-yellow-500 flex items-center justify-center"
              aria-label="جستجو"
            >
              🔍
            </button>
            <input
              type="search"
              name="q"
              placeholder="دنبال چه خدمتی هستید؟"
              className="flex-1 px-3 py-2 text-sm md:text-base text-gray-800 outline-none"
            />
          </form>
        </div>
      </section>

      {/* === دسته‌بندی‌های پیشنهادی === */}
      {randomCategories.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              دسته‌بندی‌های پیشنهادی
            </h2>
            <Link href="/categories" className="text-xs text-blue-600 dark:text-blue-400">
              مشاهده همه دسته‌ها
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {randomCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="block bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {cat.imageUrl && (
                  <div className="relative w-full h-24 md:h-28 bg-gray-100 dark:bg-gray-800 overflow-hidden">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">خدمات در</p>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* === مزیت‌ها === */}
      <section className="mb-10 grid gap-3 md:grid-cols-3">
        {[
          { icon: "💰", title: "هزینه مناسب با کیفیت بالا", desc: "خدمات آبرومندانه با مدیریت هزینه‌های مراسم." },
          { icon: "🤝", title: "پشتیبانی کامل مراسم", desc: "همراهی از لحظه سفارش تا پایان مراسم." },
          { icon: "⏱", title: "هماهنگی سریع در بهشت زهرا", desc: "کاهش رفت‌وآمد و اتلاف وقت خانواده‌ها." },
        ].map((x) => (
          <div
            key={x.title}
            className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-3 shadow-sm"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800">
              {x.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{x.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{x.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* === خدمات تخفیف‌دار === */}
      {discounted.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              خدمات تخفیف‌دار
            </h2>
            <Link href="/products" className="text-xs text-blue-600 dark:text-blue-400">
              مشاهده همه
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {discounted.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug || p.id}`}
                className="relative block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 hover:shadow-md transition"
              >
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] px-2 py-[2px] rounded-full">
                  تخفیف
                </div>

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

                <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-2">
                  {p.category?.name ? `دسته: ${p.category.name}` : ""}
                </p>

                <div className="flex items-center gap-2">
                  {p.discountPrice != null && (
                    <span className="text-sm font-bold text-green-600">
                      {Number(p.discountPrice || 0).toLocaleString("fa-IR")} تومان
                    </span>
                  )}
                  <span className="text-xs line-through text-gray-400">
                    {Number(p.price || 0).toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* === سایر خدمات === */}
      {randomProducts.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              سایر خدمات
            </h2>
            <Link href="/products" className="text-xs text-blue-600 dark:text-blue-400">
              مشاهده همه
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {randomProducts.map((p) => (
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
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">
                  {p.category?.name ? `دسته: ${p.category.name}` : ""}
                </p>
                <p className="text-xs text-gray-800 dark:text-gray-100">
                  {Number(p.price || 0).toLocaleString("fa-IR")} تومان
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* === FAQ کوتاه === */}
      <section className="mt-12 mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
          سوالات متداول
        </h2>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p className="font-semibold">چطور خدمات بهشت زهرا را آنلاین رزرو کنم؟</p>
            <p className="mt-1">
              از بخش محصولات/خدمات، گزینه موردنظر را انتخاب کنید و درخواست خود را ثبت کنید.
            </p>
          </div>
          <div>
            <p className="font-semibold">تحویل تاج گل و سایر خدمات چقدر زمان می‌برد؟</p>
            <p className="mt-1">
              بسته به نوع سفارش، هماهنگی سریع انجام می‌شود و زمان تحویل قبل از ثبت نهایی اعلام می‌گردد.
            </p>
          </div>
          <div>
            <p className="font-semibold">آیا امکان هماهنگی تلفنی هم هست؟</p>
            <p className="mt-1">
              بله، در صورت نیاز می‌توانید برای هماهنگی دقیق‌تر با پشتیبانی تماس بگیرید.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
