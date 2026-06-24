import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";
import FotoKePdf from "@/components/foto-ke-pdf";

export const metadata: Metadata = {
  title: "Foto ke PDF Online — Toolinter",
  description:
    "Ubah foto JPG, PNG, WEBP menjadi PDF. Gratis, proses di browser, langsung download. Cocok untuk cetak dan pengiriman dokumen.",
};

export default function FotoKePdfPage() {
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
              Foto ke PDF
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Upload beberapa foto, atur urutannya, lalu konversi menjadi satu file
            PDF. Setiap foto menjadi satu halaman. Proses berjalan langsung di
            browser tanpa upload ke server.
          </p>
        </div>

        {/* Foto ke PDF tool */}
        <FotoKePdf />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Konversi Foto ke PDF
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              <strong>Foto ke PDF</strong> adalah tool untuk mengubah foto atau
              gambar (JPG, PNG, WEBP) menjadi dokumen PDF. Setiap gambar akan
              menjadi satu halaman PDF dengan ukuran A4 dan auto-fit agar gambar
              tidak terpotong.
            </p>
            <p>
              <strong>Cocok digunakan untuk:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Mencetak foto dalam bentuk dokumen PDF</li>
              <li>Mengirim beberapa foto sebagai satu dokumen</li>
              <li>Membuat portofolio foto digital</li>
              <li>Mengumpulkan dokumen berupa foto scan untuk keperluan administrasi</li>
            </ul>
            <p>
              <strong>Cara menggunakan:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Upload foto (JPG, PNG, atau WEBP) — bisa beberapa sekaligus</li>
              <li>Atur urutan foto dengan tombol panah atas/bawah</li>
              <li>Klik &quot;Download PDF&quot; untuk mengonversi dan mengunduh</li>
            </ul>
            <p>
              Toolinter menggunakan jsPDF untuk membuat PDF langsung di browser
              Anda. Semua proses berjalan di perangkat Anda — file tidak pernah
              dikirim ke server manapun sehingga privasi data terjaga sepenuhnya.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
