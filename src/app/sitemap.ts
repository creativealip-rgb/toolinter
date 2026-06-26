import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://toolinter.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const categories = ["surat", "foto", "gaji", "pdf", "cv", "umkm", "keuangan", "pendidikan"];
  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const toolPages = [
    "/gaji/bersih", "/gaji/thr", "/gaji/lembur", "/gaji/bpjs", "/gaji/prorata", "/gaji/pph21", "/gaji/umr",
    "/keuangan/kpr", "/keuangan/investasi", "/keuangan/cek-npwp", "/keuangan/pinjol",
    "/umkm/hpp", "/umkm/harga-jual", "/umkm/food-cost", "/umkm/margin-marketplace", "/umkm/catatan", "/umkm/invoice", "/umkm/caption",
    "/foto/resize-3x4", "/foto/resize-4x6", "/foto/resize-2x3", "/foto/ktp", "/foto/cpns", "/foto/snbp", "/foto/kompres",
    "/pdf/kompres", "/pdf/gabung", "/pdf/halaman", "/pdf/foto-ke-pdf", "/pdf/pdf-ke-word", "/pdf/word-ke-pdf",
    "/cv/ats", "/cv/generator", "/cv/cover-letter", "/cv/fresh-graduate", "/cv/cv-admin", "/cv/cv-bumn", "/cv/contoh-surat-lamaran",
    "/surat/resign", "/surat/izin-sekolah", "/surat/lamaran-kerja", "/surat/dinas",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = (blogPosts as { slug: string; date?: string }[]).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...blogPages];
}
