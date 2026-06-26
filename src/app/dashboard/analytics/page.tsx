"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  status: string;
  views: number;
  featuredImage?: string;
}

interface Stats {
  totalPosts: number;
  published: number;
  drafts: number;
  totalViews: number;
  byCategory: Record<string, number>;
}

export default function AnalyticsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"views" | "date" | "title">("views");

  useEffect(() => {
    Promise.all([
      fetch("/api/posts").then((r) => r.json()),
      fetch("/api/posts?stats=1").then((r) => r.json()),
    ]).then(([postsData, statsData]) => {
      setPosts(postsData);
      setStats(statsData);
      setLoading(false);
    });
  }, []);

  const sorted = [...posts].sort((a, b) => {
    if (sortBy === "views") return (b.views || 0) - (a.views || 0);
    if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
    return a.title.localeCompare(b.title);
  });

  const topPosts = sorted.slice(0, 10);
  const categoryViews = posts.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + (p.views || 0);
    return acc;
  }, {} as Record<string, number>);

  const maxViews = Math.max(...posts.map((p) => p.views || 0), 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">Memuat analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">
              Statistik performa blog Toolinter
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/dashboard/posts"
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              ← Dashboard
            </a>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border p-5">
            <div className="text-3xl font-bold text-gray-900">{stats?.totalPosts || 0}</div>
            <div className="text-sm text-gray-500 mt-1">Total Artikel</div>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <div className="text-3xl font-bold text-green-600">{stats?.published || 0}</div>
            <div className="text-sm text-gray-500 mt-1">Published</div>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <div className="text-3xl font-bold text-blue-600">{stats?.totalViews || 0}</div>
            <div className="text-sm text-gray-500 mt-1">Total Views</div>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <div className="text-3xl font-bold text-purple-600">
              {stats?.totalPosts ? Math.round((stats.totalViews || 0) / stats.totalPosts) : 0}
            </div>
            <div className="text-sm text-gray-500 mt-1">Rata-rata Views</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-lg border p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Views per Kategori</h2>
            <div className="space-y-3">
              {Object.entries(stats?.byCategory || {})
                .sort(([, a], [, b]) => b - a)
                .map(([cat, count]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{cat}</span>
                      <span className="text-gray-500">{count} artikel</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(count / (stats?.totalPosts || 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Views by Category */}
          <div className="bg-white rounded-lg border p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Distribusi Views</h2>
            <div className="space-y-3">
              {Object.entries(categoryViews)
                .sort(([, a], [, b]) => b - a)
                .map(([cat, views]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{cat}</span>
                      <span className="text-gray-500">{views} views</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(views / maxViews) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Status Artikel</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Published</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {stats?.published || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Draft</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  {stats?.drafts || 0}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="text-sm text-gray-500 mb-2">Kategori Terbanyak</div>
                {stats?.byCategory && Object.entries(stats.byCategory).length > 0 ? (
                  <div className="text-lg font-bold text-gray-900">
                    {Object.entries(stats.byCategory).sort(([, a], [, b]) => b - a)[0][0]}
                  </div>
                ) : (
                  <div className="text-gray-400">-</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Top Articles */}
        <div className="mt-8 bg-white rounded-lg border overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Artikel Terpopuler</h2>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {(["views", "date", "title"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1 text-xs rounded-md transition ${
                    sortBy === s
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {s === "views" ? "Terpopuler" : s === "date" ? "Terbaru" : "A-Z"}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-2 font-medium text-gray-600">#</th>
                <th className="text-left px-5 py-2 font-medium text-gray-600">Judul</th>
                <th className="text-left px-5 py-2 font-medium text-gray-600 hidden md:table-cell">Kategori</th>
                <th className="text-left px-5 py-2 font-medium text-gray-600 hidden md:table-cell">Tanggal</th>
                <th className="text-right px-5 py-2 font-medium text-gray-600">Views</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, i) => (
                <tr key={post.slug} className="border-t hover:bg-gray-50 transition">
                  <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3">
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-gray-900 hover:text-blue-600 transition"
                    >
                      {post.title}
                    </a>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{post.date}</td>
                  <td className="px-5 py-3 text-right font-medium text-gray-900">
                    {post.views || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 text-xs text-gray-400 text-center">
          Data views disimpan lokal. Integrasi Plausible Analytics untuk data real-time.
        </div>
      </div>
    </div>
  );
}
