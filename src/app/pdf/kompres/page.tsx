import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";
import PdfCompressor from "@/components/pdf-compressor";

export const metadata: Metadata = {
  title: "Kompres PDF Online — Toolinter",
  description:
    "Kurangi ukuran file PDF secara online. Gratis, proses di browser, langsung download.",
};

export default function KompresPdfPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/pdf"
          className="inline-flex items-center gap-1 text-sm text-ink-tertiary hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali ke PDF Tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-ink">
              Kompres PDF
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Upload file PDF, kompres untuk mengurangi ukurannya, lalu download
            hasilnya. Proses berjalan langsung di browser tanpa upload ke server.
          </p>
        </div>

        {/* Compressor tool */}
        <PdfCompressor />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Kompres PDF
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              <strong>Kompres PDF</strong> adalah proses mengurangi ukuran file
              PDF tanpa mengubah konten dokumen secara signifikan. Ini berguna
              ketika file PDF terlalu besar untuk dikirim via email, diupload ke
              website, atau disimpan dengan kapasitas terbatas.
            </p>
            <p>
              <strong>Cara menggunakan:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Upload satu file PDF yang ingin dikompres</li>
              <li>Klik &quot;Kompres PDF&quot; untuk memproses</li>
              <li>Lihat perbandingan ukuran sebelum dan sesudah</li>
              <li>Download file PDF yang sudah dikompres</li>
            </ul>
            <p>
              Toolinter mengompres PDF dengan mengoptimalkan struktur internal
              file, termasuk menghapus metadata yang tidak diperlukan dan
              menggunakan object streams. Hasil kompresi bervariasi tergantung
              konten PDF — file dengan banyak gambar biasanya lebih signifikan
              pengurangannya.
            </p>
            <p>
              Semua proses berjalan langsung di browser Anda menggunakan pdf-lib.
              File PDF tidak dikirim ke server manapun sehingga keamanan data
              Anda terjamin.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
