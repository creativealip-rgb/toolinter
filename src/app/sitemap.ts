import { MetadataRoute } from "next";
import { readPosts } from "@/lib/posts-store";
import { suratTypes } from "@/data/surat";

const BASE_URL = "https://toolinter.net";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];
  const now = new Date();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const categories = ["surat", "foto", "gaji", "pdf", "cv", "umkm", "keuangan", "pendidikan"];
  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/${cat}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Fixed tool paths (non-dynamic routes)
  const toolPaths = [
    "/gaji/bersih", "/gaji/thr", "/gaji/lembur", "/gaji/bpjs", "/gaji/prorata", "/gaji/pph21", "/gaji/umr", "/gaji/pesangon",
    "/keuangan/kpr", "/keuangan/investasi", "/keuangan/cek-npwp", "/keuangan/pinjol", "/keuangan/zakat",
    "/umkm/hpp", "/umkm/harga-jual", "/umkm/food-cost", "/umkm/margin-marketplace", "/umkm/catatan", "/umkm/invoice", "/umkm/caption",
    "/foto/resize-3x4", "/foto/resize-4x6", "/foto/resize-2x3", "/foto/ktp", "/foto/cpns", "/foto/snbp", "/foto/kompres", "/foto/ganti-background",
    "/pdf/kompres", "/pdf/gabung", "/pdf/halaman", "/pdf/foto-ke-pdf", "/pdf/pdf-ke-word", "/pdf/word-ke-pdf",
    "/cv/ats", "/cv/generator", "/cv/cover-letter", "/cv/fresh-graduate", "/cv/cv-admin", "/cv/cv-bumn", "/cv/contoh-surat-lamaran",
    "/surat/dinas",
    "/pendidikan/kalender",
  ];

  const toolPages = toolPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // All surat generator slugs from data source
  const suratPages = suratTypes.map((s) => ({
    url: `${BASE_URL}/surat/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Live posts from volume (not bake seed)
  const blogPages = readPosts()
    .filter((post) => {
      const isReleased =
        post.status === "published" ||
        (post.status === "scheduled" && (post.date || "") <= today);
      return isReleased;
    })
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date || now),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...categoryPages, ...toolPages, ...suratPages, ...blogPages];
}
