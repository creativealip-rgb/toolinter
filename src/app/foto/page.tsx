import { Metadata } from "next";
import Link from "next/link";
import { Camera, ArrowRight, Shrink } from "lucide-react";

export const metadata: Metadata = {
  title: "Foto Dokumen Online — Toolinter",
  description:
    "Resize foto untuk CPNS, SNBP, KTP, visa, SKCK, dan dokumen resmi lainnya. Gratis, proses di browser, langsung download JPG.",
};

const fotoTools = [
  {
    slug: "resize-3x4",
    title: "Resize Foto 3×4 cm",
    description:
      "Ubah ukuran foto ke 3×4 cm untuk CPNS, SNBP, SKCK, akta, dan dokumen resmi lainnya.",
    size: "3×4 cm (354×472 px)",
    icon: "camera" as const,
  },
  {
    slug: "resize-4x6",
    title: "Resize Foto 4×6 cm",
    description:
      "Ubah ukuran foto ke 4×6 cm untuk paspor, visa, SIM, dan dokumen internasional.",
    size: "4×6 cm (472×709 px)",
    icon: "camera" as const,
  },
  {
    slug: "resize-2x3",
    title: "Resize Foto 2×3 cm",
    description:
      "Ubah ukuran foto ke 2×3 cm untuk dokumen sekolah, PPDB, dan keperluan administrasi.",
    size: "2×3 cm (236×354 px)",
    icon: "camera" as const,
  },
  {
    slug: "kompres",
    title: "Kompres Foto",
    description:
      "Kompres foto untuk upload ke portal CPNS, SNBP, dan situs pendaftaran online.",
    size: "Target: 200 KB / 500 KB / custom",
    icon: "shrink" as const,
  },
];

export default function FotoPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Foto Dokumen Online
          </h1>
          <p className="text-lg text-ink-tertiary max-w-2xl mx-auto">
            Resize foto untuk CPNS, SNBP, KTP, visa, SKCK, dan dokumen resmi
            lainnya. Proses langsung di browser, tidak perlu upload ke server.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
            <Camera className="w-4 h-4" />
            100% di browser — foto tidak diupload
          </div>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {fotoTools.map((tool) => (
            <div
              key={tool.slug}
              className="bg-canvas rounded-xl border border-border p-6 flex flex-col"
            >
              {tool.icon === "shrink" ? (
                <Shrink className="w-8 h-8 text-primary mb-3" />
              ) : (
                <Camera className="w-8 h-8 text-primary mb-3" />
              )}
              <h2 className="font-semibold text-ink text-lg mb-2">
                {tool.title}
              </h2>
              <p className="text-ink-tertiary text-sm mb-2 flex-1">
                {tool.description}
              </p>
              <p className="text-ink-muted text-xs mb-4">{tool.size}</p>
              <Link
                href={`/foto/${tool.slug}`}
                className="flex items-center justify-center gap-2 bg-primary text-white font-medium py-2 px-4 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                {tool.icon === "shrink" ? "Mulai Kompres" : "Mulai Resize"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* SEO content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-ink mb-4">
            Persyaratan Foto Dokumen di Indonesia
          </h2>
          <div className="text-ink-secondary text-sm leading-relaxed space-y-3">
            <p>
              Di Indonesia, ukuran foto dokumen yang paling umum digunakan
              adalah <strong>3×4 cm</strong> dan <strong>4×6 cm</strong>. Foto
              ini diperlukan untuk berbagai keperluan administrasi seperti
              pendaftaran CPNS, SNBP, pembuatan KTP, paspor, SKCK, dan dokumen
              resmi lainnya.
            </p>
            <p>
              <strong>Foto 3×4 cm</strong> biasanya digunakan untuk dokumen
              seperti SKCK, surat lamaran kerja, kartu peserta ujian, dan
              pendaftaran seleksi CPNS maupun SNBP. Resolusi cetak yang
              direkomendasikan adalah 300 DPI (354×472 piksel).
            </p>
            <p>
              <strong>Foto 4×6 cm</strong> sering diperlukan untuk dokumen
              internasional seperti paspor, visa, SIM internasional, dan
              dokumen keimigrasian. Resolusi cetak 300 DPI menghasilkan ukuran
              472×709 piksel.
            </p>
            <p>
              Toolinter memproses foto langsung di browser Anda menggunakan
              Canvas API. Foto tidak diupload ke server manapun sehingga privasi
              Anda tetap terjaga.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
