import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Word ke PDF Online — Toolinter",
  description:
    "Ubah dokumen Word (.docx) menjadi PDF. Konversi Word ke PDF online gratis dari Toolinter.",
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
              Toolinter sedang mengembangkan fitur konversi Word ke PDF yang
              berjalan langsung di browser. Fitur ini akan mempertahankan teks,
              gambar, tabel, dan formatting dokumen Word Anda.
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
