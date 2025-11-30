'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    apiFetch('/articles') // یه درخواست تستی برای چک کردن کوکی
      .then(() => setAuth(true))
      .catch(() => setAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>در حال بررسی ورود...</p>;

  if (!auth) return <p style={{color: 'red'}}>دسترسی ندارید.</p>;

  return (
    <div style={{ padding: 30 }}>
      <h1>داشبورد ادمین</h1>

      <ul style={{ marginTop: 20 }}>
        <li><a href="/admin/products">مدیریت محصولات</a></li>
        <li><a href="/admin/categories">مدیریت دسته‌بندی‌ها</a></li>
        <li><a href="/admin/articles">مدیریت مقالات</a></li>
      </ul>
    </div>
  );
}
