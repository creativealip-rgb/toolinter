"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ArrowLeft,
  Loader2,
  Eye,
  X,
} from "lucide-react";

// ─── Types ───

interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  ctaLabel: string;
  ctaHref: string;
  content: BlogSection[];
}

const CATEGORIES = ["Surat", "Foto", "Gaji", "PDF", "CV", "UMKM"];

const emptyPost: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Surat",
  readTime: "5 menit",
  ctaLabel: "",
  ctaHref: "",
  content: [{ heading: "", paragraphs: [""] }],
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Page ───

export default function DashboardPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Gagal memuat artikel");
      const data = await res.json();
      setPosts(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal memuat artikel");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filtered = posts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (!filterCat || p.category === filterCat)
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  // ─── Save handler ───
  async function handleSave() {
    if (!editing) return;
    if (!editing.title.trim()) {
      setError("Judul wajib diisi");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const slug = editing.slug || slugify(editing.title);
      const payload = { ...editing, slug };
      const url = isNew ? "/api/posts" : `/api/posts/${editing.slug}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Gagal menyimpan");
      }
      setEditing(null);
      setIsNew(false);
      setPreview(false);
      await fetchPosts();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  // ─── Delete handler ───
  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${deleteTarget.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      setDeleteTarget(null);
      await fetchPosts();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menghapus");
    } finally {
      setDeleting(false);
    }
  }

  function updateField(field: keyof BlogPost, value: string) {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  }

  function updateSection(
    idx: number,
    field: keyof BlogSection,
    value: string | string[]
  ) {
    if (!editing) return;
    const content = [...editing.content];
    content[idx] = { ...content[idx], [field]: value };
    setEditing({ ...editing, content });
  }

  function addSection() {
    if (!editing) return;
    setEditing({
      ...editing,
      content: [...editing.content, { heading: "", paragraphs: [""] }],
    });
  }

  function removeSection(idx: number) {
    if (!editing) return;
    const content = editing.content.filter((_, i) => i !== idx);
    setEditing({ ...editing, content: content.length ? content : [{ heading: "", paragraphs: [""] }] });
  }

  function addParagraph(secIdx: number) {
    if (!editing) return;
    const content = [...editing.content];
    content[secIdx] = {
      ...content[secIdx],
      paragraphs: [...content[secIdx].paragraphs, ""],
    };
    setEditing({ ...editing, content });
  }

  function updateParagraph(secIdx: number, pIdx: number, value: string) {
    if (!editing) return;
    const content = [...editing.content];
    const paragraphs = [...content[secIdx].paragraphs];
    paragraphs[pIdx] = value;
    content[secIdx] = { ...content[secIdx], paragraphs };
    setEditing({ ...editing, content });
  }

  function removeParagraph(secIdx: number, pIdx: number) {
    if (!editing) return;
    const content = [...editing.content];
    const paragraphs = content[secIdx].paragraphs.filter((_, i) => i !== pIdx);
    content[secIdx] = {
      ...content[secIdx],
      paragraphs: paragraphs.length ? paragraphs : [""],
    };
    setEditing({ ...editing, content });
  }

  // ─── Editor view ───
  if (editing) {
    return (
      <div className="min-h-screen bg-canvas">
        {/* Sticky header */}
        <header className="sticky top-0 z-50 bg-canvas border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <button
              onClick={() => {
                setEditing(null);
                setIsNew(false);
                setPreview(false);
                setError("");
              }}
              className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
            <span className="text-sm font-semibold text-ink">
              {isNew ? "Artikel Baru" : "Edit Artikel"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreview(!preview)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-ink-tertiary bg-surface border border-border rounded-lg hover:border-primary/30"
              >
                <Eye className="h-3.5 w-3.5" />
                {preview ? "Edit" : "Preview"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover disabled:opacity-50"
              >
                {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Simpan
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error/10 text-sm text-error">
              {error}
            </div>
          )}

          {preview ? (
            /* ─── Preview ─── */
            <article className="prose prose-sm max-w-none">
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                {editing.category}
              </span>
              <h1 className="text-2xl font-bold text-ink mb-2">
                {editing.title || "(Tanpa Judul)"}
              </h1>
              <p className="text-sm text-ink-muted mb-6">
                {editing.date} · {editing.readTime}
              </p>
              <p className="text-ink-tertiary mb-8">{editing.excerpt}</p>
              {editing.content.map((sec, i) => (
                <section key={i} className="mb-6">
                  {sec.heading && (
                    <h2 className="text-lg font-semibold text-ink mb-2">
                      {sec.heading}
                    </h2>
                  )}
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="whitespace-pre-wrap text-ink-tertiary leading-relaxed mb-3">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
              {editing.ctaLabel && (
                <div className="mt-8 p-4 bg-surface border border-border rounded-xl text-center">
                  <p className="font-medium text-ink mb-2">{editing.ctaLabel}</p>
                  <span className="text-sm text-primary">{editing.ctaHref}</span>
                </div>
              )}
            </article>
          ) : (
            /* ─── Form ─── */
            <div className="space-y-5">
              {/* Meta fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-tertiary mb-1">
                    Judul *
                  </label>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) => {
                      updateField("title", e.target.value);
                      if (isNew) {
                        updateField("slug", slugify(e.target.value));
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                    placeholder="Judul artikel"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-tertiary mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={editing.slug}
                    onChange={(e) => updateField("slug", slugify(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                    placeholder="slug-url"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-tertiary mb-1">
                  Excerpt
                </label>
                <textarea
                  value={editing.excerpt}
                  onChange={(e) => updateField("excerpt", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary resize-y"
                  placeholder="Ringkasan singkat artikel..."
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-tertiary mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={editing.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-tertiary mb-1">
                    Kategori
                  </label>
                  <select
                    value={editing.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-tertiary mb-1">
                    Waktu Baca
                  </label>
                  <input
                    type="text"
                    value={editing.readTime}
                    onChange={(e) => updateField("readTime", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                    placeholder="5 menit"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-tertiary mb-1">
                    CTA Label
                  </label>
                  <input
                    type="text"
                    value={editing.ctaLabel}
                    onChange={(e) => updateField("ctaLabel", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                    placeholder="Coba Tool"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-tertiary mb-1">
                  CTA Link
                </label>
                <input
                  type="text"
                  value={editing.ctaHref}
                  onChange={(e) => updateField("ctaHref", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                  placeholder="/surat/resign"
                />
              </div>

              {/* Content sections */}
              <div className="border-t border-border pt-5">
                <h3 className="text-sm font-semibold text-ink mb-4">
                  Konten Artikel
                </h3>
                {editing.content.map((sec, si) => (
                  <div
                    key={si}
                    className="mb-4 p-4 rounded-lg border border-border bg-surface/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-ink-muted">
                        Bagian {si + 1}
                      </span>
                      <button
                        onClick={() => removeSection(si)}
                        className="text-ink-muted hover:text-error"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={sec.heading || ""}
                      onChange={(e) =>
                        updateSection(si, "heading", e.target.value)
                      }
                      className="w-full px-3 py-2 mb-2 rounded-lg bg-canvas border border-border text-ink text-sm focus:outline-none focus:border-primary"
                      placeholder="Heading (opsional)"
                    />
                    {sec.paragraphs.map((p, pi) => (
                      <div key={pi} className="flex gap-2 mb-2">
                        <textarea
                          value={p}
                          onChange={(e) =>
                            updateParagraph(si, pi, e.target.value)
                          }
                          rows={3}
                          className="flex-1 px-3 py-2 rounded-lg bg-canvas border border-border text-ink text-sm focus:outline-none focus:border-primary resize-y"
                          placeholder={`Paragraf ${pi + 1}`}
                        />
                        <button
                          onClick={() => removeParagraph(si, pi)}
                          className="self-start mt-2 text-ink-muted hover:text-error"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addParagraph(si)}
                      className="text-xs text-primary hover:text-primary-hover font-medium"
                    >
                      + Tambah Paragraf
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSection}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Tambah Bagian
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── List view ───
  return (
    <div className="min-h-screen bg-canvas">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-canvas border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </a>
          <span className="text-sm font-semibold text-ink">Dashboard</span>
          <button
            onClick={() => {
              setEditing({ ...emptyPost, content: [{ heading: "", paragraphs: [""] }] });
              setIsNew(true);
              setError("");
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover"
          >
            <Plus className="h-3.5 w-3.5" />
            Buat Artikel Baru
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-error/10 text-sm text-error">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
          >
            <option value="">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-ink-muted text-sm">
            Tidak ada artikel ditemukan.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary">
                      Judul
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary w-20">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary w-28">
                      Tanggal
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary w-20">
                      Baca
                    </th>
                    <th className="text-right py-3 px-2 font-medium text-ink-tertiary w-24">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((post) => (
                    <tr
                      key={post.slug}
                      className="border-b border-border/50 hover:bg-surface/50"
                    >
                      <td className="py-3 px-2">
                        <p className="font-medium text-ink line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-ink-muted mt-0.5">
                          /{post.slug}
                        </p>
                      </td>
                      <td className="py-3 px-2">
                        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-ink-tertiary">{post.date}</td>
                      <td className="py-3 px-2 text-ink-tertiary">
                        {post.readTime}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => {
                            setEditing({ ...post });
                            setIsNew(false);
                            setError("");
                          }}
                          className="inline-flex items-center p-1.5 text-ink-muted hover:text-primary rounded"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(post)}
                          className="inline-flex items-center p-1.5 text-ink-muted hover:text-error rounded ml-1"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((post) => (
                <div
                  key={post.slug}
                  className="p-4 bg-surface border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink text-sm line-clamp-2">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-ink-muted">
                          {post.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditing({ ...post });
                          setIsNew(false);
                          setError("");
                        }}
                        className="p-1.5 text-ink-muted hover:text-primary rounded"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(post)}
                        className="p-1.5 text-ink-muted hover:text-error rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-ink-muted text-center">
              {filtered.length} dari {posts.length} artikel
            </p>
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-canvas border border-border rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-ink mb-2">
              Hapus Artikel?
            </h3>
            <p className="text-sm text-ink-tertiary mb-6">
              &ldquo;{deleteTarget.title}&rdquo; akan dihapus permanen. Tindakan
              ini tidak bisa dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm font-medium text-ink-tertiary bg-surface border border-border rounded-lg hover:border-primary/30"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-error rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {deleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
