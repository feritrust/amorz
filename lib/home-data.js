import { apiFetch } from "@/lib/api";

export async function fetchHomeData() {
  const [discounted, randomProducts, randomCategories] = await Promise.all([
    apiFetch("/products/discounted?limit=8", { next: { revalidate: 120 } }),
    apiFetch("/products/random?limit=8", { next: { revalidate: 60 } }),
    apiFetch("/categories/random?limit=6", { next: { revalidate: 300 } }),
  ]);

  return {
    discounted: Array.isArray(discounted) ? discounted : [],
    randomProducts: Array.isArray(randomProducts) ? randomProducts : [],
    randomCategories: Array.isArray(randomCategories) ? randomCategories : [],
  };
}
