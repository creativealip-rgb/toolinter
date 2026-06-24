import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";
import PdfMerger from "@/components/pdf-merger";

export const metadata: Metadata = {
  title: "Gabung PDF Online — Toolinter",
  description:
    "Gabungkan beberapa file PDF menjadi satu. Gratis, proses di browser, langsung download.",
};

export default function GabungPdfPage() {
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
              Gabung PDF
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Upload beberapa file PDF, atur urutannya, lalu gabungkan menjadi satu
            file PDF. Proses berjalan langsung di browser — file tidak diupload ke
            server.
          </p>
        </div>

        {/* Merger tool */}
        <PdfMerger />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Gabung PDF
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              <strong>Gabung PDF</strong> atau merge PDF adalah proses
              menggabungkan beberapa file PDF menjadi satu dokumen. Ini sangat
              berguna ketika Anda memiliki beberapa dokumen terpisah yang perlu
              disatukan, misalnya laporan dari beberapa bagian, beberapa surat
              yang perlu dikirim sekaligus, atau dokumen pendukung untuk
              pendaftaran.
            </p>
            <p>
              <strong>Cara menggunakan:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Upload file PDF yang ingin digabungkan (bisa beberapa sekaligus)</li>
              <li>Atur urutan file dengan tombol panah atas/bawah</li>
              <li>Klik &quot;Gabung &amp; Download PDF&quot; untuk memproses</li>
              <li>File hasil gabungan otomatis terdownload</li>
            </ul>
            <p>
              Toolinter menggunakan library pdf-lib untuk memproses PDF langsung
              di browser Anda. Seluruh file tetap berada di perangkat Anda dan
              tidak pernah dikirim ke server manapun, sehingga privasi data
              terjaga sepenuhnya.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
