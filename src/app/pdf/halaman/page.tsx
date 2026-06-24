import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";
import PdfHalaman from "@/components/pdf-halaman";

export const metadata: Metadata = {
  title: "Ambil Halaman PDF — Toolinter",
  description:
    "Ekstrak halaman tertentu dari file PDF. Pilih halaman dengan rentang, lalu download. Gratis dan aman di browser.",
};

export default function HalamanPdfPage() {
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
              Ambil Halaman PDF
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Upload file PDF, pilih halaman yang ingin diekstrak, lalu download
            hasilnya. Proses berjalan langsung di browser tanpa upload ke server.
          </p>
        </div>

        {/* Halaman extractor tool */}
        <PdfHalaman />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Ekstrak Halaman PDF
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              <strong>Ambil Halaman PDF</strong> adalah tool untuk mengekstrak
              halaman-halaman tertentu dari file PDF. Anda bisa memilih halaman
              dengan rentang (misalnya 1-3), halaman individu (misalnya 5), atau
              kombinasi keduanya (misalnya 1-3,5,7-9).
            </p>
            <p>
              <strong>Cocok digunakan untuk:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Mengambil beberapa halaman dari dokumen yang panjang</li>
              <li>Memisahkan bagian tertentu dari laporan</li>
              <li>Membuat salinan parsial untuk dikirim via email</li>
              <li>Mengambil halaman tertentu dari buku atau e-book PDF</li>
            </ul>
            <p>
              <strong>Cara menggunakan:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Upload file PDF yang ingin diproses</li>
              <li>Masukkan nomor halaman (contoh: 1-3,5,7-9)</li>
              <li>Klik &quot;Ekstrak &amp; Download PDF&quot; untuk memproses</li>
              <li>File PDF baru dengan halaman terpilih otomatis terdownload</li>
            </ul>
            <p>
              Toolinter menggunakan pdf-lib untuk memproses PDF langsung di
              browser Anda. Seluruh file tetap berada di perangkat Anda dan tidak
              pernah dikirim ke server manapun, sehingga privasi data terjaga
              sepenuhnya.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
