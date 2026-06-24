import { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "PDF Tools Online — Toolinter",
  description:
    "Gabung, kompres, dan kelola file PDF langsung di browser. Gratis, aman, tanpa upload ke server.",
};

const pdfTools = [
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
      "Kurangi ukuran file PDF tanpa mengurangi kualitas secara signifikan. Cocok untuk lampiran email.",
  },
  {
    slug: "foto-ke-pdf",
    title: "Foto ke PDF",
    description:
      "Ubah foto JPG, PNG, WEBP menjadi PDF. Setiap foto jadi satu halaman A4.",
  },
  {
    slug: "halaman",
    title: "Ambil Halaman PDF",
    description:
      "Ekstrak halaman tertentu dari file PDF. Pilih dengan rentang seperti 1-3,5,7-9.",
  },
  {
    slug: "pdf-ke-word",
    title: "PDF ke Word",
    description: "Ubah file PDF menjadi dokumen Word yang bisa diedit.",
    disabled: true,
  },
  {
    slug: "word-ke-pdf",
    title: "Word ke PDF",
    description: "Ubah dokumen Word menjadi PDF dengan formatting tetap rapi.",
    disabled: true,
  },
];

export default function PdfPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            PDF Tools Online
          </h1>
          <p className="text-lg text-ink-tertiary max-w-2xl mx-auto">
            Gabung, kompres, dan kelola file PDF langsung di browser. Proses
            cepat, aman, dan 100% di perangkat Anda.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
            <FileText className="w-4 h-4" />
            100% di browser — file tidak diupload
          </div>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pdfTools.map((tool) => (
            <div
              key={tool.slug}
              className={`bg-canvas rounded-xl border border-border p-6 flex flex-col ${
                tool.disabled ? "opacity-60" : ""
              }`}
            >
              <FileText className="w-8 h-8 text-primary mb-3" />
              <h2 className="font-semibold text-ink text-lg mb-2">
                {tool.title}
              </h2>
              <p className="text-ink-tertiary text-sm mb-4 flex-1">
                {tool.description}
              </p>
              {tool.disabled ? (
                <span className="text-sm text-ink-muted font-medium py-2 px-4 rounded-xl border border-border text-center">
                  Segera hadir
                </span>
              ) : (
                <Link
                  href={`/pdf/${tool.slug}`}
                  className="flex items-center justify-center gap-2 bg-primary text-white font-medium py-2 px-4 rounded-xl hover:opacity-90 transition-opacity text-sm"
                >
                  Mulai
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* SEO content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Kumpulan Tools PDF Terlengkap
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              PDF (Portable Document Format) adalah format dokumen yang paling
              banyak digunakan di dunia. Dari tugas kuliah, laporan kerja, hingga
              dokumen resmi — semuanya dalam format PDF. Toolinter menyediakan
              kumpulan tools PDF yang bisa Anda gunakan langsung di browser tanpa
              perlu install aplikasi apapun.
            </p>
            <p>
              <strong>Gabung PDF</strong> memungkinkan Anda menggabungkan
              beberapa file PDF menjadi satu dokumen. Sangat berguna saat Anda
              perlu mengirim beberapa dokumen sekaligus atau mengarsipkan
              laporan. Cukup upload file, atur urutan, dan download hasilnya.
            </p>
            <p>
              <strong>Kompres PDF</strong> membantu mengurangi ukuran file PDF
              sehingga lebih mudah dikirim via email atau diupload ke platform
              yang memiliki batasan ukuran file. Kompresi dilakukan dengan
              mengoptimalkan struktur internal PDF tanpa mengubah kontennya.
            </p>
            <p>
              <strong>Foto ke PDF</strong> mengubah foto atau gambar (JPG, PNG,
              WEBP) menjadi dokumen PDF. Setiap foto menjadi satu halaman dengan
              ukuran A4, cocok untuk cetak atau pengumpulan dokumen digital.
            </p>
            <p>
              <strong>Ambil Halaman PDF</strong> memungkinkan Anda mengekstrak
              halaman tertentu dari file PDF. Cukup masukkan rentang halaman
              (misalnya 1-3,5,7-9) dan download hasilnya.
            </p>
            <p>
              Semua proses berjalan langsung di browser Anda menggunakan
              teknologi JavaScript modern. File PDF tidak dikirim ke server
              manapun sehingga privasi dan keamanan data Anda tetap terjaga.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
