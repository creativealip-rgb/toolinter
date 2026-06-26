"use client";

import { useState } from "react";
import { Download, ArrowLeft } from "lucide-react";
import AiInsightBox from "@/components/ai-insight-box";
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

  write("CURRICULUM VITAE", 18, "bold", "center");
  y += 2;
  write("NAMA LENGKAP, S.Kom.", 16, "bold", "center");
  y += 4;
  doc.setDrawColor(180); doc.line(m, y, 210 - m, y); y += 6;

  // Data Pribadi
  write("DATA PRIBADI", 13, "bold"); y += 2;
  write("Nama Lengkap\t\t: Nama Lengkap");
  write("Tempat/Tanggal Lahir\t: Jakarta, 15 Agustus 1999");
  write("Jenis Kelamin\t\t: Laki-laki");
  write("Agama\t\t\t: Islam");
  write("Status\t\t\t: Belum Kawin");
  write("Kewarganegaraan\t\t: Indonesia");
  write("Alamat\t\t\t: Jl. Contoh No. 123, Jakarta Selatan");
  write("Telepon\t\t\t: 0812-3456-7890");
  write("Email\t\t\t: nama@email.com");
  y += 4;

  // Riwayat Pendidikan
  write("RIWAYAT PENDIDIKAN", 13, "bold"); y += 2;
  write("S1 Teknik Informatika — Universitas Indonesia", 11, "bold");
  write("2017 – 2021 | IPK: 3.75 / 4.00 | Akreditasi A");
  y += 2;
  write("SMA Negeri 1 Jakarta", 11, "bold");
  write("2014 – 2017 | IPA");
  y += 4;

  write("PENGALAMAN KERJA", 13, "bold"); y += 2;
  write("Staff IT — PT Pertamina (Persero)", 11, "bold");
  write("Maret 2022 – Sekarang");
  write("• Mengelola sistem informasi internal divisi operasional");
  write("• Melakukan maintenance dan troubleshooting infrastruktur IT");
  write("• Menyusun laporan teknis bulanan untuk manajemen");
  y += 4;

  write("Magang — Bank Mandiri", 11, "bold");
  write("Juli 2020 – Desember 2020");
  write("• Membantu pengembangan aplikasi internal bank");
  write("• Melakukan pengujian (testing) modul digital banking");
  y += 4;

  write("PENGALAMAN ORGANISASI", 13, "bold"); y += 2;
  write("Ketua BEM — Fakultas Ilmu Komputer UI", 11, "bold");
  write("2019 – 2020");
  write("• Memimpin 30+ anggota dalam pelaksanaan program kerja");
  write("• Mengadakan seminar nasional dengan 500 peserta");
  y += 4;

  write("KEAHLIAN", 13, "bold"); y += 2;
  write("Teknis: Java, Python, SQL, Jaringan Komputer, Linux, Mikrotik");
  write("Sertifikasi: CCNA, ITIL Foundation, Oracle Database Associate");
  write("Bahasa: Indonesia (native), Inggris (TOEFL 550)");
  y += 4;

  write("DATA LAINNYA", 13, "bold"); y += 2;
  write("Hobi\t\t\t: Membaca, Futsal, Programming");
  write("Referensi\t\t: Tersedia jika diperlukan");

  y += 8;
  write("Jakarta, ………………", 11, "normal", "left");
  write("……………………………………", 11, "normal", "left");
  write("(Nama Lengkap)", 11, "normal", "left");

  doc.save("CV-BUMN-Toolinter.pdf");
}

/* ---- Preview ---- */
function CvPreview() {
  return (
    <div className="mx-auto max-w-[680px] rounded-lg border border-border bg-white p-6 text-left shadow-sm sm:p-8">
      <h2 className="text-center text-2xl font-bold text-gray-900">CURRICULUM VITAE</h2>
      <h3 className="text-center text-lg font-bold text-gray-800">NAMA LENGKAP, S.Kom.</h3>
      <hr className="my-4 border-gray-200" />

      <ST>Data Pribadi</ST>
      <table className="w-full text-xs text-gray-700">
        <tbody>
          <Row2 label="Nama Lengkap" value="Nama Lengkap" />
          <Row2 label="Tempat/Tgl Lahir" value="Jakarta, 15 Agustus 1999" />
          <Row2 label="Jenis Kelamin" value="Laki-laki" />
          <Row2 label="Agama" value="Islam" />
          <Row2 label="Status" value="Belum Kawin" />
          <Row2 label="Kewarganegaraan" value="Indonesia" />
          <Row2 label="Alamat" value="Jl. Contoh No. 123, Jakarta Selatan" />
          <Row2 label="Telepon" value="0812-3456-7890" />
          <Row2 label="Email" value="nama@email.com" />
        </tbody>
      </table>

      <ST>Riwayat Pendidikan</ST>
      <Row heading="S1 Teknik Informatika — Universitas Indonesia" sub="2017 – 2021 | IPK: 3.75" />
      <Row heading="SMA Negeri 1 Jakarta" sub="2014 – 2017" />

      <ST>Pengalaman Kerja</ST>
      <Row heading="Staff IT — PT Pertamina (Persero)" sub="Mar 2022 – Sekarang" />
      <ul className="mt-1 list-disc pl-5 text-xs text-gray-600">
        <li>Mengelola sistem informasi internal divisi operasional</li>
        <li>Maintenance dan troubleshooting infrastruktur IT</li>
      </ul>
      <div className="mt-3" />
      <Row heading="Magang — Bank Mandiri" sub="Jul 2020 – Des 2020" />
      <ul className="mt-1 list-disc pl-5 text-xs text-gray-600">
        <li>Pengembangan aplikasi internal bank</li>
        <li>Testing modul digital banking</li>
      </ul>

      <ST>Keahlian & Sertifikasi</ST>
      <p className="text-xs text-gray-700"><strong>Teknis:</strong> Java, Python, SQL, Jaringan Komputer, Linux, Mikrotik</p>
      <p className="mt-1 text-xs text-gray-700"><strong>Sertifikasi:</strong> CCNA, ITIL Foundation, Oracle Database Associate</p>
      <p className="mt-1 text-xs text-gray-700"><strong>Bahasa:</strong> Indonesia (native), Inggris (TOEFL 550)</p>
    </div>
  );
}

