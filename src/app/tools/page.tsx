import type { Metadata } from 'next';
import ToolsGrid from './ToolsGrid';

export const metadata: Metadata = {
  title: 'Semua Tool Online — Toolinter',
  description:
    'Daftar lengkap semua tool online gratis di Toolinter. Surat, foto, CV, PDF, gaji, UMKM — 60+ tool siap pakai.',
};

export default function ToolsPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Semua Tool Online
          </h1>
          <p className="text-lg text-ink-tertiary max-w-2xl mx-auto">
            45 tool gratis siap pakai — surat, foto, gaji, PDF, CV, dan UMKM.
            Proses di browser, tanpa registrasi.
          </p>
        </div>

        {/* Client-side filterable grid */}
        <ToolsGrid />

        {/* SEO content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Kumpulan Tool Online Terlengkap untuk Indonesia
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              Toolinter menyediakan <strong>45+ tool online gratis</strong> yang
              dirancang khusus untuk kebutuhan masyarakat Indonesia. Mulai dari
              generator surat resmi, resize foto dokumen, kalkulator gaji dan
              pajak, pengelolaan PDF, pembuatan CV ATS-friendly, hingga tools
              bisnis UMKM — semua bisa digunakan langsung di browser tanpa
              registrasi.
            </p>
            <p>
              <strong>Generator Surat</strong> mencakup 22 template surat populer
              seperti surat resign, lamaran kerja, pernyataan, kuasa, izin
              sekolah, domisili, dan masih banyak lagi. Cukup isi data, preview,
              dan download PDF.
            </p>
            <p>
              <strong>Tools Foto</strong> memungkinkan Anda mengubah ukuran foto
              sesuai standar dokumen Indonesia (3×4, 4×6, 2×3 cm) dan mengompres
              foto untuk upload ke portal pendaftaran. Semua proses berjalan di
              browser menggunakan Canvas API — foto tidak diupload ke server.
            </p>
            <p>
              <strong>Kalkulator Gaji</strong> membantu menghitung gaji bersih
              (take home pay), PPh21, THR, dan iuran BPJS sesuai regulasi
              Indonesia terbaru. Sangat berguna untuk fresh graduate yang baru
              menerima tawaran kerja.
            </p>
            <p>
              Semua tools di Toolinter bersifat <strong>100% client-side</strong>.
              Data Anda tidak dikirim ke server manapun sehingga privasi dan
              keamanan tetap terjaga.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
