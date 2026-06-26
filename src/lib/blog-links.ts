// Map tool paths to related blog post slugs
export const toolBlogMap: Record<string, { slug: string; title: string }> = {
  "/gaji/bersih": { slug: "cara-hitung-gaji-bersih", title: "Cara Hitung Gaji Bersih" },
  "/gaji/pph21": { slug: "perbedaan-gaji-bruto-netto", title: "Perbedaan Gaji Bruto vs Netto" },
  "/gaji/thr": { slug: "cara-hitung-gaji-bersih", title: "Panduan Gaji & THR" },
  "/foto/resize-3x4": { slug: "ukuran-foto-visa-passport", title: "Ukuran Foto 3x4 & Passport" },
  "/foto/resize-4x6": { slug: "ukuran-foto-cpns-2026", title: "Ukuran Foto CPNS 2026" },
  "/foto/ktp": { slug: "ukuran-foto-cpns-2026", title: "Panduan Foto KTP" },
  "/foto/cpns": { slug: "ukuran-foto-cpns-2026", title: "Ukuran Foto CPNS 2026" },
  "/foto/snbp": { slug: "ukuran-foto-cpns-2026", title: "Panduan Foto SNBP" },
  "/surat/resign": { slug: "cara-membuat-surat-resign", title: "Cara Membuat Surat Resign" },
  "/surat/izin-sekolah": { slug: "contoh-surat-izin-sekolah", title: "Contoh Surat Izin Sekolah" },
  "/surat/lamaran-kerja": { slug: "contoh-surat-lamaran-kerja", title: "Contoh Surat Lamaran Kerja" },
  "/cv/ats": { slug: "cara-membuat-cv-ats", title: "Cara Membuat CV ATS" },
  "/umkm/hpp": { slug: "cara-hitung-hpp-umkm", title: "Cara Hitung HPP UMKM" },
  "/pdf/kompres": { slug: "kompres-pdf-online", title: "Kompres PDF Online" },
  "/keuangan/kpr": { slug: "cara-hitung-gaji-bersih", title: "Panduan KPR & Gaji" },
};

export function getBlogLink(toolPath: string) {
  return toolBlogMap[toolPath] || null;
}
