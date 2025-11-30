// app/articles/page.jsx

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchArticles() {
  const res = await fetch(`${API_URL}/articles`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
}

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1 style={{ marginBottom: 20 }}>مقالات</h1>

      {articles.length === 0 ? (
        <p>هنوز مقاله‌ای ثبت نشده است.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {articles.map((a) => (
            <a
              key={a.id}
              href={`/articles/${a.id}`}
              style={{
                padding: 16,
                borderRadius: 10,
                border: '1px solid #eee',
                textDecoration: 'none',
                color: '#111827',
                background: '#fff',
              }}
            >
              <h2 style={{ fontSize: 18, marginBottom: 6 }}>{a.title}</h2>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>
                {a.createdAt
                  ? new Date(a.createdAt).toLocaleDateString('fa-IR')
                  : ''}
                {a.author ? ` | نویسنده: ${a.author}` : ''}
              </p>
              {a.content && (
                <p style={{ fontSize: 14, color: '#4b5563' }}>
                  {a.content.slice(0, 120)}{a.content.length > 120 ? '...' : ''}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
