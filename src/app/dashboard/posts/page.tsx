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
  EyeOff,
  X,
  BarChart3,
  FileText,
  Globe,
  FileEdit,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Image as ImageIcon,
  Hash,
  User,
  Tag,
} from "lucide-react";

// ─── Types ───

interface BlogSection {
  heading?: string;
  paragraphs: string[];
  image?: { url: string; alt: string; caption?: string };
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
  status: "draft" | "published";
  metaDescription: string;
  focusKeyword: string;
  ogImage: string;
  tags: string[];
  author: string;
  featuredImage: string;
  views: number;
}

interface Stats {
  totalPosts: number;
  published: number;
  drafts: number;
  byCategory: Record<string, number>;
  totalViews: number;
}

const CATEGORIES = ["Surat", "Foto", "Gaji", "PDF", "CV", "UMKM"];
const PER_PAGE = 10;

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
  status: "draft",
  metaDescription: "",
  focusKeyword: "",
  ogImage: "",
  tags: [],
  author: "Toolinter",
  featuredImage: "",
  views: 0,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function simpleMarkdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold text-ink mb-2 mt-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold text-ink mb-2 mt-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-ink mb-3 mt-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-primary underline hover:text-primary-hover">$1</a>'
    )
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>');
  // Wrap consecutive <li> in <ul>/<ol>
  html = html.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul class="space-y-1 mb-3">$1</ul>');
  // Convert double newlines to <p>
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p class="text-ink-tertiary leading-relaxed mb-3">${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
  return html;
}

// ─── Page ───

