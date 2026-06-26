import Link from 'next/link';
import { ChevronLeft, FileText } from 'lucide-react';
import WordKePdf from '@/components/word-ke-pdf';
import { generateToolMetadata } from "@/lib/seo";

export const metadata = generateToolMetadata({
  title: "Word ke PDF",
  description: "Konversi dokumen Word (DOCX) ke PDF online.",
  path: "/pdf/word-ke-pdf",
});





export default function WordKePdfPage() {
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
              Word ke PDF
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Ubah dokumen Word (.docx) menjadi file PDF. Proses berjalan
            langsung di browser tanpa upload ke server.
          </p>
        </div>

        {/* Component */}
        <WordKePdf />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Konversi Word ke PDF
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              <strong>Word ke PDF</strong> adalah proses mengubah dokumen Word
              (.docx) menjadi file PDF. Konversi ini berguna untuk menjaga
              formatting dokumen agar tetap rapi saat dibuka di perangkat berbeda,
              atau saat dokumen perlu dikirim dalam format yang tidak bisa diedit.
            </p>
            <p>
              Toolinter menggunakan library Mammoth.js untuk mengekstrak teks dari
              dokumen Word, kemudian merender-nya ke PDF menggunakan jsPDF. Seluruh
              proses berjalan langsung di browser tanpa upload ke server.
            </p>
            <p>
              <strong>Cara menggunakan:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Upload file Word (.docx) yang ingin dikonversi</li>
              <li>Klik tombol &quot;Konversi ke PDF&quot;</li>
              <li>File PDF akan otomatis terdownload</li>
            </ul>
            <p>
              Tool ini mengekstrak teks dari dokumen Word dan merender-nya
              dengan formatting yang rapi ke dalam file PDF A4.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
