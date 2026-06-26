import BlogLink from "@/components/blog-link";
import Link from "next/link";
import { ChevronLeft, Camera } from "lucide-react";
import FotoResizer from "@/components/foto-resizer";
import { generateToolMetadata } from "@/lib/seo";

export const metadata = generateToolMetadata({
  title: "Resize Foto 4x6 Online",
  description: "Ubah ukuran pas foto 4x6 untuk dokumen resmi.",
  path: "/foto/resize-4x6",
});





export default function Resize4x6Page() {
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
              Resize Foto 4×6 cm
            </h1>
          </div>
          <p className="text-ink-tertiary max-w-xl">
            Upload foto, otomatis di-crop dan di-resize ke ukuran 4×6 cm (472×709 px pada 300 DPI). Langsung download sebagai JPG.
          </p>
        </div>

        {/* Resizer tool */}
        <FotoResizer
          targetWidth={472}
          targetHeight={709}
          title="Resize Foto 4×6"
          description="Ukuran foto 4×6 cm untuk dokumen internasional"
        />

        {/* SEO content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Tentang Foto 4×6 cm
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              Foto berukuran <strong>4×6 cm</strong> adalah format foto dokumen
              yang sering digunakan untuk keperluan internasional. Pada resolusi
              cetak standar 300 DPI, ukuran ini setara dengan 472×709 piksel.
            </p>
            <p>
              <strong>Dokumen yang memerlukan foto 4×6:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>SKCK (Surat Keterangan Catatan Kepolisian)</li>
              <li>Paspor Indonesia dan internasional</li>
              <li>Visa berbagai negara</li>
              <li>SIM internasional</li>
              <li>Dokumen keimigrasian</li>
              <li>Sertifikat dan dokumen resmi lainnya</li>
            </ul>
            <p>
              Toolinter meng-crop bagian tengah foto secara otomatis dan
              mengubahnya ke ukuran 472×709 piksel. Hasilnya siap cetak dalam
              format JPG berkualitas tinggi. Seluruh proses berjalan di browser
              — foto Anda tidak dikirim ke server manapun.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
