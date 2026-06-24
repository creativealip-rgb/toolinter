"use client";

import { useState } from "react";
import { Download, ArrowLeft, ExternalLink } from "lucide-react";
import { jsPDF } from "jspdf";
import Link from "next/link";

/* ---- PDF download ---- */
function downloadTemplate() {
  const doc = new jsPDF();
  const m = 20;
  let y = 25;
  const w = 210 - 2 * m;

  const write = (text: string, size = 12, style: "normal" | "bold" | "italic" = "normal") => {
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    const lines = doc.splitTextToSize(text, w);
    lines.forEach((l: string) => {
      if (y > 280) { doc.addPage(); y = 25; }
      doc.text(l, m, y);
      y += size * 0.5;
    });
  };

  write("SURAT LAMARAN KERJA", 16, "bold");
  y += 4;

  write("Jakarta, 15 Januari 2025");
  y += 2;
  write("Kepada Yth.");
  write("HRD Manager / Pimpinan Perusahaan");
  write("PT Maju Bersama");
  write("Jl. Sudirman No. 45, Jakarta Pusat");
  y += 4;
  write("Dengan hormat,");
  y += 2;
  write("Saya yang bertanda tangan di bawah ini:");
  y += 2;
  write("Nama\t\t: Nama Lengkap");
  write("Tempat/Tgl Lahir\t: Jakarta, 15 Agustus 1999");
  write("Pendidikan\t\t: S1 Teknik Informatika");
  write("Alamat\t\t: Jl. Contoh No. 123, Jakarta Selatan");
  write("Telepon\t\t: 0812-3456-7890");
  write("Email\t\t: nama@email.com");
  y += 2;
  write("Dengan ini saya bermaksud mengajukan lamaran kerja di perusahaan yang Bapak/Ibu pimpin untuk mengisi posisi Staff IT / Junior Programmer.");
  y += 2;
  write("Sebagai bahan pertimbangan, saya lampirkan:");
  write("1. Daftar Riwayat Hidup (CV)");
  write("2. Fotokopi ijazah terakhir");
  write("3. Fotokopi transkrip nilai");
  write("4. Fotokopi KTP");
  write("5. Pas foto 4x6 (2 lembar)");
  write("6. Sertifikat pelatihan / kompetensi");
  y += 2;
  write("Saya bersedia mengikuti seluruh tahapan seleksi yang berlaku di perusahaan Bapak/Ibu pimpin. Besar harapan saya untuk dapat diterima dan berkontribusi di perusahaan ini.");
  y += 2;
  write("Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.");
  y += 6;
  write("Hormat saya,");
  y += 10;
  write("Nama Lengkap");

  doc.save("Contoh-Surat-Lamaran-Kerja-Toolinter.pdf");
}

/* ---- Preview ---- */
function SuratPreview() {
  return (
    <div className="mx-auto max-w-[680px] rounded-lg border border-border bg-white p-6 text-left font-serif shadow-sm sm:p-8">
      <h2 className="text-center text-lg font-bold uppercase text-gray-900">Surat Lamaran Kerja</h2>
      <hr className="my-3 border-gray-300" />

      <p className="text-sm text-gray-700">Jakarta, 15 Januari 2025</p>
      <div className="mt-2 text-sm text-gray-700">
        <p>Kepada Yth.</p>
        <p>HRD Manager / Pimpinan Perusahaan</p>
        <p>PT Maju Bersama</p>
        <p>Jl. Sudirman No. 45, Jakarta Pusat</p>
      </div>

      <p className="mt-4 text-sm text-gray-700">Dengan hormat,</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        Saya yang bertanda tangan di bawah ini:
      </p>

      <table className="mt-2 text-sm text-gray-700">
        <tbody>
          <tr><td className="pr-4 py-0.5 font-medium">Nama</td><td>: Nama Lengkap</td></tr>
          <tr><td className="pr-4 py-0.5 font-medium">Tempat/Tgl Lahir</td><td>: Jakarta, 15 Agustus 1999</td></tr>
          <tr><td className="pr-4 py-0.5 font-medium">Pendidikan</td><td>: S1 Teknik Informatika</td></tr>
          <tr><td className="pr-4 py-0.5 font-medium">Alamat</td><td>: Jl. Contoh No. 123, Jakarta Selatan</td></tr>
          <tr><td className="pr-4 py-0.5 font-medium">Telepon</td><td>: 0812-3456-7890</td></tr>
          <tr><td className="pr-4 py-0.5 font-medium">Email</td><td>: nama@email.com</td></tr>
        </tbody>
      </table>

      <p className="mt-4 text-sm leading-relaxed text-gray-700">
        Dengan ini saya bermaksud mengajukan lamaran kerja di perusahaan yang Bapak/Ibu pimpin
        untuk mengisi posisi <strong>Staff IT / Junior Programmer</strong>.
      </p>

      <p className="mt-3 text-sm text-gray-700">Sebagai bahan pertimbangan, saya lampirkan:</p>
      <ol className="mt-1 list-decimal pl-5 text-sm text-gray-700">
        <li>Daftar Riwayat Hidup (CV)</li>
        <li>Fotokopi ijazah terakhir</li>
        <li>Fotokopi transkrip nilai</li>
        <li>Fotokopi KTP</li>
        <li>Pas foto 4×6 (2 lembar)</li>
        <li>Sertifikat pelatihan / kompetensi</li>
      </ol>

      <p className="mt-4 text-sm leading-relaxed text-gray-700">
        Saya bersedia mengikuti seluruh tahapan seleksi yang berlaku. Besar harapan saya untuk
        dapat diterima dan berkontribusi di perusahaan ini.
      </p>
      <p className="mt-2 text-sm text-gray-700">
        Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.
      </p>

      <div className="mt-8 text-sm text-gray-700">
        <p>Hormat saya,</p>
        <div className="mt-10 border-t border-gray-400 w-40">
          <p className="mt-1 font-medium">Nama Lengkap</p>
        </div>
      </div>
    </div>
  );
}

