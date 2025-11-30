'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiFetch('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      router.push('/admin/products'); // بعد از لاگین، مستقیم بریم مدیریت محصولات
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9fafb'
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          width: 320,
          padding: 24,
          borderRadius: 12,
          background: '#fff',
          border: '1px solid #ddd',
          boxShadow: '0 3px 10px rgba(0,0,0,0.07)'
        }}
      >
        <h2 style={{ marginBottom: 16, fontSize: 22 }}>ورود ادمین</h2>

        <label>رمز عبور:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: 8,
            marginTop: 6,
            marginBottom: 12,
            borderRadius: 8,
            border: '1px solid #ccc'
          }}
        />

        {error && (
          <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>
        )}

        <button
          disabled={loading}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 8,
            border: 'none',
            background: '#111827',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
    </div>
  );
}
