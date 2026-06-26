"use client";

import { useState, useEffect, useRef } from "react";

interface UploadedFile {
  filename: string;
  url: string;
  size: number;
  created: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");
  const [copied, setCopied] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    setLoading(true);
    const res = await fetch("/api/upload");
    const data = await res.json();
    setFiles(data);
    setLoading(false);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (res.ok) {
      const data = await res.json();
      showToast(`Uploaded: ${data.filename}`);
      fetchFiles();
      if (inputRef.current) inputRef.current.value = "";
    } else {
      const err = await res.json();
      showToast(err.error || "Gagal upload");
    }
  }

  async function handleDelete(filename: string) {
    if (!confirm(`Hapus ${filename}?`)) return;
    // For now, just remove from list (delete API not implemented yet)
    showToast("Fitur hapus coming soon");
  }

  function copyUrl(url: string) {
    const full = `https://toolinter.net${url}`;
    navigator.clipboard.writeText(full);
    setCopied(url);
    setTimeout(() => setCopied(""), 2000);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-pulse">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-500 text-sm mt-1">
              Upload dan kelola gambar untuk blog
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/dashboard/posts"
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              ← Dashboard
            </a>
            <label className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
              {uploading ? "Uploading..." : "Upload Gambar"}
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center mb-8 transition ${
            uploading
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-white hover:border-blue-400"
          }`}
        >
          <div className="text-4xl mb-3">📸</div>
          <p className="text-gray-600 mb-2">
            {uploading ? "Mengupload..." : "Drag & drop gambar atau klik tombol di atas"}
          </p>
          <p className="text-xs text-gray-400">
            Format: JPG, PNG, WebP, GIF • Maksimal 5MB
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-gray-900">{files.length}</div>
            <div className="text-xs text-gray-500">Total File</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-blue-600">
              {formatSize(files.reduce((s, f) => s + f.size, 0))}
            </div>
            <div className="text-xs text-gray-500">Total Ukuran</div>
          </div>
          <div className="bg-white rounded-lg border p-4 hidden md:block">
            <div className="text-2xl font-bold text-green-600">
              {files.length > 0 ? formatSize(Math.round(files.reduce((s, f) => s + f.size, 0) / files.length)) : "0 B"}
            </div>
            <div className="text-xs text-gray-500">Rata-rata per File</div>
          </div>
        </div>

        {/* File Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Memuat...</div>
        ) : files.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🖼️</div>
            <p className="text-gray-500">Belum ada gambar diupload</p>
            <p className="text-sm text-gray-400 mt-1">
              Upload gambar pertama untuk blog Anda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file) => (
              <div
                key={file.filename}
                className="bg-white border rounded-lg overflow-hidden group hover:shadow-md transition"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={file.url}
                    alt={file.filename}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyUrl(file.url)}
                        className="px-3 py-1.5 bg-white text-gray-900 text-xs rounded-lg shadow hover:bg-gray-100 transition"
                      >
                        {copied === file.url ? "✓ Copied" : "Copy URL"}
                      </button>
                      <button
                        onClick={() => handleDelete(file.filename)}
                        className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg shadow hover:bg-red-700 transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-xs text-gray-700 truncate font-medium">
                    {file.filename}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {formatSize(file.size)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
