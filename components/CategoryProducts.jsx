// CategoryProducts.jsx
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CategoryProducts({ products }) {
  const router = useRouter();

  return (
    <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #eee",
            padding: 12,
            display: "flex",
            gap: 12,
            cursor: "pointer",
          }}
          onClick={() => router.push(`/products/${p.id}`)}
        >
          {p.imageUrl ? (
            <Image
              src={p.imageUrl}
              alt={p.title}
              width={120}
              height={80}
              style={{ objectFit: "cover", borderRadius: 6 }}
            />
          ) : (
            <div
              style={{ width: 120, height: 80, background: "#f3f3f3", borderRadius: 6 }}
            />
          )}
          <div>
            <div style={{ fontWeight: "bold" }}>{p.title}</div>
            <div style={{ color: "#666" }}>{p.description}</div>
            <div style={{ marginTop: 8 }}>
              {Number(p.price).toLocaleString()} تومان
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
