import { FileText, ArrowRight } from "lucide-react";
import { suratTypes } from "@/data/surat";

export const metadata = {
  title: "Generator Surat Online Gratis — Toolinter",
  description: "Buat surat resign, izin sekolah, lamaran kerja, pernyataan, kuasa, dan 15+ template surat lainnya. Download langsung dalam format PDF.",
};

export default function SuratPage() {
  return (
    <main className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-4">
            Generator Surat Online
          </h1>
          <p className="text-lg text-ink-tertiary max-w-2xl mx-auto">
            Buat surat resmi dalam hitungan menit. Pilih jenis surat, isi data, dan download langsung dalam format PDF.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suratTypes.map((surat) => (
            <a
              key={surat.slug}
              href={`/surat/${surat.slug}`}
              className="group block p-6 bg-canvas border border-border rounded-xl hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-ink-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-lg font-semibold text-ink mb-2 group-hover:text-primary transition-colors">
                {surat.title}
              </h2>
              <p className="text-sm text-ink-tertiary">
                {surat.description}
              </p>
            </a>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-ink mb-6">
            Cara Membuat Surat Online di Toolinter
          </h2>
          <div className="prose prose-slate max-w-none">
            <ol className="space-y-4 text-ink-secondary">
              <li>
                <strong>Pilih jenis surat</strong> — Klik salah satu template surat yang Anda butuhkan dari daftar di atas.
              </li>
              <li>
                <strong>Isi data</strong> — Lengkapi form dengan data yang diperlukan. Field yang bertanda (*) wajib diisi.
              </li>
              <li>
                <strong>Preview</strong> — Klik tombol &quot;Preview Surat&quot; untuk melihat hasil surat Anda.
              </li>
              <li>
                <strong>Download PDF</strong> — Jika sudah sesuai, klik tombol &quot;Download PDF&quot; untuk mengunduh surat.
              </li>
            </ol>
            <p className="mt-6 text-ink-tertiary">
              Semua surat yang dibuat di Toolinter menggunakan format resmi dan profesional. Anda dapat menyesuaikan isi surat sesuai kebutuhan sebelum mendownload.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
