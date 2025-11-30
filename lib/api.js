const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include', // مهم برای کوکی admin_token
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {}

  if (!res.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
}
