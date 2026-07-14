// Map each tool path to related tools (tool -> tool internal linking).
// Boosts pageviews/session + topical authority. Keep 3-4 per tool, same-intent journey.
export interface RelatedTool {
  path: string;
  title: string;
}

export const relatedToolsMap: Record<string, RelatedTool[]> = {
  // --- Gaji & Keuangan (journey: hitung gaji -> pajak -> potongan -> lamaran) ---
  "/gaji/bersih": [
    { path: "/gaji/pph21", title: "Kalkulator PPh 21" },
    { path: "/gaji/bpjs", title: "Kalkulator BPJS" },
    { path: "/gaji/thr", title: "Kalkulator THR" },
    { path: "/cv/generator", title: "Buat CV ATS" },
  ],
  "/gaji/pph21": [
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/gaji/bpjs", title: "Kalkulator BPJS" },
    { path: "/keuangan/cek-npwp", title: "Cek Format NPWP" },
    { path: "/gaji/umr", title: "Daftar UMR/UMP" },
  ],
  "/gaji/bpjs": [
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/gaji/pph21", title: "Kalkulator PPh 21" },
    { path: "/gaji/thr", title: "Kalkulator THR" },
  ],
  "/gaji/lembur": [
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/gaji/prorata", title: "Gaji Prorata" },
    { path: "/gaji/thr", title: "Kalkulator THR" },
  ],
  "/gaji/thr": [
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/gaji/pph21", title: "Kalkulator PPh 21" },
    { path: "/gaji/lembur", title: "Kalkulator Lembur" },
  ],
  "/gaji/umr": [
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/gaji/pph21", title: "Kalkulator PPh 21" },
    { path: "/keuangan/kpr", title: "Simulasi KPR" },
  ],
  "/gaji/prorata": [
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/gaji/lembur", title: "Kalkulator Lembur" },
    { path: "/gaji/thr", title: "Kalkulator THR" },
  ],
  "/gaji/pesangon": [
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/gaji/thr", title: "Kalkulator THR" },
    { path: "/gaji/pph21", title: "Kalkulator PPh 21" },
    { path: "/keuangan/investasi", title: "Kalkulator Investasi" },
  ],
  "/keuangan/kpr": [
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/keuangan/investasi", title: "Kalkulator Investasi" },
    { path: "/keuangan/pinjol", title: "Cek Pinjol Legal OJK" },
  ],
  "/keuangan/investasi": [
    { path: "/keuangan/kpr", title: "Simulasi KPR" },
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/keuangan/pinjol", title: "Cek Pinjol Legal OJK" },
  ],
  "/keuangan/cek-npwp": [
    { path: "/gaji/pph21", title: "Kalkulator PPh 21" },
    { path: "/gaji/bersih", title: "Kalkulator Gaji Bersih" },
    { path: "/keuangan/pinjol", title: "Cek Pinjol Legal OJK" },
  ],
  "/keuangan/pinjol": [
    { path: "/keuangan/kpr", title: "Simulasi KPR" },
    { path: "/keuangan/cek-npwp", title: "Cek Format NPWP" },
    { path: "/keuangan/investasi", title: "Kalkulator Investasi" },
  ],

  // --- CV & Lamaran (journey: CV -> surat lamaran -> cover letter) ---
  "/cv/generator": [
    { path: "/cv/fresh-graduate", title: "CV Fresh Graduate" },
    { path: "/cv/contoh-surat-lamaran", title: "Surat Lamaran Kerja" },
    { path: "/cv/cover-letter", title: "Cover Letter" },
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
  ],
  "/cv/fresh-graduate": [
    { path: "/cv/generator", title: "CV Generator ATS" },
    { path: "/cv/contoh-surat-lamaran", title: "Surat Lamaran Kerja" },
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
  ],
  "/cv/cv-admin": [
    { path: "/cv/generator", title: "CV Generator ATS" },
    { path: "/cv/contoh-surat-lamaran", title: "Surat Lamaran Kerja" },
    { path: "/cv/cover-letter", title: "Cover Letter" },
  ],
  "/cv/cv-bumn": [
    { path: "/cv/generator", title: "CV Generator ATS" },
    { path: "/cv/contoh-surat-lamaran", title: "Surat Lamaran Kerja" },
    { path: "/foto/cpns", title: "Foto CPNS" },
  ],
  "/cv/contoh-surat-lamaran": [
    { path: "/cv/generator", title: "CV Generator ATS" },
    { path: "/cv/cover-letter", title: "Cover Letter" },
    { path: "/cv/fresh-graduate", title: "CV Fresh Graduate" },
  ],

  // --- Foto (journey: resize -> kompres -> ke PDF) ---
  "/foto/resize-3x4": [
    { path: "/foto/resize-4x6", title: "Resize Foto 4x6" },
    { path: "/foto/kompres", title: "Kompres Foto" },
    { path: "/pdf/foto-ke-pdf", title: "Foto ke PDF" },
  ],
  "/foto/resize-4x6": [
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
    { path: "/foto/kompres", title: "Kompres Foto" },
    { path: "/foto/cpns", title: "Foto CPNS" },
  ],
  "/foto/kompres": [
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
    { path: "/pdf/kompres", title: "Kompres PDF" },
    { path: "/pdf/foto-ke-pdf", title: "Foto ke PDF" },
  ],
  "/foto/cpns": [
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
    { path: "/foto/snbp", title: "Foto SNBP" },
    { path: "/cv/cv-bumn", title: "CV untuk CPNS/BUMN" },
  ],
  "/foto/snbp": [
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
    { path: "/foto/cpns", title: "Foto CPNS" },
    { path: "/pendidikan/kalender", title: "Kalender Akademik" },
  ],
  "/foto/ktp": [
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
    { path: "/foto/kompres", title: "Kompres Foto" },
    { path: "/foto/ganti-background", title: "Ganti Background Foto" },
  ],
  "/foto/ganti-background": [
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
    { path: "/foto/cpns", title: "Foto CPNS" },
    { path: "/foto/kompres", title: "Kompres Foto" },
    { path: "/cv/generator", title: "Buat CV ATS" },
  ],

  // --- PDF (journey: gabung -> kompres -> konversi) ---
  "/pdf/gabung": [
    { path: "/pdf/kompres", title: "Kompres PDF" },
    { path: "/pdf/foto-ke-pdf", title: "Foto ke PDF" },
    { path: "/pdf/halaman", title: "Atur Halaman PDF" },
  ],
  "/pdf/kompres": [
    { path: "/pdf/gabung", title: "Gabung PDF" },
    { path: "/pdf/pdf-ke-word", title: "PDF ke Word" },
    { path: "/foto/kompres", title: "Kompres Foto" },
  ],
  "/pdf/pdf-ke-word": [
    { path: "/pdf/word-ke-pdf", title: "Word ke PDF" },
    { path: "/pdf/kompres", title: "Kompres PDF" },
    { path: "/pdf/gabung", title: "Gabung PDF" },
  ],
  "/pdf/word-ke-pdf": [
    { path: "/pdf/pdf-ke-word", title: "PDF ke Word" },
    { path: "/pdf/gabung", title: "Gabung PDF" },
    { path: "/pdf/foto-ke-pdf", title: "Foto ke PDF" },
  ],
  "/pdf/foto-ke-pdf": [
    { path: "/pdf/gabung", title: "Gabung PDF" },
    { path: "/pdf/kompres", title: "Kompres PDF" },
    { path: "/foto/kompres", title: "Kompres Foto" },
  ],
  "/pdf/halaman": [
    { path: "/pdf/gabung", title: "Gabung PDF" },
    { path: "/pdf/kompres", title: "Kompres PDF" },
  ],

  // --- UMKM (journey: hpp -> harga jual -> margin -> invoice) ---
  "/umkm/hpp": [
    { path: "/umkm/harga-jual", title: "Hitung Harga Jual" },
    { path: "/umkm/food-cost", title: "Kalkulator Food Cost" },
    { path: "/umkm/margin-marketplace", title: "Margin Marketplace" },
  ],
  "/umkm/harga-jual": [
    { path: "/umkm/hpp", title: "Hitung HPP" },
    { path: "/umkm/margin-marketplace", title: "Margin Marketplace" },
    { path: "/umkm/invoice", title: "Buat Invoice" },
  ],
  "/umkm/food-cost": [
    { path: "/umkm/hpp", title: "Hitung HPP" },
    { path: "/umkm/harga-jual", title: "Hitung Harga Jual" },
    { path: "/umkm/caption", title: "Caption Jualan" },
  ],
  "/umkm/margin-marketplace": [
    { path: "/umkm/harga-jual", title: "Hitung Harga Jual" },
    { path: "/umkm/hpp", title: "Hitung HPP" },
    { path: "/umkm/invoice", title: "Buat Invoice" },
  ],
  "/umkm/invoice": [
    { path: "/umkm/harga-jual", title: "Hitung Harga Jual" },
    { path: "/umkm/caption", title: "Caption Jualan" },
    { path: "/umkm/catatan", title: "Catatan Keuangan" },
  ],
  "/umkm/caption": [
    { path: "/umkm/invoice", title: "Buat Invoice" },
    { path: "/umkm/harga-jual", title: "Hitung Harga Jual" },
  ],
  "/umkm/catatan": [
    { path: "/umkm/invoice", title: "Buat Invoice" },
    { path: "/umkm/hpp", title: "Hitung HPP" },
  ],

  // --- Surat ---
  "/surat/dinas": [
    { path: "/cv/contoh-surat-lamaran", title: "Surat Lamaran Kerja" },
    { path: "/cv/generator", title: "CV Generator ATS" },
  ],

  // --- Tambahan: tool yang sebelumnya belum punya related ---
  "/cv/ats": [
    { path: "/cv/generator", title: "CV Generator ATS" },
    { path: "/cv/fresh-graduate", title: "CV Fresh Graduate" },
    { path: "/cv/contoh-surat-lamaran", title: "Surat Lamaran Kerja" },
    { path: "/cv/cover-letter", title: "Cover Letter" },
  ],
  "/cv/cover-letter": [
    { path: "/cv/generator", title: "CV Generator ATS" },
    { path: "/cv/contoh-surat-lamaran", title: "Surat Lamaran Kerja" },
    { path: "/cv/ats", title: "Generator CV ATS" },
  ],
  "/foto/resize-2x3": [
    { path: "/foto/resize-3x4", title: "Resize Foto 3x4" },
    { path: "/foto/resize-4x6", title: "Resize Foto 4x6" },
    { path: "/foto/kompres", title: "Kompres Foto" },
    { path: "/pdf/foto-ke-pdf", title: "Foto ke PDF" },
  ],
  "/pendidikan/kalender": [
    { path: "/foto/snbp", title: "Foto SNBP" },
    { path: "/cv/fresh-graduate", title: "CV Fresh Graduate" },
    { path: "/keuangan/investasi", title: "Kalkulator Investasi" },
  ],
};

export function getRelatedTools(toolPath: string): RelatedTool[] {
  return relatedToolsMap[toolPath] || [];
}
