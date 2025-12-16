"use client";

import { useEffect, useState } from "react";
import { fetchJson } from "@/lib/api";
import AdminGuard from "@/components/AdminGuard";

function cleanSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isValidSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    sortOrder: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const cats = await fetchJson("/categories");
      setCategories(cats || []);
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

    // ✅ slug رو همیشه clean کن
    if (name === "slug") {
      setForm((prev) => ({ ...prev, slug: cleanSlug(value) }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const name = form.name.trim();
    const slug = cleanSlug(form.slug);
    const imageUrl = form.imageUrl.trim();

    if (!name) {
      setSaving(false);
      setError("نام دسته الزامی است.");
      return;
    }

    if (!slug) {
      setSaving(false);
      setError("اسلاگ (slug) الزامی است. فقط انگلیسی/عدد و - (مثال: grave-services)");
      return;
    }

    if (!isValidSlug(slug)) {
      setSaving(false);
      setError("فرمت اسلاگ نامعتبر است. فقط حروف انگلیسی کوچک، عدد و خط تیره مجاز است.");
      return;
    }

    try {
      await fetchJson("/categories", {
        method: "POST",
        body: JSON.stringify({
          name,
          slug,
          sortOrder: form.sortOrder !== "" ? Number(form.sortOrder) : undefined,
          imageUrl: imageUrl ? imageUrl : undefined,
        }),
      });

      setForm({ name: "", slug: "", sortOrder: "", imageUrl: "" });
      await loadData();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("این دسته‌بندی حذف شود؟")) return;
    try {
      await fetchJson(`/categories/${id}`, { method: "DELETE" });
      await loadData();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <AdminGuard>
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 20 }}>مدیریت دسته‌بندی‌ها</h1>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        {/* فرم افزودن دسته‌بندی */}
        <section
          style={{
            marginBottom: 30,
            padding: 16,
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "#f9fafb",
          }}
        >
          <h2 style={{ marginBottom: 12, fontSize: 18 }}>افزودن دسته‌بندی جدید</h2>

          <form onSubmit={handleCreate}>
            <div style={{ marginBottom: 10 }}>
              <label>نام دسته:</label>
              <input
                name="name"
                value={form.name}
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
              <label>
                اسلاگ (اجباری - فقط انگلیسی):
                <span style={{ display: "block", fontSize: 12, color: "#6b7280" }}>
                  مثال: <code>grave-services</code>
                </span>
              </label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="grave-services"
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  direction: "ltr",
                }}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>ترتیب نمایش (اختیاری):</label>
              <input
                type="number"
                name="sortOrder"
                value={form.sortOrder}
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
              disabled={saving}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: "#111827",
                color: "#fff",
                cursor: saving ? "wait" : "pointer",
              }}
            >
              {saving ? "در حال ذخیره..." : "ذخیره دسته‌بندی"}
            </button>
          </form>
        </section>

        {/* لیست دسته‌بندی‌ها */}
        <section>
          <h2 style={{ marginBottom: 12, fontSize: 18 }}>لیست دسته‌بندی‌ها</h2>

          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : categories.length === 0 ? (
            <p>هیچ دسته‌بندی‌ای ثبت نشده است.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>ID</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>نام</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Slug</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>ترتیب</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>فعال؟</th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{cat.id}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{cat.name}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{cat.slug}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{cat.sortOrder}</td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {cat.isActive ? "بله" : "خیر"}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      <button
                        onClick={() => handleDelete(cat.id)}
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
