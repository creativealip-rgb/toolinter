import fs from "node:fs";
import path from "node:path";

// route -> { title, description }  (SEO-optimized, long-tail intent)
const tools = {
  "gaji/pph21": {
    title: "Kalkulator PPh 21 Tarif Progresif & TER 2026",
    description: "Hitung potongan PPh 21 karyawan online gratis pakai tarif TER 2026 & progresif. Masukkan gaji dan status PTKP, hasil langsung tampil. Tanpa daftar.",
  },
  "gaji/bersih": {
    title: "Kalkulator Gaji Bersih (Take Home Pay) 2026",
    description: "Hitung gaji bersih bulanan setelah potongan PPh 21, BPJS Kesehatan & Ketenagakerjaan. Gratis, akurat sesuai aturan 2026, langsung di browser.",
  },
  "gaji/bpjs": {
    title: "Kalkulator BPJS Kesehatan & Ketenagakerjaan 2026",
    description: "Hitung iuran BPJS Kesehatan dan Ketenagakerjaan (JHT, JP) dari gaji. Rincian potongan karyawan & kontribusi perusahaan. Gratis tanpa daftar.",
  },
  "gaji/lembur": {
    title: "Kalkulator Uang Lembur UU Cipta Kerja 2026",
    description: "Hitung uang lembur karyawan sesuai UU Cipta Kerja & Kepmenaker. Masukkan gaji dan jam lembur, dapat rincian upah lembur per jam. Gratis.",
  },
  "gaji/thr": {
    title: "Kalkulator THR Karyawan (Tetap, Kontrak, Harian)",
    description: "Hitung THR karyawan tetap, kontrak, dan harian sesuai masa kerja. Gratis, akurat sesuai aturan Kemnaker terbaru, hasil langsung tampil.",
  },
  "gaji/umr": {
    title: "Daftar UMR/UMP Terbaru Semua Provinsi 2026",
    description: "Cek UMR/UMP terbaru semua provinsi & kota di Indonesia 2026. Bandingkan upah minimum antar daerah. Data lengkap, gratis, mudah dicari.",
  },
  "gaji/prorata": {
    title: "Kalkulator Gaji Prorata Masuk Tengah Bulan",
    description: "Hitung gaji prorata untuk karyawan yang masuk atau resign di tengah bulan. Masukkan gaji & tanggal, dapat nominal proporsional. Gratis.",
  },
  "keuangan/kpr": {
    title: "Simulasi KPR: Cicilan Fixed vs Floating",
    description: "Simulasi cicilan KPR bulanan dengan bunga fixed dan floating. Bandingkan total bayar, tenor, dan cicilan. Gratis, tanpa daftar.",
  },
  "keuangan/investasi": {
    title: "Kalkulator Investasi & Return Reksadana",
    description: "Hitung proyeksi return investasi reksadana, saham, dan compound interest. Simulasi pertumbuhan dana per tahun. Gratis, langsung di browser.",
  },
  "keuangan/cek-npwp": {
    title: "Cek Format NPWP & Validasi NIK Online",
    description: "Validasi format NPWP dan NIK secara instan di browser. Cek kelengkapan digit dan format resmi. Gratis, data tidak disimpan di server.",
  },
  "keuangan/pinjol": {
    title: "Cek Daftar Pinjol Legal Berizin OJK 2026",
    description: "Cek apakah pinjaman online terdaftar & berizin OJK. Hindari pinjol ilegal. Daftar resmi terupdate, gratis, aman dipakai.",
  },
  "cv/fresh-graduate": {
    title: "Buat CV Fresh Graduate Tanpa Pengalaman Kerja",
    description: "Bikin CV fresh graduate ATS-friendly tanpa pengalaman kerja. Template gratis, isi data, download PDF langsung. Cocok untuk lamaran pertama.",
  },
  "cv/cv-admin": {
    title: "Buat CV Admin & Staff Profesional Gratis",
    description: "Bikin CV untuk posisi admin, staff, dan operasional. Template ATS-friendly, isi data, download PDF. Gratis tanpa daftar.",
  },
  "cv/cv-bumn": {
    title: "Buat CV untuk Lamar BUMN & CPNS (Format Benar)",
    description: "Bikin CV sesuai format lamaran BUMN dan CPNS. Template ATS-friendly, struktur yang benar, download PDF gratis. Tingkatkan peluang lolos.",
  },
  "cv/generator": {
    title: "CV Generator Online ATS-Friendly Gratis",
    description: "Buat CV profesional ATS-friendly dalam hitungan menit. Pilih template, isi data, download PDF. Gratis, tanpa daftar, langsung di browser.",
  },
  "cv/contoh-surat-lamaran": {
    title: "Contoh Surat Lamaran Kerja & Generator Gratis",
    description: "Buat surat lamaran kerja profesional dari template. Contoh untuk berbagai posisi, isi data, download PDF. Gratis tanpa daftar.",
  },
  "umkm/caption": {
    title: "Generator Caption Jualan & Promosi UMKM",
    description: "Bikin caption jualan menarik untuk Instagram, WhatsApp, dan marketplace. Cepat, gratis, cocok untuk UMKM dan online shop.",
  },
  "surat/dinas": {
    title: "Buat Surat Dinas Resmi Online Gratis",
    description: "Bikin surat dinas resmi sesuai format standar. Isi data, download PDF. Gratis, tanpa install aplikasi, proses di browser.",
  },
  "pendidikan/kalender": {
    title: "Kalender Akademik Indonesia 2026",
    description: "Lihat kalender akademik Indonesia: tanggal penting, libur sekolah, dan jadwal semester. Gratis, mudah diakses.",
  },
};

const appDir = "src/app";
let created = 0;

for (const [route, meta] of Object.entries(tools)) {
  const dir = path.join(appDir, route);
  if (!fs.existsSync(dir)) {
    console.log("SKIP (no dir):", route);
    continue;
  }
  const layoutPath = path.join(dir, "layout.tsx");
  if (fs.existsSync(layoutPath)) {
    console.log("SKIP (layout exists):", route);
    continue;
  }
  const content = `import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata({
  title: ${JSON.stringify(meta.title)},
  description: ${JSON.stringify(meta.description)},
  path: ${JSON.stringify("/" + route)},
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;
  fs.writeFileSync(layoutPath, content, "utf8");
  created++;
  console.log("CREATED:", layoutPath);
}

console.log("\nTotal layouts created:", created);
