"use client";

import { useState } from "react";
import { Download, ArrowLeft } from "lucide-react";
import { jsPDF } from "jspdf";
import Link from "next/link";

/* ---- PDF download ---- */
function downloadTemplate() {
  const doc = new jsPDF();
  const m = 15;
  let y = 20;
  const w = 210 - 2 * m;

  const write = (text: string, size = 11, style: "normal" | "bold" = "normal", align: "left" | "center" = "left") => {
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    const x = align === "center" ? 105 : m;
    const lines = doc.splitTextToSize(text, w);
    lines.forEach((l: string) => {
      if (y > 280) { doc.addPage(); y = 20; }
      doc.text(l, x, y, { align });
      y += size * 0.45;
    });
  };

  // Header
  write("NAMA LENGKAP", 20, "bold", "center");
  write("freshgraduate@email.com | 0812-3456-7890 | Jakarta, Indonesia", 10, "normal", "center");
  y += 4;
  doc.setDrawColor(180); doc.line(m, y, 210 - m, y); y += 6;

  // Ringkasan
  write("RINGKASAN", 13, "bold");
  y += 2;
  write("Lulusan S1 Informatika dengan IPK 3.75. Antusias belajar, aktif dalam organisasi kampus, dan memiliki pengalaman magang di bidang pengembangan web. Siap berkontribusi dalam tim profesional.");
  y += 4;

  // Pendidikan
  write("PENDIDIKAN", 13, "bold"); y += 2;
  write("S1 Informatika — Universitas Indonesia", 11, "bold");
  write("2020 – 2024 | IPK: 3.75 / 4.00");
  write("Mata kuliah: Struktur Data, Basis Data, Pemrograman Web, Rekayasa Perangkat Lunak.");
  y += 4;

  // Pengalaman Magang
  write("PENGALAMAN MAGANG", 13, "bold"); y += 2;
  write("Magang Front-End Developer — PT Teknologi Nusantara", 11, "bold");
  write("Juni 2023 – Agustus 2023");
  write("• Mengembangkan 5 halaman web responsif menggunakan React.js");
  write("• Berkolaborasi dengan tim UI/UX dalam redesign dashboard");
  write("• Mengurangi waktu loading halaman sebesar 30%");
  y += 4;

  // Proyek
  write("PROYEK", 13, "bold"); y += 2;
  write("Aplikasi Manajemen Tugas (Capstone Project)", 11, "bold");
  write("• Membangun full-stack app dengan Next.js dan PostgreSQL");
  write("• Mengimplementasikan autentikasi JWT dan role-based access");
  y += 4;

  // Organisasi
  write("ORGANISASI", 13, "bold"); y += 2;
  write("Ketua Divisi Acara — Himpunan Mahasiswa Informatika", 11, "bold");
  write("2022 – 2023");
  write("• Mengorganisir seminar nasional dengan 200+ peserta");
  y += 4;

  // Keahlian
  write("KEAHLIAN", 13, "bold"); y += 2;
  write("Teknis: JavaScript, TypeScript, React.js, Next.js, Node.js, SQL, Git, Figma");
  write("Soft Skill: Komunikasi, Kerja Tim, Problem Solving, Manajemen Waktu");

  doc.save("CV-Fresh-Graduate-Toolinter.pdf");
}

