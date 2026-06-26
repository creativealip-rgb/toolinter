import { generateToolMetadata } from "@/lib/seo";
import Link from "next/link";
import { Camera, ArrowRight, ChevronRight, FileCheck, Shrink } from "lucide-react";

export const metadata = generateToolMetadata({
  title: "Panduan Foto SNBP",
  description: "Panduan ukuran foto untuk pendaftaran SNBP.",
  path: "/foto/snbp",
});



const snbpSpecs = [
  { label: "Ukuran Cetak", value: "4 × 6 cm" },
  { label: "Resolusi (300 DPI)", value: "472 × 709 piksel" },
  { label: "Rasio Aspek", value: "2:3" },
  { label: "Background", value: "Putih" },
  { label: "Format File", value: "JPG / JPEG" },
  { label: "Maks Ukuran File", value: "200 KB" },
];

export default function FotoSnbpPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-ink-muted mb-8">
          <Link href="/foto" className="hover:text-primary transition-colors">
            Foto
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink-tertiary">Foto SNBP</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
          Foto SNBP / SNBT 2026
        </h1>
        <p className="text-lg text-ink-tertiary mb-6">
          Syarat ukuran dan cara resize foto untuk pendaftaran SNBP dan SNBT 2026.
          Proses online langsung di browser.
        </p>

        {/* Privacy badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-10">
          <Camera className="w-4 h-4" />
          100% di browser — foto tidak diupload
        </div>

        {/* Specs Table */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Spesifikasi Foto SNBP / SNBT
          </h2>
          <div className="bg-canvas rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {snbpSpecs.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={i < snbpSpecs.length - 1 ? "border-b border-border" : ""}
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
          <h3 className="font-semibold text-ink mb-2">Siap resize foto SNBP?</h3>
          <p className="text-sm text-ink-tertiary mb-4">
            Resize ke 4×6 cm dan kompres ke bawah 200 KB agar siap upload ke portal pendaftaran.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/foto/resize-4x6"
              className="inline-flex items-center gap-2 bg-primary text-white font-medium py-2.5 px-5 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Resize Foto 4×6 cm
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/foto/kompres"
              className="inline-flex items-center gap-2 border border-primary text-primary font-medium py-2.5 px-5 rounded-xl hover:bg-primary/5 transition-colors text-sm"
            >
              Kompres Foto
              <Shrink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* SEO Content */}
        <section className="space-y-4 text-ink-secondary text-sm leading-relaxed">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Persyaratan Foto SNBP dan SNBT 2026
          </h2>

          <p>
            Pendaftaran Seleksi Nasional Berdasarkan Prestasi (SNBP) dan Seleksi
            Nasional Berdasarkan Tes (SNBT) 2026 mensyaratkan pasfoto digital
            dengan spesifikasi tertentu. Berikut persyaratan lengkapnya:
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Ukuran dan Resolusi
          </h3>
          <p>
            Ukuran foto SNBP/SNBT adalah <strong>4×6 cm</strong> dengan resolusi
            cetak 300 DPI, menghasilkan dimensi <strong>472×709 piksel</strong>.
            Format yang diterima adalah JPG/JPEG dengan ukuran file maksimal{" "}
            <strong>200 KB</strong>.
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Latar Belakang dan Penampilan
          </h3>
          <p>
            Background foto SNBP/SNBT harus berwarna <strong>putih</strong>.
            Gunakan pakaian rapi dan sopan. Wajah menghadap lurus ke kamera
            dengan ekspresi netral. Kacamata dan penutup kepala tidak
            diperkecualikan kecuali untuk alasan agama.
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Batasan Ukuran File
          </h3>
          <p>
            Portal pendaftaran SNBP/SNBT membatasi ukuran file foto maksimal{" "}
            <strong>200 KB</strong>. Ini adalah batasan yang cukup ketat, terutama
            untuk foto beresolusi tinggi. Toolinter menyediakan fitur{" "}
            <Link href="/foto/kompres" className="text-primary hover:underline">
              kompres foto
            </Link>{" "}
            untuk mengurangi ukuran file secara otomatis.
          </p>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Tips Foto SNBP/SNBT
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Gunakan pencahayaan yang baik dan merata</li>
            <li>Wajah harus terlihat jelas dan tidak blur</li>
            <li>Tidak ada objek lain di belakang (background polos putih)</li>
            <li>Pakaian rapi — batik, kemeja, atau blus</li>
            <li>Foto diambil dari dada ke atas</li>
            <li>Rambut rapi, tidak menutupi wajah</li>
          </ul>

          <h3 className="text-lg font-semibold text-ink pt-2">
            Cara Resize dan Kompres Foto SNBP
          </h3>
          <p>
            Toolinter membantu Anda menyiapkan foto untuk pendaftaran SNBP/SNBT dalam
            dua langkah mudah:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>Resize</strong> — Upload foto, Toolinter otomatis crop dan
              resize ke 472×709 piksel (4×6 cm pada 300 DPI).
            </li>
            <li>
              <strong>Kompres</strong> — Jika ukuran file melebihi 200 KB, gunakan
              fitur kompres untuk mengecilkannya tanpa kehilangan kualitas yang
              signifikan.
            </li>
          </ol>
          <p>
            Seluruh proses berlangsung langsung di browser menggunakan Canvas API.
            Foto tidak diupload ke server manapun, sehingga privasi Anda tetap
            aman.
          </p>

          <div className="flex items-start gap-3 bg-canvas border border-border rounded-xl p-4 mt-4">
            <FileCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-ink text-sm mb-1">Tips</p>
              <p className="text-sm">
                Lakukan resize terlebih dahulu, lalu kompres. Urutan ini
                menghasilkan kualitas terbaik karena foto dikompres setelah
                diresize ke ukuran target.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