export default function DashboardPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [seoOpen, setSeoOpen] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [editorTab, setEditorTab] = useState<"form" | "markdown-preview">("form");

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

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/posts?stats=1");
      if (!res.ok) return;
      setStats(await res.json());
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, [fetchPosts, fetchStats]);

  const filtered = posts
    .filter(
      (p) =>
        (p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))) &&
        (!filterCat || p.category === filterCat) &&
        (!filterStatus || p.status === filterStatus)
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, filterCat, filterStatus]);

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
      setEditorTab("form");
      await fetchPosts();
      await fetchStats();
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
      await fetchStats();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menghapus");
    } finally {
      setDeleting(false);
    }
  }

  // ─── Bulk delete ───
  async function handleBulkDelete() {
    if (selectedSlugs.size === 0) return;
    setBulkDeleting(true);
    try {
      await Promise.all(
        Array.from(selectedSlugs).map((slug) =>
          fetch(`/api/posts/${slug}`, { method: "DELETE" })
        )
      );
      setSelectedSlugs(new Set());
      await fetchPosts();
      await fetchStats();
    } catch {
      setError("Gagal menghapus beberapa artikel");
    } finally {
      setBulkDeleting(false);
    }
  }

  function toggleSelect(slug: string) {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedSlugs.size === paged.length) {
      setSelectedSlugs(new Set());
    } else {
      setSelectedSlugs(new Set(paged.map((p) => p.slug)));
    }
  }

  function updateField(field: keyof BlogPost, value: string | string[] | number) {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  }

  function updateSection(
    idx: number,
    field: keyof BlogSection,
    value: string | string[] | { url: string; alt: string; caption?: string }
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
    setEditing({
      ...editing,
      content: content.length ? content : [{ heading: "", paragraphs: [""] }],
    });
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

  function addTag(tag: string) {
    if (!editing || !tag.trim()) return;
    const tags = editing.tags.filter((t) => t !== tag.trim());
    tags.push(tag.trim());
    setEditing({ ...editing, tags });
    setTagInput("");
  }

  function removeTag(tag: string) {
    if (!editing) return;
    setEditing({ ...editing, tags: editing.tags.filter((t) => t !== tag) });
  }

  function addImageBlock(secIdx: number) {
    if (!editing) return;
    const content = [...editing.content];
    content[secIdx] = {
      ...content[secIdx],
      image: { url: "", alt: "", caption: "" },
    };
    setEditing({ ...editing, content });
  }

  function removeImageBlock(secIdx: number) {
    if (!editing) return;
    const content = [...editing.content];
    const { image: _, ...rest } = content[secIdx];
    content[secIdx] = rest;
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
                setEditorTab("form");
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
                onClick={() => setEditorTab(editorTab === "form" ? "markdown-preview" : "form")}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-ink-tertiary bg-surface border border-border rounded-lg hover:border-primary/30"
              >
                <Eye className="h-3.5 w-3.5" />
                {editorTab === "form" ? "Markdown Preview" : "Edit"}
              </button>
              <button
                onClick={() => setPreview(!preview)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-ink-tertiary bg-surface border border-border rounded-lg hover:border-primary/30"
              >
                {preview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
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
            /* ─── Full page preview ─── */
            <article className="prose prose-sm max-w-none">
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                {editing.category}
              </span>
              {editing.status === "draft" && (
                <span className="inline-block text-xs font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full mb-3 ml-2">
                  Draft
                </span>
              )}
              <h1 className="text-2xl font-bold text-ink mb-2">
                {editing.title || "(Tanpa Judul)"}
              </h1>
              <p className="text-sm text-ink-muted mb-1">
                {editing.date} · {editing.readTime} · oleh {editing.author}
              </p>
              {editing.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {editing.tags.map((t) => (
                    <span key={t} className="text-xs bg-surface border border-border px-2 py-0.5 rounded-full text-ink-tertiary">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
              {editing.featuredImage && (
                <img src={editing.featuredImage} alt={editing.title} className="w-full rounded-xl mb-6 object-cover max-h-80" />
              )}
              <p className="text-ink-tertiary mb-8">{editing.excerpt}</p>
              {editing.content.map((sec, i) => (
                <section key={i} className="mb-6">
                  {sec.heading && (
                    <h2 className="text-lg font-semibold text-ink mb-2">
                      {sec.heading}
                    </h2>
                  )}
                  {sec.image?.url && (
                    <figure className="mb-4">
                      <img src={sec.image.url} alt={sec.image.alt || ""} className="w-full rounded-lg" />
                      {sec.image.caption && (
                        <figcaption className="text-xs text-ink-muted text-center mt-1">{sec.image.caption}</figcaption>
                      )}
                    </figure>
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
          ) : editorTab === "markdown-preview" ? (
            /* ─── Markdown preview ─── */
            <div className="space-y-6">
              <div className="p-6 bg-surface border border-border rounded-xl">
                <h2 className="text-lg font-semibold text-ink mb-4">Markdown Preview</h2>
                {editing.content.map((sec, i) => (
                  <div key={i} className="mb-6">
                    {sec.heading && (
                      <h2 className="text-lg font-semibold text-ink mb-2">{sec.heading}</h2>
                    )}
                    {sec.image?.url && (
                      <figure className="mb-4">
                        <img src={sec.image.url} alt={sec.image.alt || ""} className="w-full rounded-lg" />
                        {sec.image.caption && (
                          <figcaption className="text-xs text-ink-muted text-center mt-1">{sec.image.caption}</figcaption>
                        )}
                      </figure>
                    )}
                    {sec.paragraphs.map((p, j) => (
                      <div
                        key={j}
                        className="mb-4 text-sm"
                        dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(p) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ─── Form ─── */
            <div className="space-y-5">
              {/* Status toggle */}
              <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-lg">
                <span className="text-xs font-medium text-ink-tertiary">Status:</span>
                <button
                  onClick={() => updateField("status", editing.status === "draft" ? "published" : "draft")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition ${
                    editing.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {editing.status === "published" ? (
                    <><Globe className="h-3 w-3" /> Published</>
                  ) : (
                    <><FileEdit className="h-3 w-3" /> Draft</>
                  )}
                </button>
              </div>

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
                      if (isNew) updateField("slug", slugify(e.target.value));
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
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary resize-y min-h-[60px]"
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = t.scrollHeight + "px";
                  }}
                  placeholder="Ringkasan singkat artikel..."
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
                      <option key={c} value={c}>{c}</option>
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
                    Author
                  </label>
                  <input
                    type="text"
                    value={editing.author}
                    onChange={(e) => updateField("author", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                    placeholder="Toolinter"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-tertiary mb-1">
                    Views
                  </label>
                  <input
                    type="number"
                    value={editing.views}
                    onChange={(e) => updateField("views", parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                    min={0}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs font-medium text-ink-tertiary mb-1">
                  <ImageIcon className="inline h-3 w-3 mr-1" />
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={editing.featuredImage}
                  onChange={(e) => updateField("featuredImage", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                />
                {editing.featuredImage && (
                  <img src={editing.featuredImage} alt="Preview" className="mt-2 h-24 rounded-lg object-cover border border-border" />
                )}
                {!editing.featuredImage && (
                  <div className="mt-2 h-24 w-40 rounded-lg border border-dashed border-border bg-canvas flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-ink-muted" />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-medium text-ink-tertiary mb-1">
                  <Tag className="inline h-3 w-3 mr-1" />
                  Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editing.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      #{t}
                      <button onClick={() => removeTag(t)} className="hover:text-error">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTag(tagInput);
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
                    placeholder="Ketik tag, tekan Enter"
                  />
                  <button
                    onClick={() => addTag(tagInput)}
                    className="px-3 py-2 text-xs font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20"
                  >
                    Tambah
                  </button>
                </div>
              </div>

              {/* SEO Section (collapsible) */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setSeoOpen(!seoOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-surface text-sm font-medium text-ink"
                >
                  <span className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-ink-tertiary" />
                    SEO
                    {editing.metaDescription && editing.focusKeyword && editing.ogImage ? (
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Skor: Bagus</span>
                    ) : (
                      <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">Skor: Belum Lengkap</span>
                    )}
                  </span>
                  {seoOpen ? <ChevronUp className="h-4 w-4 text-ink-muted" /> : <ChevronDown className="h-4 w-4 text-ink-muted" />}
                </button>
                {seoOpen && (
                  <div className="px-4 py-4 space-y-4 border-t border-border">
                    <div>
                      <label className="block text-xs font-medium text-ink-tertiary mb-1">
                        Meta Description
                        <span className={`ml-2 ${editing.metaDescription.length > 160 ? "text-error" : "text-ink-muted"}`}>
                          ({editing.metaDescription.length}/160)
                        </span>
                      </label>
                      <textarea
                        value={editing.metaDescription}
                        onChange={(e) => updateField("metaDescription", e.target.value)}
                        rows={2}
                        maxLength={200}
                        className="w-full px-3 py-2 rounded-lg bg-canvas border border-border text-ink text-sm focus:outline-none focus:border-primary resize-y"
                        placeholder="Deskripsi untuk mesin pencari..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-tertiary mb-1">
                        Focus Keyword
                      </label>
                      <input
                        type="text"
                        value={editing.focusKeyword}
                        onChange={(e) => updateField("focusKeyword", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-canvas border border-border text-ink text-sm focus:outline-none focus:border-primary"
                        placeholder="kata kunci utama"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-tertiary mb-1">
                        OG Image URL
                      </label>
                      <input
                        type="text"
                        value={editing.ogImage}
                        onChange={(e) => updateField("ogImage", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-canvas border border-border text-ink text-sm focus:outline-none focus:border-primary"
                        placeholder="https://example.com/og-image.jpg"
                      />
                      {editing.ogImage && (
                        <img src={editing.ogImage} alt="OG Preview" className="mt-2 h-20 rounded-lg object-cover border border-border" />
                      )}
                    </div>
                  </div>
                )}
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
                      <div className="flex items-center gap-1">
                        {!sec.image && (
                          <button
                            onClick={() => addImageBlock(si)}
                            className="text-ink-muted hover:text-primary"
                            title="Tambah gambar"
                          >
                            <ImageIcon className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => removeSection(si)}
                          className="text-ink-muted hover:text-error"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={sec.heading || ""}
                      onChange={(e) => updateSection(si, "heading", e.target.value)}
                      className="w-full px-3 py-2 mb-2 rounded-lg bg-canvas border border-border text-ink text-sm focus:outline-none focus:border-primary"
                      placeholder="Heading (opsional)"
                    />
                    {/* Image block */}
                    {sec.image && (
                      <div className="mb-3 p-3 rounded-lg border border-border bg-canvas space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-ink-muted flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" /> Gambar
                          </span>
                          <button onClick={() => removeImageBlock(si)} className="text-ink-muted hover:text-error">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={sec.image.url}
                          onChange={(e) => updateSection(si, "image", { ...sec.image!, url: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-surface border border-border text-ink text-xs focus:outline-none focus:border-primary"
                          placeholder="URL gambar"
                        />
                        <input
                          type="text"
                          value={sec.image.alt}
                          onChange={(e) => updateSection(si, "image", { ...sec.image!, alt: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-surface border border-border text-ink text-xs focus:outline-none focus:border-primary"
                          placeholder="Alt text"
                        />
                        <input
                          type="text"
                          value={sec.image.caption || ""}
                          onChange={(e) => updateSection(si, "image", { ...sec.image!, caption: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-surface border border-border text-ink text-xs focus:outline-none focus:border-primary"
                          placeholder="Caption (opsional)"
                        />
                        {sec.image.url && (
                          <img src={sec.image.url} alt={sec.image.alt} className="h-16 rounded object-cover border border-border" />
                        )}
                      </div>
                    )}
                    {sec.paragraphs.map((p, pi) => (
                      <div key={pi} className="flex gap-2 mb-2">
                        <textarea
                          value={p}
                          onChange={(e) => updateParagraph(si, pi, e.target.value)}
                          rows={3}
                          className="flex-1 px-3 py-2 rounded-lg bg-canvas border border-border text-ink text-sm focus:outline-none focus:border-primary resize-y font-mono min-h-[80px]"
                          onInput={(e) => {
                            const t = e.currentTarget;
                            t.style.height = "auto";
                            t.style.height = t.scrollHeight + "px";
                          }}
                          placeholder={`Paragraf ${pi + 1} (Markdown didukung)`}
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

        {/* Stats bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 bg-surface border border-border rounded-lg">
              <div className="flex items-center gap-2 text-ink-tertiary text-xs mb-1">
                <FileText className="h-3.5 w-3.5" />
                Total
              </div>
              <p className="text-xl font-bold text-ink">{stats.totalPosts}</p>
            </div>
            <div className="p-3 bg-surface border border-border rounded-lg">
              <div className="flex items-center gap-2 text-ink-tertiary text-xs mb-1">
                <Globe className="h-3.5 w-3.5" />
                Published
              </div>
              <p className="text-xl font-bold text-green-600">{stats.published}</p>
            </div>
            <div className="p-3 bg-surface border border-border rounded-lg">
              <div className="flex items-center gap-2 text-ink-tertiary text-xs mb-1">
                <FileEdit className="h-3.5 w-3.5" />
                Drafts
              </div>
              <p className="text-xl font-bold text-yellow-600">{stats.drafts}</p>
            </div>
            <div className="p-3 bg-surface border border-border rounded-lg">
              <div className="flex items-center gap-2 text-ink-tertiary text-xs mb-1">
                <BarChart3 className="h-3.5 w-3.5" />
                Views
              </div>
              <p className={`text-xl font-bold ${stats.totalViews === 0 ? "text-ink-muted" : "text-ink"}`}>{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Category pills */}
        {stats && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {Object.entries(stats.byCategory).map(([cat, count]) => (
              <button
                key={cat}
                onClick={() => setFilterCat(filterCat === cat ? "" : cat)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
                  filterCat === cat
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-ink-tertiary hover:border-primary/30"
                }`}
              >
                {cat}({count})
              </button>
            ))}
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
              placeholder="Cari artikel atau tag..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
          >
            <option value="">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="px-3 py-2 rounded-lg bg-surface border border-border text-ink text-sm focus:outline-none focus:border-primary"
          >
            <option value="">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Bulk actions */}
        {selectedSlugs.size > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-surface border border-border rounded-lg">
            <span className="text-xs text-ink-tertiary">
              {selectedSlugs.size} dipilih
            </span>
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-error rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {bulkDeleting && <Loader2 className="h-3 w-3 animate-spin" />}
              <Trash2 className="h-3 w-3" />
              Hapus Terpilih
            </button>
            <button
              onClick={() => setSelectedSlugs(new Set())}
              className="text-xs text-ink-muted hover:text-ink"
            >
              Batal
            </button>
          </div>
        )}

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
                    <th className="text-left py-3 px-2 w-8">
                      <button onClick={toggleSelectAll} className="text-ink-muted hover:text-primary">
                        {selectedSlugs.size === paged.length && paged.length > 0 ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary">
                      Judul
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary w-20">
                      Status
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary w-20">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary w-24">
                      Author
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-ink-tertiary w-28">
                      Tanggal
                    </th>
                    <th className="text-center py-3 px-2 font-medium text-ink-tertiary w-16">
                      Views
                    </th>
                    <th className="text-center py-3 px-2 font-medium text-ink-tertiary w-24">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((post) => (
                    <tr
                      key={post.slug}
                      className="border-b border-border/50 hover:bg-surface/50 even:bg-surface/50"
                    >
                      <td className="py-3 px-2">
                        <button onClick={() => toggleSelect(post.slug)} className="text-ink-muted hover:text-primary">
                          {selectedSlugs.has(post.slug) ? (
                            <CheckSquare className="h-4 w-4 text-primary" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-2">
                        <p className="font-medium text-ink line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-ink-muted mt-0.5">/{post.slug}</p>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.tags.slice(0, 3).map((t) => (
                              <span key={t} className="text-[10px] bg-surface border border-border px-1.5 py-0.5 rounded-full text-ink-muted">
                                #{t}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-[10px] text-ink-muted">+{post.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {post.status === "published" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-ink-tertiary text-xs">
                        {post.author}
                      </td>
                      <td className="py-3 px-2 text-ink-tertiary">{post.date}</td>
                      <td className="py-3 px-2 text-ink-tertiary text-xs text-center">
                        {post.views.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => {
                            setEditing({ ...post });
                            setIsNew(false);
                            setError("");
                          }}
                          className="inline-flex items-center p-1.5 text-primary hover:bg-primary/10 border border-border rounded"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(post)}
                          className="inline-flex items-center p-1.5 text-error hover:bg-error/10 border border-border rounded ml-1"
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
              {paged.map((post) => (
                <div
                  key={post.slug}
                  className="p-4 bg-surface border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button onClick={() => toggleSelect(post.slug)} className="mt-1 text-ink-muted hover:text-primary flex-shrink-0">
                      {selectedSlugs.has(post.slug) ? (
                        <CheckSquare className="h-4 w-4 text-primary" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-ink text-sm line-clamp-2">
                          {post.title}
                        </p>
                        <span className={`flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {post.status === "published" ? "Pub" : "Draft"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-ink-muted">{post.date}</span>
                        <span className="text-xs text-ink-muted flex items-center gap-0.5">
                          <User className="h-3 w-3" />{post.author}
                        </span>
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.tags.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] bg-canvas border border-border px-1.5 py-0.5 rounded-full text-ink-muted">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditing({ ...post });
                          setIsNew(false);
                          setError("");
                        }}
                        className="p-1.5 text-primary hover:bg-primary/10 border border-border rounded"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(post)}
                        className="p-1.5 text-error hover:bg-error/10 border border-border rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-medium text-ink-tertiary bg-surface border border-border rounded-lg hover:border-primary/30 disabled:opacity-40"
                >
                  Sebelumnya
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                      page === p
                        ? "bg-primary text-white"
                        : "text-ink-tertiary bg-surface border border-border hover:border-primary/30"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs font-medium text-ink-tertiary bg-surface border border-border rounded-lg hover:border-primary/30 disabled:opacity-40"
                >
                  Berikutnya
                </button>
              </div>
            )}

            <p className="mt-4 text-xs text-ink-muted text-center">
              Menampilkan {(page - 1) * PER_PAGE + 1}-{Math.min(page * PER_PAGE, filtered.length)} dari {filtered.length} artikel
              {totalPages > 1 && ` · Halaman ${page} dari ${totalPages}`}
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
