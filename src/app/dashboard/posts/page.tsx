"use client";

import { useState, useEffect, useRef } from "react";

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
  status: "draft" | "published" | "scheduled";
  views: number;
  ctaLabel?: string;
  ctaHref?: string;
  metaDescription?: string;
  focusKeyword?: string;
  tags?: string[];
  author?: string;
  featuredImage?: string;
  ogImage?: string;
  content?: BlogSection[];
}

export default function DashboardPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "seo" | "content" | "related">("basic");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emptyForm = {
    slug: "",
    title: "",
    excerpt: "",
    date: new Date().toISOString().slice(0, 10),
    category: "Surat",
    readTime: "5 menit",
    ctaLabel: "",
    ctaHref: "",
    status: "draft" as "draft" | "published" | "scheduled",
    metaDescription: "",
    focusKeyword: "",
    tags: [] as string[],
    author: "Toolinter",
    featuredImage: "",
    ogImage: "",
    content: [] as BlogSection[],
  };

  const [form, setForm] = useState(emptyForm);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    setUploading(false);

    if (res.ok) {
      const data = await res.json();
      setForm((f) => ({ ...f, featuredImage: data.url, ogImage: data.url }));
      showToast("Gambar diupload");
    } else {
      const err = await res.json();
      showToast(err.error || "Gagal upload");
    }
  }

  async function handleInlineImageUpload(e: React.ChangeEvent<HTMLInputElement>, sectionIdx: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    setUploading(false);

    if (res.ok) {
      const data = await res.json();
      const newContent = [...(form.content || [])];
      newContent[sectionIdx] = {
        ...newContent[sectionIdx],
        image: { url: data.url, alt: file.name.replace(/\.[^.]+$/, "") },
      };
      setForm((f) => ({ ...f, content: newContent }));
      showToast("Gambar ditambahkan ke section");
    }
  }

  function addTag() {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  }

  function addSection() {
    setForm((f) => ({
      ...f,
      content: [...(f.content || []), { heading: "", paragraphs: [""] }],
    }));
  }

  function updateSection(idx: number, section: BlogSection) {
    const newContent = [...(form.content || [])];
    newContent[idx] = section;
    setForm((f) => ({ ...f, content: newContent }));
  }

  function removeSection(idx: number) {
    const newContent = (form.content || []).filter((_, i) => i !== idx);
    setForm((f) => ({ ...f, content: newContent }));
  }

  function addParagraph(sectionIdx: number) {
    const newContent = [...(form.content || [])];
    newContent[sectionIdx].paragraphs.push("");
    setForm((f) => ({ ...f, content: newContent }));
  }

  function updateParagraph(sectionIdx: number, paraIdx: number, value: string) {
    const newContent = [...(form.content || [])];
    newContent[sectionIdx].paragraphs[paraIdx] = value;
    setForm((f) => ({ ...f, content: newContent }));
  }

  function removeParagraph(sectionIdx: number, paraIdx: number) {
    const newContent = [...(form.content || [])];
    newContent[sectionIdx].paragraphs = newContent[sectionIdx].paragraphs.filter((_, i) => i !== paraIdx);
    setForm((f) => ({ ...f, content: newContent }));
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Hapus artikel "${slug}"?`)) return;
    const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Artikel dihapus");
      fetchPosts();
    }
  }

  async function handleToggleStatus(post: BlogPost) {
    const newStatus = post.status === "published" ? "draft" : post.status === "scheduled" ? "published" : "scheduled";
    const res = await fetch(`/api/posts/${post.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      showToast(`Status → ${newStatus}`);
      fetchPosts();
    }
  }

  function openEdit(post: BlogPost) {
    setEditing(post.slug);
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      category: post.category,
      readTime: post.readTime,
      ctaLabel: post.ctaLabel || "",
      ctaHref: post.ctaHref || "",
      status: post.status,
      metaDescription: post.metaDescription || "",
      focusKeyword: post.focusKeyword || "",
      tags: post.tags || [],
      author: post.author || "Toolinter",
      featuredImage: post.featuredImage || "",
      ogImage: post.ogImage || "",
      content: post.content || [],
    });
    setActiveTab("basic");
    setShowCreate(true);
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setActiveTab("basic");
    setShowCreate(true);
  }

  async function handleSave() {
    if (!form.slug || !form.title) {
      showToast("Slug dan Title wajib diisi");
      return;
    }
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/posts/${editing}` : "/api/posts";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      showToast(editing ? "Artikel diupdate" : "Artikel dibuat");
      setShowCreate(false);
      fetchPosts();
    } else {
      const err = await res.json();
      showToast(err.error || "Gagal menyimpan");
    }
  }

  const filtered = posts
    .filter((p) => {
      if (filter !== "all" && p.status !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    totalViews: posts.reduce((s, p) => s + (p.views || 0), 0),
  };

  const tabs = [
    { id: "basic", label: "📝 Dasar", icon: "" },
    { id: "seo", label: "🔍 SEO", icon: "" },
    { id: "content", label: "📄 Konten", icon: "" },
    { id: "related", label: "🔗 Terkait", icon: "" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-pulse">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Blog</h1>
            <p className="text-gray-500 text-sm mt-1">Kelola artikel blog Toolinter</p>
          </div>
          <div className="flex gap-2">
            <a href="/dashboard/analytics" className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">📊 Analytics</a>
            <a href="/dashboard/media" className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">🖼️ Media</a>
            <a href="/blog" className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">Lihat Blog →</a>
            <button onClick={openCreate} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">+ Artikel Baru</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-500">Total Artikel</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
            <div className="text-xs text-gray-500">Published</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
            <div className="text-xs text-gray-500">Draft</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
            <div className="text-xs text-gray-500">Scheduled</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
            <div className="text-xs text-gray-500">Total Views</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-1 bg-white border rounded-lg p-1">
            {(["all", "published", "scheduled", "draft"] as const).map((f) => (
              <button key={f} onClick={() => { setFilter(f); setPage(1); }} className={`px-3 py-1.5 text-sm rounded-md transition ${filter === f ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                {f === "all" ? "Semua" : f === "published" ? "Published" : f === "scheduled" ? "Scheduled" : "Draft"}
              </button>
            ))}
          </div>
          <input type="text" placeholder="Cari artikel..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Memuat...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Tidak ada artikel ditemukan</div>
        ) : (
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Judul</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Kategori</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Tanggal</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">SEO</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((post) => (
                  <tr key={post.slug} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {post.featuredImage ? (
                          <img src={post.featuredImage} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-400">🖼️</div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 truncate max-w-xs">{post.title}</div>
                          <div className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{post.category}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{post.date}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {post.metaDescription ? <span title="Meta description ada" className="text-green-500">✓</span> : <span title="Meta description kosong" className="text-gray-300">✗</span>}
                        {post.tags && post.tags.length > 0 ? <span title={`${post.tags.length} tag`} className="text-green-500">🏷</span> : <span title="Tidak ada tag" className="text-gray-300">🏷</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => handleToggleStatus(post)} className={`inline-block px-2 py-0.5 text-xs rounded-full cursor-pointer transition ${post.status === "published" ? "bg-green-100 text-green-700 hover:bg-green-200" : post.status === "scheduled" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"}`}>
                        {post.status}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <a href={`/blog/${post.slug}?preview=1`} target="_blank" className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition" title="Preview">👁</a>
                        <button onClick={() => openEdit(post)} className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition" title="Edit">✏️</button>
                        <button onClick={() => handleDelete(post.slug)} className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition" title="Hapus">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {filtered.length} dari {posts.length} artikel · Halaman {page}/{totalPages || 1}
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1.5 text-xs border rounded-lg transition ${
                    page === pageNum
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Modal Create/Edit */}
      {showCreate && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-start justify-center pt-8 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-lg font-bold text-gray-900">{editing ? "Edit Artikel" : "Artikel Baru"}</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {/* Tabs */}
            <div className="border-b px-6">
              <div className="flex gap-0">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-3 text-sm font-medium border-b-2 transition ${activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* TAB: BASIC */}
              {activeTab === "basic" && (
                <div className="space-y-4">
                  {/* Featured Image */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Featured Image</label>
                    <div className="flex items-start gap-4">
                      {form.featuredImage ? (
                        <div className="relative">
                          <img src={form.featuredImage} alt="Featured" className="w-32 h-24 object-cover rounded-lg border" />
                          <button onClick={() => setForm((f) => ({ ...f, featuredImage: "", ogImage: "" }))} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">✕</button>
                        </div>
                      ) : (
                        <label className="w-32 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
                          {uploading ? <span className="text-xs text-blue-500">Uploading...</span> : <><span className="text-2xl text-gray-300">+</span><span className="text-xs text-gray-400">Upload</span></>}
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                        </label>
                      )}
                      <div className="flex-1">
                        <input type="text" value={form.featuredImage} onChange={(e) => setForm((f) => ({ ...f, featuredImage: e.target.value, ogImage: e.target.value }))} placeholder="/uploads/gambar.jpg atau URL" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        <p className="text-xs text-gray-400 mt-1">Upload atau paste URL gambar. Otomatis jadi OG Image.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Slug *</label>
                      <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} disabled={!!editing} placeholder="judul-artikel" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                        {["Surat", "Foto", "Gaji", "PDF", "CV", "UMKM", "Keuangan", "Pendidikan"].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Judul *</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul artikel lengkap" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Excerpt</label>
                    <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Ringkasan singkat artikel (1-2 kalimat)" rows={2} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal</label>
                      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Read Time</label>
                      <input type="text" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} placeholder="5 menit" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" | "scheduled" })} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="draft">Draft</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">CTA Label</label>
                      <input type="text" value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} placeholder="Hitung KPR" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">CTA Link</label>
                      <input type="text" value={form.ctaHref} onChange={(e) => setForm({ ...form, ctaHref: e.target.value })} placeholder="/keuangan/kpr" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SEO */}
              {activeTab === "seo" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Meta Description</label>
                    <textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} placeholder="Deskripsi untuk Google search (maks 160 karakter)" rows={2} maxLength={160} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                    <div className="text-xs text-gray-400 mt-1">{form.metaDescription.length}/160 karakter</div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Focus Keyword</label>
                    <input type="text" value={form.focusKeyword} onChange={(e) => setForm({ ...form, focusKeyword: e.target.value })} placeholder="kalkulator kpr" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    <p className="text-xs text-gray-400 mt-1">Keyword utama yang ingin dioptimalkan</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tags</label>
                    <div className="flex gap-2">
                      <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Tambah tag..." className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                      <button onClick={addTag} className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition">Tambah</button>
                    </div>
                    {form.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {form.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="text-blue-400 hover:text-blue-600">✕</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Author</label>
                    <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Toolinter" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">OG Image URL</label>
                    <input type="text" value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} placeholder="https://toolinter.net/og-custom.png" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    <p className="text-xs text-gray-400 mt-1">Kosongkan untuk pakai featured image</p>
                  </div>

                  {/* SEO Preview */}
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-2">Preview Google Search</div>
                    <div className="text-blue-700 text-lg font-medium hover:underline cursor-pointer">
                      {form.title || "Judul Artikel"} | Toolinter
                    </div>
                    <div className="text-green-700 text-xs mt-0.5">
                      toolinter.net/blog/{form.slug || "slug-artikel"}
                    </div>
                    <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {form.metaDescription || form.excerpt || "Deskripsi artikel akan muncul di sini..."}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CONTENT */}
              {activeTab === "content" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Sections Artikel</h3>
                      <p className="text-xs text-gray-400">Tambah heading dan paragraf untuk konten</p>
                    </div>
                    <button onClick={addSection} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">+ Section</button>
                  </div>

                  {(form.content || []).length === 0 ? (
                    <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
                      <p className="text-sm">Belum ada konten</p>
                      <p className="text-xs mt-1">Klik &quot;+ Section&quot; untuk mulai menulis</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(form.content || []).map((section, sIdx) => (
                        <div key={sIdx} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-gray-500">Section {sIdx + 1}</span>
                            <div className="flex gap-2">
                              <label className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 cursor-pointer transition">
                                🖼️ Gambar
                                <input type="file" accept="image/*" onChange={(e) => handleInlineImageUpload(e, sIdx)} className="hidden" />
                              </label>
                              <button onClick={() => removeSection(sIdx)} className="px-2 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 transition">Hapus</button>
                            </div>
                          </div>

                          <input type="text" value={section.heading || ""} onChange={(e) => updateSection(sIdx, { ...section, heading: e.target.value })} placeholder="Heading section (opsional)" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3 font-medium" />

                          {section.image && (
                            <div className="relative mb-3">
                              <img src={section.image.url} alt={section.image.alt} className="w-full max-w-sm rounded-lg border" />
                              <button onClick={() => updateSection(sIdx, { ...section, image: undefined })} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">✕</button>
                            </div>
                          )}

                          {section.paragraphs.map((para, pIdx) => (
                            <div key={pIdx} className="flex gap-2 mb-2">
                              <textarea value={para} onChange={(e) => updateParagraph(sIdx, pIdx, e.target.value)} placeholder={`Paragraf ${pIdx + 1}`} rows={3} className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                              {section.paragraphs.length > 1 && (
                                <button onClick={() => removeParagraph(sIdx, pIdx)} className="self-start px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded">✕</button>
                              )}
                            </div>
                          ))}

                          <button onClick={() => addParagraph(sIdx)} className="text-xs text-blue-600 hover:text-blue-800 transition">+ Paragraf</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: RELATED */}
              {activeTab === "related" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Artikel Terkait (&quot;Baca Juga&quot;)</h3>
                    <p className="text-xs text-gray-400 mb-3">Pilih artikel yang akan ditampilkan di bagian &quot;Baca Juga&quot; di bawah artikel ini</p>
                  </div>

                  <div className="bg-gray-50 border rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-3">Sistem otomatis menampilkan 3 artikel terbaru dari kategori yang sama. Untuk kustomisasi manual, gunakan field di bawah.</p>
                    
                    <label className="block text-xs font-medium text-gray-600 mb-1">Related Slugs (pisahkan koma)</label>
                    <input type="text" placeholder="cara-hitung-gaji-bersih, cara-hitungan-thr-karyawan" className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    <p className="text-xs text-gray-400 mt-1">Kosongkan untuk auto-detect berdasarkan kategori</p>
                  </div>

                  {/* Suggested Related */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">Saran Artikel Terkait (kategori: {form.category})</h4>
                    <div className="space-y-2">
                      {posts.filter((p) => p.category === form.category && p.slug !== form.slug).slice(0, 5).map((p) => (
                        <div key={p.slug} className="flex items-center gap-3 p-2 bg-white border rounded-lg">
                          <span className="text-xs text-gray-400">{p.date}</span>
                          <span className="text-sm text-gray-700 flex-1 truncate">{p.title}</span>
                          <span className="text-xs text-gray-400">/blog/{p.slug}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-2 rounded-b-xl">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">Batal</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                {saving ? "Menyimpan..." : editing ? "Update" : "Buat Artikel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
