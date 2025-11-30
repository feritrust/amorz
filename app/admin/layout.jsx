'use client';

import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiFetch('/admin/logout', { method: 'POST' });
    } catch (e) {
      console.log('Logout error:', e);
    }

    router.push('/admin/login'); // همیشه بفرست لاگین
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* سایدبار */}
      <aside
        style={{
          width: 220,
          padding: 16,
          borderRight: '1px solid #eee',
          background: '#f9fafb',
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 18 }}>پنل ادمین</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: 14 }}>
            <li style={{ marginBottom: 8 }}>
              <a href="/admin/products">محصولات</a>
            </li>
            <li style={{ marginBottom: 8 }}>
              <a href="/admin/categories">دسته‌بندی‌ها</a>
            </li>
            <li style={{ marginBottom: 8 }}>
              <a href="/admin/articles">مقالات</a>
            </li>

            {/* دکمه خروج */}
            <li style={{ marginTop: 20 }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#dc2626',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                خروج
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* محتوای اصلی */}
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
