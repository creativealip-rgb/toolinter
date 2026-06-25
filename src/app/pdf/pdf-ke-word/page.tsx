import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, FileText } from 'lucide-react';
import PdfKeWord from '@/components/pdf-ke-word';

export const metadata: Metadata = {
  title: 'PDF ke Word Online — Toolinter',
  description:
    'Ubah file PDF menjadi dokumen Word (.docx) yang bisa diedit. Konversi PDF ke Word online, 100% di browser, gratis.',
};

export default function PdfKeWordPage() {
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
              PDF ke Word
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Ubah file PDF menjadi dokumen Word (.docx) yang bisa diedit.
            Proses berjalan langsung di browser tanpa upload ke server.
          </p>
        </div>

        {/* Component */}
        <PdfKeWord />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Konversi PDF ke Word
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              <strong>PDF ke Word</strong> adalah proses mengubah file PDF menjadi
              dokumen Word (.docx) yang bisa diedit. Konversi ini berguna ketika
              Anda perlu mengedit isi dokumen PDF, mengubah teks, atau menyalin
              konten ke dokumen baru.
            </p>
            <p>
              Toolinter menggunakan teknologi pdf.js untuk mengekstrak teks dari
              setiap halaman PDF, kemudian mengemasnya ke dalam format Word (.docx)
              menggunakan library docx. Seluruh proses berjalan langsung di browser
              — file tidak pernah dikirim ke server manapun.
            </p>
            <p>
              <strong>Cara menggunakan:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Upload file PDF yang ingin dikonversi</li>
              <li>Klik tombol &quot;Konversi ke Word&quot;</li>
              <li>File .docx akan otomatis terdownload</li>
            </ul>
            <p>
              Tool ini cocok untuk dokumen PDF berbasis teks. PDF berupa
              gambar atau scan belum didukung.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
