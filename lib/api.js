// lib/api.js
const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:3000";

export async function apiFetch(path, options = {}) {
  const isServer = typeof window === "undefined";

  const p = path.startsWith("/") ? path : `/${path}`;
  const apiPath = p.startsWith("/api/") ? p : `/api${p}`;

  // ✅ اگر NEXT_PUBLIC_API_URL داری، هم سرور هم کلاینت absolute بزنن
  const shouldUseAbsolute = Boolean(process.env.NEXT_PUBLIC_API_URL);
  const url = shouldUseAbsolute ? `${API_ORIGIN}${apiPath}` : apiPath;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}

export const fetchJson = apiFetch;
