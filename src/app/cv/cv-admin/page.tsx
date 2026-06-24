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

  write("NAMA LENGKAP", 20, "bold", "center");
  write("Admin & Staff Administrasi", 12, "normal", "center");
  write("admin@email.com | 0812-3456-7890 | Jakarta, Indonesia", 10, "normal", "center");
  y += 4;
  doc.setDrawColor(180); doc.line(m, y, 210 - m, y); y += 6;

  write("RINGKASAN PROFESIONAL", 13, "bold"); y += 2;
  write("Staf administrasi berpengalaman 3+ tahun dengan keahlian dalam pengelolaan dokumen, koordinasi kantor, dan penggunaan Microsoft Office Suite. Terbiasa menangani data, membuat laporan, dan mendukung operasional harian kantor.");
  y += 4;

  write("PENGALAMAN KERJA", 13, "bold"); y += 2;
  write("Staff Administrasi — PT Sukses Bersama", 11, "bold");
  write("Januari 2022 – Sekarang");
  write("• Mengelola arip dokumen perusahaan (500+ dokumen/bulan)");
  write("• Menyiapkan laporan bulanan untuk manajemen");
  write("• Mengkoordinasikan jadwal meeting dan reservasi ruangan");
  write("• Menangani surat-masuk dan surat-keluar perusahaan");
  y += 4;

  write("Admin Data — CV Maju Jaya", 11, "bold");
  write("Maret 2020 – Desember 2021");
  write("• Input dan verifikasi data pelanggan di sistem ERP");
  write("• Membuat faktur dan nota penjualan");
  write("• Mendukung tim sales dalam penyusunan proposal");
  y += 4;

  write("PENDIDIKAN", 13, "bold"); y += 2;
  write("D3 Administrasi Bisnis — Politeknik Negeri Jakarta", 11, "bold");
  write("2017 – 2020 | IPK: 3.50 / 4.00");
  y += 4;

  write("KEAHLIAN", 13, "bold"); y += 2;
  write("Aplikasi: Microsoft Office (Word, Excel, PowerPoint), Google Workspace, SAP, Zoho");
  write("Bahasa: Indonesia (native), Inggris (intermediate)");
  write("Soft Skill: Teliti, Terorganisir, Komunikasi, Multitasking, Inisiatif");

  doc.save("CV-Admin-Toolinter.pdf");
}

/* ---- Preview ---- */
function CvPreview() {
  return (
    <div className="mx-auto max-w-[680px] rounded-lg border border-border bg-white p-6 text-left shadow-sm sm:p-8">
      <h2 className="text-center text-2xl font-bold text-gray-900">NAMA LENGKAP</h2>
      <p className="text-center text-sm text-gray-600">Admin & Staff Administrasi</p>
      <p className="mt-1 text-center text-xs text-gray-500">
        admin@email.com · 0812-3456-7890 · Jakarta, Indonesia
      </p>
      <hr className="my-4 border-gray-200" />

      <ST>Ringkasan Profesional</ST>
      <p className="text-sm leading-relaxed text-gray-700">
        Staf administrasi berpengalaman 3+ tahun dengan keahlian dalam pengelolaan dokumen,
        koordinasi kantor, dan penggunaan Microsoft Office Suite.
      </p>

      <ST>Pengalaman Kerja</ST>
      <Row heading="Staff Administrasi — PT Sukses Bersama" sub="Jan 2022 – Sekarang" />
      <ul className="mt-1 list-disc pl-5 text-xs text-gray-600">
        <li>Mengelola arsip dokumen perusahaan (500+ dokumen/bulan)</li>
        <li>Menyiapkan laporan bulanan untuk manajemen</li>
        <li>Mengkoordinasikan jadwal meeting dan reservasi ruangan</li>
      </ul>

      <Row heading="Admin Data — CV Maju Jaya" sub="Mar 2020 – Des 2021" />
      <ul className="mt-1 list-disc pl-5 text-xs text-gray-600">
        <li>Input dan verifikasi data pelanggan di sistem ERP</li>
        <li>Membuat faktur dan nota penjualan</li>
      </ul>

      <ST>Pendidikan</ST>
      <Row heading="D3 Administrasi Bisnis — Politeknik Negeri Jakarta" sub="2017 – 2020 | IPK: 3.50" />

      <ST>Keahlian</ST>
      <p className="text-xs text-gray-700">
        <strong>Aplikasi:</strong> Microsoft Office, Google Workspace, SAP, Zoho
      </p>
      <p className="mt-1 text-xs text-gray-700">
        <strong>Bahasa:</strong> Indonesia (native), Inggris (intermediate)
      </p>
    </div>
  );
}

function ST({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-5 mb-1 border-b border-gray-200 pb-1 text-sm font-bold text-gray-900 uppercase tracking-wide">{children}</h3>;
}

function Row({ heading, sub }: { heading: string; sub: string }) {
  return (
    <div className="mt-3 flex items-baseline justify-between gap-2">
      <span className="text-xs font-semibold text-gray-800">{heading}</span>
      {sub && <span className="shrink-0 text-[11px] text-gray-500">{sub}</span>}
    </div>
  );
}

/* ---- Page ---- */
export default function CvAdminPage() {
  const [downloading, setDownloading] = useState(false);

  return (
    <main className="min-h-screen bg-canvas">
      <section className="mx-auto max-w-3xl px-4 pt-8">
        <Link href="/cv" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft size={16} /> Kembali
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Template CV Admin
        </h1>
        <p className="mt-3 text-ink-tertiary">
          Template CV untuk posisi staff administrasi, admin kantor, admin data, dan resepsionis.
          Format ATS-friendly, siap edit dan download.
        </p>
        <button
          onClick={() => { setDownloading(true); downloadTemplate(); setTimeout(() => setDownloading(false), 1500); }}
          disabled={downloading}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          <Download size={18} />
          {downloading ? "Mendownload…" : "Download Template PDF"}
        </button>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <CvPreview />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-ink">
          Tips Membuat CV untuk Posisi Admin
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          Posisi <strong>staff administrasi</strong> atau <strong>admin kantor</strong> adalah salah satu lowongan paling
          banyak dicari di Indonesia. Recruiter mencari kandidat yang <strong>teliti, terorganisir, dan menguasai
          Microsoft Office</strong>. Berikut tips membuat CV admin yang menonjol:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li><strong>Sebutkan software yang dikuasai</strong> — Excel (pivot, VLOOKUP), Word, PowerPoint, Google Sheets, SAP, Zoho.</li>
          <li><strong>Kuantifikasi pencapaian</strong> — &quot;Mengelola 500+ dokumen/bulan&quot; lebih kuat daripada &quot;Mengelola dokumen&quot;.</li>
          <li><strong>Highlight soft skill</strong> — ketelitian, multitasking, komunikasi, dan kemampuan bekerja di bawah tekanan.</li>
          <li><strong>Cantumkan pengalaman relevan</strong> — input data, pembuatan laporan, koordinasi jadwal, penanganan surat.</li>
          <li><strong>Sertakan sertifikasi</strong> — Microsoft Office Specialist (MOS), pelatihan administrasi, atau kursus online.</li>
          <li><strong>Gunakan format ATS-friendly</strong> — hindari tabel, grafik, dan desain berlebihan.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold text-ink">
          Keyword Populer untuk CV Admin
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          Sertakan kata kunci berikut agar CV Anda terdeteksi ATS: administrasi kantor, pengelolaan dokumen,
          data entry, Microsoft Office, filing system, koordinasi, laporan bulanan, surat-masuk, surat-keluar,
          receptionist, staff administrasi, admin support.
        </p>
      </section>
    </main>
  );
}