function ST({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-5 mb-2 border-b border-gray-200 pb-1 text-sm font-bold text-gray-900 uppercase tracking-wide">{children}</h3>;
}

function Row({ heading, sub }: { heading: string; sub: string }) {
  return (
    <div className="mt-2 flex items-baseline justify-between gap-2">
      <span className="text-xs font-semibold text-gray-800">{heading}</span>
      {sub && <span className="shrink-0 text-[11px] text-gray-500">{sub}</span>}
    </div>
  );
}

function Row2({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="py-0.5 pr-4 font-semibold whitespace-nowrap" style={{ width: 140 }}>{label}</td>
      <td className="py-0.5">: {value}</td>
    </tr>
  );
}

/* ---- Page ---- */
export default function CvBumnPage() {
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
          Template CV BUMN
        </h1>
        <p className="mt-3 text-ink-tertiary">
          Template CV khusus untuk melamar di BUMN (Badan Usaha Milik Negara) seperti
          Pertamina, PLN, Telkom, Bank Mandiri, BNI, dan lainnya.
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
          Panduan Membuat CV untuk Melamar BUMN
        </h2>
        <p className="mt-3 leading-relaxed text-ink-tertiary">
          Melamar di <strong>BUMN</strong> membutuhkan format CV yang lebih lengkap dan formal dibanding
          perusahaan swasta. BUMN seperti <strong>Pertamina, PLN, Telkom Indonesia, Bank Mandiri,
          BNI, BTN, Bio Farma</strong> umumnya meminta data pribadi secara detail termasuk
          riwayat pendidikan dari SMA/SMK.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-ink">Komponen Wajib CV BUMN</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li><strong>Data Pribadi Lengkap</strong> — nama, tempat/tanggal lahir, jenis kelamin, agama, status, alamat, telepon, email.</li>
          <li><strong>Riwayat Pendidikan</strong> — dari SMA/SMK sampai perguruan tinggi. Cantumkan jurusan, IPK, dan akreditasi kampus/prodi.</li>
          <li><strong>Pengalaman Kerja / Magang</strong> — urutkan dari terbaru. Sertakan nama perusahaan, posisi, dan deskripsi tugas.</li>
          <li><strong>Organisasi & Kepemimpinan</strong> — BUMN sangat menghargai jiwa kepemimpinan dan kontribusi sosial.</li>
          <li><strong>Keahlian & Sertifikasi</strong> — bahasa asing, software, sertifikasi profesi (BNSP, CCNA, PMP, dll).</li>
          <li><strong>Data Tambahan</strong> — hobi, referensi, dan tanda tangan di bagian akhir.</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-ink">Tips Lolos Seleksi BUMN</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-tertiary">
          <li>Gunakan <strong>bahasa Indonesia formal</strong> — hindari bahasa gaul atau singkatan.</li>
          <li>Format CV <strong>satu kolom, bersih, dan rapi</strong> — recruiter BUMN menghargai keseriusan.</li>
          <li>Cantumkan <strong>IPK minimal 3.00</strong> — banyak BUMN mensyaratkan ini.</li>
          <li>Siapkan <strong>foto formal</strong> berlatar merah atau biru untuk CV BUMN.</li>
          <li>Daftar di portal resmi rekrutmen BUMN: <strong>rekrutmenbersama.fhcibumn.id</strong>.</li>
        </ul>
      </section>

        <div className="mt-8">
          <AiInsightBox
            title="AI CV BUMN Analyst"
            description="Minta AI review {'CV BUMN'} Anda dan beri saran perbaikan."
            placeholder="Contoh: review CV saya untuk posisi CPNS BUMN..."
            buttonLabel="Analisis dengan AI"
            context="User sedang buat CV BUMN. Beri saran perbaikan: kekuatan, kelemahan, keyword ATS, dan tips lolos screening."
            system="Anda adalah HRD profesional. Analisis dokumen user dan beri feedback konkret, actionable, dalam bahasa Indonesia."
          />
        </div>
    </main>
  );
}
