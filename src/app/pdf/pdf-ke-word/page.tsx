import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "PDF ke Word Online — Toolinter",
  description:
    "Ubah file PDF menjadi dokumen Word yang bisa diedit. Tool konversi PDF ke Word online gratis dari Toolinter.",
};

const alternativeTools = [
  {
    slug: "gabung",
    title: "Gabung PDF",
    description:
      "Gabungkan beberapa file PDF menjadi satu. Upload, atur urutan, dan download hasilnya.",
  },
  {
    slug: "kompres",
    title: "Kompres PDF",
    description:
      "Kurangi ukuran file PDF tanpa mengurangi kualitas secara signifikan.",
  },
  {
    slug: "foto-ke-pdf",
    title: "Foto ke PDF",
    description:
      "Ubah foto JPG, PNG, WEBP menjadi dokumen PDF. Setiap foto jadi satu halaman.",
  },
];

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
        </div>

        {/* Coming soon notice */}
        <div className="bg-canvas rounded-xl border border-border p-8 text-center max-w-2xl">
          <FileText className="w-12 h-12 text-ink-muted mx-auto mb-4 opacity-40" />
          <h2 className="text-lg font-semibold text-ink mb-2">
            Segera hadir
          </h2>
          <p className="text-ink-tertiary mb-6">
            Fitur ini sedang dalam pengembangan. Sementara ini, gunakan tool lain
            dari Toolinter.
          </p>

          {/* Alternative tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {alternativeTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/pdf/${tool.slug}`}
                className="bg-surface rounded-xl border border-border p-4 text-left hover:border-primary/50 transition-colors"
              >
                <FileText className="w-5 h-5 text-primary mb-2" />
                <h3 className="font-medium text-ink text-sm mb-1">{tool.title}</h3>
                <p className="text-xs text-ink-tertiary">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

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
              Toolinter sedang mengembangkan fitur konversi PDF ke Word yang
              berjalan langsung di browser. Fitur ini akan mendukung konversi teks,
              tabel, dan gambar dari PDF ke format Word dengan hasil yang rapi dan
              akurat.
            </p>
            <p>
              Sambil menunggu fitur ini, Anda bisa menggunakan tool PDF lainnya
              dari Toolinter seperti Gabung PDF, Kompres PDF, atau Foto ke PDF.
              Semua tool berjalan langsung di browser tanpa upload ke server.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
