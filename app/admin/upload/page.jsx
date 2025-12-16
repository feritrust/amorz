"use client";

import { useRef, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

export default function AdminUploadPage() {
  const inputRef = useRef(null);

  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  async function upload(file) {
    setError("");
    setUrl("");

    const okType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (!okType) return setError("فقط jpg/jpeg/png/webp مجاز است");

    if (file.size > 5 * 1024 * 1024) return setError("حجم فایل باید کمتر از 5MB باشد");

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${apiBase}/api/upload/image`, {
        method: "POST",
        body: fd,
        credentials: "include", // اگر بعداً session/cookie داشتی
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Upload failed");

      setUrl(data.url);
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

  async function copyUrl() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
  }

  return (
    <AdminGuard>
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 16 }}>آپلود عکس (هاست دانلود)</h1>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

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
                onClick={copyUrl}
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
      </div>
    </AdminGuard>
  );
}
