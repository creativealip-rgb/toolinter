import { Metadata } from "next";
import Link from "next/link";
import { Camera, ArrowRight, ChevronRight, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Foto CPNS 2026 — Syarat Ukuran dan Format — Toolinter",
  description:
    "Persyaratan foto CPNS 2026: ukuran 3×4 dan 4×6 cm, format JPG, maks 200 KB. Resize foto CPNS online gratis di browser.",
};

const specs3x4 = [
  { label: "Ukuran Cetak", value: "3 × 4 cm" },
  { label: "Resolusi (300 DPI)", value: "354 × 472 piksel" },
  { label: "Rasio Aspek", value: "3:4" },
  { label: "Format File", value: "JPG / JPEG" },
  { label: "Maks Ukuran File", value: "200 KB" },
];

const specs4x6 = [
  { label: "Ukuran Cetak", value: "4 × 6 cm" },
  { label: "Resolusi (300 DPI)", value: "472 × 709 piksel" },
  { label: "Rasio Aspek", value: "2:3" },
  { label: "Format File", value: "JPG / JPEG" },
  { label: "Maks Ukuran File", value: "200 KB" },
];

function SpecTable({ specs }: { specs: typeof specs3x4 }) {
  return (
    <div className="bg-canvas rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={spec.label}
              className={i < specs.length - 1 ? "border-b border-border" : ""}
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
  );
}

export default function FotoCpnsPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-ink-muted mb-8">
          <Link href="/foto" className="hover:text-primary transition-colors">
            Foto
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink-tertiary">Foto CPNS</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
          Foto CPNS 2026
        </h1>
        <p className="text-lg text-ink-tertiary mb-6">
          Syarat ukuran dan format foto untuk pendaftaran CPNS 2026.
          Resize online langsung di browser.
        </p>

        {/* Privacy badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-10">
          <Camera className="w-4 h-4" />
          100% di browser — foto tidak diupload
        </div>

        {/* Spec Tables */}
        <section className="space-y-8 mb-10">
          <div>
            <h2 className="text-xl font-semibold text-ink mb-4">
              Spesifikasi Foto 3×4
            </h2>
            <SpecTable specs={specs3x4} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink mb-4">
              Spesifikasi Foto 4×6
            </h2>
            <SpecTable specs={specs4x6} />
          </div>
        </section>

        {/* CTA */}
        <div className="bg-primary/10 rounded-xl p-6 mb-10">
          <h3 className="font-semibold text-ink mb-2">Siap resize foto CPNS?</h3>
          <p className="text-sm text-ink-tertiary mb-4">
            Pilih ukuran yang dibutuhkan. Toolinter otomatis crop dan resize foto Anda.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/foto/resize-3x4"
              className="inline-flex items-center gap-2 bg-primary text-white font-medium py-2.5 px-5 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Resize 3×4 cm
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/foto/resize-4x6"
              className="inline-flex items-center gap-2 bg-primary text-white font-medium py-2.5 px-5 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Resize 4×6 cm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <section className="space-y-4 text-ink-secondary text-sm leading-relaxed">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Persyaratan Foto CPNS 2026
          </h2>

          <p>
            Pendaftaran Calon Pegawai Negeri Sipil (CPNS) 2026 mensyaratkan foto
            formal dengan ukuran dan format tertentu. Berikut persyaratan lengkap
            foto CPNS:
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Ukuran Foto yang Dibutuhkan
          </h3>
          <p>
            Pendaftaran CPNS biasanya membutuhkan dua ukuran foto:{" "}
            <strong>3×4 cm</strong> dan <strong>4×6 cm</strong>. Keduanya harus
            dalam format JPG/JPEG dengan resolusi 300 DPI. Foto 3×4 berukuran
            354×472 piksel, sedangkan foto 4×6 berukuran 472×709 piksel.
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Background dan Pakaian
          </h3>
          <p>
            Latar belakang foto CPNS umumnya <strong>merah</strong> atau{" "}
            <strong>biru</strong> tergantung instansi yang dituju. Beberapa
            formasi juga menerima background <strong>putih</strong>. Gunakan
            pakaian formal — kemeja putih berdasi untuk pria, blus formal untuk
            wanita. Periksa pengumuman resmi instansi untuk warna background
            yang tepat.
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Batasan Ukuran File
          </h3>
          <p>
            Portal pendaftaran CPNS umumnya membatasi ukuran file foto maksimal{" "}
            <strong>200 KB</strong>. Jika foto Anda melebihi batas ini, gunakan
            fitur{" "}
            <Link href="/foto/kompres" className="text-primary hover:underline">
              kompres foto
            </Link>{" "}
            di Toolinter untuk mengecilkan ukuran file tanpa mengurangi kualitas
            secara signifikan.
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Tips Foto CPNS yang Baik
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Wajah menghadap lurus ke kamera, ekspresi netral</li>
            <li>Pencahayaan merata tanpa bayangan</li>
            <li>Tidak menggunakan kacamata</li>
            <li>Rambut rapi, tidak menutupi wajah</li>
            <li>Foto diambil dari dada ke atas (bust shot)</li>
            <li>Pastikan foto tajam dan tidak buram</li>
          </ul>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Cara Resize Foto CPNS Online
          </h3>
          <p>
            Toolinter memudahkan proses resize foto untuk keperluan CPNS. Upload
            foto, pilih ukuran target (3×4 atau 4×6), dan Toolinter otomatis
            melakukan center-crop dan resize. Hasil bisa langsung download dalam
            format JPG. Seluruh proses berlangsung di browser — foto Anda tidak
            pernah diupload ke server manapun.
          </p>

          <div className="flex items-start gap-3 bg-canvas border border-border rounded-xl p-4 mt-4">
            <FileCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-ink text-sm mb-1">Tips</p>
              <p className="text-sm">
                Upload foto asli beresolusi tinggi untuk hasil terbaik. Setelah
                resize, gunakan fitur{" "}
                <Link href="/foto/kompres" className="text-primary hover:underline">
                  kompres
                </Link>{" "}
                jika ukuran file masih melebihi 200 KB.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