/* ---- Preview component ---- */
function CvPreview() {
  return (
    <div className="mx-auto max-w-[680px] rounded-lg border border-border bg-white p-6 text-left shadow-sm sm:p-8">
      <h2 className="text-center text-2xl font-bold text-gray-900">NAMA LENGKAP</h2>
      <p className="mt-1 text-center text-xs text-gray-500">
        freshgraduate@email.com · 0812-3456-7890 · Jakarta, Indonesia
      </p>
      <hr className="my-4 border-gray-200" />

      <SectionTitle>Ringkasan</SectionTitle>
      <p className="text-sm leading-relaxed text-gray-700">
        Lulusan S1 Informatika dengan IPK 3.75. Antusias belajar, aktif dalam organisasi kampus,
        dan memiliki pengalaman magang di bidang pengembangan web.
      </p>

      <SectionTitle>Pendidikan</SectionTitle>
      <Row heading="S1 Informatika — Universitas Indonesia" sub="2020 – 2024 | IPK: 3.75 / 4.00" />
      <p className="mt-1 text-xs text-gray-600">
        Mata kuliah: Struktur Data, Basis Data, Pemrograman Web, Rekayasa Perangkat Lunak.
      </p>

      <SectionTitle>Pengalaman Magang</SectionTitle>
      <Row heading="Magang Front-End Developer — PT Teknologi Nusantara" sub="Juni 2023 – Agustus 2023" />
      <ul className="mt-1 list-disc pl-5 text-xs text-gray-600">
        <li>Mengembangkan 5 halaman web responsif menggunakan React.js</li>
        <li>Berkolaborasi dengan tim UI/UX dalam redesign dashboard</li>
        <li>Mengurangi waktu loading halaman sebesar 30%</li>
      </ul>

      <SectionTitle>Proyek</SectionTitle>
      <Row heading="Aplikasi Manajemen Tugas (Capstone Project)" sub="" />
      <ul className="mt-1 list-disc pl-5 text-xs text-gray-600">
        <li>Full-stack app dengan Next.js dan PostgreSQL</li>
        <li>Autentikasi JWT dan role-based access</li>
      </ul>

      <SectionTitle>Keahlian</SectionTitle>
      <p className="text-xs text-gray-700">
        <strong>Teknis:</strong> JavaScript, TypeScript, React.js, Next.js, Node.js, SQL, Git, Figma
      </p>
      <p className="mt-1 text-xs text-gray-700">
        <strong>Soft Skill:</strong> Komunikasi, Kerja Tim, Problem Solving, Manajemen Waktu
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-5 mb-1 border-b border-gray-200 pb-1 text-sm font-bold text-gray-900 uppercase tracking-wide">{children}</h3>;
}

function Row({ heading, sub }: { heading: string; sub: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-xs font-semibold text-gray-800">{heading}</span>
      {sub && <span className="shrink-0 text-[11px] text-gray-500">{sub}</span>}
    </div>
  );
}

/* ---- Page ---- */
export default function FreshGraduatePage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    downloadTemplate();
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <main className="min-h-screen bg-canvas">
      <section className="mx-auto max-w-3xl px-4 pt-8">
        <Link href="/cv" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft size={16} /> Kembali
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Template CV Fresh Graduate
        </h1>
        <p className="mt-3 text-ink-tertiary">
          Template CV khusus untuk lulusan baru tanpa pengalaman kerja. Fokuskan kekuatan di
          pendidikan, proyek, magang, dan keahlian.
        </p>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          <Download size={18} />
          {downloading ? "Mendownload…" : "Download Template PDF"}
        </button>
      </section>

      {/* Preview */}
      <section className="mx-auto max-w-3xl px-4 pb-8">
        <CvPreview />
      </section>

      {/* SEO tips */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-ink">
          Tips CV Fresh Graduate yang Menarik Perhatian Recruiter
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          Sebagai <strong>fresh graduate</strong> atau <strong>lulusan baru</strong>, Anda mungkin merasa tidak punya
          pengalaman kerja yang cukup. Namun recruiter memahami hal ini — yang mereka cari adalah
          potensi, inisiatif, dan kesesuaian budaya. Berikut tips membuat <strong>CV fresh graduate</strong> yang efektif:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li><strong>Tulis ringkasan profesional singkat</strong> — 2-3 kaloman yang gambarkan siapa Anda, jurusan, dan minat karier.</li>
          <li><strong>Utamakan pendidikan</strong> — cantumkan IPK jika di atas 3.0, mata kuliah relevan, dan judul skripsi/TA.</li>
          <li><strong>Sertakan pengalaman magang</strong> — meski singkat, ini menunjukkan exposure dunia kerja nyata.</li>
          <li><strong>Tampilkan proyek</strong> — proyek kampus, freelance, atau personal project sangat bernilai.</li>
          <li><strong>Gunakan format ATS-friendly</strong> — satu kolom, heading standar, tanpa tabel atau grafik.</li>
          <li><strong>Highlight keahlian teknis</strong> — bahasa pemrograman, tools, sertifikasi online.</li>
          <li><strong>Cantumkan organisasi & kegiatan</strong> — kepemimpinan, event management, kerelawanan.</li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-ink">
          Contoh Profil Fresh Graduate
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          &quot;Lulusan S1 Manajemen dengan pengalaman magang di bidang digital marketing. Aktif
          sebagai ketua BEM dengan portofolio kampanye media sosial yang mencapai 50.000+ impresi.
          Terampil menggunakan Google Analytics, Canva, dan Meta Ads Manager.&quot;
        </p>
        <p className="mt-4 text-ink-tertiary">
          Template ini bisa disesuaikan untuk berbagai jurusan — Teknik, Ekonomi, Sastra, Kedokteran,
          dan lainnya. Download, edit nama dan data Anda, lalu kirim ke perusahaan impian.
        </p>
      </section>
    </main>
  );
}
