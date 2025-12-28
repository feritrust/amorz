// lib/home-data.js
import { apiFetch } from "@/lib/api";

export async function fetchHomeData() {
  const [discounted, randomProducts, categories] = await Promise.all([
    apiFetch("/products/discounted?limit=8", { next: { revalidate: 60 } }).catch(() => []),
    apiFetch("/products/random?limit=8", { next: { revalidate: 60 } }).catch(() => []),

    // ✅ به جای random: همه دسته‌ها رو بگیر و ۶ تای آخر رو نمایش بده
    apiFetch("/categories", { next: { revalidate: 60 } }).catch(() => []),
  ]);

  const list = Array.isArray(categories) ? categories : [];

  // اگر createdAt داری، مرتب کن تا واقعاً جدیدها بیاد بالا
  list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  const latestCategories = list.slice(0, 6);

  return {
    discounted: Array.isArray(discounted) ? discounted : [],
    randomProducts: Array.isArray(randomProducts) ? randomProducts : [],
    randomCategories: latestCategories,
  };
}
