// app/categories/[slug]/page.jsx
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchCategory(slug) {
  const res = await fetch(`${API_URL}/categories/${slug}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch category");

  return res.json();
}

async function fetchProductsByCategory(categoryId) {
  const res = await fetch(`${API_URL}/products?categoryId=${categoryId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params; // 👈 این بار slug می‌گیریم

  const category = await fetchCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await fetchProductsByCategory(category.id);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <a href="/categories" style={{ fontSize: 13, color: "#2563eb" }}>
        ← بازگشت به دسته‌بندی‌ها
      </a>

      <div style={{ marginTop: 16 }}>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>{category.name}</h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
          ترتیب نمایش: {category.sortOrder} | وضعیت:{" "}
          {category.isActive ? "فعال" : "غیرفعال"}
        </p>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>محصولات این دسته</h2>

        {!products || products.length === 0 ? (
          <p>هنوز محصولی برای این دسته ثبت نشده است.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {products.map((p) => (
              <a
                key={p.id}
                href={`/products/${p.slug || p.id}`}
                style={{
                  display: "block",
                  borderRadius: 12,
                  border: "1px solid #eee",
                  padding: 12,
                  textDecoration: "none",
                  color: "#111827",
                  background: "#fff",
                }}
              >
                {p.imageUrl && (
                  <div
                    style={{
                      width: "100%",
                      height: 120,
                      overflow: "hidden",
                      borderRadius: 10,
                      marginBottom: 8,
                      background: "#f3f4f6",
                    }}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "#6b7280" }}>
                  {p.price.toLocaleString("fa-IR")} تومان
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
