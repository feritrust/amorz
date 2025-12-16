"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/lib/api";
import AdminGuard from "@/components/AdminGuard";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = useMemo(() => {
    const t = form.title.trim();
    const c = form.content.trim();
    return t.length >= 3 && c.length >= 10;
  }, [form.title, form.content]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchJson("/articles");
      setArticles(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      setError("عنوان حداقل ۳ کاراکتر و متن حداقل ۱۰ کاراکتر باشد.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await fetchJson("/articles", {
        method: "POST",
        body: JSON.stringify({
          title: form.title.trim(),
          content: form.content.trim(),
          imageUrl: form.imageUrl.trim() || undefined,
        }),
      });

      setForm({ title: "", content: "", imageUrl: "" });
      await loadData();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("این مقاله حذف شود؟")) return;
    try {
      await fetchJson(`/articles/${id}`, { method: "DELETE" });
      await loadData();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <AdminGuard>
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 20 }}>مدیریت مقالات</h1>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        {/* فرم افزودن مقاله */}
        <section
          style={{
            marginBottom: 30,
            padding: 16,
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "#f9fafb",
          }}
        >
          <h2 style={{ marginBottom: 12, fontSize: 18 }}>افزودن مقاله جدید</h2>

          <form onSubmit={handleCreate}>
            <div style={{ marginBottom: 10 }}>
              <label>عنوان:</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>متن مقاله:</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={6}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
                حداقل ۱۰ کاراکتر.
              </div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>آدرس تصویر (اختیاری):</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={saving || !canSubmit}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: saving || !canSubmit ? "#6b7280" : "#111827",
                color: "#fff",
                cursor: saving || !canSubmit ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "در حال ذخیره..." : "ذخیره مقاله"}
            </button>
          </form>
        </section>

        {/* لیست مقالات */}
        <section>
          <h2 style={{ marginBottom: 12, fontSize: 18 }}>لیست مقالات</h2>

          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : articles.length === 0 ? (
            <p>هیچ مقاله‌ای ثبت نشده است.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>ID</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>عنوان</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Slug</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>نویسنده</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>تاریخ ایجاد</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {articles.map((a) => (
                  <tr key={a.id}>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{a.id}</td>

                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {a.title}
                      <div style={{ fontSize: 12, marginTop: 4 }}>
                        <a
                          href={`/articles/${a.slug || a.id}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#2563eb", textDecoration: "none" }}
                        >
                          مشاهده مقاله ↗
                        </a>
                      </div>
                    </td>

                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {a.slug || "-"}
                    </td>

                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {a.author || "Admin"}
                    </td>

                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {a.createdAt ? new Date(a.createdAt).toLocaleString("fa-IR") : "-"}
                    </td>

                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      <button
                        onClick={() => handleDelete(a.id)}
                        style={{
                          padding: "4px 8px",
                          borderRadius: 6,
                          border: "none",
                          background: "#dc2626",
                          color: "#fff",
                          cursor: "pointer",
                          fontSize: 12,
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </AdminGuard>
  );
}
