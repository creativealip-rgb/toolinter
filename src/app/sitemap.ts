import type { MetadataRoute } from "next";

const BASE_URL = "https://toolinter.net";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    
    // Surat (22 templates)
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
    { url: `${BASE_URL}/surat/izin-kuliah`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/izin-kerja`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/kuasa-bpkb`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/keterangan-usaha`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/keterangan-tidak-mampu`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/pengunduran-diri`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/surat/kuasa-rekening`, lastModified: new Date(), changeFrequency: "monthly" },

    // Foto (7 pages)
    { url: `${BASE_URL}/foto`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/foto/resize-3x4`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/foto/resize-4x6`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/foto/resize-2x3`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/foto/kompres`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/foto/ktp`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/foto/cpns`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/foto/snbp`, lastModified: new Date(), changeFrequency: "monthly" },

    // Gaji (6 tools)
    { url: `${BASE_URL}/gaji`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/gaji/bersih`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/gaji/pph21`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/gaji/thr`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/gaji/bpjs`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/gaji/lembur`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/gaji/prorata`, lastModified: new Date(), changeFrequency: "monthly" },

    // PDF (6 tools)
    { url: `${BASE_URL}/pdf`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pdf/gabung`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/pdf/kompres`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/pdf/foto-ke-pdf`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/pdf/halaman`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/pdf/pdf-ke-word`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/pdf/word-ke-pdf`, lastModified: new Date(), changeFrequency: "monthly" },

    // CV (5 tools)
    { url: `${BASE_URL}/cv`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/cv/ats`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/cv/fresh-graduate`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/cv/cv-admin`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/cv/cv-bumn`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/cv/contoh-surat-lamaran`, lastModified: new Date(), changeFrequency: "monthly" },

    // UMKM (6 tools)
    { url: `${BASE_URL}/umkm`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/umkm/hpp`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/umkm/harga-jual`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/umkm/food-cost`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/umkm/invoice`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/umkm/margin-marketplace`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/umkm/catatan`, lastModified: new Date(), changeFrequency: "monthly" },

    // Blog (15 posts)
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/blog/cara-membuat-surat-resign`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/ukuran-foto-cpns-2026`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/cara-hitung-gaji-bersih`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/cara-kompres-pdf`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/cara-buat-cv-ats`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/contoh-surat-pengunduran-diri`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/ukuran-foto-3x4-4x6-pixel`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/cara-hitungan-thr-karyawan`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/cara-membuat-cv-fresh-graduate`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/cara-hitung-hpp-produk-umkm`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/contoh-surat-izin-sekolah`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/cara-membuat-surat-lamaran-kerja`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/ukuran-foto-visa-passport`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/perbedaan-gaji-bruto-netto`, lastModified: new Date(), changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog/cara-buat-invoice-profesional`, lastModified: new Date(), changeFrequency: "monthly" },

    // Static
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
