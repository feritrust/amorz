// app/categories/page.jsx

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1 style={{ marginBottom: 20 }}>دسته‌بندی‌ها</h1>

      {categories.length === 0 ? (
        <p>هیچ دسته‌بندی‌ای ثبت نشده است.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/categories/${cat.slug}`}
              style={{
                display: 'block',
                padding: 16,
                borderRadius: 12,
                border: '1px solid #eee',
                textDecoration: 'none',
                color: '#111827',
                background: '#fff',
              }}
            >
              {cat.imageUrl && (
                <div
                  style={{
                    width: '100%',
                    height: 140,
                    overflow: 'hidden',
                    borderRadius: 10,
                    marginBottom: 8,
                    background: '#f3f4f6',
                  }}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              <h2 style={{ fontSize: 18, marginBottom: 6 }}>{cat.name}</h2>
             
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
