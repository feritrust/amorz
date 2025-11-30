// app/products/[slug]/page.jsx
import { notFound } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchProduct(slug) {
  const res = await fetch(`${API_URL}/products/${slug}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;        // ✅ این‌جا رو عوض کن

  const product = await fetchProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <a href="/products" style={{ fontSize: 13, color: '#2563eb' }}>
        ← بازگشت به لیست محصولات
      </a>

      <div style={{ marginTop: 16 }}>
        {product.imageUrl && (
          <div
            style={{
              width: '100%',
              maxHeight: 320,
              overflow: 'hidden',
              borderRadius: 12,
              marginBottom: 16,
              background: '#f3f4f6',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <h1 style={{ fontSize: 26, marginBottom: 8 }}>{product.title}</h1>

        {product.category && (
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
            دسته: {product.category.name}
          </p>
        )}

        <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
          {product.price.toLocaleString('fa-IR')} تومان
        </p>

        {product.description && (
          <p style={{ lineHeight: 1.7, fontSize: 15 }}>
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}
