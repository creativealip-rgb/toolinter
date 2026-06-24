import type { MetadataRoute } from "next";

const BASE_URL = "https://toolinter.net";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/surat`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/surat/resign`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/izin-sekolah`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/lamaran-kerja`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/pernyataan`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/kuasa`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/undangan`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/permohonan`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/keterangan-kerja`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/domisili`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/sewa`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/tugas`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/rekomendasi`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/belum-menikah`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/kesehatan`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/bebas-narkoba`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/foto`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/foto/resize-3x4`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/gaji`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/gaji/bersih`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/pdf`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pdf/gabung`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/pdf/kompres`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/cv`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/cv/ats`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/umkm`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/umkm/hpp`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
