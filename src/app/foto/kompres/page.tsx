import Link from "next/link";
import { ChevronLeft, Shrink } from "lucide-react";
import FotoKompressor from "@/components/foto-kompressor";
import { generateToolMetadata } from "@/lib/seo";

export const metadata = generateToolMetadata({
  title: "Kompres Foto Online",
  description: "Kecilkan ukuran foto tanpa blur. Langsung di browser.",
  path: "/foto/kompres",
});





export default function KompresPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/foto"
          className="inline-flex items-center gap-1 text-sm text-ink-tertiary hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali ke Foto Dokumen
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shrink className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-ink">
              Kompres Foto Online
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Kompres foto agar memenuhi batas ukuran upload. Pilih target 200 KB, 500 KB, atau custom. Proses di browser, tidak perlu upload ke server.
          </p>
        </div>

        {/* Kompressor tool */}
        <FotoKompressor />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Kompres Foto
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              Banyak situs pendaftaran online di Indonesia memberlakukan{" "}
              <strong>batas ukuran file foto</strong> yang ketat, biasanya
              antara 100 KB hingga 500 KB. Jika foto Anda terlalu besar,
              proses upload akan gagal.
            </p>
            <p>
              <strong>Situs yang sering memerlukan foto terkompres:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Pendaftaran CPNS dan PPPK (sscn.bkn.go.id)</li>
              <li>Seleksi Nasional Berdasarkan Prestasi (SNBP)</li>
              <li>Seleksi Nasional Berdasarkan Tes (SNBT)</li>
              <li>Pendaftaran universitas (UMPTN, mandiri)</li>
              <li>Portal kerja seperti JobStreet, LinkedIn</li>
              <li>Berbagai sistem pendaftaran online lainnya</li>
            </ul>
            <p>
              Toolinter menggunakan Canvas API untuk mengompres foto ke ukuran
              target yang Anda tentukan. Kualitas JPEG dioptimasi secara
              otomatis agar ukuran file sesuai tanpa mengorbankan tampilan foto
              secara berlebihan. Seluruh proses berjalan di browser — foto Anda
              tidak dikirim ke server manapun.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
