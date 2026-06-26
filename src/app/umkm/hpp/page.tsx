import BlogLink from "@/components/blog-link";
import Link from "next/link";
import JsonLd from "@/components/json-ld";
import { ArrowLeft, Calculator } from "lucide-react";
import HppCalculator from "@/components/hpp-calculator";
import { generateToolMetadata } from "@/lib/seo";

export const metadata = generateToolMetadata({
  title: "Kalkulator HPP",
  description: "Hitung Harga Pokok Penjualan (HPP) produk UMKM Anda secara gratis.",
  path: "/umkm/hpp",
});





const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kalkulator HPP",
  "url": "https://toolinter.net/umkm/hpp",
  "description": "Hitung Harga Pokok Penjualan produk UMKM",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "IDR" },
  "inLanguage": "id",
};

export default function HppPage() {
  return (
    <main className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
          <Link href="/umkm" className="hover:text-primary transition-colors">
            Tools UMKM
          </Link>
          <span>/</span>
          <span className="text-ink">Kalkulator HPP</span>
        </nav>

        {/* Back link */}
        <Link
          href="/umkm"
          className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Kalkulator HPP Online
          </h1>
        </div>
        <p className="text-ink-tertiary mb-8">
          Hitung Harga Pokok Penjualan (HPP) untuk menentukan harga jual produk
          Anda. Gratis, cepat, dan langsung di browser.
        </p>

        {/* Calculator component */}
        <HppCalculator />

        {/* SEO content */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-ink mb-4">
            Apa itu HPP (Harga Pokok Penjualan)?
          </h2>
          <div className="space-y-4 text-sm text-ink-tertiary leading-relaxed">
            <p>
              <strong className="text-ink">HPP</strong> atau Harga Pokok
              Penjualan adalah total biaya yang dikeluarkan untuk memproduksi
              atau menyediakan suatu barang/jasa yang dijual. HPP mencakup biaya
              bahan baku, tenaga kerja langsung, dan biaya overhead produksi.
            </p>
            <h3 className="text-base font-semibold text-ink mt-6">
              Rumus HPP
            </h3>
            <div className="bg-surface rounded-lg p-4 border border-border">
              <p className="text-ink font-mono text-sm">
                HPP per Unit = Total Biaya Produksi ÷ Jumlah Produk
              </p>
              <p className="text-ink font-mono text-sm mt-2">
                Harga Jual = HPP × (1 + Margin%)
              </p>
            </div>
            <p>
              <strong className="text-ink">Total Biaya Produksi</strong>{" "}
              meliputi seluruh biaya yang terkait langsung dengan proses
              produksi, yaitu:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                <strong className="text-ink">Biaya Bahan Baku</strong> — harga
                semua bahan yang digunakan untuk membuat produk.
              </li>
              <li>
                <strong className="text-ink">Biaya Tenaga Kerja</strong> — gaji
                atau upah pekerja yang terlibat dalam proses produksi.
              </li>
              <li>
                <strong className="text-ink">Biaya Overhead</strong> — biaya
                lain seperti kemasan, transportasi, listrik, sewa tempat, dan
                biaya operasional lainnya.
              </li>
            </ul>
            <h3 className="text-base font-semibold text-ink mt-6">
              Mengapa HPP Penting untuk UMKM?
            </h3>
            <p>
              Mengetahui HPP secara akurat sangat penting bagi pelaku UMKM
              karena:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>
                Menentukan harga jual yang tepat agar tetap kompetitif dan
                mendapatkan keuntungan.
              </li>
              <li>
                Menghindari kerugian karena menjual di bawah biaya produksi.
              </li>
              <li>
                Menganalisis komponen biaya mana yang bisa ditekan untuk
                meningkatkan efisiensi.
              </li>
              <li>
                Menyusun laporan keuangan yang benar untuk perpajakan dan
                pengembangan bisnis.
              </li>
            </ul>
            <p>
              Kalkulator HPP Toolinter membantu Anda menghitung HPP secara instan
              tanpa perlu rumus manual. Cukup masukkan biaya-biaya produksi,
              tentukan margin keuntungan, dan dapatkan harga jual yang optimal
              untuk produk Anda.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
