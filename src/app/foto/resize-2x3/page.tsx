import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Camera } from "lucide-react";
import FotoResizer from "@/components/foto-resizer";

export const metadata: Metadata = {
  title: "Resize Foto 2×3 Online — Toolinter",
  description:
    "Ubah ukuran foto ke 2×3 cm untuk dokumen sekolah, PPDB, dan keperluan administrasi. Gratis, langsung download.",
};

export default function Resize2x3Page() {
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
            <Camera className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-ink">
              Resize Foto 2×3 cm
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Upload foto, otomatis di-crop dan di-resize ke ukuran 2×3 cm (236×354 px pada 300 DPI). Langsung download sebagai JPG.
          </p>
        </div>

        {/* Resizer tool */}
        <FotoResizer
          targetWidth={236}
          targetHeight={354}
          title="Resize Foto 2×3"
          description="Ukuran foto 2×3 cm untuk dokumen sekolah dan administrasi"
        />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Foto 2×3 cm
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              Foto berukuran <strong>2×3 cm</strong> adalah format foto kecil
              yang umum digunakan untuk dokumen sekolah dan administrasi
              ringan. Pada resolusi cetak standar 300 DPI, ukuran ini setara
              dengan 236×354 piksel.
            </p>
            <p>
              <strong>Dokumen yang memerlukan foto 2×3:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Pendaftaran PPDB (Penerimaan Peserta Didik Baru)</li>
              <li>Kartu pelajar dan mahasiswa</li>
              <li>Formulir pendaftaran sekolah</li>
              <li>Kartu perpustakaan</li>
              <li>Dokumen administrasi kampus</li>
              <li>Lamaran kerja ringan</li>
            </ul>
            <p>
              Toolinter meng-crop bagian tengah foto secara otomatis dan
              mengubahnya ke ukuran 236×354 piksel. Hasilnya siap cetak dalam
              format JPG berkualitas tinggi. Seluruh proses berjalan di browser
              — foto Anda tidak dikirim ke server manapun.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
