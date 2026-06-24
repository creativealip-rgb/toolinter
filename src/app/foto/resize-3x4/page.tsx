import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Camera } from "lucide-react";
import FotoResizer from "@/components/foto-resizer";

export const metadata: Metadata = {
  title: "Resize Foto 3×4 Online — Toolinter",
  description:
    "Ubah ukuran foto ke 3×4 cm untuk CPNS, SNBP, SKCK, dan dokumen resmi lainnya. Gratis, langsung download.",
};

export default function Resize3x4Page() {
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
              Resize Foto 3×4 cm
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Upload foto, otomatis di-crop dan di-resize ke ukuran 3×4 cm (354×472 px pada 300 DPI). Langsung download sebagai JPG.
          </p>
        </div>

        {/* Resizer tool */}
        <FotoResizer
          targetWidth={354}
          targetHeight={472}
          title="Resize Foto 3×4"
          description="Ukuran foto 3×4 cm untuk dokumen resmi"
        />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Foto 3×4 cm
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              Foto berukuran <strong>3×4 cm</strong> adalah format foto dokumen
              yang paling sering digunakan di Indonesia. Pada resolusi cetak
              standar 300 DPI, ukuran ini setara dengan 354×472 piksel.
            </p>
            <p>
              <strong>Dokumen yang memerlukan foto 3×4:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>SKCK (Surat Keterangan Catatan Kepolisian)</li>
              <li>Pendaftaran CPNS dan PPPK</li>
              <li>Seleksi Nasional Berdasarkan Prestasi (SNBP)</li>
              <li>Surat lamaran kerja</li>
              <li>Kartu tanda peserta ujian</li>
              <li>Akta kelahiran dan dokumen kependudukan</li>
              <li>Sertifikat dan ijazah</li>
            </ul>
            <p>
              Toolinter meng-crop bagian tengah foto secara otomatis dan
              mengubahnya ke ukuran 354×472 piksel. Hasilnya siap cetar dalam
              format JPG berkualitas tinggi. Seluruh proses berjalan di browser
              — foto Anda tidak dikirim ke server manapun.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
