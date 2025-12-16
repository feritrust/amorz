"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { fetchJson } from "@/lib/api";

export default function AdminUploadPage() {
  const inputRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    []
  );

  async function loadFiles() {
    setLoadingFiles(true);
    try {
      const data = await fetchJson("/admin/uploads"); // => /api/admin/uploads
      setFiles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Load files error:", e);
      setFiles([]);
    } finally {
      setLoadingFiles(false);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function upload(file) {
    setError("");
    setUrl("");

    const okType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (!okType) return setError("فقط jpg/jpeg/png/webp مجاز است");
    if (file.size > 5 * 1024 * 1024)
      return setError("حجم فایل باید کمتر از 5MB باشد");

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${apiBase}/api/upload/image`, {
        method: "POST",
        body: fd,
        credentials: "include",
        // اگر ادمین‌توکن رو با header می‌فرستی، اینجا هم اضافه کن:
        // headers: { "x-admin-token": localStorage.getItem("admin_token") || "" },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Upload failed");

      setUrl(data.url);
      await loadFiles(); // بعد از آپلود لیست رو رفرش کن
    } catch (e) {
      setError(e?.message || "خطا در آپلود");
    } finally {
      setIsUploading(false);
    }
  }

  function onPick() {
    inputRef.current?.click();
  }

  function onChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    upload(file);
  }

  function onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    upload(file);
  }

  async function copyText(text) {
    await navigator.clipboard.writeText(text);
  }

  async function removeFile(name) {
    if (!confirm("حذف شود؟")) return;

    try {
      await fetchJson(`/admin/uploads/${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      await loadFiles();
    } catch (e) {
      alert(e?.message || "خطا در حذف فایل");
    }
  }

  return (
    <AdminGuard>
      <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 16 }}>آپلود و مدیریت عکس‌ها</h1>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        {/* Upload box */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          style={{
            border: "2px dashed #ccc",
            borderRadius: 12,
            padding: 20,
            background: "#f9fafb",
            marginBottom: 16,
          }}
        >
          <p style={{ marginBottom: 12 }}>
            فایل را اینجا رها کن یا انتخاب کن (حداکثر 5MB)
          </p>

          <button
            type="button"
            onClick={onPick}
            disabled={isUploading}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#111827",
              color: "#fff",
              cursor: isUploading ? "not-allowed" : "pointer",
            }}
          >
            {isUploading ? "در حال آپلود..." : "انتخاب فایل"}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onChange}
            hidden
          />
        </div>

        {preview && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8, fontWeight: 600 }}>پیش‌نمایش:</div>
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: "100%",
                borderRadius: 12,
                border: "1px solid #eee",
              }}
            />
          </div>
        )}

        {url && (
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              border: "1px solid #e5e5e5",
              background: "#fff",
              marginBottom: 18,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>لینک فایل:</div>

            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={url}
                readOnly
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #ddd",
                }}
              />
              <button
                type="button"
                onClick={() => copyText(url)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
              >
                Copy
              </button>
            </div>

            <div style={{ marginTop: 10 }}>
              <a href={url} target="_blank" rel="noreferrer">
                باز کردن لینک
              </a>
            </div>
          </div>
        )}

        {/* Files list */}
        <h2 style={{ margin: "18px 0 10px", fontSize: 18 }}>
          فایل‌های آپلود شده
        </h2>

        {loadingFiles ? (
          <div>در حال بارگذاری...</div>
        ) : files.length === 0 ? (
          <div style={{ color: "#6b7280" }}>فعلاً فایلی ندارید.</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {files.map((f) => (
              <div
                key={f.name}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 12,
                  padding: 10,
                  background: "#fff",
                }}
              >
                <img
                  src={f.url}
                  alt={f.name}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 10,
                    border: "1px solid #f3f4f6",
                  }}
                />

                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    wordBreak: "break-all",
                  }}
                  title={f.name}
                >
                  {f.name}
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={() => copyText(f.url)}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                  >
                    کپی لینک
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFile(f.name)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid #ddd",
                      cursor: "pointer",
                      color: "#dc2626",
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
