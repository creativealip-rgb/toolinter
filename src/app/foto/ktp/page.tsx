import { Metadata } from "next";
import Link from "next/link";
import { Camera, ArrowRight, ChevronRight, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Foto KTP Online — Syarat dan Cara Buat — Toolinter",
  description:
    "Ketahui syarat foto KTP 2026: ukuran 3×4 cm, background merah, resolusi 300 DPI. Resize foto KTP online gratis langsung di browser.",
};

const ktpSpecs = [
  { label: "Ukuran Cetak", value: "3 × 4 cm" },
  { label: "Resolusi (300 DPI)", value: "354 × 472 piksel" },
  { label: "Rasio Aspek", value: "3:4" },
  { label: "Background", value: "Merah" },
  { label: "Format File", value: "JPG / JPEG" },
  { label: "Maks Ukuran File", value: "200 KB" },
];

export default function FotoKtpPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-ink-muted mb-8">
          <Link href="/foto" className="hover:text-primary transition-colors">
            Foto
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink-tertiary">Foto KTP</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
          Foto KTP Online
        </h1>
        <p className="text-lg text-ink-tertiary mb-6">
          Syarat dan cara membuat foto KTP sesuai standar Dukcapil 2026.
          Resize langsung di browser, gratis tanpa watermark.
        </p>

        {/* Privacy badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-10">
          <Camera className="w-4 h-4" />
          100% di browser — foto tidak diupload
        </div>

        {/* Specs Table */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Spesifikasi Foto KTP
          </h2>
          <div className="bg-canvas rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {ktpSpecs.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={i < ktpSpecs.length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="px-4 py-3 font-medium text-ink">{spec.label}</td>
                    <td className="px-4 py-3 text-ink-tertiary text-right">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-primary/10 rounded-xl p-6 mb-10">
          <h3 className="font-semibold text-ink mb-2">Siap resize foto KTP?</h3>
          <p className="text-sm text-ink-tertiary mb-4">
            Toolinter otomatis crop dan resize foto Anda ke ukuran 3×4 cm (354×472 px) sesuai standar.
          </p>
          <Link
            href="/foto/resize-3x4"
            className="inline-flex items-center gap-2 bg-primary text-white font-medium py-2.5 px-5 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Resize Foto KTP (3×4)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* SEO Content */}
        <section className="space-y-4 text-ink-secondary text-sm leading-relaxed">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Persyaratan Foto KTP 2026
          </h2>

          <p>
            Foto KTP (Kartu Tanda Penduduk) harus memenuhi standar yang ditetapkan
            oleh Dinas Kependudukan dan Pencatatan Sipil (Dukcapil). Berikut
            persyaratan lengkap foto KTP:
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Ukuran dan Resolusi
          </h3>
          <p>
            Ukuran foto KTP adalah <strong>3×4 cm</strong> dengan resolusi cetak
            300 DPI, menghasilkan dimensi <strong>354×472 piksel</strong>. Format
            yang diterima adalah JPG/JPEG dengan ukuran file maksimal 200 KB.
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Latar Belakang dan Pakaian
          </h3>
          <p>
            Background foto KTP harus berwarna <strong>merah</strong>. Gunakan
            pakaian formal atau rapi. Untuk pria disarankan kemeja berkerah,
            untuk wanita blus atau kebaya. Hindari pakaian berwarna merah agar
            tidak menyatu dengan latar belakang.
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Aturan Penampilan
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Wajah menghadap lurus ke kamera</li>
            <li>Ekspresi netral, mulut tertutup</li>
            <li>Tidak boleh menggunakan kacamata</li>
            <li>Tidak boleh menggunakan penutup kepala, kecuali untuk alasan agama</li>
            <li>Rambut tidak menutupi wajah</li>
            <li>Pencahayaan merata, tidak ada bayangan di wajah atau latar belakang</li>
          </ul>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Cara Resize Foto KTP Online
          </h3>
          <p>
            Toolinter membantu Anda resize foto ke ukuran KTP secara online dan
            gratis. Cukup upload foto, Toolinter otomatis melakukan center-crop
            dan resize ke 354×472 piksel. Proses berlangsung langsung di browser
            — foto tidak diupload ke server manapun, sehingga privasi Anda tetap
            terjaga. Hasil bisa langsung download dalam format JPG.
          </p>

          <div className="flex items-start gap-3 bg-canvas border border-border rounded-xl p-4 mt-4">
            <FileCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-ink text-sm mb-1">Tips</p>
              <p className="text-sm">
                Jika file foto melebihi 200 KB, gunakan{" "}
                <Link href="/foto/kompres" className="text-primary hover:underline">
                  fitur kompres foto
                </Link>{" "}
                untuk mengurangi ukuran file tanpa mengorbankan kualitas.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
