// app/articles/[id]/page.jsx
import { notFound } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchArticle(id) {
  const res = await fetch(`${API_URL}/articles/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch article');

  return res.json();
}

export default async function ArticleDetailPage({ params }) {
  const { id } = await params; // 👈 مثل قبل، حواست به await باشه

  const article = await fetchArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <a href="/articles" style={{ fontSize: 13, color: '#2563eb' }}>
        ← بازگشت به مقالات
      </a>

      <div style={{ marginTop: 16 }}>
        <h1 style={{ fontSize: 26, marginBottom: 8 }}>{article.title}</h1>

        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
          {article.createdAt
            ? new Date(article.createdAt).toLocaleString('fa-IR')
            : ''}
          {article.author ? ` | نویسنده: ${article.author}` : ''}
        </p>

        {article.imageUrl && (
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
              src={article.imageUrl}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {article.content && (
          <p style={{ lineHeight: 1.8, fontSize: 15 }}>{article.content}</p>
        )}
      </div>
    </div>
  );
}
