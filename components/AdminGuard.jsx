'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        await apiFetch('/admin/check');
        if (!cancelled) setAllowed(true);
      } catch (e) {
        if (!cancelled) {
          setAllowed(false);
          router.push('/admin/login');
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    check();
    return () => { cancelled = true; };
  }, [router]);

  if (checking) {
    return <p style={{ padding: 20 }}>در حال بررسی دسترسی...</p>;
  }

  if (!allowed) return null;

  return children;
}