/* ---- Page ---- */
export default function ContohSuratLamaranPage() {
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
          Contoh Surat Lamaran Kerja
        </h1>
        <p className="mt-3 text-ink-tertiary">
          Contoh surat lamaran kerja yang benar dan profesional. Download template, edit data Anda,
          dan kirim bersama CV.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => { setDownloading(true); downloadTemplate(); setTimeout(() => setDownloading(false), 1500); }}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            <Download size={18} />
            {downloading ? "Mendownload…" : "Download Template PDF"}
          </button>
          <Link
            href="/surat/lamaran-kerja"
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            <ExternalLink size={16} />
            Buka Generator Surat Lamaran
          </Link>
        </div>
      </section>

      {/* Preview */}
      <section className="mx-auto max-w-3xl px-4 pb-8">
        <SuratPreview />
      </section>

      {/* SEO tips */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-ink">
          Cara Membuat Surat Lamaran Kerja yang Benar
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          <strong>Surat lamaran kerja</strong> (cover letter / application letter) adalah dokumen
          yang menyertai CV saat melamar pekerjaan. Surat ini menjadi kesan pertama bagi recruiter
          — pastikan formatnya benar dan isinya meyakinkan.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-ink">Struktur Surat Lamaran Kerja</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-tertiary">
          <li><strong>Tempat dan tanggal</strong> — tulis di pojok kanan atas atau kiri atas.</li>
          <li><strong>Alamat tujuan</strong> — Kepada Yth. HRD Manager / Pimpinan perusahaan.</li>
          <li><strong>Salam pembuka</strong> — &quot;Dengan hormat&quot; adalah standar yang paling aman.</li>
          <li><strong>Identitas diri</strong> — nama, tempat/tanggal lahir, pendidikan, alamat, telepon, email.</li>
          <li><strong>Posisi yang dilamar</strong> — sebutkan nama posisi secara spesifik.</li>
          <li><strong>Lampiran</strong> — sebutkan dokumen yang dilampirkan (CV, ijazah, foto, dll).</li>
          <li><strong>Penutup</strong> — harapan diterima dan ucapan terima kasih.</li>
          <li><strong>Tanda tangan</strong> — hormat saya, tanda tangan, nama terang.</li>
        </ol>

        <h3 className="mt-6 text-lg font-semibold text-ink">Kesalahan yang Harus Dihindari</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li>Menulis nama perusahaan yang salah — double check sebelum mengirim!</li>
          <li>Menggunakan bahasa terlalu informal atau bahasa gaul.</li>
          <li>Menulis terlalu panjang — idealnya 1 halaman penuh, maksimal 2 halaman.</li>
          <li>Menyebut gaji yang diinginkan di surat lamaran (kecuali diminta).</li>
          <li>Copy-paste template tanpa menyesuaikan nama perusahaan dan posisi.</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-ink">Surat Lamaran Kerja vs Cover Letter</h3>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          Di Indonesia, <strong>surat lamaran kerja</strong> dan <strong>cover letter</strong> sering dianggap sama,
          namun sebenarnya berbeda. Surat lamaran kerja lebih formal dan memuat data diri lengkap,
          sedangkan cover letter lebih singkat dan fokus menjelaskan motivasi serta kesesuaian
          Anda dengan posisi yang dilamar. Untuk melamar di perusahaan Indonesia (terutama BUMN
          dan perusahaan konvensional), gunakan format surat lamaran kerja formal.
        </p>

        <p className="mt-4 text-ink-tertiary">
          Butuh surat lamaran yang otomatis? Gunakan{" "}
          <Link href="/surat/lamaran-kerja" className="text-primary underline">
            Generator Surat Lamaran Kerja
          </Link>{" "}
          dari Toolinter — isi data, generate, download. Gratis!
        </p>
      </section>
    </main>
  );
}
