"use client";

import { useEffect, useState } from "react";
import { fetchJson } from "@/lib/api";
import AdminGuard from "@/components/AdminGuard";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    imageUrl: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prods, cats] = await Promise.all([
        fetchJson("/products"),
        fetchJson("/categories"),
      ]);
      setProducts(prods || []);
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await fetchJson("/products", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          description: form.description || undefined,
          price: Number(form.price),
          discountPrice:
            form.discountPrice !== "" ? Number(form.discountPrice) : undefined,
          imageUrl: form.imageUrl || undefined,
          categoryId: Number(form.categoryId),
        }),
      });

      setForm({
  title: "",
  description: "",
  price: "",
  discountPrice: "",   // 👈 این خط مهمه
  imageUrl: "",
  categoryId: "",
});
      await loadData();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("محصول حذف شود؟")) return;
    try {
      await fetchJson(`/products/${id}`, {
        method: "DELETE",
      });
      await loadData();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <AdminGuard>
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 20 }}>مدیریت محصولات</h1>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        {/* فرم افزودن محصول */}
        <section
  style={{
    marginBottom: 30,
    padding: 16,
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#f9fafb",
  }}
>
  <h2 style={{ marginBottom: 12, fontSize: 18 }}>افزودن محصول جدید</h2>
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
      <label>توضیحات:</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={3}
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />
    </div>

    {/* قیمت اصلی (اجباری) */}
    <div style={{ marginBottom: 10 }}>
      <label>قیمت اصلی (تومان):</label>
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />
    </div>

    {/* قیمت با تخفیف (اختیاری) */}
    <div style={{ marginBottom: 10 }}>
      <label>قیمت با تخفیف (تومان - اختیاری):</label>
      <input
        type="number"
        name="discountPrice"
        value={form.discountPrice}
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

    <div style={{ marginBottom: 10 }}>
      <label>دسته‌بندی:</label>
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      >
        <option value="">انتخاب کنید...</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
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
      {saving ? "در حال ذخیره..." : "ذخیره محصول"}
    </button>
  </form>
</section>


        {/* لیست محصولات */}
        <section>
          <h2 style={{ marginBottom: 12, fontSize: 18 }}>لیست محصولات</h2>
          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : products.length === 0 ? (
            <p>هیچ محصولی ثبت نشده است.</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                    ID
                  </th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                    عنوان
                  </th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                    دسته‌بندی
                  </th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                    قیمت
                  </th>
                  <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {p.id}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {p.title}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {p.category?.name || "-"}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      {p.price.toLocaleString("fa-IR")}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                      <button
                        onClick={() => handleDelete(p.id)}
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
